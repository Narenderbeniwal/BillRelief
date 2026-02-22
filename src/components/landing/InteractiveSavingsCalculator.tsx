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

function clampBill(n: number) {
  return Math.min(MAX_BILL, Math.max(MIN_BILL, Number.isFinite(n) ? Math.round(n) : MIN_BILL));
}

function AnimatedNumber({ value }: { value: number }) {
  const rounded = Math.round(value);
  const [display, setDisplay] = useState(rounded);
  const isAnimatingRef = useRef(false);
  const prevValue = useRef(rounded);
  useEffect(() => {
    const start = prevValue.current;
    const end = rounded;
    prevValue.current = end;
    if (start === end) {
      setDisplay(end);
      isAnimatingRef.current = false;
      return;
    }
    isAnimatingRef.current = true;
    setDisplay(start);
    const duration = 500;
    const startTime = performance.now();
    const step = (now: number) => {
      const t = Math.min((now - startTime) / duration, 1);
      const eased = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
      const next = Math.round(start + (end - start) * eased);
      setDisplay(next);
      if (t >= 1) {
        setDisplay(end);
        isAnimatingRef.current = false;
      } else {
        requestAnimationFrame(step);
      }
    };
    requestAnimationFrame(step);
  }, [rounded]);
  const showValue = isAnimatingRef.current ? display : rounded;
  return <span>{showValue.toLocaleString()}</span>;
}

function formatCurrency(n: number) {
  return n.toLocaleString();
}

export function InteractiveSavingsCalculator() {
  const [billAmount, setBillAmount] = useState(DEFAULT_BILL);
  const [inputText, setInputText] = useState(String(DEFAULT_BILL));
  const afterBill = Math.round(billAmount * (1 - SAVINGS_RATE));
  const savings = billAmount - afterBill;
  const fee = Math.min(Math.round(savings * FEE_RATE), MAX_FEE);
  const youKeep = savings - fee;
  const pct = Math.round(SAVINGS_RATE * 100);

  const handleNumberInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value.replace(/[^0-9]/g, "");
    setInputText(raw || "");
    const n = raw ? parseInt(raw, 10) : MIN_BILL;
    if (Number.isFinite(n)) setBillAmount(clampBill(n));
  };

  const handleNumberInputBlur = () => {
    setBillAmount(clampBill(billAmount));
    setInputText(String(clampBill(billAmount)));
  };

  const handleSliderChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const n = Number(e.target.value);
    setBillAmount(n);
    setInputText(String(n));
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
      className="calculator-mobile md:calculator-desktop rounded-2xl border border-[#0F4C81]/20 bg-white p-4 shadow-xl sm:p-5 md:p-6"
    >
      {/* Mobile: large number input + compact results + CTA above the fold */}
      <div className="md:hidden">
        <label htmlFor="bill-amount-mobile" className="block text-sm font-medium text-gray-600">
          Your bill amount
        </label>
        <div className="mt-1 flex items-center gap-2">
          <span className="text-xl font-bold text-[#0F4C81]">$</span>
          <input
            id="bill-amount-mobile"
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={inputText}
            onChange={handleNumberInputChange}
            onBlur={handleNumberInputBlur}
            className="w-full min-w-0 flex-1 rounded-lg border border-gray-300 bg-white py-3 px-4 text-3xl font-bold tabular-nums text-gray-900 outline-none focus:border-[#0F4C81] focus:ring-2 focus:ring-[#0F4C81]/20"
            placeholder="12500"
          />
        </div>
        <p className="mt-2 text-xs text-amber-600 font-semibold uppercase tracking-wide">
          ⚡ Instant AI estimate
        </p>

        <div className="results-card mt-4 rounded-xl bg-[#10B981]/10 border border-[#10B981]/30 p-4">
          <div className="flex items-baseline justify-between gap-2">
            <span className="text-sm font-medium text-gray-700">You save</span>
            <span className="savings-big text-right font-mono text-2xl font-bold text-[#10B981] tabular-nums">
              $<AnimatedNumber value={savings} />
            </span>
          </div>
          <div className="percentage-big mt-1 text-right font-mono text-xl font-bold text-[#0F4C81]">
            {pct}% savings
          </div>
          <div className="mt-3 flex justify-between text-sm text-gray-600">
            <span>After BillRelief</span>
            <span className="font-mono font-semibold text-gray-900">
              $<AnimatedNumber value={afterBill} />
            </span>
          </div>
        </div>

        <Button
          asChild
          className="cta-mobile-full-width mt-4 w-full min-h-[48px] py-3 text-base font-bold"
          size="lg"
          variant="yellow"
        >
          <Link href="/get-started">Get My Free Analysis →</Link>
        </Button>
      </div>

      {/* Desktop: full calculator with slider */}
      <div className="hidden md:block">
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
          onChange={handleSliderChange}
          className="mb-4 h-3 w-full min-h-[24px] cursor-pointer appearance-none rounded-full bg-gray-200 accent-[#0F4C81] [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:w-6 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-[#0F4C81] [&::-webkit-slider-thumb]:shadow-md"
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
          <div className="flex justify-between gap-2">
            <span className="text-gray-600 shrink-0">Original Bill</span>
            <span className="font-mono font-bold tabular-nums">${formatCurrency(billAmount)}</span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-gray-600 shrink-0">After BillRelief</span>
            <span className="font-mono font-bold text-[#10B981] tabular-nums shrink-0">
              $<AnimatedNumber value={afterBill} />
            </span>
          </div>
          <div className="h-px bg-gray-200" />
          <div className="flex justify-between gap-2 font-bold">
            <span className="shrink-0">You save</span>
            <span className="text-[#10B981] tabular-nums shrink-0">
              $<AnimatedNumber value={savings} /> ({pct}%)
            </span>
          </div>
          <div className="flex justify-between gap-2">
            <span className="text-gray-600 shrink-0">Your fee (25% of savings)</span>
            <span className="font-mono tabular-nums shrink-0">$<AnimatedNumber value={fee} /></span>
          </div>
          <div className="flex justify-between gap-2 font-bold">
            <span className="shrink-0">You keep</span>
            <span className="font-mono text-lg text-[#10B981] tabular-nums shrink-0">
              $<AnimatedNumber value={youKeep} />
            </span>
          </div>
        </div>
        <Button asChild className={cn("mt-4 w-full font-bold")} size="lg" variant="yellow">
          <Link href="/get-started">Get My Free Analysis →</Link>
        </Button>
      </div>
    </motion.div>
  );
}
