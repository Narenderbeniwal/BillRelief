"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const tabs = [
  { id: "small-bills", label: "Small Bills ($500–$5K)" },
  { id: "middle-income", label: "Middle-Income Families" },
  { id: "professional", label: "Professional Bills" },
  { id: "speed", label: "Speed & Transparency" },
  { id: "ai", label: "AI-Powered Analysis" },
  { id: "services", label: "Additional Services" },
];

const content: Record<string, { problem: string; solution: string; cta: string; ctaHref: string; extra?: React.ReactNode }> = {
  "small-bills": {
    problem:
      "70% of medical bills are under $5,000. Many services ignore them. Income-based programs won't help if you make over $60K/year. You're stuck.",
    solution:
      "We accept bills as low as $500. AI analysis costs us pennies. Small bills add up (3 x $2K = $6K). You deserve help regardless of bill size.",
    cta: "Upload Your Bill Under $5K →",
    ctaHref: "/get-started",
    extra: (
      <div className="mt-4 rounded-lg border border-[#10B981]/30 bg-[#10B981]/5 p-4 text-sm">
        <p className="font-semibold text-gray-900">Sarah&apos;s Story: $1,200 ER Bill</p>
        <p className="mt-1 text-gray-600">Competitors: &quot;Too small, sorry.&quot; BillRelief: Found $680 in errors (56% off). Time: 2 days. Sarah paid: $170 fee, saved $510.</p>
      </div>
    ),
  },
  "middle-income": {
    problem:
      "Make $70K–$120K/year? You're in the donut hole: too rich for charity care, too poor to just pay overpriced bills. No one is built for you.",
    solution:
      "We specialize in middle-income families: no income limits, 25% fee (you keep 75%), payment plans, family subscription $79/mo for unlimited bills.",
    cta: "See If You Qualify (Everyone Does!) →",
    ctaHref: "/get-started",
    extra: (
      <p className="mt-4 italic text-gray-600">
        &quot;Finally, someone who helps regular working families!&quot; — Jennifer M., Teacher, $85K household income
      </p>
    ),
  },
  "professional": {
    problem:
      "Some services say they only negotiate hospital bills. But most bills aren't hospital bills: anesthesiologist, radiologist, lab work, specialist visits.",
    solution:
      "We negotiate ALL medical bills: hospital ✓ doctor ✓ imaging/lab ✓ ambulance ✓ therapy/rehab ✓ prescription ✓",
    cta: "Upload Any Medical Bill →",
    ctaHref: "/get-started",
    extra: (
      <div className="mt-4 grid grid-cols-3 gap-2 text-center text-sm">
        <div className="rounded-lg bg-[#0F4C81]/10 p-3 font-mono font-bold text-[#0F4C81]">60%</div>
        <div className="rounded-lg bg-[#0F4C81]/10 p-3 font-mono font-bold text-[#0F4C81]">42%</div>
        <div className="rounded-lg bg-[#0F4C81]/10 p-3 font-mono font-bold text-[#0F4C81]">89%</div>
        <div className="text-xs text-gray-500">Professional bill volume</div>
        <div className="text-xs text-gray-500">Avg savings</div>
        <div className="text-xs text-gray-500">Success rate</div>
      </div>
    ),
  },
  speed: {
    problem:
      "Competitors average 2–4 months. You get no updates for weeks, generic emails, vague fees. Bills go to collections while you wait.",
    solution:
      "THE 48-HOUR PROMISE: Hour 0 – Upload. Hour 1 – AI analysis complete. Hour 24 – Human expert review. Hour 48 – Full report + negotiation plan + exact savings estimate. Plus live chat, weekly video updates, real-time case tracker, transparent pricing.",
    cta: "See the 48-Hour Process →",
    ctaHref: "#how-it-works",
  },
  ai: {
    problem:
      "Every competitor: manual review. Slow, expensive (30–35% fees), error-prone, not scalable.",
    solution:
      "AI + HUMAN HYBRID: Step 1 – AI scans every line, compares to 10M+ Medicare rates, flags errors (98% accuracy). Step 2 – Human expert validates and customizes. Result: 10x faster, 90% accurate, 40% lower fees.",
    cta: "Join AI Beta Waitlist",
    ctaHref: "/get-started",
    extra: (
      <span className="mt-4 inline-block rounded-full bg-violet-100 px-3 py-1 text-xs font-bold text-violet-800">
        COMING SOON – MARCH 2026 · Instant Upload → AI Results in 60 Seconds
      </span>
    ),
  },
  services: {
    problem: "Competitors only negotiate bills. That's it.",
    solution:
      "We're a complete solution: (1) Bill negotiation – all types, $500+, 48hr. (2) Insurance appeal assistance – 78% success. (3) Credit report cleanup – medical debt removal. (4) Preventive cost estimation – coming soon. (5) Monthly subscription $29–$79/mo. (6) DIY tools & templates.",
    cta: "See All Services →",
    ctaHref: "/get-started",
  },
};

export function MarketGapSolutions() {
  const [active, setActive] = useState(tabs[0].id);
  const data = content[active];

  return (
    <section id="solutions" className="border-t border-gray-200 bg-white py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center text-3xl font-bold text-gray-900 lg:text-4xl"
        >
          Finally, Someone Who Helps EVERYONE
        </motion.h2>
        <div className="mt-10 flex flex-wrap justify-center gap-2 border-b border-gray-200 pb-4">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActive(tab.id)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium transition-colors",
                active === tab.id
                  ? "bg-[#0F4C81] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mt-8 rounded-xl border border-gray-200 bg-[#F9FAFB] p-6 lg:p-8"
          >
            <div className="mb-4 font-semibold text-gray-900">💡 THE PROBLEM:</div>
            <p className="text-gray-700">{data.problem}</p>
            <div className="mt-6 font-semibold text-gray-900">✅ OUR SOLUTION:</div>
            <p className="text-gray-700">{data.solution}</p>
            {data.extra}
            <Button asChild variant="yellow" size="lg" className="mt-6 font-bold">
              <Link href={data.ctaHref}>{data.cta}</Link>
            </Button>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
