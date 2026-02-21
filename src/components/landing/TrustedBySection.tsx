"use client";

import { motion } from "framer-motion";

const logos = [
  "Regional Clinics",
  "Patient Advocates",
  "Family Practices",
  "Independent Specialists",
  "Community Networks",
];

export function TrustedBySection() {
  return (
    <section className="bg-[#F9FAFB] py-10">
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
        <motion.p
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-xs font-semibold uppercase tracking-wider text-gray-500"
        >
          Trusted by patients referred from
        </motion.p>
        <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {logos.map((logo, i) => (
            <motion.div
              key={logo}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="rounded-xl border border-gray-200 bg-white px-3 py-4 text-center text-sm font-semibold text-gray-700 shadow-sm"
            >
              {logo}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
