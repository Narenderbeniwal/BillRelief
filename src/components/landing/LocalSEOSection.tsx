"use client";

import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function LocalSEOSection() {
  const city = "Austin";
  const state = "Texas";

  return (
    <section id="local" className="border-t border-gray-200 bg-[#F9FAFB] py-14 sm:py-16 md:py-20">
      <div className="container mx-auto px-4 sm:px-6 md:px-6 lg:px-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-bold text-gray-900 lg:text-4xl"
        >
          Serving Your Community
        </motion.h2>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mx-auto mt-10 max-w-2xl rounded-2xl border border-gray-200 bg-white p-6 shadow-sm lg:p-8"
        >
          <h3 className="text-xl font-bold text-gray-900">
            Medical Bill Help in {city}, {state}
          </h3>
          <p className="mt-3 text-gray-600">
            Unlike national companies that treat you like a number, we understand local healthcare costs.
          </p>
          <ul className="mt-4 space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0F4C81]" />
              <span><strong>Average ER visit in {city}:</strong> $2,400 — we&apos;ve saved Austin families $1.2M</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0F4C81]" />
              <span><strong>Top billing errors:</strong> Duplicate facility fees, upcoded visits</span>
            </li>
            <li className="flex items-start gap-2">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[#0F4C81]" />
              <span><strong>Local hospitals we work with:</strong> Dell Seton, St. David&apos;s</span>
            </li>
          </ul>
          <Button asChild variant="yellow" size="lg" className="mt-6 font-bold">
            <Link href="/get-started">Get Local Help in {city} →</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
