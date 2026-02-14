"use client";

import { motion } from "framer-motion";
import { CreditCard, Lock } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PayPalButton } from "@/components/checkout/PayPalButton";
import { useState } from "react";

const AMOUNTS: Record<string, number> = {
  "ai-pro": 99,
  expert: 199,
  "done-for-you": 250,
};

const DESCRIPTIONS: Record<string, string> = {
  "ai-pro": "BillRelief AI Analysis Pro",
  expert: "BillRelief Expert Package",
  "done-for-you": "BillRelief No-Risk Deposit",
};

export function PaymentStep({
  pricingTier,
  onNext,
  onBack,
}: {
  pricingTier: string;
  onNext: () => void;
  onBack: () => void;
}) {
  const amount = AMOUNTS[pricingTier] ?? 250;
  const amountStr = amount.toFixed(2);
  const description = DESCRIPTIONS[pricingTier] ?? DESCRIPTIONS["done-for-you"];
  const [error, setError] = useState<string | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
          <CreditCard className="w-8 h-8 text-green-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          {pricingTier === "done-for-you"
            ? "Start the Process"
            : "Complete Your Purchase"}
        </h2>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 mb-6 border border-orange-200">
        {pricingTier === "done-for-you" && (
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4">No-Risk Deposit</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-2xl">💰</span>
                <span className="text-gray-700">
                  Make a <strong>${amount}</strong> no-risk deposit to get started.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">✅</span>
                <span className="text-gray-700">
                  If we don&apos;t find you savings,{" "}
                  <strong>we&apos;ll issue you a full refund</strong>.
                </span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🎯</span>
                <span className="text-gray-700">
                  If we do find you savings, your deposit is{" "}
                  <strong>applied to your 25% success fee</strong>.
                </span>
              </li>
            </ul>
          </div>
        )}

        {(pricingTier === "ai-pro" || pricingTier === "expert") && (
          <div className="mb-6">
            <h3 className="font-bold text-gray-900 mb-4">
              {pricingTier === "ai-pro" ? "AI Analysis Pro" : "Expert Package"}
            </h3>
            <div className="bg-white rounded-lg p-4 border border-orange-200">
              <div className="flex justify-between items-center mb-2">
                <span className="text-gray-700">Service Fee</span>
                <span className="text-2xl font-bold text-gray-900">${amount}</span>
              </div>
              <p className="text-sm text-gray-600">One-time payment</p>
              <div className="mt-3 pt-3 border-t border-gray-200">
                <p className="text-sm text-green-700 font-medium">
                  30-day money-back guarantee
                </p>
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
            {error}
          </div>
        )}

        <div className="mb-4">
          <PayPalButton
            amount={amountStr}
            description={description}
            tierId={pricingTier}
            onSuccess={onNext}
            onError={setError}
          />
        </div>

        <Button type="button" variant="outline" onClick={onBack} className="w-full sm:w-auto">
          Back
        </Button>

        <div className="mt-6 flex items-center justify-center gap-2 text-sm text-gray-600">
          <Lock className="w-4 h-4" />
          <span>Secured by PayPal • SSL Encrypted</span>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4 mt-6 text-center text-xs text-gray-600">
        <div>🔒 Secure checkout</div>
        <div>💳 PayPal or card</div>
        <div>✅ Instant confirmation</div>
      </div>
    </motion.div>
  );
}
