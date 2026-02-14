"use client";

import { useCallback } from "react";
import { motion } from "framer-motion";
import { Zap, Rocket, Crown, Building2 } from "lucide-react";
import { cn } from "@/lib/utils";

const plans = [
  { id: "plan-free", label: "Free estimate", sub: "No cost", icon: Zap },
  { id: "plan-ai-pro", label: "AI Analysis", sub: "$99", icon: Rocket },
  { id: "plan-expert", label: "Expert help", sub: "$199", icon: Crown },
  { id: "plan-done-for-you", label: "Done for you", sub: "25% of savings", icon: Building2 },
] as const;

export function ComparePlansSelector() {
  const scrollToPlan = useCallback((id: string) => {
    const el = document.getElementById(id);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-8"
    >
      <p className="mb-3 text-center text-sm font-medium text-gray-600">
        Compare plans — click to jump to a plan
      </p>
      <p className="mb-2 text-center text-xs text-gray-500">
        Not sure? Start with{" "}
        <button type="button" onClick={() => scrollToPlan("plan-free")} className="font-medium text-[#0F4C81] hover:underline focus:outline-none focus:ring-2 focus:ring-[#0F4C81] focus:ring-offset-2 rounded">
          free estimate
        </button>{" "}
        — no card required.
      </p>
      <div className="flex flex-wrap items-center justify-center gap-2">
        {plans.map((plan) => {
          const Icon = plan.icon;
          return (
            <button
              key={plan.id}
              type="button"
              onClick={() => scrollToPlan(plan.id)}
              className={cn(
                "inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm transition-all hover:border-[#0F4C81]/40 hover:bg-[#0F4C81]/5 hover:text-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81] focus:ring-offset-2"
              )}
            >
              <Icon className="h-4 w-4 text-gray-500" />
              <span>{plan.label}</span>
              <span className="text-xs text-gray-500">{plan.sub}</span>
            </button>
          );
        })}
      </div>
    </motion.div>
  );
}
