"use client";

import { useMemo } from "react";
import {
  ImageIcon,
  Link2,
  Tag,
  Calendar,
  BarChart3,
  Users,
  Eye,
  ArrowUpRight,
} from "lucide-react";
import { useBlogStudioStore } from "@/lib/blogStudioStore";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function BlogStudioRightSidebar() {
  const {
    coverImage,
    setCoverImage,
    slug,
    setSlug,
    wordCount,
    readingTime,
    sentiment,
    seoScore,
  } = useBlogStudioStore();

  const sentimentLabel = useMemo(() => {
    if (sentiment === "positive") return "Positive";
    if (sentiment === "negative") return "Needs Softer Tone";
    return "Balanced";
  }, [sentiment]);

  return (
    <div className="flex-1 flex flex-col">
      <div className="border-b border-white/10 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-gradient-to-br from-sky-500 to-emerald-500 shadow-lg shadow-emerald-500/40">
            <Eye className="h-4 w-4 text-white" />
          </span>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-slate-200">
              Smart Settings
            </p>
            <p className="text-[10px] text-slate-400">
              Visuals · SEO · Publish controls
            </p>
          </div>
        </div>
        <Button
          size="icon"
          variant="outline"
          className="h-7 w-7 border-white/15 bg-white/5"
        >
          <ArrowUpRight className="h-3.5 w-3.5" />
        </Button>
      </div>

      <div className="flex-1 overflow-y-auto px-3 py-3 space-y-4">
        {/* Featured Image */}
        <section className="space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-200">
              Featured Image
            </span>
            <span className="text-slate-400 text-[10px]">Hero · Social · OG</span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-2 space-y-2">
            <div className="aspect-[16/9] w-full rounded-lg border border-dashed border-white/15 bg-slate-950/70 flex items-center justify-center text-[11px] text-slate-400">
              {coverImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={coverImage}
                  alt="Cover"
                  className="h-full w-full object-cover rounded-lg"
                />
              ) : (
                <div className="flex flex-col items-center gap-1">
                  <ImageIcon className="h-4 w-4 text-slate-500" />
                  <span>Paste an image URL or let AI design one</span>
                </div>
              )}
            </div>
            <Input
              placeholder="https://images.unsplash.com/..."
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              className="h-7 bg-slate-950/70 border-white/15 text-[11px] placeholder:text-slate-500"
            />
            <div className="flex gap-2">
              <Button
                size="xs"
                variant="outline"
                className="flex-1 border-white/15 bg-slate-950/70 text-[11px]"
              >
                AI Cover
              </Button>
              <Button
                size="xs"
                variant="outline"
                className="flex-1 border-white/15 bg-slate-950/70 text-[11px]"
              >
                Unsplash
              </Button>
            </div>
          </div>
        </section>

        {/* URL slug */}
        <section className="space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-200">URL Slug</span>
            <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400">
              <Link2 className="h-3 w-3" />
              SEO-friendly
            </span>
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-2 space-y-1.5">
            <Input
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              placeholder="revolutionary-medical-bill-playbook"
              className="h-7 bg-slate-950/70 border-white/15 text-[11px] placeholder:text-slate-500"
            />
            <div className="flex items-center justify-between text-[10px]">
              <span className="text-slate-400">
                Status: <span className="text-emerald-400">Available ✓</span>
              </span>
              <span className="text-slate-400">Slug score: 92/100</span>
            </div>
          </div>
        </section>

        {/* Tags & analytics preview */}
        <section className="space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-200">
              Tags & Audience
            </span>
            <Tag className="h-3.5 w-3.5 text-slate-400" />
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-2 space-y-1.5 text-[10px] text-slate-300">
            <p>
              Auto-generated tags from content (coming soon). Think:
              <span className="ml-1 inline-flex flex-wrap gap-1">
                <span className="rounded-full bg-slate-950/70 px-2 py-0.5">
                  medical-bills
                </span>
                <span className="rounded-full bg-slate-950/70 px-2 py-0.5">
                  insurance
                </span>
                <span className="rounded-full bg-slate-950/70 px-2 py-0.5">
                  negotiation
                </span>
              </span>
            </p>
          </div>
        </section>

        {/* Content analysis */}
        <section className="space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-200">
              Content Analysis
            </span>
            <BarChart3 className="h-3.5 w-3.5 text-slate-400" />
          </div>
          <div className="grid grid-cols-2 gap-2 text-[10px]">
            <div className="rounded-xl border border-white/10 bg-slate-950/70 p-2 space-y-1">
              <p className="text-slate-400">Word count</p>
              <p className="text-sm font-semibold text-slate-50">
                {wordCount}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/70 p-2 space-y-1">
              <p className="text-slate-400">Reading time</p>
              <p className="text-sm font-semibold text-slate-50">
                {readingTime} min
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/70 p-2 space-y-1">
              <p className="text-slate-400">Tone</p>
              <p className="text-sm font-semibold text-slate-50">
                {sentimentLabel}
              </p>
            </div>
            <div className="rounded-xl border border-white/10 bg-slate-950/70 p-2 space-y-1">
              <p className="text-slate-400">SEO score</p>
              <p className="text-sm font-semibold text-emerald-400">
                {seoScore}/100
              </p>
            </div>
          </div>
        </section>

        {/* Publication controls (skeleton) */}
        <section className="space-y-2">
          <div className="flex items-center justify-between text-[11px]">
            <span className="font-semibold text-slate-200">
              Publication Options
            </span>
            <Calendar className="h-3.5 w-3.5 text-slate-400" />
          </div>
          <div className="rounded-xl border border-white/10 bg-white/5 p-2 space-y-1.5 text-[10px] text-slate-300">
            <p>Schedule, draft, and social publishing controls coming next.</p>
            <div className="flex items-center justify-between mt-1">
              <div className="inline-flex items-center gap-1 text-slate-400">
                <Users className="h-3 w-3" />
                <span>Team review · Share draft</span>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

