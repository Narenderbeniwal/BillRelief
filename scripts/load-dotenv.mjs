/**
 * Minimal .env loader for scripts (no dotenv dependency).
 * Fixes: UTF-8 BOM, CRLF, "export KEY=", empty .env.local wiping keys.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";

/**
 * @param {string} root - project root
 * @param {Record<string, string>} target - usually process.env
 */
export function loadDotenvFiles(root, target = process.env) {
  for (const name of [".env", ".env.local"]) {
    applyEnvFile(join(root, name), target);
  }
}

/**
 * Fixes common .env mistakes: escaped quotes like DATABASE_URL=\"postgresql://...\"
 */
export function sanitizeEnvValue(val) {
  let v = val.replace(/^\uFEFF/, "").trim();
  if (
    (v.startsWith('"') && v.endsWith('"')) ||
    (v.startsWith("'") && v.endsWith("'"))
  ) {
    v = v.slice(1, -1).trim();
  }
  while (v.startsWith(String.raw`\"`)) v = v.slice(2);
  while (v.endsWith(String.raw`\"`)) v = v.slice(0, -2);
  while (v.startsWith('"')) v = v.slice(1);
  while (v.endsWith('"')) v = v.slice(0, -1);
  return v.trim();
}

function applyEnvFile(filePath, target) {
  if (!existsSync(filePath)) return;
  let text = readFileSync(filePath, "utf8");
  if (text.charCodeAt(0) === 0xfeff) text = text.slice(1);
  text = text.replace(/^\uFEFF/, "");

  for (let line of text.split("\n")) {
    line = line.replace(/\r$/, "").trim();
    if (!line || line.startsWith("#")) continue;
    if (line.startsWith("export ")) line = line.slice(7).trim();

    const eq = line.indexOf("=");
    if (eq === -1) continue;
    const key = line.slice(0, eq).trim();
    if (!key) continue;
    let val = line.slice(eq + 1).trim();

    if (
      (val.startsWith('"') && val.endsWith('"')) ||
      (val.startsWith("'") && val.endsWith("'"))
    ) {
      val = val.slice(1, -1);
    }
    val = sanitizeEnvValue(val);
    // Don't let an empty line in .env.local wipe DATABASE_URL from .env
    if (val === "") continue;

    target[key] = val;
  }
}

/**
 * @returns {string} normalized postgresql:// URL for Prisma
 * @throws {Error} if missing or invalid
 */
export function normalizePostgresUrlForPrisma(raw, label) {
  if (!raw?.trim()) {
    throw new Error(`${label} is missing or empty in .env`);
  }
  let u = sanitizeEnvValue(raw);
  const schemeStart = u.match(/^([a-z+.-]+):\/\//i);
  if (!schemeStart) {
    throw new Error(
      `${label} must look like postgresql://user:...@host/db (missing ://). First chars: ${JSON.stringify(u.slice(0, 30))}`
    );
  }
  const scheme = schemeStart[1].toLowerCase();
  if (scheme !== "postgresql" && scheme !== "postgres") {
    throw new Error(
      `${label} has unknown scheme "${schemeStart[1]}". Use postgresql:// (not e.g. postgressql).`
    );
  }
  if (scheme === "postgres") {
    u = "postgresql://" + u.slice("postgres://".length);
  }
  return u;
}

/** Host from postgres URL for DNS checks (no password logged). */
export function postgresUrlHost(url) {
  const m = url.match(/^postgresql:\/\/(?:[^@]*@)?([^/?#]+)/i);
  return m ? m[1].split(":")[0] : null;
}
