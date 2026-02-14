"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, ShieldCheck, BadgeCheck } from "lucide-react";
import { PayPalButton } from "./PayPalButton";

export function CheckoutClient({
  tierId,
  amount,
  description,
}: {
  tierId: string;
  amount: string;
  description: string;
}) {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const onSuccess = () => {
    router.push(`/get-started?tier=${tierId}&paid=1`);
  };

  return (
    <div className="rounded-xl border border-white/10 bg-slate-800/60 p-6">
      <div className="mb-4 rounded-lg border border-white/10 bg-slate-900/40 p-3 text-xs text-gray-300">
        <div className="flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-1">
            <Lock className="h-3.5 w-3.5 text-cyan-300" />
            Secure checkout
          </span>
          <span className="inline-flex items-center gap-1">
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-300" />
            Encrypted payment data
          </span>
          <span className="inline-flex items-center gap-1">
            <BadgeCheck className="h-3.5 w-3.5 text-amber-300" />
            Instant confirmation
          </span>
        </div>
      </div>
      {error && (
        <div className="mb-4 rounded-lg border border-red-500/50 bg-red-500/10 p-3 text-sm text-red-200">
          {error}
        </div>
      )}
      <PayPalButton
        amount={amount}
        description={description}
        tierId={tierId}
        onSuccess={onSuccess}
        onError={setError}
      />
    </div>
  );
}
