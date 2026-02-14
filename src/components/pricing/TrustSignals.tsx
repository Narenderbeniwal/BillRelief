"use client";

import { motion } from "framer-motion";
import { Shield, Star, Lock, CreditCard } from "lucide-react";

const items = [
  {
    icon: Shield,
    title: "Money-Back Guarantee",
    description: "If we don't find savings, we refund 100%",
  },
  {
    icon: Star,
    title: "4.9/5 Rating",
    description: "10,000+ happy customers",
  },
  {
    icon: Lock,
    title: "HIPAA Secure",
    description: "Bank-level encryption",
  },
  {
    icon: CreditCard,
    title: "Secure PayPal Checkout",
    description: "Protected payment processing",
  },
];

export function TrustSignals() {
  return (
    <section className="mt-20 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
      {items.map((item, i) => (
        <motion.div
          key={item.title}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: i * 0.1 }}
          className="flex flex-col items-center rounded-xl border border-gray-200 bg-white p-6 text-center shadow-sm"
        >
          <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#0F4C81]/10">
            <item.icon className="h-6 w-6 text-[#0F4C81]" />
          </div>
          <h3 className="font-semibold text-gray-900">{item.title}</h3>
          <p className="mt-1 text-sm text-gray-600">{item.description}</p>
        </motion.div>
      ))}
    </section>
  );
}
