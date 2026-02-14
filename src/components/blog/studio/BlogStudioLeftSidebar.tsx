"use client";

import { motion } from "framer-motion";
import {
  Sparkles,
  Timer,
  Pencil,
  Mic,
  Link2,
  Type,
  BookOpen,
  BarChart3,
  Languages,
  ImageIcon,
  LayoutTemplate,
  MessageSquare,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useImproveReadability } from "@/lib/hooks/useImproveReadability";
import { useBlogStudioStore } from "@/lib/blogStudioStore";

const aiSections = [
  {
    title: "Generate",
    items: [
      {
        icon: Pencil,
        label: "Generate from Idea",
        description: "Turn a rough idea into a full outline.",
        eta: "~20s",
      },
      {
        icon: Mic,
        label: "Generate from Voice",
        description: "Record & transcribe, then structure as article.",
        eta: "~45s",
      },
      {
        icon: Link2,
        label: "Generate from URL",
        description: "Import & rewrite any article in your voice.",
        eta: "~35s",
      },
      {
        icon: Type,
        label: "Generate from Keywords",
        description: "SEO-optimized content around your key terms.",
        eta: "~30s",
      },
    ],
  },
  {
    title: "Enhance",
    items: [
      {
        icon: BookOpen,
        label: "Improve Readability",
        description: "Hemingway-style simplification, keep your tone.",
        eta: "~15s",
        action: "improve_readability",
      },
      {
        icon: BarChart3,
        label: "Add Statistics & Facts",
        description: "Auto-research supporting data and citations.",
        eta: "~40s",
      },
      {
        icon: LayoutTemplate,
        label: "Generate Meta Description",
        description: "SEO preview for Google and social cards.",
        eta: "~8s",
      },
      {
        icon: Languages,
        label: "Translate",
        description: "50+ languages with style preservation.",
        eta: "~25s",
      },
    ],
  },
  {
    title: "Visual",
    items: [
      {
        icon: ImageIcon,
        label: "Generate Cover Image",
        description: "AI art direction for your hero image.",
        eta: "~25s",
      },
      {
        icon: LayoutTemplate,
        label: "Generate Infographics",
        description: "Turn data into beautiful visuals.",
        eta: "~35s",
      },
      {
        icon: MessageSquare,
        label: "Generate Social Cards",
        description: "Auto-sized variants for every platform.",
        eta: "~18s",
      },
    ],
  },
];

export function BlogStudioLeftSidebar() {
  const { content, setContent, markSaving, markSaved, recomputeStats } =
    useBlogStudioStore();
  const improveMutation = useImproveReadability();

  async function handleActionClick(label: string, action?: string) {
    if (label === "Improve Readability" && action === "improve_readability") {
      if (!content.trim()) return;
      markSaving();
      try {
        const improved = await improveMutation.mutateAsync({ content });
        setContent(improved);
        recomputeStats();
      } finally {
        markSaved();
      }
      return;
    }

    // Other actions are UI-only stubs for now
  }

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-violet-500 to-sky-500 shadow-lg shadow-violet-500/40">
            <Sparkles className="h-4 w-4 text-white" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-200">
              AI Command Palette
            </p>
            <p className="text-[10px] text-slate-400">
              Press ⌘K anywhere to open
            </p>
          </div>
        </div>
        <div className="flex items-center gap-1 text-[10px] text-slate-400">
          <Timer className="h-3 w-3" />
          <span>Most run &lt; 30s</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        <div className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-[11px] text-slate-300 flex items-center justify-between gap-2">
          <span>Ask anything about your draft or say “rewrite intro shorter”.</span>
          <Button
            variant="outline"
            size="xs"
            className="border-white/15 bg-white/5 text-[10px] h-6"
          >
            ⌘⌥C Chat
          </Button>
        </div>

        {aiSections.map((section) => (
          <div key={section.title} className="space-y-2">
            <p className="text-[11px] font-semibold text-slate-300 uppercase tracking-wide">
              {section.title}
            </p>
            <div className="space-y-2">
              {section.items.map((item) => (
                <motion.button
                  key={item.label}
                  whileHover={{ y: -1, scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                  className="w-full text-left rounded-xl border border-white/10 bg-white/5 px-3 py-2.5 text-xs text-slate-200 hover:border-violet-400/60 hover:bg-violet-500/10 transition-colors disabled:opacity-60"
                  disabled={
                    item.label === "Improve Readability" &&
                    improveMutation.isPending
                  }
                  onClick={() =>
                    handleActionClick(item.label, item.action)
                  }
                >
                  <div className="flex items-start gap-2">
                    <span className="mt-0.5 rounded-full bg-white/5 p-1">
                      <item.icon className="h-3.5 w-3.5 text-violet-300" />
                    </span>
                    <div className="flex-1 space-y-0.5">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[11px] font-medium">
                          {item.label}
                          {item.label === "Improve Readability" &&
                            improveMutation.isPending &&
                            " · Running..."}
                        </span>
                        <span className="inline-flex items-center gap-1 rounded-full bg-slate-900/70 px-2 py-0.5 text-[10px] text-slate-300">
                          <Timer className="h-3 w-3" />
                          {item.eta}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-400">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </motion.button>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

