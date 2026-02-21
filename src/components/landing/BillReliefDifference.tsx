"use client";

import { motion } from "framer-motion";
import { Zap, DollarSign, Target } from "lucide-react";
import { ComparisonMatrix } from "./ComparisonMatrix";

const highlights = [
  {
    icon: Zap,
    title: "Speed",
    items: [
      "48-hour AI analysis (Not 4 months)",
      "Live case tracking",
      "Real-time chat support",
      "Instant AI estimates",
    ],
  },
  {
    icon: DollarSign,
    title: "Affordability",
    items: [
      "$500 minimum (not $5K)",
      "25% fee or flat rate (Not 35%)",
      "Clear pricing upfront",
      "Only pay if we save you",
    ],
  },
  {
    icon: Target,
    title: "Accessibility",
    items: [
      "Sign up instantly (No employer needed)",
      "All bill types",
      "Doctor, hospital, lab",
      "Any income level",
    ],
  },
];

export function BillReliefDifference() {
  return (
    <section id="difference" className="border-t border-gray-200 bg-[#F9FAFB] py-14 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-2xl font-bold text-gray-900 sm:text-3xl md:text-3xl lg:text-4xl"
        >
          How BillRelief Solves Every Problem
        </motion.h2>
        <p className="mx-auto mt-3 max-w-3xl text-center text-sm text-gray-600">
          Direct side-by-side comparison on speed, scope, transparency, and outcome quality.
        </p>
        <div className="mt-12">
          <ComparisonMatrix />
        </div>
        <div className="mt-12 grid gap-6 sm:mt-14 md:mt-16 md:grid-cols-3 md:gap-8">
          {highlights.map((h, i) => (
            <motion.div
              key={h.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#0F4C81]/10">
                <h.icon className="h-6 w-6 text-[#0F4C81]" />
              </div>
              <h3 className="mb-3 text-lg font-bold text-gray-900">{h.title}</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                {h.items.map((item, j) => (
                  <li key={j} className="flex items-start gap-2">
                    <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-[#10B981]" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
