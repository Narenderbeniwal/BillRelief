"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, X } from "lucide-react";

export function PricingStickyCTA() {
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const windowHeight = window.innerHeight;
      setVisible(y > windowHeight * 0.4 && y < document.documentElement.scrollHeight - windowHeight - 100);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (dismissed) return null;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: "spring", damping: 25, stiffness: 300 }}
          className="fixed bottom-0 left-0 right-0 z-40 hidden border-t border-gray-200 bg-white/95 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur-md md:block"
        >
          <div className="container mx-auto flex items-center justify-between gap-4 px-4 py-3">
            <div className="flex items-center gap-3">
              <p className="text-sm font-semibold text-gray-900">
                Ready to lower your medical bill?
              </p>
              <p className="hidden text-sm text-gray-500 sm:inline">
                Join 10,000+ patients · No savings, no fee options
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Link
                href="/get-started"
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#0F4C81] bg-white px-4 py-2 text-sm font-medium text-[#0F4C81] transition-colors hover:bg-[#0F4C81]/5"
              >
                Start free estimate
              </Link>
              <Link
                href="#plan-ai-pro"
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#FDDA0D] px-4 py-2 text-sm font-bold text-[#0F4C81] transition-opacity hover:opacity-90"
              >
                Most popular: $99
                <ArrowRight className="h-4 w-4" />
              </Link>
              <button
                type="button"
                aria-label="Dismiss"
                onClick={() => setDismissed(true)}
                className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
