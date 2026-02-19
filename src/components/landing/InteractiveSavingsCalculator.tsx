"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const MIN_BILL = 500;
const MAX_BILL = 50000;
const DEFAULT_BILL = 12500;
const SAVINGS_RATE = 0.62;
const FEE_RATE = 0.25;
const MAX_FEE = 499;

function AnimatedNumber({ value }: { value: number }) {
  const [display, setDisplay] = useState(() => Math.round(value));
  const prevValue = useRef(value);
  useEffect(() => {
    const start = prevValue.current;
    const end = Math.round(value);
    prevValue.current = end;
    if (start === end) {
      setDisplay(end);
      return;
    }
    const duration = 500;
    const startTime = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      setDisplay(Math.round(start + (end - start) * eased));
      if (t < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [value]);
  return <span>{display.toLocaleString()}</span>;
}

function formatCurrency(n: number) {
  return n.toLocaleString();
}

export function InteractiveSavingsCalculator() {
  const [billAmount, setBillAmount] = useState(DEFAULT_BILL);
  const afterBill = Math.round(billAmount * (1 - SAVINGS_RATE));
  const savings = billAmount - afterBill;
  const fee = Math.min(Math.round(savings * FEE_RATE), MAX_FEE);
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
        Your Bill Amount:{" "}
        <span className="font-mono font-bold text-[#0F4C81]">
          ${formatCurrency(billAmount)}
        </span>
      </p>
      <input
        type="range"
        min={MIN_BILL}
        max={MAX_BILL}
        step={100}
        value={billAmount}
        onChange={(e) => setBillAmount(Number(e.target.value))}
        className="mb-4 h-3 w-full cursor-pointer appearance-none rounded-full bg-gray-200 accent-[#0F4C81] [&::-webkit-slider-thumb]:h-5 [&::-webkit-slider-thumb]:w-5 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0F4C81] [&::-webkit-slider-thumb]:shadow-md"
      />
      <p className="mb-3 text-xs font-semibold uppercase tracking-wide text-amber-600">
        ⚡ Instant AI estimate
      </p>
      <div className="mb-3">
        <div className="mb-1 flex justify-between text-xs text-gray-500">
          <span>Savings</span>
          <span className="font-medium text-[#10B981]">{pct}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <motion.div
            className="h-full rounded-full bg-[#10B981]"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ type: "tween", duration: 0.4 }}
          />
        </div>
      </div>
      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Original Bill</span>
          <span className="font-mono font-bold">${formatCurrency(billAmount)}</span>
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
        <div className="flex justify-between font-bold">
          <span>You keep</span>
          <span className="font-mono text-lg text-[#10B981]">
            $<AnimatedNumber value={youKeep} />
          </span>
        </div>
      </div>
      <Button asChild className={cn("mt-4 w-full font-bold")} size="lg" variant="yellow">
        <Link href="/get-started">Get My Free Analysis →</Link>
      </Button>
    </motion.div>
  );
}
