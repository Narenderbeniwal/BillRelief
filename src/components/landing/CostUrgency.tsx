"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

const BULLETS = [
  "Collections fees increase 15–25%",
  "Credit score risk grows",
  "Negotiating leverage decreases",
];

export interface CostUrgencyProps {
  /** "compact" for below hero CTA; "default" for standalone section */
  variant?: "compact" | "default";
  /** Show CTA button (e.g. on get-started page) */
  showCta?: boolean;
}

export function CostUrgency({ variant = "default", showCta = false }: CostUrgencyProps) {
  const isCompact = variant === "compact";

  const content = (
    <>
      <p className="font-semibold text-gray-900">
        <span className="mr-1.5" aria-hidden>💰</span>
        Every day you wait:
      </p>
      <ul className="mt-1.5 list-inside list-disc space-y-0.5 text-gray-700">
        {BULLETS.map((text, i) => (
          <li key={i}>{text}</li>
        ))}
      </ul>
      <p className="mt-2 font-semibold text-[#0F4C81]">
        Act now before it&apos;s too late.
      </p>
      {isCompact && showCta && (
        <Link
          href="/get-started"
          className="mt-3 inline-flex items-center rounded-lg bg-[#0F4C81] px-4 py-2 text-sm font-bold text-white hover:bg-[#0F4C81]/90"
        >
          Start free bill check
        </Link>
      )}
    </>
  );

  if (isCompact) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 6 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="cost-urgency mt-4 rounded-xl border border-amber-200 bg-amber-50/80 px-4 py-3 text-sm text-gray-800"
      >
        {content}
      </motion.div>
    );
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="cost-urgency border-y border-amber-200/80 bg-amber-50/60 py-6 sm:py-8"
      aria-label="Why act now"
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
        <div className="mx-auto flex max-w-2xl flex-col sm:flex-row sm:items-start sm:justify-between sm:gap-6">
          <div className="flex items-start gap-3">
            <AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
            <div>{content}</div>
          </div>
          {showCta && (
            <Link
              href="/get-started"
              className="mt-4 shrink-0 rounded-lg bg-[#0F4C81] px-5 py-2.5 text-sm font-bold text-white hover:bg-[#0F4C81]/90 sm:mt-0"
            >
              Start free bill check
            </Link>
          )}
        </div>
      </div>
    </motion.section>
  );
}
