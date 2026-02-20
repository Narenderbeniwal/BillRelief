import { NextResponse } from "next/server";
import type { NextRequest, NextFetchEvent } from "next/server";
import { withAuth } from "next-auth/middleware";
import { SITE_DOMAIN } from "@/lib/siteConfig";

const CANONICAL_HOST = `www.${SITE_DOMAIN}`;

/** Redirect non-www and http to https://www.billreliefai.com */
function redirectToCanonical(request: NextRequest): NextResponse | null {
  const host = request.headers.get("host") ?? "";
  const proto = request.headers.get("x-forwarded-proto") ?? request.nextUrl.protocol.replace(":", "");
  if (host === CANONICAL_HOST && proto === "https") return null;
  const url = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${CANONICAL_HOST}`);
  return NextResponse.redirect(url, 301);
}

export default function middleware(request: NextRequest, event: NextFetchEvent) {
  const redirect = redirectToCanonical(request);
  if (redirect) return redirect;
  return withAuth({
    pages: { signIn: "/login" },
  })(request as any, event as any);
}

export const config = {
  // Run on all routes (so redirect applies to every page); auth still only protects matched paths
  matcher: [
    "/dashboard/:path*",
    "/blog/my-posts",
    "/blog/write",
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:ico|png|jpg|jpeg|gif|webp|svg)).*)",
  ],
};
