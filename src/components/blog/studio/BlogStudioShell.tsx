"use client";

import { useEffect } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useBlogStudioStore } from "@/lib/blogStudioStore";
import { Command, Settings2, Sparkles, PanelRightClose } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BlogStudioEditor } from "./BlogStudioEditor";
import { BlogStudioLeftSidebar } from "./BlogStudioLeftSidebar";
import { BlogStudioRightSidebar } from "./BlogStudioRightSidebar";

export function BlogStudioShell() {
  const {
    showLeftSidebar,
    showRightSidebar,
    toggleLeftSidebar,
    toggleRightSidebar,
    isSaving,
    lastSavedAt,
  } = useBlogStudioStore();

  // Keyboard shortcuts (Cmd+K for palette, Cmd+\ for sidebar toggle)
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      const meta = e.metaKey || e.ctrlKey;
      if (meta && e.key.toLowerCase() === "k") {
        e.preventDefault();
        toggleLeftSidebar();
      }
      if (meta && e.key === "\\") {
        e.preventDefault();
        toggleRightSidebar();
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [toggleLeftSidebar, toggleRightSidebar]);

  return (
    <div className="relative min-h-[calc(100vh-4rem)] flex gap-4 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-50">
      {/* Glass gradient overlay */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(124,58,237,0.25),transparent_55%),_radial-gradient(circle_at_bottom,_rgba(59,130,246,0.2),transparent_55%)]" />

      {/* Left AI sidebar */}
      {showLeftSidebar && (
        <motion.aside
          initial={{ x: -40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -40, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-[320px] hidden lg:flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_60px_rgba(15,23,42,0.65)] overflow-hidden"
        >
          <BlogStudioLeftSidebar />
        </motion.aside>
      )}

      {/* Center editor */}
      <main className="relative z-10 flex-1 flex flex-col">
        <header className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-slate-100 shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-violet-300" />
              AI Studio
            </span>
            <span className="hidden md:inline text-xs text-slate-400">
              Type <kbd className="rounded bg-white/10 px-1 text-[10px]">/</kbd>{" "}
              for commands ·{" "}
              <kbd className="rounded bg-white/10 px-1 text-[10px]">⌘K</kbd> AI
              palette
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-xs text-slate-400">
              {isSaving
                ? "Saving..."
                : lastSavedAt
                ? `Saved ${Math.max(
                    1,
                    Math.round(
                      (Date.now() - lastSavedAt.getTime()) / 1000
                    )
                  )}s ago`
                : "Not saved yet"}
            </span>
            <Button
              variant="outline"
              size="icon"
              className="border-white/10 bg-white/5 hover:bg-white/10"
              onClick={toggleLeftSidebar}
            >
              <Command className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="border-white/10 bg-white/5 hover:bg-white/10"
              onClick={toggleRightSidebar}
            >
              <PanelRightClose className="h-4 w-4" />
            </Button>
          </div>
        </header>

        <section
          className={cn(
            "flex-1 rounded-2xl border border-white/10 bg-slate-950/40 backdrop-blur-2xl shadow-[0_18px_60px_rgba(15,23,42,0.85)] overflow-hidden flex",
            "ring-1 ring-purple-500/20"
          )}
        >
          <BlogStudioEditor />
        </section>
      </main>

      {/* Right smart settings sidebar */}
      {showRightSidebar && (
        <motion.aside
          initial={{ x: 40, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 40, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="relative z-10 w-[360px] hidden xl:flex flex-col rounded-2xl border border-white/10 bg-white/5 backdrop-blur-xl shadow-[0_18px_60px_rgba(15,23,42,0.65)] overflow-hidden"
        >
          <BlogStudioRightSidebar />
        </motion.aside>
      )}
    </div>
  );
}

