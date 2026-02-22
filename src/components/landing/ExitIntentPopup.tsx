"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Check, FileText } from "lucide-react";
import { usePathname } from "next/navigation";

const STORAGE_KEY = "billrelief_exit_popup_shown";
const STORAGE_EMAIL_KEY = "billrelief_exit_email_captured";

/** Exit-intent: show when mouse leaves toward browser chrome (close tab). */
function shouldShowPopup(pathname: string): boolean {
  if (pathname === "/get-started" || pathname === "/pricing") return false;
  if (typeof window === "undefined") return false;
  try {
    if (localStorage.getItem(STORAGE_KEY) === "true") return false;
    if (localStorage.getItem(STORAGE_EMAIL_KEY)) return false;
  } catch {
    return true;
  }
  return true;
}

export function ExitIntentPopup() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [mobileTimerDone, setMobileTimerDone] = useState(false);

  const hide = useCallback(() => {
    setVisible(false);
    try {
      localStorage.setItem(STORAGE_KEY, "true");
    } catch {}
  }, []);

  const triggeredRef = useRef(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!shouldShowPopup(pathname)) return;

    const handleExitIntent = (e: MouseEvent) => {
      if (triggeredRef.current) return;
      if (window.innerWidth < 768) return;
      if (e.clientY <= 10) {
        triggeredRef.current = true;
        setVisible(true);
      }
    };

    document.addEventListener("mouseout", handleExitIntent);
    return () => document.removeEventListener("mouseout", handleExitIntent);
  }, [pathname]);

  useEffect(() => {
    if (typeof window === "undefined" || pathname === "/get-started" || pathname === "/pricing") return;
    const t = setTimeout(() => {
      setMobileTimerDone(true);
    }, 30000);
    return () => clearTimeout(t);
  }, [pathname]);

  useEffect(() => {
    if (!mobileTimerDone || !shouldShowPopup(pathname)) return;
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    if (isMobile) setVisible(true);
  }, [mobileTimerDone, pathname]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") hide();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [hide]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = email.trim();
    if (!trimmed || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed)) {
      setStatus("error");
      return;
    }
    setStatus("loading");
    try {
      const res = await fetch("/api/email-capture", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      if (!res.ok) throw new Error("Failed");
      setStatus("success");
      try {
        localStorage.setItem(STORAGE_EMAIL_KEY, trimmed);
        localStorage.setItem(STORAGE_KEY, "true");
      } catch {}
    } catch {
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm"
            onClick={hide}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ type: "tween", duration: 0.2 }}
            className="fixed left-1/2 top-1/2 z-[101] w-full max-w-md -translate-x-1/2 -translate-y-1/2 p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative rounded-2xl border border-gray-200 bg-white p-6 shadow-2xl">
              <button
                type="button"
                onClick={hide}
                className="absolute right-3 top-3 rounded-full p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
              {status === "success" ? (
                <div className="py-4 text-center">
                  <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#10B981]/20 text-[#10B981]">
                    <Check className="h-6 w-6" />
                  </div>
                  <p className="font-semibold text-gray-900">Check your inbox</p>
                  <p className="mt-1 text-sm text-gray-600">
                    We sent your free Medical Bill Guide + AI scan link.
                  </p>
                </div>
              ) : (
                <>
                  <div className="mb-3 flex items-center gap-2 text-[#0F4C81]">
                    <FileText className="h-6 w-6 shrink-0" />
                    <span className="text-sm font-bold uppercase tracking-wide">Free download</span>
                  </div>
                  <h3 className="pr-10 text-xl font-bold text-gray-900">
                    Wait! Get Our Free Medical Bill Guide
                  </h3>
                  <p className="mt-2 text-gray-600">
                    <strong>5 mistakes</strong> that inflate your bill + <strong>free 2‑min AI scan</strong> link. No spam—just the guide and your results.
                  </p>
                  <form onSubmit={handleSubmit} className="mt-6">
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter your email"
                      className="w-full rounded-lg border border-gray-300 px-4 py-3 text-gray-900 placeholder:text-gray-400 focus:border-[#0F4C81] focus:outline-none focus:ring-2 focus:ring-[#0F4C81]/20"
                      disabled={status === "loading"}
                    />
                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="mt-3 w-full rounded-lg bg-[#0F4C81] py-3 font-bold text-white hover:bg-[#0F4C81]/90 disabled:opacity-70"
                    >
                      {status === "loading" ? "Sending..." : "Send me the free guide"}
                    </button>
                  </form>
                  {status === "error" && (
                    <p className="mt-2 text-sm text-red-600">Please enter a valid email.</p>
                  )}
                  <p className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-xs text-gray-500">
                    <span>✓ No spam</span>
                    <span>✓ Free guide + scan link</span>
                    <span>✓ 10,000+ patients</span>
                  </p>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
