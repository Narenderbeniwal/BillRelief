"use client";

import { motion } from "framer-motion";
import { Shield, Lock, FileCheck2, Trash2 } from "lucide-react";

const items = [
  {
    icon: Shield,
    title: "HIPAA-Aligned Handling",
    description:
      "Sensitive medical billing data is handled with strict access controls and least-privilege workflows.",
  },
  {
    icon: Lock,
    title: "Encrypted In Transit & At Rest",
    description:
      "Data transmission and storage use strong encryption standards to reduce exposure risk.",
  },
  {
    icon: FileCheck2,
    title: "Transparent Documentation",
    description:
      "Every recommendation includes a clear rationale so you can verify actions before proceeding.",
  },
  {
    icon: Trash2,
    title: "Data Retention Controls",
    description:
      "You can request deletion of uploaded documents once your case is complete.",
  },
];

export function SecurityComplianceSection() {
  return (
    <section className="border-t border-gray-200 bg-[#F9FAFB] py-14 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 lg:text-4xl">
            Built for Trust, Security, and Accountability
          </h2>
          <p className="mt-3 text-gray-600">
            Unlike generic negotiation tools, BillRelief is structured for
            medical-billing sensitivity and transparent decision-making.
          </p>
        </div>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-full bg-[#0F4C81]/10">
                <item.icon className="h-5 w-5 text-[#0F4C81]" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{item.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
