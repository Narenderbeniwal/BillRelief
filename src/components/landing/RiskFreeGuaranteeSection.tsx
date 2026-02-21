"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CircleDollarSign, BadgeCheck, Timer } from "lucide-react";
import { Button } from "@/components/ui/button";

const guarantees = [
  {
    icon: CircleDollarSign,
    title: "No Savings, No Fee",
    detail: "If we cannot find viable savings opportunities, you owe $0 for negotiation support.",
  },
  {
    icon: BadgeCheck,
    title: "Clear Upfront Pricing",
    detail: "No hidden fees, no surprise percentages, and no unclear post-resolution charges.",
  },
  {
    icon: Timer,
    title: "Fast First Deliverable",
    detail: "Initial analysis arrives quickly so you can act before collections pressure escalates.",
  },
];

export function RiskFreeGuaranteeSection() {
  return (
    <section className="border-t border-gray-200 bg-white py-14 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            A Lower-Risk Alternative to Traditional Services
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-gray-600">
            We remove the biggest trust blockers patients report with other
            bill-reduction providers.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {guarantees.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-gray-200 bg-[#F9FAFB] p-6 shadow-sm"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#10B981]/10">
                <item.icon className="h-5 w-5 text-[#10B981]" />
              </div>
              <h3 className="font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.detail}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <Button asChild variant="yellow" size="lg" className="font-bold">
            <Link href="/get-started">Start Free Risk Check →</Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
