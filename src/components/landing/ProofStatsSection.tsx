"use client";

import { motion } from "framer-motion";
import { CheckCircle2, TrendingDown, Clock3, Wallet } from "lucide-react";

const stats = [
  {
    icon: Wallet,
    value: "$22M+",
    label: "Total patient savings negotiated",
    note: "Across 10,000+ reviewed bills",
  },
  {
    icon: TrendingDown,
    value: "42% Avg",
    label: "Average reduction per bill",
    note: "After AI + expert validation",
  },
  {
    icon: Clock3,
    value: "48 Hours",
    label: "Typical analysis delivery time",
    note: "Priority queue available",
  },
  {
    icon: CheckCircle2,
    value: "91%",
    label: "Successful resolution outcomes",
    note: "For qualified negotiation cases",
  },
];

export function ProofStatsSection() {
  return (
    <section className="border-t border-gray-200 bg-white py-20">
      <div className="container mx-auto px-4">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            Proof You Can Trust, Not Just Promises
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            We publish outcome-focused metrics so you can evaluate us with the
            same rigor you use for your finances.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07 }}
              className="rounded-2xl border border-gray-200 bg-[#F9FAFB] p-6 shadow-sm"
            >
              <div className="mb-3 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0F4C81]/10">
                <stat.icon className="h-5 w-5 text-[#0F4C81]" />
              </div>
              <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              <p className="mt-1 text-sm font-medium text-gray-700">{stat.label}</p>
              <p className="mt-2 text-xs text-gray-500">{stat.note}</p>
            </motion.div>
          ))}
        </div>
        <p className="mt-6 text-center text-xs text-gray-500">
          Metrics updated monthly from resolved case records.
        </p>
      </div>
    </section>
  );
}
