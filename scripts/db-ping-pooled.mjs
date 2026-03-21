#!/usr/bin/env node
/**
 * Run `prisma db execute` against DATABASE_URL only (pooled host).
 * Use when `npm run db:ping` fails: compare direct vs pooled TCP reachability.
 */
import { spawnSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import {
  loadDotenvFiles,
  normalizePostgresUrlForPrisma,
} from "./load-dotenv.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
loadDotenvFiles(root);

let url;
try {
  url = normalizePostgresUrlForPrisma(
    process.env.DATABASE_URL,
    "DATABASE_URL"
  );
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
}

console.log(
  "db:ping:pooled — testing DATABASE_URL (pooled host, TCP) via Prisma CLI…\n"
);

const r = spawnSync(
  "npx",
  ["prisma", "db", "execute", "--file", "scripts/db-ping.sql", "--url", url],
  { cwd: root, stdio: "inherit", shell: false, env: process.env }
);

process.exit(r.status ?? 1);
