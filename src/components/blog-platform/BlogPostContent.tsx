"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useMemo, useCallback, useEffect } from "react";
import {
  Twitter,
  Linkedin,
  Facebook,
  Mail,
  MessageCircle,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const DEFAULT_HERO_IMAGE =
  "https://images.unsplash.com/photo-1584982751601-97dcc096659c?w=900&q=80";
const BLOG_NAVY = "#1a2e5a";

type Post = {
  slug: string;
  title: string;
  subtitle?: string;
  contentHtml: string;
  category: string;
  featuredImage?: string;
  publishedAt: Date;
  updatedAt?: Date;
  readTime?: number;
  author?: { name: string; image?: string; bio?: string };
  commentsEnabled: boolean;
  views: number;
};

type Related = {
  slug: string;
  title: string;
  excerpt?: string;
  image?: string;
  readTime?: number;
  publishedAt?: Date;
};

type Props = { post: Post; related: Related[] };

function addHeadingIds(html: string): { html: string; toc: { id: string; text: string; level: number }[] } {
  const toc: { id: string; text: string; level: number }[] = [];
  const slugify = (s: string) =>
    s
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  let index = 0;
  const addId = (tag: string, attrs: string, text: string, level: number) => {
    const id = slugify(text) || `heading-${++index}`;
    toc.push({ id, text: text.trim(), level });
    return `<${tag}${attrs} id="${id}">${text}</${tag}>`;
  };
  let htmlWithIds = html
    .replace(/<h1([^>]*)>([^<]+)<\/h1>/gi, (_, a, t) => addId("h1", a, t, 1))
    .replace(/<h2([^>]*)>([^<]+)<\/h2>/gi, (_, a, t) => addId("h2", a, t, 2))
    .replace(/<h3([^>]*)>([^<]+)<\/h3>/gi, (_, a, t) => addId("h3", a, t, 3))
    .replace(/<h4([^>]*)>([^<]+)<\/h4>/gi, (_, a, t) => addId("h4", a, t, 4));
  return { html: htmlWithIds, toc };
}

function wrapTablesForMobile(html: string): string {
  if (!html.includes("<table")) return html;
  return html
    .replace(/<table(\s[^>]*)?>/gi, '<div class="overflow-x-auto -mx-4 px-4 my-4 blog-table-scroll"><table$1>')
    .replace(/<\/table>/gi, "</table></div>");
}

export function BlogPostContent({ post, related }: Props) {
  const { data: session, status } = useSession();
  const [copied, setCopied] = useState(false);
  const { html: contentHtml } = useMemo(() => {
    const { html } = addHeadingIds(post.contentHtml);
    return { html: wrapTablesForMobile(html) };
  }, [post.contentHtml]);

  const publishedStr = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : "";
  const updatedStr = post.updatedAt
    ? new Date(post.updatedAt).toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      })
    : publishedStr;
  const shareUrl =
    typeof window !== "undefined"
      ? window.location.href
      : `https://www.billreliefai.com/blog/${post.slug}`;
  const shareText = encodeURIComponent(post.title);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const heroImage = post.featuredImage || DEFAULT_HERO_IMAGE;

  return (
    <main className="flex-1 bg-white">
      <article className="blog-article mx-auto w-full max-w-[900px] px-4 py-10 sm:px-6 sm:py-11 md:px-8 md:py-12 pl-[max(1rem,env(safe-area-inset-left))] pr-[max(1rem,env(safe-area-inset-right))]">
        {/* H1 – extra large, centered, navy */}
        <h1
          className="text-center font-bold leading-tight"
          style={{ color: BLOG_NAVY, fontSize: "clamp(1.75rem, 5vw, 3rem)" }}
        >
          {post.title}
        </h1>

        {/* Metadata + social row */}
        <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-[#6b7280]">
            Published {publishedStr}
            {post.updatedAt && post.updatedAt !== post.publishedAt
              ? ` | Updated ${updatedStr}`
              : ""}
          </p>
          <div className="flex items-center gap-2">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on X"
              className="rounded-full p-2 text-[#6b7280] hover:bg-gray-100 hover:text-[#1a2e5a]"
            >
              <Twitter className="h-5 w-5" />
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on Facebook"
              className="rounded-full p-2 text-[#6b7280] hover:bg-gray-100 hover:text-[#1a2e5a]"
            >
              <Facebook className="h-5 w-5" />
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Share on LinkedIn"
              className="rounded-full p-2 text-[#6b7280] hover:bg-gray-100 hover:text-[#1a2e5a]"
            >
              <Linkedin className="h-5 w-5" />
            </a>
            <a
              href={`mailto:?subject=${encodeURIComponent(post.title)}&body=${encodeURIComponent(shareUrl)}`}
              aria-label="Share by email"
              className="rounded-full p-2 text-[#6b7280] hover:bg-gray-100 hover:text-[#1a2e5a]"
            >
              <Mail className="h-5 w-5" />
            </a>
          </div>
        </div>

        {/* Hero image – full content width, 16:9, rounded */}
        <div className="mt-8 aspect-video w-full overflow-hidden rounded-lg bg-gray-100">
          <img
            src={heroImage}
            alt=""
            className="h-full w-full object-cover"
          />
        </div>

        {/* Body – single column, no sidebar */}
        <div
          className="blog-article-prose mt-10 scroll-mt-24"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        {/* CTA */}
        <div
          className="mt-12 rounded-lg p-6 text-white"
          style={{ background: BLOG_NAVY }}
        >
          <h3 className="text-xl font-bold">
            Need Help Negotiating Your Medical Bill?
          </h3>
          <p className="mt-2 opacity-90">
            Our AI can analyze your bill and find errors in 48 hours.
          </p>
          <Button
            asChild
            className="mt-4 bg-[#FDDA0D] text-gray-900 hover:bg-[#f5d00a]"
          >
            <Link href="/get-started">Get Free Analysis →</Link>
          </Button>
        </div>

        {/* Author */}
        {post.author && (
          <section className="mt-12 flex gap-4 border-t border-gray-200 pt-8">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-full bg-gray-200">
              {post.author.image ? (
                <img
                  src={post.author.image}
                  alt=""
                  className="h-full w-full object-cover"
                />
              ) : (
                <User className="h-7 w-7 text-gray-500" />
              )}
            </div>
            <div>
              <p className="font-semibold text-[#1a2e5a]">{post.author.name}</p>
              <p className="mt-1 text-sm text-[#6b7280]">
                Medical Bill Advocate & Financial Expert
              </p>
              {post.author.bio && (
                <p className="mt-2 text-sm text-[#333]">{post.author.bio}</p>
              )}
              <a
                href="https://www.linkedin.com/company/billrelief"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-sm font-bold text-[#1a2e5a] no-underline hover:underline"
              >
                Follow on LinkedIn →
              </a>
            </div>
          </section>
        )}

        {/* Related */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2
              className="mb-6 font-bold"
              style={{ color: BLOG_NAVY, fontSize: "1.75rem" }}
            >
              Related Posts
            </h2>
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group overflow-hidden rounded-xl border border-gray-200 bg-white transition-shadow hover:shadow-md"
                >
                  <div className="aspect-[16/10] bg-gray-100">
                    {r.image ? (
                      <img
                        src={r.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#1a2e5a] line-clamp-2 group-hover:underline">
                      {r.title}
                    </h3>
                    {r.excerpt && (
                      <p className="mt-1 line-clamp-2 text-sm text-[#6b7280]">
                        {r.excerpt}
                      </p>
                    )}
                    <span className="mt-2 inline-block text-sm font-bold text-[#1a2e5a]">
                      Read more →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Comments */}
        {post.commentsEnabled && (
          <section className="mt-16 border-t border-gray-200 pt-8">
            <h2
              className="flex items-center gap-2 font-bold"
              style={{ color: BLOG_NAVY, fontSize: "1.25rem" }}
            >
              <MessageCircle className="h-5 w-5" />
              Comments
            </h2>
            {status === "loading" ? (
              <p className="mt-4 text-[#6b7280]">Loading...</p>
            ) : !session ? (
              <p className="mt-4 text-[#6b7280]">
                <Link
                  href="/login"
                  className="font-bold text-[#1a2e5a] no-underline hover:underline"
                >
                  Log in
                </Link>{" "}
                to comment.
              </p>
            ) : (
              <CommentsSection postSlug={post.slug} />
            )}
          </section>
        )}
      </article>
    </main>
  );
}

function CommentsSection({ postSlug }: { postSlug: string }) {
  const [content, setContent] = useState("");
  const [comments, setComments] = useState<
    { id: string; content: string; authorName: string; createdAt: string }[]
  >([]);
  const [loading, setLoading] = useState(false);
  const [fetched, setFetched] = useState(false);

  const loadComments = useCallback(async () => {
    if (fetched) return;
    try {
      const res = await fetch(`/api/blogs/${postSlug}/comments`);
      if (res.ok) {
        const data = await res.json();
        setComments(Array.isArray(data) ? data : []);
      }
      setFetched(true);
    } catch {
      setFetched(true);
    }
  }, [postSlug, fetched]);

  useEffect(() => {
    loadComments();
  }, [loadComments]);

  const submitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    setLoading(true);
    try {
      const res = await fetch(`/api/blogs/${postSlug}/comments`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: content.trim() }),
      });
      if (res.ok) {
        const newComment = await res.json();
        setComments((prev) => [
          {
            id: newComment.id,
            content: newComment.content,
            authorName: newComment.author?.name ?? "You",
            createdAt: newComment.createdAt,
          },
          ...prev,
        ]);
        setContent("");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-4">
      <form onSubmit={submitComment} className="mt-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write a comment..."
          className="min-h-[100px] w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-[#333]"
          disabled={loading}
        />
        <Button type="submit" className="mt-2" disabled={loading || !content.trim()}>
          Post comment
        </Button>
      </form>
      <ul className="mt-6 space-y-4">
        {comments.map((c) => (
          <li key={c.id} className="border-l-2 border-gray-200 py-1 pl-4">
            <p className="text-sm font-medium text-[#1a2e5a]">{c.authorName}</p>
            <p className="mt-0.5 text-sm text-[#333]">{c.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
