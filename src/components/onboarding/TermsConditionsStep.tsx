"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { FileCheck, AlertCircle } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const PRICING_TEXTS: Record<string, string | null> = {
  free: "",
  "ai-pro":
    "I will pay a one-time fee of $99 for the AI Analysis Pro service.",
  expert:
    "I will pay a one-time fee of $199 for the Expert Package service.",
  "done-for-you":
    "I will pay BillRelief 25% of any savings found, with a minimum fee of $500 for services rendered. If savings found are less than $2,000, I will only pay 50% of savings found.",
};

export function TermsConditionsStep({
  pricingTier = "done-for-you",
  onNext,
  onBack,
}: {
  pricingTier?: string;
  onNext: () => void;
  onBack: () => void;
}) {
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [feeAccepted, setFeeAccepted] = useState(false);

  const pricingText = PRICING_TEXTS[pricingTier] ?? PRICING_TEXTS["done-for-you"];
  const needsFeeAccept = pricingTier !== "free" && pricingText;
  const canProceed = termsAccepted && (!needsFeeAccept || feeAccepted);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="max-w-2xl mx-auto px-4 py-8"
    >
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-purple-100 rounded-full mb-4">
          <FileCheck className="w-8 h-8 text-purple-600" />
        </div>
        <h2 className="text-3xl font-bold text-gray-900">
          Accept Terms & Conditions
        </h2>
      </div>

      <div className="bg-gradient-to-br from-amber-50 to-orange-50 rounded-2xl p-8 mb-6 border border-orange-200">
        <label className="flex items-start gap-4 mb-6 cursor-pointer group">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
          />
          <span className="text-gray-700">
            I confirm that I have read, consent to, and accept the terms of{" "}
            <Link
              href="/legal/patient-agreement"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary underline hover:opacity-90"
            >
              BillRelief&apos;s Patient Agreement
            </Link>
            .
          </span>
        </label>

        {needsFeeAccept && pricingText && (
          <label className="flex items-start gap-4 mb-6 cursor-pointer group">
            <input
              type="checkbox"
              checked={feeAccepted}
              onChange={(e) => setFeeAccepted(e.target.checked)}
              className="mt-1 w-5 h-5 text-primary border-gray-300 rounded focus:ring-primary"
            />
            <span className="text-gray-700">{pricingText}</span>
          </label>
        )}

        {pricingTier === "done-for-you" && (
          <div className="bg-white rounded-lg p-4 border border-orange-200 mb-6">
            <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
              <AlertCircle className="w-5 h-5 text-primary" />
              Fee Structure Examples
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-600">Bill savings: $10,000</span>
                <span className="font-semibold text-gray-900">
                  Your fee: $2,500 (25%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bill savings: $4,000</span>
                <span className="font-semibold text-gray-900">
                  Your fee: $1,000 (25%)
                </span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span className="text-gray-600">Bill savings: $1,500</span>
                <span className="font-semibold text-gray-900">
                  Your fee: $750 (50%)
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Bill savings: $0</span>
                <span className="font-semibold text-green-600">Your fee: $0 ✓</span>
              </div>
            </div>
          </div>
        )}

        <div className="bg-primary/10 border-l-4 border-primary p-4 rounded">
          <h4 className="font-semibold text-gray-900 mb-2">Important to Know:</h4>
          <ul className="space-y-1 text-sm text-gray-800">
            <li>• You only pay if we save you money (done-for-you tier)</li>
            <li>• No hidden fees or surprise charges</li>
            <li>• Cancel anytime if we haven&apos;t started work</li>
            <li>• 100% money-back guarantee if no savings found</li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Button type="button" variant="outline" onClick={onBack}>
          Back
        </Button>
        <Button
          type="button"
          variant="yellow"
          className="flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
          disabled={!canProceed}
          onClick={onNext}
        >
          I Agree
        </Button>
      </div>

      <p className="text-center text-xs text-gray-500 mt-4">
        By clicking &quot;I Agree&quot;, you authorize BillRelief to begin working
        on your case.
      </p>
    </motion.div>
  );
}
