#!/usr/bin/env node
/**
 * Validate DATABASE_URL / DIRECT_URL shape and test DNS (no secrets printed).
 */
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import dnsPromises from "node:dns/promises";
import { getServers, setServers } from "node:dns";
import {
  loadDotenvFiles,
  normalizePostgresUrlForPrisma,
  postgresUrlHost,
} from "./load-dotenv.mjs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
loadDotenvFiles(root);

async function checkHost(label, host) {
  if (!host) {
    console.log(`${label}: (could not parse host)`);
    return;
  }
  process.stdout.write(`${label} host: ${host}\n  DNS (system): `);
  try {
    const r = await dnsPromises.lookup(host);
    console.log(`OK → ${r.address}`);
    return;
  } catch (e) {
    console.log(`FAILED (${e.code || e.message})`);
  }

  const prev = getServers();
  try {
    setServers(["8.8.8.8"]);
    const r2 = await dnsPromises.lookup(host);
    console.log(
      `  DNS via 8.8.8.8 only: OK → ${r2.address} — your Mac/router DNS is blocking or mis-resolving Neon.`
    );
    console.log(
      `  → Fix: System Settings → Network → Wi‑Fi → Details → DNS → add 8.8.8.8 and 1.1.1.1 (drag above other entries).`
    );
    console.log(`  → Then: sudo dscacheutil -flushcache; sudo killall -HUP mDNSResponder`);
  } catch {
    console.log(
      `  DNS via 8.8.8.8: also FAILED — hostname may be wrong, or Neon project/branch was removed.`
    );
    console.log(
      `  → Re-copy both URLs from console.neon.tech → Connect, or try: dig +short ${host} @8.8.8.8`
    );
  } finally {
    setServers(prev);
  }
}

console.log("BillRelief DB env check (passwords hidden)\n");

let dbUrl = process.env.DATABASE_URL;
let directUrl = process.env.DIRECT_URL;

try {
  if (dbUrl) {
    dbUrl = normalizePostgresUrlForPrisma(dbUrl, "DATABASE_URL");
    console.log("DATABASE_URL: scheme OK (postgresql://)");
  } else {
    console.log("DATABASE_URL: MISSING");
  }
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
}

try {
  if (directUrl) {
    directUrl = normalizePostgresUrlForPrisma(directUrl, "DIRECT_URL");
    console.log("DIRECT_URL: scheme OK (postgresql://)");
  } else {
    console.log("DIRECT_URL: MISSING (Prisma migrate/db push need this)");
  }
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
}

console.log("");
if (dbUrl) await checkHost("DATABASE_URL", postgresUrlHost(dbUrl));
if (directUrl) await checkHost("DIRECT_URL", postgresUrlHost(directUrl));

console.log(
  "\nIf DNS fails on your Mac, Prisma and nc will fail until DNS is fixed."
);
