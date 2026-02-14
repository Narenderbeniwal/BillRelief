"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { comparisonRows } from "@/lib/pricingData";
import { cn } from "@/lib/utils";

export function ComparisonTable() {
  const [open, setOpen] = useState(true);

  return (
    <section className="mt-20" aria-labelledby="compare-heading">
      <h2 id="compare-heading" className="sr-only">Compare all features</h2>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-200 bg-white py-4 text-sm font-medium text-gray-700 shadow-sm transition-colors hover:bg-gray-50"
        aria-expanded={open}
      >
        {open ? "Hide" : "Compare"} All Features
        <ChevronDown className={cn("h-4 w-4 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="mt-4 overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
              <table className="w-full min-w-[640px] text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 bg-gray-50">
                    <th className="px-4 py-3 font-semibold text-gray-700">Feature</th>
                    <th className="px-4 py-3 font-semibold text-gray-700">Free</th>
                    <th className="px-4 py-3 font-semibold text-[#0F4C81]">AI Pro</th>
                    <th className="px-4 py-3 font-semibold text-amber-700">Expert</th>
                    <th className="px-4 py-3 font-semibold text-[#10B981]">Done-For-You</th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map((row, i) => (
                    <tr key={row.feature} className={cn("border-b border-gray-100", i % 2 === 0 && "bg-gray-50/50")}>
                      <td className="px-4 py-3 font-medium text-gray-900">{row.feature}</td>
                      <td className="px-4 py-3 text-gray-600">{row.free}</td>
                      <td className="px-4 py-3 text-gray-600">{row.aiPro}</td>
                      <td className="px-4 py-3 text-gray-600">{row.expert}</td>
                      <td className="px-4 py-3 text-gray-600">{row.doneForYou}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
