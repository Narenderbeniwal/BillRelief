"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { ShieldCheck, Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const NAV_LINKS = [
  { href: "#why-competitors-fail", label: "Why Competitors Fail" },
  { href: "#difference", label: "Our Difference" },
  { href: "#how-it-works", label: "How It Works" },
  { href: "/pricing", label: "Pricing" },
  { href: "/case-studies", label: "Case Studies" },
  { href: "/blog", label: "Blog" },
  { href: "/get-started", label: "Get Started" },
];

export function SiteHeader() {
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (mobileMenuOpen) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-14 min-h-[56px] items-center justify-between gap-4 px-4 sm:px-6 md:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-2 sm:gap-3">
          <Link href="/" className="shrink-0 font-bold text-lg sm:text-xl text-billrelief-blue">
            BillRelief
          </Link>
          <span className="hidden items-center gap-1 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-2 py-1 text-[11px] font-semibold text-[#0F4C81] lg:inline-flex">
            <ShieldCheck className="h-3 w-3 text-[#10B981]" />
            HIPAA-aligned
          </span>
        </div>

        {/* Desktop / tablet landscape nav (lg = 1024px+: full nav; tablet/mobile use menu) */}
        <nav className="hidden items-center gap-2 lg:flex lg:gap-4">
          <Link href="#why-competitors-fail" className="text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">Why Competitors Fail</Link>
          <Link href="#difference" className="text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">Our Difference</Link>
          <Link href="#how-it-works" className="text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">How It Works</Link>
          <Link href="/pricing" className="text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">Pricing</Link>
          <Link href="/case-studies" className="text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">Case Studies</Link>
          <Link href="/blog" className="text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">Blog</Link>
          <Link href="/get-started" className="text-sm font-medium text-muted-foreground hover:text-foreground whitespace-nowrap">Get Started</Link>
          {status === "loading" ? (
            <span className="text-sm text-muted-foreground">...</span>
          ) : session?.user ? (
            <>
              <Button asChild variant="outline" size="sm"><Link href="/blog/write">+ Write</Link></Button>
              <Button asChild variant="ghost" size="sm"><Link href="/blog/my-posts">My Posts</Link></Button>
              <Button asChild variant="default" size="sm"><Link href="/dashboard">Dashboard</Link></Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm"><Link href="/login">Log in</Link></Button>
              <Button asChild variant="yellow" size="sm"><Link href="/register">Sign up</Link></Button>
            </>
          )}
        </nav>

        {/* Mobile & tablet: hamburger menu */}
        <div className="flex items-center gap-2 lg:hidden">
          {session?.user && (
            <>
              <Button asChild variant="default" size="sm" className="shrink-0">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </>
          )}
          <button
            type="button"
            onClick={() => setMobileMenuOpen((o) => !o)}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-muted-foreground hover:bg-muted hover:text-foreground"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 top-14 z-40 bg-background/98 backdrop-blur lg:hidden ${mobileMenuOpen ? "visible" : "invisible pointer-events-none"}`}
        aria-hidden={!mobileMenuOpen}
      >
        <nav
          className={`flex flex-col gap-0 overflow-auto pb-8 pt-4 transition-opacity duration-200 ${mobileMenuOpen ? "opacity-100" : "opacity-0"}`}
          style={{ paddingBottom: "max(2rem, env(safe-area-inset-bottom))" }}
        >
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="min-h-[48px] px-4 py-3 text-base font-medium text-foreground hover:bg-muted"
            >
              {link.label}
            </Link>
          ))}
          <div className="my-2 border-t px-4 pt-4">
            {status === "loading" ? (
              <p className="py-2 text-sm text-muted-foreground">Loading...</p>
            ) : session?.user ? (
              <>
                <Link href="/blog/write" onClick={() => setMobileMenuOpen(false)} className="block min-h-[48px] py-3 text-base font-medium hover:bg-muted px-4 -mx-4 rounded-lg">+ Write Blog Post</Link>
                <Link href="/blog/my-posts" onClick={() => setMobileMenuOpen(false)} className="block min-h-[48px] py-3 text-base font-medium hover:bg-muted px-4 -mx-4 rounded-lg">My Posts</Link>
                <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)} className="block min-h-[48px] py-3 text-base font-medium hover:bg-muted px-4 -mx-4 rounded-lg">Dashboard</Link>
                <button type="button" onClick={() => { setMobileMenuOpen(false); signOut({ callbackUrl: "https://www.billreliefai.com/", redirect: true }); }} className="block w-full min-h-[48px] py-3 text-base font-medium text-muted-foreground hover:bg-muted px-4 -mx-4 rounded-lg text-left">Sign out</button>
              </>
            ) : (
              <>
                <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="block min-h-[48px] py-3 text-base font-medium hover:bg-muted px-4 -mx-4 rounded-lg">Log in</Link>
                <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="block min-h-[48px] py-3 text-base font-medium text-[#0F4C81] hover:bg-muted px-4 -mx-4 rounded-lg font-semibold">Sign up</Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}
