"use client";

import { motion } from "framer-motion";
import { Check, Star, ExternalLink } from "lucide-react";
import Image from "next/image";
import { TESTIMONIALS, formatTestimonialResult } from "@/lib/testimonialData";

export function TestimonialWithCompetitorCallout() {
  return (
    <section id="testimonials" className="border-t border-gray-200 bg-white py-14 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-bold text-gray-900 lg:text-4xl"
        >
          Real People Who Chose the Better Option
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-3 text-center text-gray-600"
        >
          Verified savings · Specific results · 4.9/5 from 1,200+ reviews
        </motion.p>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {TESTIMONIALS.map((t, i) => {
            const savingsPct =
              t.afterAmount === 0
                ? 100
                : Math.round((1 - t.afterAmount / t.beforeAmount) * 100);
            return (
              <motion.article
                key={`${t.author}-${t.beforeAmount}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: Math.min(i * 0.08, 0.5) }}
                className="flex flex-col rounded-xl border border-gray-200 bg-[#F9FAFB] p-6 shadow-sm"
              >
                <div className="mb-4 flex items-start gap-4">
                  <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-full border-2 border-[#0F4C81]/20">
                    <Image
                      src={t.photo}
                      alt={t.author}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-gray-900">{t.author}</p>
                    <p className="text-sm text-gray-500">{t.location}</p>
                    <p className="text-xs font-medium text-[#0F4C81]">{t.billType}</p>
                  </div>
                </div>

                <div className="mb-3 flex items-center gap-1 text-amber-500">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star key={idx} className="h-4 w-4 fill-current" />
                  ))}
                  <span className="ml-1 text-sm font-medium text-gray-600">5/5</span>
                </div>

                <p className="mb-4 flex-1 text-gray-800">&quot;{t.quote}&quot;</p>

                <div className="space-y-1 border-t border-gray-200 pt-4 text-sm">
                  <p className="font-semibold text-gray-900">
                    {formatTestimonialResult(t)}
                  </p>
                  <p className="text-gray-500">
                    Resolution time: {t.resolutionDays} day{t.resolutionDays !== 1 ? "s" : ""} · {t.date}
                  </p>
                  {t.caseManager && (
                    <p className="text-xs text-gray-500">
                      Case manager: {t.caseManager}
                    </p>
                  )}
                </div>

                <div className="mt-4 flex flex-wrap items-center gap-2">
                  {t.verified && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-[#10B981]/10 px-2 py-1 text-xs font-medium text-[#10B981]">
                      <Check className="h-3 w-3" /> Verified Purchase
                    </span>
                  )}
                  <span className="inline-flex items-center gap-1 text-xs text-amber-600">
                    <Star className="h-3.5 w-3.5 fill-current" /> 5/5
                  </span>
                  <a
                    href="#testimonials"
                    className="inline-flex items-center gap-1 text-xs font-medium text-[#0F4C81] hover:underline"
                  >
                    View on Google Reviews
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
              </motion.article>
            );
          })}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-10 flex flex-wrap items-center justify-center gap-6 text-sm text-gray-500"
        >
          <span className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
            4.9/5 Google
          </span>
          <span>Trustpilot reviews</span>
          <span>BBB accredited (when available)</span>
        </motion.div>
      </div>
    </section>
  );
}
