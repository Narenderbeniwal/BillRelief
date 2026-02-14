"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FileText } from "lucide-react";

export type FeaturedPost = {
  slug: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  category: string;
  image?: string;
  authorName?: string;
  publishedAt?: Date;
};

export type BlogCardPost = {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  excerpt?: string;
  category: string;
  image?: string;
  readTime?: number;
  publishedAt?: Date;
  authorName?: string;
};

type Props = {
  featured: FeaturedPost | null;
  posts: BlogCardPost[];
  categories: string[];
  hasAuth?: boolean;
  /** When on /blog/category/[category], pass the category so the filter pill is active */
  initialCategory?: string;
};

export function BlogListingClient({
  featured,
  posts,
  categories,
  hasAuth = false,
  initialCategory,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category") ?? initialCategory ?? "";

  const filteredPosts = activeCategory
    ? posts.filter((p) => p.category === activeCategory)
    : posts;

  const handleCategory = (cat: string) => {
    if (cat === activeCategory) {
      router.push("/blog");
      return;
    }
    if (cat) router.push(`/blog?category=${encodeURIComponent(cat)}`);
    else router.push("/blog");
  };

  if (posts.length === 0 && !featured) {
    return (
      <section className="container mx-auto px-4 py-16 max-w-2xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center gap-6"
        >
          <div className="rounded-full bg-gray-100 p-8">
            <FileText className="h-16 w-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">
            Coming Soon: Medical Bill Insights
          </h2>
          <p className="text-gray-600">
            Our team is crafting educational content to help you navigate
            medical bills, insurance, and cost savings.
          </p>
          {hasAuth ? (
            <Button asChild variant="default" size="lg" className="bg-[#FDDA0D] text-gray-900 hover:bg-[#f5d00a]">
              <Link href="/blog/write">Write the First Blog Post →</Link>
            </Button>
          ) : (
            <form
              className="flex w-full max-w-md gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                const fd = new FormData(e.currentTarget);
                const email = (fd.get("email") as string)?.trim();
                if (email) alert("Thanks! We'll notify you when we publish.");
              }}
            >
              <Input
                name="email"
                type="email"
                placeholder="your@email.com"
                className="flex-1"
              />
              <Button type="submit" variant="default" className="bg-[#0F4C81]">
                Notify Me
              </Button>
            </form>
          )}
        </motion.div>
      </section>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 md:py-12">
      {/* Hero featured */}
      {featured && (
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid md:grid-cols-2 gap-8 md:gap-12 items-center mb-12 md:mb-16"
        >
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-[#0F4C81]">
              {featured.category}
            </span>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
              {featured.title}
            </h1>
            <p className="mt-4 text-gray-600 text-lg">
              {featured.excerpt || featured.subtitle || ""}
            </p>
            <Button
              asChild
              className="mt-6 bg-[#FDDA0D] text-gray-900 hover:bg-[#f5d00a]"
            >
              <Link href={`/blog/${featured.slug}`}>Read more →</Link>
            </Button>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden shadow-lg bg-gray-200">
            {featured.image ? (
              <img
                src={featured.image}
                alt=""
                className="object-cover w-full h-full"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-gray-400">
                <FileText className="h-24 w-24" />
              </div>
            )}
          </div>
        </motion.section>
      )}

      {/* Filter bar */}
      <div className="flex flex-wrap gap-2 mb-8">
        <span className="text-sm text-gray-500 mr-2 self-center">
          Filter by:
        </span>
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => handleCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              activeCategory === cat
                ? "bg-[#0F4C81] text-white border-[#0F4C81]"
                : "bg-white text-gray-700 border-gray-300 hover:border-[#0F4C81] hover:text-[#0F4C81]"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Grid */}
      <section className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post, i) => (
          <motion.article
            key={post.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <Link href={`/blog/${post.slug}`} className="block">
              <div className="aspect-[16/10] bg-gray-100 relative">
                {post.image ? (
                  <img
                    src={post.image}
                    alt=""
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-gray-300">
                    <FileText className="h-12 w-12" />
                  </div>
                )}
              </div>
              <div className="p-5">
                <span className="text-xs font-semibold uppercase tracking-wider text-[#0F4C81]">
                  {post.category}
                </span>
                <h2 className="mt-2 text-lg font-bold text-gray-900 line-clamp-2">
                  {post.title}
                </h2>
                <p className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {post.excerpt || post.subtitle || ""}
                </p>
                <span className="mt-4 inline-block text-sm font-medium text-[#0F4C81]">
                  Read more →
                </span>
              </div>
            </Link>
          </motion.article>
        ))}
      </section>
    </div>
  );
}
