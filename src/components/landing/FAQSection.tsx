"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { HOMEPAGE_FAQS } from "@/lib/faqData";

const faqs = HOMEPAGE_FAQS.map((f) => ({ q: f.question, a: f.answer }));

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const col1 = faqs.slice(0, 5);
  const col2 = faqs.slice(5, 10);

  return (
    <section id="faq" className="border-t border-gray-200 bg-[#F9FAFB] py-14 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-2xl font-bold text-gray-900 sm:text-3xl md:text-3xl lg:text-4xl"
        >
          Frequently Asked Questions
        </motion.h2>
        <p className="mx-auto mt-3 max-w-2xl text-center text-gray-600">
          Everything you need to know before you start.
        </p>
        <div className="mx-auto mt-10 grid max-w-5xl gap-4 sm:mt-12 sm:gap-6 md:gap-8 lg:grid-cols-2">
          {[col1, col2].map((column, colIdx) => (
            <div key={colIdx} className="space-y-0">
              {column.map((faq, i) => {
                const globalIndex = colIdx * 5 + i;
                const isOpen = openIndex === globalIndex;
                return (
                  <motion.div
                    key={globalIndex}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: (colIdx * 5 + i) * 0.03 }}
                    className="border-b border-gray-200 last:border-b-0"
                  >
                    <button
                      type="button"
                      onClick={() => setOpenIndex(isOpen ? null : globalIndex)}
                      className="flex min-h-[48px] w-full items-center justify-between gap-4 py-5 text-left transition-colors hover:bg-gray-50/80"
                    >
                      <span className="font-semibold text-gray-900">{faq.q}</span>
                      <span className="shrink-0 text-[#0F4C81]">
                        {isOpen ? (
                          <Minus className="h-5 w-5" />
                        ) : (
                          <Plus className="h-5 w-5" />
                        )}
                      </span>
                    </button>
                    <AnimatePresence initial={false}>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.25 }}
                          className="overflow-hidden"
                        >
                          <p className="pb-5 pr-10 text-sm leading-relaxed text-gray-600">
                            {faq.a}
                          </p>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
