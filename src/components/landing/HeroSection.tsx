"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Check, ShieldCheck, BadgeDollarSign, Users, ArrowRight, CircleDollarSign } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CompetitorComparisonCard } from "./CompetitorComparisonCard";
import { InteractiveSavingsCalculator } from "./InteractiveSavingsCalculator";

export function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-[#F9FAFB]">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="grid min-h-screen items-center gap-12 py-16 lg:grid-cols-2 lg:gap-16">
          {/* Left column */}
          <div className="flex flex-col">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border border-amber-300 bg-[#FEF3C7] px-4 py-2 text-sm font-bold text-[#0F4C81]"
            >
              <span className="flex h-2 w-2 animate-pulse rounded-full bg-amber-500" />
              <Zap className="h-4 w-4" />
              48-HOUR RESULTS · AI-POWERED · $500 MINIMUM
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl font-bold leading-tight tracking-tight text-gray-900 lg:text-6xl"
            >
              <span className="bg-gradient-to-r from-[#0F4C81] to-[#1e5a9e] bg-clip-text text-transparent">
                Medical Bill Relief
              </span>
              <br />
              In 48 Hours, Not 4 Months
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-4 text-lg text-gray-600 lg:text-2xl lg:leading-snug"
            >
              Most services are slow, opaque, and limited. We combine AI speed with
              expert review so you get a clear, defensible bill-reduction strategy in 48 hours.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="mt-6 flex flex-wrap items-center gap-4 text-sm text-gray-600"
            >
              {[
                "10,000+ Bills Reduced",
                "$22M+ Saved",
                "4.9/5 Rating",
                "HIPAA Secure",
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-1.5">
                  <Check className="h-4 w-4 text-[#10B981]" />
                  {item}
                </span>
              ))}
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center"
            >
              <Button asChild size="lg" variant="yellow" className="font-bold text-base shadow-md">
                <Link href="/get-started" className="flex items-center gap-2">
                  Start Free Bill Check
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="border-[#0F4C81] text-[#0F4C81] hover:bg-[#0F4C81]/10">
                <Link href="/pricing">See Plans & Pricing</Link>
              </Button>
              <Link
                href="#how-it-works"
                className="inline-flex items-center gap-1 text-sm font-medium text-[#0F4C81] hover:underline"
              >
                How it works
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45 }}
              className="mt-4 flex flex-wrap items-center gap-3 text-sm text-gray-500"
            >
              <span className="flex items-center gap-1"><Check className="h-4 w-4 text-[#10B981]" /> No upfront payment</span>
              <span className="flex items-center gap-1"><Check className="h-4 w-4 text-[#10B981]" /> Only pay if we save you money</span>
              <span className="flex items-center gap-1"><Check className="h-4 w-4 text-[#10B981]" /> Average savings: $4,200</span>
            </motion.p>
            <p className="mt-2 inline-flex w-fit items-center gap-2 rounded-full bg-white px-3 py-1 text-xs font-medium text-gray-600 ring-1 ring-gray-200">
              <CircleDollarSign className="h-3.5 w-3.5 text-[#10B981]" />
              No credit card required to start
            </p>
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="mt-5 grid gap-2 rounded-xl border border-gray-200 bg-white p-4 text-sm text-gray-700 sm:grid-cols-3"
            >
              <span className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-[#0F4C81]" />
                Secure document handling
              </span>
              <span className="flex items-center gap-2">
                <Users className="h-4 w-4 text-[#0F4C81]" />
                Human-reviewed recommendations
              </span>
              <span className="flex items-center gap-2">
                <BadgeDollarSign className="h-4 w-4 text-[#0F4C81]" />
                Transparent fee terms
              </span>
            </motion.div>
          </div>

          {/* Right column */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="flex flex-col gap-6"
          >
            <CompetitorComparisonCard />
            <InteractiveSavingsCalculator />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
