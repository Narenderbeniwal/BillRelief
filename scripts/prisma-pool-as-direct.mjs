#!/usr/bin/env node
/**
 * Runs Prisma CLI with DIRECT_URL temporarily set to DATABASE_URL (pooled).
 * Use when `npm run db:ping` fails with P1001 on the *direct* host but the
 * pooler endpoint works (e.g. network quirks). Not ideal for all migrations;
 * prefer fixing DNS / trying a hotspot, or Neon’s real direct URL when possible.
 *
 * Usage: node scripts/prisma-pool-as-direct.mjs db push
 *        node scripts/prisma-pool-as-direct.mjs db execute --file scripts/db-ping.sql --schema prisma/schema.prisma
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

let pooled;
try {
  pooled = normalizePostgresUrlForPrisma(
    process.env.DATABASE_URL,
    "DATABASE_URL"
  );
} catch (e) {
  console.error(e instanceof Error ? e.message : e);
  process.exit(1);
}

process.env.DIRECT_URL = pooled;
process.env.DATABASE_URL = pooled;
console.log(
  "Using DATABASE_URL as DIRECT_URL for this Prisma command only (pooler).\n"
);

const prismaArgs = process.argv.slice(2);
if (prismaArgs.length === 0) {
  console.error("Pass Prisma args, e.g.: db push");
  process.exit(1);
}

const r = spawnSync("npx", ["prisma", ...prismaArgs], {
  cwd: root,
  stdio: "inherit",
  shell: false,
  env: process.env,
});

process.exit(r.status ?? 1);
