"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";

export function SiteHeader() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <div className="flex items-center gap-3">
          <Link href="/" className="font-bold text-xl text-billrelief-blue">
            BillRelief
          </Link>
          <span className="hidden items-center gap-1 rounded-full border border-[#10B981]/30 bg-[#10B981]/10 px-2 py-1 text-[11px] font-semibold text-[#0F4C81] md:inline-flex">
            <ShieldCheck className="h-3 w-3 text-[#10B981]" />
            HIPAA-aligned
          </span>
        </div>
        <nav className="flex items-center gap-3 sm:gap-4">
          <Link
            href="#why-competitors-fail"
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:block"
          >
            Why Competitors Fail
          </Link>
          <Link
            href="#difference"
            className="hidden text-sm font-medium text-muted-foreground hover:text-foreground sm:block"
          >
            Our Difference
          </Link>
          <Link
            href="#how-it-works"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            How It Works
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Pricing
          </Link>
          <Link
            href="/blog"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Blog
          </Link>
          <Link
            href="/get-started"
            className="text-sm font-medium text-muted-foreground hover:text-foreground"
          >
            Get Started
          </Link>
          {status === "loading" ? (
            <span className="text-sm text-muted-foreground">...</span>
          ) : session ? (
            <>
              <Button asChild variant="outline" size="sm">
                <Link href="/blog/write">+ Write Blog Post</Link>
              </Button>
              <Button asChild variant="ghost" size="sm">
                <Link href="/blog/my-posts">My Posts</Link>
              </Button>
              <Button asChild variant="default" size="sm">
                <Link href="/dashboard">Dashboard</Link>
              </Button>
            </>
          ) : (
            <>
              <Button asChild variant="ghost" size="sm">
                <Link href="/login">Log in</Link>
              </Button>
              <Button asChild variant="yellow" size="sm">
                <Link href="/register">Sign up</Link>
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
