"use client";

import Link from "next/link";
import { useSession } from "next-auth/react";
import { useState, useMemo, useCallback, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Twitter,
  Linkedin,
  Facebook,
  Link2,
  MessageCircle,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type Post = {
  slug: string;
  title: string;
  subtitle?: string;
  contentHtml: string;
  category: string;
  featuredImage?: string;
  publishedAt: Date;
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

export function BlogPostContent({ post, related }: Props) {
  const { data: session, status } = useSession();
  const [copied, setCopied] = useState(false);
  const { html: contentHtml, toc } = useMemo(
    () => addHeadingIds(post.contentHtml),
    [post.contentHtml]
  );

  const dateStr = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      })
    : "";
  const readStr = post.readTime ? `${post.readTime} min read` : "";
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

  return (
    <main className="flex-1">
      {/* Breadcrumb */}
      <nav className="border-b bg-white">
        <div className="container mx-auto px-4 py-3">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-muted-foreground">
            <li>
              <Link href="/" className="hover:text-foreground">
                Home
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link href="/blog" className="hover:text-foreground">
                Blog
              </Link>
            </li>
            <li>/</li>
            <li>
              <Link
                href={`/blog?category=${encodeURIComponent(post.category)}`}
                className="hover:text-foreground"
              >
                {post.category}
              </Link>
            </li>
            <li>/</li>
            <li className="text-foreground font-medium truncate max-w-[200px]">
              {post.title}
            </li>
          </ol>
        </div>
      </nav>

      <article className="container mx-auto px-4 py-8 max-w-[1200px]">
        {/* Hero */}
        <header className="max-w-3xl mb-8">
          <span className="text-xs font-semibold uppercase tracking-wider text-[#0F4C81]">
            {post.category}
          </span>
          <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {post.title}
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            By {post.author?.name ?? "BillRelief"} • Published {dateStr}
            {readStr ? ` • ${readStr}` : ""}
          </p>
          <div className="mt-4 flex items-center gap-3">
            <button
              aria-label="Share on Twitter"
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() =>
                window.open(
                  `https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}&text=${shareText}`,
                  "_blank"
                )
              }
            >
              <Twitter className="h-5 w-5" />
            </button>
            <button
              aria-label="Share on LinkedIn"
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() =>
                window.open(
                  `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
                  "_blank"
                )
              }
            >
              <Linkedin className="h-5 w-5" />
            </button>
            <button
              aria-label="Share on Facebook"
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={() =>
                window.open(
                  `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
                  "_blank"
                )
              }
            >
              <Facebook className="h-5 w-5" />
            </button>
            <button
              aria-label="Copy link"
              className="p-2 rounded-full hover:bg-gray-100"
              onClick={handleCopyLink}
            >
              <Link2 className="h-5 w-5" />
              {copied && (
                <span className="ml-1 text-xs text-green-600">Copied!</span>
              )}
            </button>
          </div>
        </header>

        {/* Featured image */}
        {post.featuredImage && (
          <div className="rounded-2xl overflow-hidden shadow-md mb-10 aspect-[2/1] max-h-[400px] bg-gray-100">
            <img
              src={post.featuredImage}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Content + TOC */}
        <div className="flex flex-col lg:flex-row gap-10">
          {toc.length > 0 && (
            <aside className="lg:w-56 shrink-0 lg:sticky lg:top-24 self-start">
              <p className="text-xs font-semibold uppercase text-muted-foreground mb-2">
                On this page
              </p>
              <ul className="space-y-1">
                {toc.map(({ id, text, level }) => (
                  <li
                    key={id}
                    className={
                      level === 1 ? "" : level === 3 ? "pl-3" : level === 4 ? "pl-4" : "pl-2"
                    }
                  >
                    <a
                      href={`#${id}`}
                      className="text-sm text-muted-foreground hover:text-[#0F4C81]"
                    >
                      {text}
                    </a>
                  </li>
                ))}
              </ul>
            </aside>
          )}
          <div className="flex-1 min-w-0">
            <div
              className="prose prose-neutral max-w-none prose-headings:scroll-mt-24 prose-h1:text-2xl prose-h1:md:text-3xl prose-h1:font-bold prose-h1:mt-10 prose-h1:mb-4 prose-h2:text-xl prose-h2:md:text-2xl prose-h2:font-bold prose-h2:mt-10 prose-h2:mb-4 prose-h2:border-b prose-h2:border-gray-200 prose-h2:pb-2 prose-h3:text-lg prose-h3:font-semibold prose-h3:mt-8 prose-h3:mb-3 prose-h4:text-base prose-h4:font-semibold prose-h4:mt-6 prose-h4:mb-2"
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />
            {/* CTA box */}
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              className="mt-12 p-6 rounded-2xl bg-[#0F4C81] text-white"
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
            </motion.div>
          </div>
        </div>

        {/* Author bio */}
        {post.author && (
          <section className="mt-12 pt-8 border-t flex gap-4 items-start">
            <div className="w-14 h-14 rounded-full bg-gray-200 overflow-hidden shrink-0 flex items-center justify-center">
              {post.author.image ? (
                <img
                  src={post.author.image}
                  alt=""
                  className="w-full h-full object-cover"
                />
              ) : (
                <User className="h-7 w-7 text-gray-500" />
              )}
            </div>
            <div>
              <p className="font-semibold text-gray-900">{post.author.name}</p>
              <p className="text-sm text-muted-foreground mt-1">
                Medical Bill Advocate & Financial Expert
              </p>
              {post.author.bio && (
                <p className="mt-2 text-sm text-gray-600">{post.author.bio}</p>
              )}
              <a
                href="https://www.linkedin.com/company/billrelief"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 text-sm font-medium text-[#0F4C81]"
              >
                Follow on LinkedIn →
              </a>
            </div>
          </section>
        )}

        {/* Related posts */}
        {related.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Related Posts
            </h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link
                  key={r.slug}
                  href={`/blog/${r.slug}`}
                  className="group bg-white rounded-xl border overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div className="aspect-[16/10] bg-gray-100">
                    {r.image ? (
                      <img
                        src={r.image}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    ) : null}
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 group-hover:text-[#0F4C81] line-clamp-2">
                      {r.title}
                    </h3>
                    {r.excerpt && (
                      <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
                        {r.excerpt}
                      </p>
                    )}
                    <span className="mt-2 inline-block text-sm text-[#0F4C81] font-medium">
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
          <section className="mt-16 pt-8 border-t">
            <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900">
              <MessageCircle className="h-5 w-5" />
              Comments
            </h2>
            {status === "loading" ? (
              <p className="mt-4 text-muted-foreground">Loading...</p>
            ) : !session ? (
              <p className="mt-4 text-muted-foreground">
                <Link href="/login" className="text-[#0F4C81] font-medium">
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
  const [comments, setComments] = useState<{ id: string; content: string; authorName: string; createdAt: string }[]>([]);
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
          className="w-full min-h-[100px] rounded-lg border px-3 py-2 text-sm"
          disabled={loading}
        />
        <Button type="submit" className="mt-2" disabled={loading || !content.trim()}>
          Post comment
        </Button>
      </form>
      <ul className="mt-6 space-y-4">
        {comments.map((c) => (
          <li key={c.id} className="border-l-2 border-gray-200 pl-4 py-1">
            <p className="text-sm font-medium text-gray-900">{c.authorName}</p>
            <p className="text-sm text-gray-600 mt-0.5">{c.content}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
