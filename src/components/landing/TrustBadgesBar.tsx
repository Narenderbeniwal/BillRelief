"use client";

import { motion } from "framer-motion";
import { ShieldCheck, Lock, BadgeCheck, Clock3, HandCoins } from "lucide-react";

const badges = [
  { icon: ShieldCheck, label: "HIPAA-Compliant Workflow" },
  { icon: Lock, label: "256-bit Encrypted Data" },
  { icon: BadgeCheck, label: "4.9/5 Verified Patient Rating" },
  { icon: Clock3, label: "48-Hour Analysis Promise" },
  { icon: HandCoins, label: "No Savings, No Fee Model" },
];

export function TrustBadgesBar() {
  return (
    <section className="border-y border-gray-200 bg-white py-4">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {badges.map((badge, i) => (
            <motion.div
              key={badge.label}
              initial={{ opacity: 0, y: 6 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="inline-flex items-center gap-2 rounded-full border border-gray-200 bg-[#F9FAFB] px-3 py-1.5 text-xs font-medium text-gray-700 sm:text-sm"
            >
              <badge.icon className="h-4 w-4 text-[#0F4C81]" />
              <span>{badge.label}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
