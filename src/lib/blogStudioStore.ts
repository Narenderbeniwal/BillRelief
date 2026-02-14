"use client";

import { create } from "zustand";

type EditorMode = "edit" | "split" | "preview";

interface BlogStudioState {
  title: string;
  slug: string;
  coverImage: string;
  content: string;
  tags: string[];
  readingTime: number;
  wordCount: number;
  sentiment: "positive" | "neutral" | "negative" | null;
  seoScore: number;
  isSaving: boolean;
  lastSavedAt: Date | null;
  editorMode: EditorMode;
  showLeftSidebar: boolean;
  showRightSidebar: boolean;

  setTitle: (title: string) => void;
  setSlug: (slug: string) => void;
  setCoverImage: (url: string) => void;
  setContent: (content: string) => void;
  setTags: (tags: string[]) => void;
  setEditorMode: (mode: EditorMode) => void;
  toggleLeftSidebar: () => void;
  toggleRightSidebar: () => void;
  markSaving: () => void;
  markSaved: () => void;
  recomputeStats: () => void;
}

export const useBlogStudioStore = create<BlogStudioState>((set, get) => ({
  title: "",
  slug: "",
  coverImage: "",
  content: "",
  tags: [],
  readingTime: 0,
  wordCount: 0,
  sentiment: null,
  seoScore: 0,
  isSaving: false,
  lastSavedAt: null,
  editorMode: "edit",
  showLeftSidebar: true,
  showRightSidebar: true,

  setTitle: (title) => set({ title }),
  setSlug: (slug) => set({ slug }),
  setCoverImage: (url) => set({ coverImage: url }),
  setContent: (content) => set({ content }),
  setTags: (tags) => set({ tags }),
  setEditorMode: (mode) => set({ editorMode: mode }),
  toggleLeftSidebar: () =>
    set((state) => ({ showLeftSidebar: !state.showLeftSidebar })),
  toggleRightSidebar: () =>
    set((state) => ({ showRightSidebar: !state.showRightSidebar })),
  markSaving: () => set({ isSaving: true }),
  markSaved: () => set({ isSaving: false, lastSavedAt: new Date() }),
  recomputeStats: () => {
    const text = get().content.replace(/<[^>]+>/g, " ");
    const words = text
      .split(/\s+/)
      .map((w) => w.trim())
      .filter(Boolean);
    const wordCount = words.length;
    const readingTime = Math.max(1, Math.round(wordCount / 200));

    // Simple heuristic sentiment + SEO score placeholders
    const lower = text.toLowerCase();
    let sentiment: BlogStudioState["sentiment"] = "neutral";
    if (lower.includes("great") || lower.includes("excellent")) {
      sentiment = "positive";
    } else if (lower.includes("bad") || lower.includes("terrible")) {
      sentiment = "negative";
    }

    const seoScore = Math.min(100, Math.round((wordCount / 1500) * 100));

    set({ wordCount, readingTime, sentiment, seoScore });
  },
}));

