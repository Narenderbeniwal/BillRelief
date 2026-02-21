"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

const checks = [
  "Bill under $5,000? We help.",
  "Middle-income family? We help.",
  "Doctor or hospital bill? We help.",
  "Need it done fast? We help.",
  "Want transparent pricing? We help.",
  "Direct access, no employer needed? We help.",
];

export function FinalCTASection() {
  return (
    <section className="border-t border-gray-200 bg-[#0F4C81] py-14 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-white lg:text-4xl"
        >
          Don&apos;t Let Competitors&apos; Limitations Stop You
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-8 flex flex-wrap justify-center gap-4 text-white"
        >
          {checks.map((c, i) => (
            <span key={i} className="flex items-center gap-2">
              <Check className="h-5 w-5 text-[#FDDA0D]" />
              {c}
            </span>
          ))}
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="mt-10"
        >
          <Button asChild size="lg" variant="yellow" className="text-lg px-10 py-6 font-bold">
            <Link href="/get-started">Get Your Free Analysis (Takes 2 Minutes)</Link>
          </Button>
        </motion.div>
        <p className="mt-4 text-white/90">
          Join 10,000+ patients who chose the better option.
        </p>
        <div className="mx-auto mt-6 max-w-2xl rounded-xl border border-white/20 bg-white/10 p-4 text-sm text-white/90">
          <p className="font-semibold text-white">Your trust guarantees:</p>
          <p className="mt-1">
            Clear pricing before you commit · Secure upload handling · No savings, no fee options
          </p>
        </div>
      </div>
    </section>
  );
}
