"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { OnboardingProgressBar } from "@/components/onboarding/ProgressBar";
import { HIPAAAuthorizationStep } from "@/components/onboarding/HIPAAAuthorizationStep";
import { TermsConditionsStep } from "@/components/onboarding/TermsConditionsStep";
import { PaymentStep } from "@/components/onboarding/PaymentStep";

const STEP_HIPAA = 1;
const STEP_TERMS = 2;
const STEP_PAYMENT = 3;

function OnboardingFlow() {
  const searchParams = useSearchParams();
  const pricingTier =
    (searchParams.get("tier") as "free" | "ai-pro" | "expert" | "done-for-you") ||
    "done-for-you";

  const totalSteps = pricingTier === "free" ? 2 : 3;
  const [currentStep, setCurrentStep] = useState(1);

  const progressPercent =
    totalSteps > 0 ? Math.round((currentStep / totalSteps) * 100) : 0;

  const handleNext = () => {
    if (currentStep >= totalSteps) {
      window.location.href = "/onboarding/success";
      return;
    }
    setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    setCurrentStep((s) => Math.max(1, s - 1));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-4 px-4 sticky top-0 z-40">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-muted-foreground">
              Step {currentStep} of {totalSteps}
            </span>
            <span className="text-sm font-medium text-muted-foreground">
              {progressPercent}% Complete
            </span>
          </div>
          <OnboardingProgressBar
            current={currentStep}
            total={totalSteps}
          />
        </div>
      </div>

      <AnimatePresence mode="wait">
        {currentStep === STEP_HIPAA && (
          <HIPAAAuthorizationStep onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === STEP_TERMS && (
          <TermsConditionsStep
            pricingTier={pricingTier}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === STEP_PAYMENT && pricingTier !== "free" && (
          <PaymentStep
            pricingTier={pricingTier}
            onNext={() => (window.location.href = "/onboarding/success")}
            onBack={handleBack}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

export default function OnboardingPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <OnboardingFlow />
    </Suspense>
  );
}
