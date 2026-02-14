"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Rocket, Crown, Building2, Check, Lock, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import type { PricingTier } from "@/lib/pricingData";

const icons = { zap: Zap, rocket: Rocket, crown: Crown, building: Building2 };
const accentStyles = {
  blue: { border: "border-[#0F4C81]/30", bg: "bg-[#0F4C81]/10", check: "text-[#0F4C81]", button: "bg-gray-600 hover:bg-gray-700 text-white" },
  cyan: { border: "border-[#0F4C81]/30", bg: "bg-[#0F4C81]/10", check: "text-[#0F4C81]", button: "bg-[#0F4C81] hover:bg-[#0c3d6b] text-white shadow-md" },
  gold: { border: "border-amber-300", bg: "bg-amber-50", check: "text-amber-600", button: "bg-[#FDDA0D] hover:opacity-90 text-[#0F4C81] font-bold shadow-md" },
  green: { border: "border-[#10B981]/40", bg: "bg-[#10B981]/10", check: "text-[#10B981]", button: "bg-[#10B981] hover:bg-[#0d9668] text-white font-bold shadow-md" },
};
const badgeBg = { popular: "bg-[#0F4C81]/15 text-[#0F4C81] border-[#0F4C81]/30", value: "bg-amber-100 text-amber-800 border-amber-300" };

