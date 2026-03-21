/**
 * Client IP for API routes (behind proxies / Vercel / Azure).
 */
export function getClientIp(req: Request): string | null {
  const forwarded = req.headers.get("x-forwarded-for");
  if (forwarded) {
    const first = forwarded.split(",")[0]?.trim();
    if (first) return first.slice(0, 45);
  }
  const real = req.headers.get("x-real-ip")?.trim();
  if (real) return real.slice(0, 45);
  const cf = req.headers.get("cf-connecting-ip")?.trim();
  if (cf) return cf.slice(0, 45);
  return null;
}

export function getClientUserAgent(req: Request): string | null {
  const ua = req.headers.get("user-agent")?.trim();
  if (!ua) return null;
  return ua.length > 512 ? ua.slice(0, 512) : ua;
}
