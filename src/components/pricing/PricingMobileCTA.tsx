"use client";

import Link from "next/link";

export function PricingMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t border-gray-200 bg-white/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <div className="flex gap-2">
        <Link
          href="/get-started"
          className="flex-1 rounded-xl border border-[#0F4C81] bg-white py-3 text-center text-sm font-semibold text-[#0F4C81]"
        >
          Free estimate
        </Link>
        <Link
          href="/checkout?tier=ai-pro"
          className="flex-1 rounded-xl bg-[#FDDA0D] py-3 text-center text-sm font-bold text-[#0F4C81]"
        >
          Most popular $99
        </Link>
      </div>
    </div>
  );
}
