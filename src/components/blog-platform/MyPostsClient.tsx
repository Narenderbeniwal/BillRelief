"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";

type PostRow = {
  id: string;
  title: string;
  slug: string;
  status: string;
  published: boolean;
  publishedAt: string | null;
  views: number;
  commentCount: number;
  createdAt: string;
  updatedAt: string;
};

type Tab = "published" | "drafts" | "archived";

export function MyPostsClient() {
  const [tab, setTab] = useState<Tab>("published");
  const [posts, setPosts] = useState<PostRow[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/blogs?mine=1");
        if (!res.ok) throw new Error("Failed to load");
        const data = await res.json();
        if (!cancelled) setPosts(data);
      } catch {
        if (!cancelled) setPosts([]);
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, []);

  const published = posts.filter((p) => p.published && p.status !== "archived");
  const drafts = posts.filter((p) => !p.published || p.status === "draft");
  const archived = posts.filter((p) => p.status === "archived");

  const list =
    tab === "published"
      ? published
      : tab === "drafts"
        ? drafts
        : archived;

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold text-gray-900">My Blog Posts</h1>
        <Button asChild className="bg-[#FDDA0D] text-gray-900 hover:bg-[#f5d00a]">
          <Link href="/blog/write">+ Write New Post</Link>
        </Button>
      </div>

      <div className="flex gap-2 border-b mb-6">
        <button
          type="button"
          onClick={() => setTab("published")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            tab === "published"
              ? "border-[#0F4C81] text-[#0F4C81]"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Published ({published.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("drafts")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            tab === "drafts"
              ? "border-[#0F4C81] text-[#0F4C81]"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Drafts ({drafts.length})
        </button>
        <button
          type="button"
          onClick={() => setTab("archived")}
          className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
            tab === "archived"
              ? "border-[#0F4C81] text-[#0F4C81]"
              : "border-transparent text-muted-foreground hover:text-foreground"
          }`}
        >
          Archived ({archived.length})
        </button>
      </div>

      {loading ? (
        <p className="text-muted-foreground">Loading...</p>
      ) : list.length === 0 ? (
        <div className="rounded-xl border bg-white p-8 text-center">
          <FileText className="h-12 w-12 text-gray-300 mx-auto mb-4" />
          <h2 className="text-lg font-semibold text-gray-900">
            {tab === "published" && "You haven't published any posts yet"}
            {tab === "drafts" && "No drafts"}
            {tab === "archived" && "No archived posts"}
          </h2>
          <p className="mt-2 text-muted-foreground max-w-sm mx-auto">
            {tab === "published" &&
              "Share your expertise about medical bills, insurance, and healthcare costs."}
            {tab === "drafts" && "Save a post as draft from the editor."}
            {tab === "archived" && "Archive a published post from its actions."}
          </p>
          {tab === "published" && (
            <Button asChild className="mt-4 bg-[#0F4C81]">
              <Link href="/blog/write">Write Your First Post →</Link>
            </Button>
          )}
        </div>
      ) : (
        <ul className="space-y-4">
          {list.map((post) => (
            <li
              key={post.id}
              className="rounded-xl border bg-white p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3"
            >
              <div className="min-w-0">
                <h2 className="font-semibold text-gray-900 truncate">
                  {post.title || "Untitled"}
                </h2>
                <p className="text-sm text-muted-foreground mt-0.5">
                  {post.published && post.publishedAt
                    ? `Published ${new Date(post.publishedAt).toLocaleDateString()}`
                    : `Updated ${new Date(post.updatedAt).toLocaleDateString()}`}
                  {post.published && (
                    <>
                      {" · "}
                      {post.views} views · {post.commentCount} comments
                    </>
                  )}
                </p>
              </div>
              <div className="flex flex-wrap gap-2 shrink-0">
                {post.published ? (
                  <>
                    <Button asChild variant="outline" size="sm">
                      <Link href={`/blog/${post.slug}`}>View</Link>
                    </Button>
                  </>
                ) : null}
                <Button asChild variant="outline" size="sm">
                  <Link href={`/blog/write?edit=${post.slug}`}>Edit</Link>
                </Button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
