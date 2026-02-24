import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { BlogPostContent } from "@/components/blog-platform/BlogPostContent";
import { SITE_URL } from "@/lib/siteConfig";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
    select: { title: true, subtitle: true, excerpt: true, published: true },
  });
  if (!post || !post.published) return { title: "Not found" };
  const description =
    post.excerpt?.slice(0, 160) ||
    post.subtitle?.slice(0, 160) ||
    `${post.title} — BillRelief blog`;
  return {
    title: `${post.title} | Blog — BillRelief`,
    description,
    openGraph: {
      title: post.title,
      description,
      url: `${SITE_URL}/blog/${encodeURIComponent(params.slug)}`,
    },
    alternates: { canonical: `${SITE_URL}/blog/${encodeURIComponent(params.slug)}` },
    robots: { index: true, follow: true },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
    include: {
      author: {
        select: {
          id: true,
          name: true,
          email: true,
          image: true,
          bio: true,
        },
      },
    },
  });

  if (!post || !post.published) notFound();

  await prisma.blogPost.update({
    where: { id: post.id },
    data: { views: post.views + 1 },
  });

  const related = await prisma.blogPost.findMany({
    where: {
      published: true,
      category: post.category,
      id: { not: post.id },
    },
    orderBy: { createdAt: "desc" },
    take: 3,
    select: {
      slug: true,
      title: true,
      excerpt: true,
      featuredImage: true,
      coverImage: true,
      readTime: true,
      publishedAt: true,
    },
  });

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <SiteHeader />
      <BlogPostContent
        post={{
          slug: post.slug,
          title: post.title,
          subtitle: post.subtitle ?? undefined,
          contentHtml: post.contentHtml,
          category: post.category,
          featuredImage: post.featuredImage ?? post.coverImage ?? undefined,
          publishedAt: post.publishedAt ?? post.createdAt,
          updatedAt: post.updatedAt,
          readTime: post.readTime ?? undefined,
          author: post.author
            ? {
                name: post.author.name ?? post.author.email ?? "Author",
                image: post.author.image ?? undefined,
                bio: post.author.bio ?? undefined,
              }
            : undefined,
          commentsEnabled: post.commentsEnabled,
          views: post.views,
        }}
        related={related.map((r) => ({
          slug: r.slug,
          title: r.title,
          excerpt: r.excerpt ?? undefined,
          image: r.featuredImage ?? r.coverImage ?? undefined,
          readTime: r.readTime ?? undefined,
          publishedAt: r.publishedAt ?? undefined,
        }))}
      />
      <SiteFooter className="border-gray-200 bg-white py-6 pb-8" />
    </div>
  );
}
