"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";

export function PricingPageHeader() {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-[#0A0E27]/95 backdrop-blur">
      <div className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link href="/" className="text-xl font-bold text-white">
          BillRelief
        </Link>
        <nav className="flex items-center gap-4">
          <Link href="/" className="text-sm font-medium text-gray-400 hover:text-white">
            Home
          </Link>
          <Link href="/get-started" className="text-sm font-medium text-gray-400 hover:text-white">
            Get Started
          </Link>
          {status === "loading" ? (
            <span className="text-sm text-gray-400">...</span>
          ) : session ? (
            <Link
              href="/dashboard"
              className="rounded-lg bg-white/10 px-3 py-2 text-sm font-medium text-white hover:bg-white/20"
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium text-gray-400 hover:text-white">
                Log in
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-cyan-500 px-3 py-2 text-sm font-medium text-white hover:bg-cyan-400"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
