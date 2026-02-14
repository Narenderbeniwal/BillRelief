"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { faqs } from "@/lib/pricingData";
import { cn } from "@/lib/utils";

export function PricingFAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="mt-20" aria-labelledby="pricing-faq-heading">
      <h2 id="pricing-faq-heading" className="mb-8 text-center text-2xl font-bold text-gray-900">
        Frequently Asked Questions
      </h2>
      <p className="mb-6 text-center text-sm text-gray-500">
        Still have questions? <a href="/#how-it-works" className="font-medium text-[#0F4C81] hover:underline">See how it works</a> or start a free estimate.
      </p>
      <div className="mx-auto max-w-2xl space-y-2">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="rounded-xl border border-gray-200 bg-white overflow-hidden shadow-sm"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(openIndex === i ? null : i)}
              className="flex w-full items-center justify-between px-4 py-4 text-left text-sm font-medium text-gray-900 hover:bg-gray-50"
            >
              <span>{faq.q}</span>
              <ChevronDown className={cn("h-4 w-4 shrink-0 transition-transform", openIndex === i && "rotate-180")} />
            </button>
            <AnimatePresence>
              {openIndex === i && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  className="border-t border-gray-100"
                >
                  <p className="px-4 py-3 text-sm text-gray-600">{faq.a}</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        ))}
      </div>
    </section>
  );
}
