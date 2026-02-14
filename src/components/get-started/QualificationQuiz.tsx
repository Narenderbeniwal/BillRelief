"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ArrowLeft, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const questions = [
  {
    id: 1,
    question: "How much do you owe on your medical bills?",
    options: [
      { label: "Less than $5,000", value: "0-5000", savings: "30-40%" },
      { label: "$5,000 - $15,000", value: "5000-15000", savings: "40-50%" },
      { label: "$15,000 - $50,000", value: "15000-50000", savings: "50-60%" },
      { label: "$50,000 - $250,000", value: "50000-250000", savings: "60-70%" },
      { label: "More than $250,000", value: "250000+", savings: "60-80%" },
    ],
  },
  {
    id: 2,
    question: "What type of medical bill is this?",
    options: [
      { label: "Hospital Stay", value: "hospital" },
      { label: "Emergency Room Visit", value: "er" },
      { label: "Surgery", value: "surgery" },
      { label: "Imaging (MRI, CT, X-Ray)", value: "imaging" },
      { label: "Doctor Visit / Specialist", value: "doctor" },
      { label: "Other / Multiple Types", value: "other" },
    ],
  },
  {
    id: 3,
    question: "Do you have health insurance?",
    options: [
      { label: "Yes, with coverage", value: "yes" },
      { label: "Yes, but claim was denied", value: "denied" },
      { label: "No insurance", value: "no" },
    ],
  },
];

export function QualificationQuiz() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [estimatedSavings, setEstimatedSavings] = useState<string | null>(null);

  const currentQuestion = questions[step];
  const progress = ((step + 1) / questions.length) * 100;
  const isLastStep = step === questions.length - 1;

  const handleSelect = (value: string, savings?: string) => {
    const newAnswers = { ...answers, [currentQuestion.id]: value };
    setAnswers(newAnswers);
    if (savings) setEstimatedSavings(savings);
    if (isLastStep) return;
    setStep((s) => s + 1);
  };

  const handleBack = () => {
    if (step > 0) setStep((s) => s - 1);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-muted-foreground">
            Step {step + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium">Less than 2 minutes</span>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      <CardContent>
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <h2 className="text-xl font-semibold mb-6">{currentQuestion.question}</h2>
            <div className="space-y-3">
              {currentQuestion.options.map((opt) => {
                const selected = answers[currentQuestion.id] === opt.value;
                const savings = "savings" in opt ? (opt as { savings?: string }).savings : undefined;
                return (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => handleSelect(opt.value, savings)}
                    className={`w-full flex items-center justify-between p-4 rounded-lg border-2 text-left transition-all ${
                      selected
                        ? "border-primary bg-primary/5"
                        : "border-muted hover:border-primary/50"
                    }`}
                  >
                    <span className="font-medium">{opt.label}</span>
                    {selected && <Check className="w-5 h-5 text-primary" />}
                    {savings && selected && (
                      <span className="text-sm text-primary font-medium">Est. savings: {savings}</span>
                    )}
                  </button>
                );
              })}
            </div>
            <div className="flex justify-between mt-8">
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={step === 0}
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              {isLastStep && answers[currentQuestion.id] && (
                <Button asChild variant="yellow">
                  <Link href="/register">
                    See My Results
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Link>
                </Button>
              )}
            </div>
            {estimatedSavings && (
              <p className="mt-4 text-sm text-muted-foreground">
                Based on your answers, we estimate you could save{" "}
                <span className="font-semibold text-foreground">{estimatedSavings}</span> on
                average.
              </p>
            )}
          </motion.div>
        </AnimatePresence>
      </CardContent>
    </Card>
  );
}
