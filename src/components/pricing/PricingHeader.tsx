"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { ImageWithFallback } from "@/components/ui/ImageWithFallback";
import { SECTION_IMAGES } from "@/lib/trustedImages";

export function PricingHeader({ showMonthlyToggle = true }: { showMonthlyToggle?: boolean }) {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      className="text-center"
    >
      <nav className="mb-6 flex items-center justify-center gap-1 text-sm text-muted-foreground" aria-label="Breadcrumb">
        <Link href="/" className="hover:text-foreground">Home</Link>
        <ChevronRight className="h-4 w-4" />
        <span className="text-foreground">Pricing</span>
      </nav>
      <p className="mb-2 text-sm font-medium text-[#0F4C81]">
        Trusted by 10,000+ patients · $22M+ saved
      </p>
      <h1 className="text-4xl font-bold text-gray-900 lg:text-5xl">
        Choose Your Medical Bill Solution
      </h1>
      <p className="mx-auto mt-3 max-w-2xl text-lg text-gray-600">
        From free estimates to full-service negotiation. Pick the support level that fits your needs.
      </p>
      <p className="mx-auto mt-2 max-w-2xl text-sm text-gray-500">
        Transparent fees, clear scope, and secure checkout - so you know exactly what to expect.
      </p>
      <p className="mx-auto mt-4 max-w-xl text-sm italic text-gray-600">
        &quot;BillRelief got my $8,500 surgery bill down to $3,400 in 5 days.&quot; — Marcus Thompson, Dallas
      </p>
      <Link
        href="/#testimonials"
        className="mx-auto mt-2 inline-flex items-center gap-1.5 text-xs font-medium text-[#0F4C81] hover:underline"
      >
        <MessageCircle className="h-3.5 w-3.5" />
        Need help choosing? See patient stories
      </Link>
      <div className="mt-6 flex justify-center gap-4">
        {SECTION_IMAGES.map((img, i) => (
          <div key={i} className="relative h-24 w-36 overflow-hidden rounded-lg border border-gray-200 shadow-sm">
            <ImageWithFallback
              src={img.src}
              alt={img.alt}
              fill
              sizes="144px"
              className="object-cover"
              quality={75}
            />
          </div>
        ))}
      </div>
      {showMonthlyToggle && (
        <div className="mt-6 inline-flex rounded-xl border border-gray-200 bg-white p-1 shadow-sm">
          <button
            type="button"
            className={cn(
              "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
              "bg-[#0F4C81] text-white"
            )}
          >
            Pay-Per-Bill
          </button>
          <button
            type="button"
            className="rounded-lg px-4 py-2 text-sm font-medium text-gray-600 transition-colors hover:text-gray-900"
          >
            Monthly Plans →
          </button>
        </div>
      )}
    </motion.header>
  );
}
