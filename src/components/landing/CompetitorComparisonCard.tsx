"use client";

import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const rows = [
  { them: "3–8 months to resolve", us: "48-hour AI analysis" },
  { them: "$5,000 minimum bill", us: "$500+ bills accepted" },
  { them: "Hospital bills only", us: "ALL medical bills" },
  { them: "Hidden 30–35% fees", us: "Clear 25% or flat fee" },
  { them: "No real-time updates", us: "Live case tracking" },
  { them: "Generic service", us: "AI + human experts" },
];

export function CompetitorComparisonCard() {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.2 }}
      className="rounded-2xl border border-[#0F4C81]/20 bg-white p-5 shadow-xl"
    >
      <div className="mb-4 grid grid-cols-2 gap-2 text-center text-sm font-bold">
        <span className="text-gray-500">Traditional services</span>
        <span className="text-[#0F4C81]">BillRelief</span>
      </div>
      <div className="space-y-3">
        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-2 gap-2 border-b border-gray-100 pb-3 last:border-0 last:pb-0">
            <div className="flex items-start gap-2 text-xs text-gray-600">
              <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500" />
              <span>{row.them}</span>
            </div>
            <div className="flex items-start gap-2 text-xs font-medium text-[#0F4C81]">
              <Check className="mt-0.5 h-4 w-4 shrink-0 text-[#10B981]" />
              <span>{row.us}</span>
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
