"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus, Search } from "lucide-react";
import { FAQ_CATEGORIES, HOMEPAGE_FAQS } from "@/lib/faqData";

function normalize(s: string) {
  return s.toLowerCase().trim();
}

function matchesQuery(question: string, answer: string, query: string) {
  if (!query) return true;
  const q = normalize(query);
  return normalize(question).includes(q) || normalize(answer).includes(q);
}

export function FAQSection() {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCategories = useMemo(() => {
    if (!searchQuery.trim())
      return FAQ_CATEGORIES.map((cat) => ({ ...cat, faqs: cat.faqs }));
    const q = searchQuery.trim();
    return FAQ_CATEGORIES.map((cat) => ({
      ...cat,
      faqs: cat.faqs.filter((f) => matchesQuery(f.question, f.answer, q)),
    })).filter((cat) => cat.faqs.length > 0);
  }, [searchQuery]);

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
          Everything you need to know before you start. {HOMEPAGE_FAQS.length} questions across {FAQ_CATEGORIES.length} categories.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-6 max-w-xl"
        >
          <label htmlFor="faq-search" className="sr-only">
            Search FAQs
          </label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              id="faq-search"
              type="search"
              placeholder="Search questions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-lg border border-gray-200 bg-white py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-[#0F4C81] focus:outline-none focus:ring-1 focus:ring-[#0F4C81]"
            />
          </div>
        </motion.div>

        <div className="mx-auto mt-10 max-w-3xl space-y-10 sm:mt-12">
          {filteredCategories.map((category, catIdx) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: catIdx * 0.05 }}
            >
              <h3 className="mb-3 text-lg font-bold text-[#0F4C81] sm:text-xl">
                {category.title}
              </h3>
              <div className="space-y-0 rounded-xl border border-gray-200 bg-white shadow-sm overflow-hidden">
                {category.faqs.map((faq, i) => {
                  const key = `${category.id}-${i}`;
                  const isOpen = openKey === key;
                  return (
                    <div
                      key={key}
                      className="border-b border-gray-100 last:border-b-0"
                    >
                      <button
                        type="button"
                        onClick={() => setOpenKey(isOpen ? null : key)}
                        className="flex min-h-[52px] w-full items-center justify-between gap-4 py-4 px-4 text-left transition-colors hover:bg-gray-50/80 sm:px-5"
                      >
                        <span className="font-semibold text-gray-900">
                          {faq.question}
                        </span>
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
                            <p className="border-t border-gray-100 px-4 pb-4 pt-0 text-sm leading-relaxed text-gray-600 sm:px-5">
                              {faq.answer}
                            </p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          ))}
        </div>

        {filteredCategories.length === 0 && (
          <p className="mx-auto mt-8 max-w-md text-center text-gray-500">
            No FAQs match your search. Try a different phrase or browse all categories above.
          </p>
        )}
      </div>
    </section>
  );
}
