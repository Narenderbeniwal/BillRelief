"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MIN_BILL = 500;
const MAX_BILL = 50000;
const SAVINGS_RATE = 0.62;
const FEE_RATE = 0.25;

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(0);
  useEffect(() => {
    const start = display;
    const end = Math.round(value);
    const duration = 600;
    const startTime = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      setDisplay(Math.round(start + (end - start) * t));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <span>{display.toLocaleString()}</span>;
}

export function InteractiveSavingsCalculator() {
  const [billAmount, setBillAmount] = useState(12500);
  const savings = billAmount * SAVINGS_RATE;
  const afterBill = billAmount - savings;
  const fee = savings * FEE_RATE;
  const youKeep = savings - fee;
  const pct = Math.round(SAVINGS_RATE * 100);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="rounded-2xl border border-[#0F4C81]/20 bg-white p-6 shadow-xl"
    >
      <p className="mb-3 text-sm font-medium text-gray-600">
        Your Bill Amount: <span className="font-mono font-bold text-[#0F4C81]">${billAmount.toLocaleString()}</span>
      </p>
      <input
        type="range"
        min={MIN_BILL}
        max={MAX_BILL}
        step={100}
        value={billAmount}
        onChange={(e) => setBillAmount(Number(e.target.value))}
        className="mb-4 h-2 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-[#0F4C81]"
      />
      <p className="mb-4 text-xs font-semibold uppercase tracking-wide text-amber-600">
        ⚡ Instant AI estimate
      </p>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Original Bill</span>
          <span className="font-mono font-bold">${billAmount.toLocaleString()}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">After BillRelief</span>
          <span className="font-mono font-bold text-[#10B981]">
            $<AnimatedNumber value={afterBill} />
          </span>
        </div>
        <div className="h-px bg-gray-200" />
        <div className="flex justify-between font-bold">
          <span>You save</span>
          <span className="text-[#10B981]">
            $<AnimatedNumber value={savings} /> ({pct}%)
          </span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Your fee (25% of savings)</span>
          <span className="font-mono">$<AnimatedNumber value={fee} /></span>
        </div>
        <div className="flex justify-between font-bold text-[#0F4C81]">
          <span>You keep</span>
          <span className="font-mono">$<AnimatedNumber value={youKeep} /></span>
        </div>
      </div>
      <Button asChild className={cn("mt-4 w-full font-bold")} size="lg" variant="yellow">
        <Link href="/get-started">Get My Free Analysis →</Link>
      </Button>
    </motion.div>
  );
}
