"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Zap, Clock, FileCheck, Users, AlertCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

export type LandingCTAVariant = "primary" | "secondary" | "inline";

const variantStyles = {
  primary: "bg-gradient-to-r from-amber-400 via-[#FDDA0D] to-amber-500 text-gray-900",
  secondary: "bg-gradient-to-r from-[#0F4C81] to-[#1e5a9e] text-white",
  inline: "bg-transparent",
};

const ICON_MAP = {
  zap: Zap,
  clock: Clock,
  fileCheck: FileCheck,
  users: Users,
  alertCircle: AlertCircle,
} as const;

export type LandingCTAIconName = keyof typeof ICON_MAP;

export interface LandingCTAProps {
  headline: string;
  valueProp: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  trustLine?: string;
  icon?: LandingCTAIconName;
  variant?: keyof typeof variantStyles;
  className?: string;
}

export function LandingCTA({
  headline,
  valueProp,
  primaryLabel,
  primaryHref,
  secondaryLabel,
  secondaryHref,
  trustLine = "No upfront cost · Only pay if we save you · 10,000+ bills reduced",
  icon: iconName,
  variant = "secondary",
  className = "",
}: LandingCTAProps) {
  const isDark = variant === "secondary";
  const textClass = isDark ? "text-white" : "text-gray-900";
  const Icon = iconName ? ICON_MAP[iconName] : null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className={`py-16 md:py-20 ${variantStyles[variant]} ${className}`}
    >
      <div className="container mx-auto px-4 text-center">
        {Icon && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            className={`mb-4 inline-flex h-14 w-14 items-center justify-center rounded-full ${isDark ? "bg-white/20 text-white" : "bg-[#0F4C81]/10 text-[#0F4C81]"}`}
          >
            <Icon className="h-7 w-7" />
          </motion.div>
        )}
        <h2 className={`text-2xl font-bold md:text-3xl lg:text-4xl ${textClass}`}>
          {headline}
        </h2>
        <p className={`mx-auto mt-3 max-w-xl text-base md:text-lg ${isDark ? "text-white/90" : "text-gray-700"}`}>
          {valueProp}
        </p>
        <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
          <Button
            asChild
            size="lg"
            variant="yellow"
            className="min-w-[200px] text-base font-bold shadow-lg hover:opacity-95"
          >
            <Link href={primaryHref}>{primaryLabel}</Link>
          </Button>
          {secondaryLabel && secondaryHref && (
            <Button
              asChild
              size="lg"
              variant="outline"
              className={`min-w-[180px] border-2 ${isDark ? "border-white text-white hover:bg-white/10" : "border-[#0F4C81] text-[#0F4C81] hover:bg-[#0F4C81]/10"}`}
            >
              <Link href={secondaryHref}>{secondaryLabel}</Link>
            </Button>
          )}
        </div>
        {trustLine && (
          <p className={`mt-6 text-sm ${isDark ? "text-white/80" : "text-gray-600"}`}>
            {trustLine}
          </p>
        )}
      </div>
    </motion.section>
  );
}
