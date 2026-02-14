"use client";

import { motion } from "framer-motion";
import { Check, Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "I tried another service first. Waited 3 months, no results. BillRelief got me a 58% reduction in 5 days.",
    author: "Marcus T.",
    location: "Dallas",
    result: "$8,500 surgery bill → $3,400",
    turnaround: "5 days",
    verified: true,
  },
  {
    quote:
      "Another service said they don't handle doctor bills. BillRelief negotiated my anesthesiologist bill and saved me $2,200.",
    author: "Jennifer K.",
    location: "Phoenix",
    result: "$4,800 bill → $2,600",
    turnaround: "3 days",
    verified: true,
  },
  {
    quote:
      "We make $95K/year — too much for income-based programs, too little to pay $12K in medical bills. BillRelief was our only hope.",
    author: "The Rodriguez Family",
    location: "Miami",
    result: "$12,000 → $4,500",
    turnaround: "7 days",
    verified: true,
  },
];

export function TestimonialWithCompetitorCallout() {
  return (
    <section id="testimonials" className="border-t border-gray-200 bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-bold text-gray-900 lg:text-4xl"
        >
          Real People Who Chose the Better Option
        </motion.h2>
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.author}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="rounded-xl border border-gray-200 bg-[#F9FAFB] p-6 shadow-sm"
            >
              <div className="mb-3 flex items-center gap-1 text-amber-500">
                {Array.from({ length: 5 }).map((_, idx) => (
                  <Star key={idx} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <p className="text-gray-800">&quot;{t.quote}&quot;</p>
              <div className="mt-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">— {t.author}</p>
                  <p className="text-sm text-gray-500">{t.location}, {t.result}</p>
                  <p className="text-xs text-gray-500">Turnaround: {t.turnaround}</p>
                </div>
                {t.verified && (
                  <span className="flex items-center gap-1 rounded-full bg-[#10B981]/10 px-2 py-1 text-xs font-medium text-[#10B981]">
                    <Check className="h-3 w-3" /> Verified
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