function AnimatedPrice({ value }: { value: number }) {
  const [n, setN] = useState(0);
  useEffect(() => {
    const t = 1500;
    const start = performance.now();
    const step = (now: number) => {
      const p = Math.min((now - start) / t, 1);
      setN(Math.round(value * p));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <span>{n.toLocaleString()}</span>;
}

export function PricingCard({
  tier,
  index,
  isPopular,
}: {
  tier: PricingTier;
  index: number;
  isPopular?: boolean;
}) {
  const Icon = icons[tier.icon];
  const style = accentStyles[tier.accent];
  const [billAmount, setBillAmount] = useState(10000);
  const isCheckoutPlan = tier.ctaHref.startsWith("/checkout");
  const socialCount = tier.id === "ai-pro" ? "78%" : tier.id === "expert" ? "18%" : tier.id === "done-for-you" ? "4%" : null;
  const savingsRate = 0.6;
  const savings = billAmount * savingsRate;
  const fee = Math.min(savings * 0.25, 499);
  const youKeep = savings - fee;

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "relative flex flex-col rounded-2xl border border-gray-200 bg-white p-6 text-left shadow-sm sm:p-8",
        "transition-all duration-300 hover:shadow-lg hover:border-gray-300",
        isPopular && "ring-2 ring-[#0F4C81]/40 shadow-lg"
      )}
    >
      {tier.badge && (
        <div
          className={cn(
            "absolute -top-3 left-1/2 -translate-x-1/2 rounded-full border px-3 py-1 text-xs font-bold",
            tier.badgeStyle ? badgeBg[tier.badgeStyle] : "bg-gray-100 text-gray-800 border-gray-200"
          )}
          role="status"
          aria-label={tier.badge}
        >
          {tier.badge}
          {isPopular && <span className="ml-1 hidden sm:inline">· Recommended</span>}
        </div>
      )}

      <div className={cn("mb-4 flex h-12 w-12 items-center justify-center rounded-xl", style.bg)}>
        <Icon className={cn("h-6 w-6", tier.accent === "blue" ? "text-[#0F4C81]" : tier.accent === "cyan" ? "text-[#0F4C81]" : tier.accent === "gold" ? "text-amber-600" : "text-[#10B981]")} />
      </div>

      <div className="flex items-start justify-between gap-2">
        <div>
          <h3 className="text-xl font-bold text-gray-900 lg:text-2xl">{tier.name}</h3>
          <p className="mt-1 text-sm text-gray-600">{tier.tagline}</p>
        </div>
        {socialCount && (
          <span className="shrink-0 rounded-full bg-[#10B981]/10 px-2 py-0.5 text-[10px] font-semibold text-[#10B981]">
            {socialCount} choose this
          </span>
        )}
      </div>

      <div className="mt-6 flex flex-wrap items-baseline gap-2">
        <span className="text-4xl font-bold text-gray-900 lg:text-5xl">{tier.price}</span>
        {tier.originalPrice && (
          <span className="text-lg text-gray-400 line-through">{tier.originalPrice}</span>
        )}
      </div>
      <p className="mt-1 text-sm text-gray-600">{tier.priceNote}</p>
      {tier.priceBadge && (
        <span
          className={cn(
            "mt-2 inline-block rounded-full px-2 py-0.5 text-xs font-medium",
            tier.accent === "green" ? "bg-[#10B981]/15 text-[#10B981]" : tier.accent === "cyan" ? "bg-[#0F4C81]/10 text-[#0F4C81]" : tier.accent === "gold" ? "bg-amber-100 text-amber-800" : "bg-[#0F4C81]/10 text-[#0F4C81]"
          )}
        >
          {tier.priceBadge}
        </span>
      )}

      <Link
        href={tier.ctaHref}
        className={cn(
          "mt-6 flex w-full items-center justify-center rounded-xl py-3.5 text-sm font-semibold transition-transform hover:scale-[1.02]",
          style.button
        )}
      >
        {tier.cta}
      </Link>
      <div className="mt-2 rounded-lg bg-gray-50 px-3 py-2 text-xs text-gray-600">
        {isCheckoutPlan ? (
          <span className="inline-flex items-center gap-1.5">
            <Lock className="h-3.5 w-3.5 text-[#0F4C81]" />
            Secure PayPal checkout · card and wallet supported
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5">
            <ShieldCheck className="h-3.5 w-3.5 text-[#10B981]" />
            No credit card required
          </span>
        )}
      </div>

      <ul className="mt-6 flex-1 space-y-2.5 max-h-[320px] overflow-y-auto pr-1">
        {tier.features.map((f, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
            <Check className={cn("mt-0.5 h-4 w-4 shrink-0", style.check)} />
            <span className={f.startsWith("→") ? "pl-0 text-gray-500" : ""}>{f}</span>
          </li>
        ))}
      </ul>

      {tier.highlight && (
        <div className={cn("mt-4 rounded-lg border p-3 text-sm", style.border, style.bg)}>
          <p className="text-gray-700">{tier.highlight}</p>
        </div>
      )}
      {tier.highlights && tier.highlights.length > 0 && (
        <div className="mt-4 space-y-2">
          {tier.highlights.map((h, i) => (
            <div key={i} className={cn("rounded-lg border p-2 text-xs", style.border, style.bg)}>
              <span className="text-gray-700">{h.icon} {h.text}</span>
            </div>
          ))}
        </div>
      )}
      {tier.stats && (
        <p className="mt-3 text-center text-xs font-medium text-gray-500">{tier.stats}</p>
      )}

      {tier.showCalculator && (
        <div className={cn("mt-4 rounded-xl border p-4", style.border, style.bg)}>
          <p className="mb-3 text-xs font-semibold text-gray-700">Example savings</p>
          <input
            type="range"
            min={2000}
            max={50000}
            step={500}
            value={billAmount}
            onChange={(e) => setBillAmount(Number(e.target.value))}
            className="mb-3 h-2 w-full accent-[#10B981]"
          />
          <div className="space-y-1 text-xs text-gray-600">
            <div className="flex justify-between">
              <span>Bill</span>
              <span className="font-mono">${billAmount.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>We save you</span>
              <span className="font-mono text-[#10B981] font-medium">$<AnimatedPrice value={savings} /> (60%)</span>
            </div>
            <div className="flex justify-between">
              <span>Your fee (25%)</span>
              <span className="font-mono">$<AnimatedPrice value={fee} /></span>
            </div>
            <div className="flex justify-between font-semibold text-gray-900">
              <span>You keep</span>
              <span className="font-mono text-[#10B981]">$<AnimatedPrice value={youKeep} /></span>
            </div>
          </div>
        </div>
      )}

      <p className="mt-4 text-xs text-gray-500">Perfect for: {tier.perfectFor}</p>
      {tier.trustBadge && (
        <p className="mt-2 text-xs text-gray-500">{tier.trustBadge}</p>
      )}
    </motion.article>
  );
}
