import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { withAuth } from "next-auth/middleware";
import { SITE_DOMAIN } from "@/lib/siteConfig";

const CANONICAL_HOST = `www.${SITE_DOMAIN}`;

const PROTECTED_PATHS = ["/dashboard", "/blog/my-posts", "/blog/write"];

function isProtectedPath(pathname: string): boolean {
  return PROTECTED_PATHS.some(
    (p) => pathname === p || pathname.startsWith(p + "/")
  );
}

/** Redirect non-www and http to https://www.billreliefai.com */
function redirectToCanonical(request: NextRequest): NextResponse | null {
  const host = request.headers.get("host") ?? "";
  const proto =
    request.headers.get("x-forwarded-proto") ??
    request.nextUrl.protocol.replace(":", "");
  if (host === CANONICAL_HOST && proto === "https") return null;
  const url = new URL(
    request.nextUrl.pathname + request.nextUrl.search,
    `https://${CANONICAL_HOST}`
  );
  return NextResponse.redirect(url, 301);
}

const authMiddleware = withAuth({ pages: { signIn: "/login" } });

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  const redirect = redirectToCanonical(request);
  if (redirect) return redirect;

  if (isProtectedPath(request.nextUrl.pathname)) {
    return authMiddleware(request as any, event as any);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg)).*)",
  ],
};
