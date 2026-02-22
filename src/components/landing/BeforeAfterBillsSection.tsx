"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, FileText, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";

/** Stylized before/after bill visuals (anonymized). Creates FOMO and shows active business. */
export function BeforeAfterBillsSection() {
  return (
    <section className="border-t border-gray-200 bg-white py-14 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
            Real Bills. Real Savings.
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-gray-600">
            See what we find and fix. Anonymized examples from recent cases.
          </p>
        </motion.div>

        <div className="mx-auto mt-10 grid max-w-4xl gap-6 sm:mt-12 md:grid-cols-2 md:gap-8">
          {/* Original bill (errors visible) */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="relative"
          >
            <div className="rounded-xl border-2 border-red-200 bg-red-50/50 p-4 shadow-lg sm:p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-red-700">
                <FileText className="h-4 w-4" />
                Original bill (before BillRelief)
              </div>
              <div className="rounded-lg bg-white p-3 font-mono text-sm shadow-inner">
                <div className="space-y-1.5 text-gray-600">
                  <div className="flex justify-between">
                    <span>Facility fee</span>
                    <span>$4,200</span>
                  </div>
                  <div className="flex justify-between text-red-600 line-through">
                    <span>Duplicate surgical supplies</span>
                    <span>$1,200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lab work</span>
                    <span>$980</span>
                  </div>
                  <div className="flex justify-between text-red-600 line-through">
                    <span>Unbundled imaging</span>
                    <span>$890</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Physician services</span>
                    <span>$3,230</span>
                  </div>
                  <div className="flex justify-between text-red-600 line-through">
                    <span>Pharmacy (duplicate)</span>
                    <span>$200</span>
                  </div>
                  <div className="flex justify-between border-t border-gray-200 pt-2 font-bold text-gray-900">
                    <span>Total due</span>
                    <span className="rounded bg-amber-200 px-2 py-0.5 text-red-700 ring-1 ring-amber-400">
                      $12,500
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-xs text-red-700/80">Errors crossed out above</p>
            </div>
          </motion.div>

          {/* After negotiation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-xl border-2 border-[#10B981]/40 bg-[#10B981]/5 p-4 shadow-lg sm:p-5">
              <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-[#0F4C81]">
                <CheckCircle2 className="h-4 w-4 text-[#10B981]" />
                After BillRelief negotiation
              </div>
              <div className="rounded-lg bg-white p-3 font-mono text-sm shadow-inner ring-2 ring-[#10B981]/30">
                <div className="space-y-1.5 text-gray-600">
                  <div className="flex justify-between">
                    <span>Facility fee (adjusted)</span>
                    <span>$2,100</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Lab work</span>
                    <span>$980</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Physician services (negotiated)</span>
                    <span>$1,670</span>
                  </div>
                  <div className="border-t border-gray-200 pt-2">
                    <div className="flex justify-between font-bold text-gray-900">
                      <span>Final amount due</span>
                      <span className="rounded bg-[#10B981]/20 px-2 py-1 text-[#10B981] ring-2 ring-[#10B981]">
                        $4,750
                      </span>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-2 text-xs text-[#0F4C81]">Final amount circled · You save $7,750 (62%)</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
        >
          <Button asChild variant="yellow" size="lg" className="font-bold">
            <Link href="/get-started" className="inline-flex items-center gap-2">
              Get my bill reviewed
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Link
            href="/case-studies"
            className="text-sm font-medium text-[#0F4C81] hover:underline"
          >
            Read full case studies →
          </Link>
        </motion.div>

        <p className="mt-6 text-center text-xs text-gray-500">
          Anonymized example. Your results may vary. 91% of qualified cases see reductions.
        </p>
      </div>
    </section>
  );
}
