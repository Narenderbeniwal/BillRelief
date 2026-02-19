"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight } from "lucide-react";

const SCROLL_THRESHOLD_PX = 100;
const FOOTER_NEAR_PX = 150;
const SLIDE_DURATION = 0.3;

export function StickyMobileCTA() {
  const [visible, setVisible] = useState(false);
  const lastScrollY = useRef(0);
  const scrollDirection = useRef<"up" | "down">("down");

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const docHeight = document.documentElement.scrollHeight;
      const windowHeight = window.innerHeight;
      const distanceFromBottom = docHeight - windowHeight - y;

      if (y > lastScrollY.current) {
        scrollDirection.current = "down";
      } else if (y < lastScrollY.current) {
        scrollDirection.current = "up";
      }
      lastScrollY.current = y;

      if (distanceFromBottom <= FOOTER_NEAR_PX) {
        setVisible(true);
        return;
      }

      if (y < SCROLL_THRESHOLD_PX) {
        setVisible(false);
        return;
      }

      setVisible(scrollDirection.current === "down");
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: "100%" }}
          animate={{ y: 0 }}
          exit={{ y: "100%" }}
          transition={{
            type: "tween",
            duration: SLIDE_DURATION,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          className="fixed bottom-0 left-0 right-0 z-[45] w-full px-4 pb-4 pt-3 md:hidden"
          style={{
            background: "hsl(var(--background))",
            borderTop: "1px solid hsl(var(--border))",
            boxShadow: "0 -8px 30px rgba(0,0,0,0.12)",
            paddingBottom: "max(1rem, env(safe-area-inset-bottom))",
          }}
        >
          <Link
            href="/get-started"
            className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#FDDA0D] px-4 py-3.5 text-base font-bold text-[#0F4C81] transition-opacity active:opacity-90"
          >
            Get Free Analysis
            <ArrowRight className="h-5 w-5 shrink-0" />
          </Link>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
