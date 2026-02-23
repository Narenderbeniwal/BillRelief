import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { BlogListingClient } from "@/components/blog-platform/BlogListingClient";
import { SITE_URL } from "@/lib/siteConfig";

const CATEGORIES = [
  "Personal Finance",
  "Company News",
  "Health Insurance",
  "Reduce Medical Bills",
];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ category: string }>;
}): Promise<Metadata> {
  const { category } = await params;
  const decoded = decodeURIComponent(category);
  const canonicalPath = `/blog/category/${encodeURIComponent(decoded)}`;
  return {
    title: `${decoded} | Blog — BillRelief`,
    description: `Articles about ${decoded}. Medical bill tips and savings from BillRelief.`,
    openGraph: {
      title: `${decoded} — BillRelief Blog`,
      url: `${SITE_URL}${canonicalPath}`,
    },
    alternates: { canonical: `${SITE_URL}${canonicalPath}` },
    robots: { index: true, follow: true },
  };
}

export default async function BlogCategoryPage({
  params,
}: {
  params: Promise<{ category: string }>;
}) {
  const { category: categoryParam } = await params;
  const category = decodeURIComponent(categoryParam);
  const session = await getServerSession(authOptions);
  const posts = await prisma.blogPost.findMany({
    where: { published: true, category },
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      title: true,
      subtitle: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      coverImage: true,
      category: true,
      readTime: true,
      publishedAt: true,
      author: { select: { name: true } },
    },
  });

  const featured = posts[0] ?? null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8]">
      <SiteHeader />
      <main className="flex-1">
        <BlogListingClient
          featured={
            featured
              ? {
                  slug: featured.slug,
                  title: featured.title,
                  subtitle: featured.subtitle ?? undefined,
                  excerpt: featured.excerpt ?? undefined,
                  category: featured.category,
                  image: featured.featuredImage ?? featured.coverImage ?? undefined,
                  authorName: featured.author?.name ?? undefined,
                  publishedAt: featured.publishedAt ?? undefined,
                }
              : null
          }
          posts={posts.slice(1).map((p) => ({
            id: p.id,
            slug: p.slug,
            title: p.title,
            subtitle: p.subtitle ?? undefined,
            excerpt: p.excerpt ?? undefined,
            category: p.category,
            image: p.featuredImage ?? p.coverImage ?? undefined,
            readTime: p.readTime ?? undefined,
            publishedAt: p.publishedAt ?? undefined,
            authorName: p.author?.name ?? undefined,
          }))}
          categories={CATEGORIES}
          hasAuth={!!session?.user}
          initialCategory={category}
        />
      </main>
      <SiteFooter className="border-gray-200 bg-white py-6 pb-8" />
    </div>
  );
}
