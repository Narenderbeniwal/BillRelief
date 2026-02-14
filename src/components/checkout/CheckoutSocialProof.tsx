"use client";

import { Users, Star, Quote } from "lucide-react";

const SOCIAL_BY_TIER: Record<string, { count: string; snippet: string }> = {
  "ai-pro": {
    count: "2,400+",
    snippet: "chose AI Analysis Pro this month",
  },
  expert: {
    count: "1,100+",
    snippet: "chose Expert Package this month",
  },
};

export function CheckoutSocialProof({ tierId }: { tierId: string }) {
  const data = SOCIAL_BY_TIER[tierId];
  if (!data) return null;

  return (
    <div className="rounded-xl border border-white/10 bg-slate-800/60 p-4">
      <div className="flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500/20">
          <Users className="h-5 w-5 text-emerald-300" />
        </div>
        <div>
          <p className="text-sm font-semibold text-white">
            <span className="text-[#FDDA0D]">{data.count}</span> {data.snippet}
          </p>
          <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
            <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
            4.9/5 from verified patients
          </p>
        </div>
      </div>
      <p className="mt-3 flex items-start gap-2 text-xs italic text-gray-400">
        <Quote className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gray-500" />
        Got my report in 2 days. Found $1,200 in errors. Worth every penny.
      </p>
    </div>
  );
}
