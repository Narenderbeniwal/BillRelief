"use client";

import { motion } from "framer-motion";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

export function OnboardingProgressBar({
  current,
  total,
  className,
}: {
  current: number;
  total: number;
  className?: string;
}) {
  const percent = total > 0 ? Math.round((current / total) * 100) : 0;

  return (
    <div className={cn("w-full", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-muted-foreground">
          Step {current} of {total}
        </span>
        <span className="text-sm font-medium text-muted-foreground">
          {percent}% Complete
        </span>
      </div>
      <Progress value={percent} className="h-2" />
    </div>
  );
}
