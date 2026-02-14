"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

const matrix: { feature: string; goodbill: string; resolve: string; copatient: string; billrelief: boolean | string }[] = [
  { feature: "Bill Minimum", goodbill: "Varies", resolve: "$5,000", copatient: "Varies", billrelief: "$500" },
  { feature: "Timeline", goodbill: "2–4 wks", resolve: "4 mos", copatient: "Varies", billrelief: "48 hrs" },
  { feature: "AI Analysis", goodbill: "—", resolve: "—", copatient: "—", billrelief: true },
  { feature: "All Bill Types", goodbill: "—", resolve: "✓", copatient: "✓", billrelief: true },
  { feature: "Real-time Updates", goodbill: "—", resolve: "—", copatient: "—", billrelief: true },
  { feature: "Transparent Pricing", goodbill: "✓", resolve: "—", copatient: "—", billrelief: true },
  { feature: "Direct Access", goodbill: "✓", resolve: "✓", copatient: "—", billrelief: true },
  { feature: "Credit Repair", goodbill: "—", resolve: "—", copatient: "—", billrelief: true },
  { feature: "Subscription Plans", goodbill: "—", resolve: "—", copatient: "—", billrelief: true },
];

const headers = ["Feature", "Hospital-Only", "High-Minimum", "Employer-Only", "BillRelief"];

export function ComparisonMatrix() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm"
    >
      <table className="w-full min-w-[600px] text-left text-sm">
        <thead>
          <tr className="border-b border-gray-200 bg-gray-50">
            {headers.map((h, i) => (
              <th
                key={h}
                className={`px-4 py-3 font-semibold ${i === headers.length - 1 ? "bg-[#0F4C81]/10 text-[#0F4C81]" : "text-gray-700"}`}
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={row.feature} className={i % 2 === 0 ? "bg-white" : "bg-gray-50/50"}>
              <td className="px-4 py-3 font-medium text-gray-900">{row.feature}</td>
              <td className="px-4 py-3 text-gray-600">{row.goodbill}</td>
              <td className="px-4 py-3 text-gray-600">{row.resolve}</td>
              <td className="px-4 py-3 text-gray-600">{row.copatient}</td>
              <td className="px-4 py-3">
                {row.billrelief === true ? (
                  <Check className="h-5 w-5 text-[#10B981]" />
                ) : typeof row.billrelief === "string" ? (
                  <span className="font-medium text-[#10B981]">✓ {row.billrelief}</span>
                ) : (
                  <X className="h-5 w-5 text-gray-300" />
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  );
}
