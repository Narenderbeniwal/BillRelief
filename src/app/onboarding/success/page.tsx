"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function OnboardingSuccessPage() {
  const router = useRouter();
  const [countdown, setCountdown] = useState(5);

  useEffect(() => {
    let confetti: (opts?: { particleCount?: number; spread?: number; origin?: { y: number } }) => void = () => {};
    import("canvas-confetti")
      .then((mod) => {
        confetti = mod.default;
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      })
      .catch(() => {});

    const interval = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          router.push("/dashboard");
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-primary/5 px-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="max-w-2xl w-full bg-white rounded-3xl shadow-2xl p-8 sm:p-12 text-center"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-24 h-24 bg-green-100 rounded-full mb-6"
        >
          <CheckCircle className="w-16 h-16 text-green-600" />
        </motion.div>

        <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Welcome to BillRelief! 🎉
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          Your account is all set up. We&apos;re ready to start reducing your
          medical bills.
        </p>

        <div className="bg-gradient-to-br from-primary/10 to-purple-50 rounded-2xl p-6 mb-8 text-left">
          <h3 className="font-bold text-gray-900 mb-4">What Happens Next:</h3>
          <ul className="space-y-3">
            <li className="flex items-start gap-3">
              <span className="text-2xl">📧</span>
              <span className="text-gray-700">
                Check your email for a confirmation and next steps
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">🤖</span>
              <span className="text-gray-700">
                Our AI will analyze your bill within 24-48 hours
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">👤</span>
              <span className="text-gray-700">
                Your case manager will contact you with a savings report
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-2xl">💰</span>
              <span className="text-gray-700">
                We&apos;ll negotiate on your behalf and keep you updated
              </span>
            </li>
          </ul>
        </div>

        <Button
          size="lg"
          className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-bold py-4 px-8 rounded-xl text-lg shadow-lg hover:shadow-xl flex items-center justify-center gap-2 mx-auto"
          onClick={() => router.push("/dashboard")}
        >
          Go to Dashboard
          <ArrowRight className="w-5 h-5" />
        </Button>

        <p className="text-sm text-muted-foreground mt-4">
          Redirecting to dashboard in {countdown} seconds...
        </p>
      </motion.div>
    </div>
  );
}
