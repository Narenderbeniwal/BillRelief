import { PrismaClient } from "@prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { Pool, neonConfig } from "@neondatabase/serverless";
import ws from "ws";
import { sanitizeDatabaseUrl } from "@/lib/sanitize-database-url";

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  neonPool: Pool | undefined;
};

const log =
  process.env.NODE_ENV === "development"
    ? (["query", "error", "warn"] as const)
    : (["error"] as const);

function isNeonConnectionString(url: string | undefined): boolean {
  if (!url) return false;
  return url.includes("neon.tech") || url.includes("neon.proxy");
}

function getNeonPool(connectionString: string): Pool {
  if (process.env.NODE_ENV !== "production") {
    if (!globalForPrisma.neonPool) {
      neonConfig.webSocketConstructor = ws;
      globalForPrisma.neonPool = new Pool({ connectionString });
    }
    return globalForPrisma.neonPool;
  }
  neonConfig.webSocketConstructor = ws;
  return new Pool({ connectionString });
}

function createPrismaClient(): PrismaClient {
  const url = sanitizeDatabaseUrl(process.env.DATABASE_URL);

  if (isNeonConnectionString(url) && url) {
    const pool = getNeonPool(url);
    const adapter = new PrismaNeon(pool);
    return new PrismaClient({
      adapter,
      log: [...log],
    });
  }

  return new PrismaClient({
    log: [...log],
  });
}

export const prisma = globalForPrisma.prisma ?? createPrismaClient();

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}
