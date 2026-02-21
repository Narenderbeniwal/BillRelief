"use client";

import { motion } from "framer-motion";
import { X } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const competitors = [
  {
    name: "Hospital-Only Services",
    tagline: "They're Good, But...",
    issues: [
      "Hospital bills only (no doctors, imaging, labs)",
      "No real-time updates (you wait weeks in the dark)",
      "B2B focused (individuals aren't priority)",
      "No AI analysis (slower manual process)",
    ],
  },
  {
    name: "High-Minimum Services",
    tagline: "Serious Cases Only",
    issues: [
      "$5,000 minimum (ignores 70% of patients)",
      "4-month average timeline (you're drowning by then)",
      "Hidden fees (25–35%, not stated upfront)",
      "No small bill help (where do you go?)",
    ],
  },
  {
    name: "Employer-Only Platforms",
    tagline: "Good Luck Getting Access",
    issues: [
      "Employer-only access (can't sign up directly)",
      "35% fee for individuals (highest in industry)",
      "Opaque pricing (no transparency)",
      "Corporate platform (not built for you)",
    ],
  },
  {
    name: "Income-Limited Programs",
    tagline: "Free, But Are You Poor Enough?",
    issues: [
      "Income limits (family of 4 earning $80K won't qualify)",
      "Charity care only (doesn't negotiate overcharges)",
      "No bill analysis (won't find errors for you)",
      "2–6 month approval (collections don't wait)",
    ],
  },
];

export function WhyCompetitorsFail() {
  return (
    <section id="why-competitors-fail" className="border-t border-gray-200 bg-white py-14 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-2xl font-bold text-gray-900 sm:text-3xl md:text-3xl lg:text-4xl"
        >
          Why Other Services Leave You Stuck With the Bill
        </motion.h2>
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-gray-600">
          Based on common patient complaints: high minimums, long delays, limited
          bill coverage, and unclear pricing terms.
        </p>
        <div className="mt-10 grid gap-4 sm:mt-12 sm:gap-6 sm:grid-cols-2 lg:gap-8 xl:grid-cols-4">
          {competitors.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-xl border border-amber-200 bg-[#FEF3C7]/50 p-5 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-2">
                <div className="h-10 w-10 rounded-full bg-amber-200 flex items-center justify-center text-xs font-bold text-amber-800">
                  {c.name.slice(0, 2)}
                </div>
                <div>
                  <p className="font-bold text-gray-900">{c.name}</p>
                  <p className="text-xs text-gray-600">{c.tagline}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {c.issues.map((issue, j) => (
                  <li key={j} className="flex items-start gap-2 text-sm text-gray-700">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
                    <span>{issue}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="#difference"
                className="mt-4 inline-block text-xs font-medium text-[#0F4C81] hover:underline"
              >
                See full comparison →
              </Link>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="mb-4 text-lg font-medium text-gray-700">
            We Built BillRelief to Fix ALL of These Problems
          </p>
          <Button asChild variant="yellow" size="lg" className="font-bold">
            <Link href="#difference">See How We&apos;re Different →</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
