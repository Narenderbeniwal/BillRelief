"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { RichTextEditor } from "@/components/blog/RichTextEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CATEGORIES = [
  "Personal Finance",
  "Company News",
  "Health Insurance",
  "Reduce Medical Bills",
  "General",
];

function wordCount(html: string): number {
  const text = html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
  return text ? text.split(" ").length : 0;
}

function readingTimeMinutes(html: string): number {
  return Math.max(1, Math.round(wordCount(html) / 200));
}

export function BlogWriteClient() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editSlug = searchParams.get("edit");

  const [title, setTitle] = useState("");
  const [subtitle, setSubtitle] = useState("");
  const [content, setContent] = useState("");
  const [featuredImage, setFeaturedImage] = useState("");
  const [category, setCategory] = useState("General");
  const [tags, setTags] = useState("");
  const [slug, setSlug] = useState("");
  const [metaTitle, setMetaTitle] = useState("");
  const [metaDescription, setMetaDescription] = useState("");
  const [visibility, setVisibility] = useState<"draft" | "published">("draft");
  const [commentsEnabled, setCommentsEnabled] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showPublishModal, setShowPublishModal] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadingEdit, setLoadingEdit] = useState(!!editSlug);

  useEffect(() => {
    if (!editSlug) return;
    let cancelled = false;
    (async () => {
      setLoadingEdit(true);
      try {
        const res = await fetch(`/api/blogs/${editSlug}`);
        if (!res.ok) throw new Error("Post not found");
        const post = await res.json();
        if (cancelled) return;
        setTitle(post.title ?? "");
        setSubtitle(post.subtitle ?? "");
        setContent(post.contentHtml ?? "");
        setFeaturedImage(post.featuredImage ?? post.coverImage ?? "");
        setCategory(post.category ?? "General");
        setTags(Array.isArray(post.tags) ? post.tags.join(", ") : "");
        setSlug(post.slug ?? "");
        setMetaTitle(post.metaTitle ?? "");
        setMetaDescription(post.metaDescription ?? "");
        setVisibility(post.published ? "published" : "draft");
        setCommentsEnabled(post.commentsEnabled ?? true);
      } catch {
        if (!cancelled) setError("Could not load post");
      } finally {
        if (!cancelled) setLoadingEdit(false);
      }
    })();
    return () => { cancelled = true; };
  }, [editSlug]);

  const words = wordCount(content);
  const readTime = readingTimeMinutes(content);

  const generateSlug = useCallback(() => {
    const base = title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80);
    setSlug(base || "post");
  }, [title]);

  const saveDraft = async () => {
    setSaving(true);
    setError(null);
    const payload = {
      title: title || "Untitled",
      subtitle: subtitle || null,
      contentHtml: content || "<p></p>",
      excerpt: null,
      featuredImage: featuredImage || null,
      coverImage: featuredImage || null,
      category,
      tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      metaTitle: metaTitle || null,
      metaDescription: metaDescription || null,
      status: "draft",
      published: false,
      readTime,
      commentsEnabled,
    };
    try {
      if (editSlug) {
        const res = await fetch(`/api/blogs/${editSlug}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(await res.text());
        router.push(`/blog/my-posts?draft=saved`);
      } else {
        const res = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(await res.text());
        const post = await res.json();
        router.push(`/blog/my-posts?draft=saved`);
      }
    } catch (err: any) {
      setError(err.message ?? "Failed to save");
    } finally {
      setSaving(false);
    }
  };

  const openPublishModal = () => {
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    setError(null);
    setShowPublishModal(true);
  };

  const publishNow = async () => {
    setSaving(true);
    setError(null);
    const payload = {
      title: title.trim(),
      subtitle: subtitle.trim() || null,
      contentHtml: content || "<p></p>",
      excerpt: null,
      featuredImage: featuredImage.trim() || null,
      coverImage: featuredImage.trim() || null,
      category,
      tags: tags ? tags.split(",").map((t) => t.trim()).filter(Boolean) : [],
      metaTitle: metaTitle.trim() || null,
      metaDescription: metaDescription.trim() || null,
      status: "published",
      published: true,
      readTime,
      commentsEnabled,
    };
    try {
      if (editSlug) {
        const res = await fetch(`/api/blogs/${editSlug}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(await res.text());
        const post = await res.json();
        setShowPublishModal(false);
        router.push(`/blog/${post.slug}?published=1`);
      } else {
        const res = await fetch("/api/blogs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (!res.ok) throw new Error(await res.text());
        const post = await res.json();
        setShowPublishModal(false);
        router.push(`/blog/${post.slug}?published=1`);
      }
    } catch (err: any) {
      setError(err.message ?? "Failed to publish");
    } finally {
      setSaving(false);
    }
  };

  if (loadingEdit) {
    return (
      <div className="max-w-4xl mx-auto py-12 text-center text-muted-foreground">
        Loading post...
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <Link
          href="/blog"
          className="text-sm font-medium text-muted-foreground hover:text-foreground"
        >
          ← Back to Blogs
        </Link>
        <div className="flex gap-2">
          <Button variant="outline" onClick={saveDraft} disabled={saving}>
            Save Draft
          </Button>
          <Button variant="outline" onClick={() => setShowPreview(true)}>
            Preview
          </Button>
          <Button
            className="bg-[#FDDA0D] text-gray-900 hover:bg-[#f5d00a]"
            onClick={openPublishModal}
            disabled={saving}
          >
            Publish →
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
        <div className="space-y-6">
          <div>
            <Label>Title</Label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter title"
              className="mt-1 text-lg font-semibold"
            />
          </div>
          <div>
            <Label>Subtitle (optional)</Label>
            <Input
              value={subtitle}
              onChange={(e) => setSubtitle(e.target.value)}
              placeholder="Optional subtitle"
              className="mt-1"
            />
          </div>
          <div>
            <Label>Content</Label>
            <div className="mt-1 border rounded-lg overflow-hidden bg-white">
              <RichTextEditor value={content} onChange={setContent} />
            </div>
            <p className="mt-1 text-xs text-muted-foreground">
              {words} words · ~{readTime} min read
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <Label>Featured image URL</Label>
            <Input
              value={featuredImage}
              onChange={(e) => setFeaturedImage(e.target.value)}
              placeholder="https://..."
              className="mt-1"
            />
          </div>
          <div>
            <Label>Category</Label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
            >
              {CATEGORIES.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
          <div>
            <Label>Tags (comma-separated)</Label>
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="medical bills, insurance, ..."
              className="mt-1"
            />
          </div>
          <div>
            <Label>URL slug</Label>
            <div className="flex gap-2 mt-1">
              <Input
                value={slug}
                onChange={(e) => setSlug(e.target.value)}
                placeholder="auto-generated"
              />
              <Button type="button" variant="outline" size="sm" onClick={generateSlug}>
                Generate
              </Button>
            </div>
          </div>
          <div>
            <Label>Visibility</Label>
            <div className="mt-2 space-y-2">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visibility"
                  checked={visibility === "draft"}
                  onChange={() => setVisibility("draft")}
                />
                Draft
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  name="visibility"
                  checked={visibility === "published"}
                  onChange={() => setVisibility("published")}
                />
                Public
              </label>
            </div>
          </div>
          <div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={commentsEnabled}
                onChange={(e) => setCommentsEnabled(e.target.checked)}
              />
              <span className="text-sm">Allow comments</span>
            </label>
          </div>
        </div>
      </div>

      {error && (
        <p className="mt-4 text-sm text-red-600">{error}</p>
      )}

      {/* Preview modal */}
      {showPreview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden flex flex-col">
            <div className="p-4 border-b flex justify-between items-center">
              <h3 className="font-bold">Preview</h3>
              <Button variant="ghost" size="sm" onClick={() => setShowPreview(false)}>
                Close
              </Button>
            </div>
            <div className="p-6 overflow-auto flex-1">
              <h1 className="text-2xl font-bold mb-2">{title || "Untitled"}</h1>
              {subtitle && <p className="text-muted-foreground mb-4">{subtitle}</p>}
              <div className="prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: content || "<p>No content yet.</p>" }} />
            </div>
          </div>
        </div>
      )}

      {/* Publish confirmation modal */}
      {showPublishModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-bold">Ready to Publish?</h3>
            <div className="mt-4 p-4 rounded-lg bg-gray-50 text-sm">
              <p className="font-medium">{title || "Untitled"}</p>
              <p className="text-muted-foreground mt-1">Category: {category}</p>
              <p className="text-muted-foreground">
                Tags: {tags || "—"}
              </p>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              This will be visible to all visitors.
            </p>
            <div className="mt-6 flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setShowPublishModal(false)}>
                Go Back
              </Button>
              <Button
                className="bg-[#0F4C81]"
                onClick={publishNow}
                disabled={saving}
              >
                {saving ? "Publishing..." : "Publish Now →"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
