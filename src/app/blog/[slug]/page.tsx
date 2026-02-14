import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { BlogPostContent } from "@/components/blog-platform/BlogPostContent";

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
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
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
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-muted-foreground bg-white">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} BillRelief.com. HIPAA Compliant.</p>
        </div>
      </footer>
    </div>
  );
}
