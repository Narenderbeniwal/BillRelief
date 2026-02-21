"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

const faqs: { q: string; a: string }[] = [
  {
    q: "How much does it cost?",
    a: "$0 upfront. For Done-For-You service, we only charge 25% of savings (or $499 flat fee, whichever is lower). AI Analysis Pro is $99 one-time.",
  },
  {
    q: "What if you don't find savings?",
    a: "You pay $0. 100% risk-free. If our AI analysis doesn't find viable savings opportunities, you owe nothing.",
  },
  {
    q: "How long does it take?",
    a: "AI analysis: 48 hours. Full negotiation: 7-14 days average (vs. competitors' 3-6 months).",
  },
  {
    q: "What types of bills do you handle?",
    a: "ALL medical bills: hospital, doctor, emergency room, lab tests, imaging (MRI, CT, X-ray), ambulance, physical therapy, and more.",
  },
  {
    q: "Is my data secure?",
    a: "Yes. We're HIPAA-compliant with 256-bit encryption, secure cloud storage, and strict access controls. We never sell your data.",
  },
  {
    q: "Can I negotiate myself with your analysis?",
    a: "Yes! Our $99 AI Analysis Pro includes a complete DIY negotiation toolkit with templates, scripts, and step-by-step guidance.",
  },
  {
    q: "Will negotiating hurt my credit?",
    a: "No. Medical providers don't report to credit bureaus unless they send your bill to collections (typically after 90-180 days). Negotiating before collections protects your credit.",
  },
  {
    q: "What's your success rate?",
    a: "91% of qualified cases result in bill reductions. Average savings: 30-70% off original bill. We find errors in 80% of bills we review.",
  },
  {
    q: "Do you work with all hospitals and providers?",
    a: "Yes. Our negotiation strategies work with any medical provider in the United States. We have experience with 500+ hospital systems nationwide.",
  },
  {
    q: "Can you help if my bill is already in collections?",
    a: "Yes! We have a 91% success rate negotiating collection debts. Collectors often accept 20-50% of the original amount.",
  },
];

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
