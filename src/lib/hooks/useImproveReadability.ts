"use client";

import { useMutation } from "@tanstack/react-query";

interface ImprovePayload {
  content: string;
}

export function useImproveReadability() {
  return useMutation({
    mutationFn: async ({ content }: ImprovePayload) => {
      const res = await fetch("/api/ai", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          action: "improve_readability",
          content,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        throw new Error(data?.error || "Failed to improve readability");
      }

      const data = (await res.json()) as { content: string };
      return data.content;
    },
  });
}

