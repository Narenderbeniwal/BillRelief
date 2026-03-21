/**
 * Normalizes DATABASE_URL values that were saved with accidental escaped quotes
 * (e.g. DATABASE_URL=\"postgresql://...\" in .env). Next.js and Prisma read raw .env.
 */
export function sanitizeDatabaseUrl(raw: string | undefined): string | undefined {
  if (raw == null || !String(raw).trim()) return undefined;
  let v = String(raw)
    .trim()
    .replace(/^\uFEFF/, "");
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
  const out = v.trim();
  return out === "" ? undefined : out;
}
