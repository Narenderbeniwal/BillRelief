"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

export function StickyMobileCTA() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 border-t bg-white/95 p-3 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] backdrop-blur sm:hidden">
      <p className="mb-2 text-center text-[11px] font-medium text-gray-600">
        HIPAA-aligned · No hidden fees · Trusted by 10,000+ patients
      </p>
      <Button asChild size="lg" variant="yellow" className="w-full font-bold">
        <Link href="/get-started">Get Free Analysis</Link>
      </Button>
    </div>
  );
}
