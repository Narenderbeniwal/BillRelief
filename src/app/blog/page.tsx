import { getServerSession } from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { BlogListingClient } from "@/components/blog-platform/BlogListingClient";

const CATEGORIES = [
  "Personal Finance",
  "Company News",
  "Health Insurance",
  "Reduce Medical Bills",
];

export default async function BlogPage() {
  const session = await getServerSession(authOptions);
  const [featured, posts] = await Promise.all([
    prisma.blogPost.findFirst({
      where: { published: true },
      orderBy: { createdAt: "desc" },
      include: {
        author: { select: { name: true } },
      },
    }),
    prisma.blogPost.findMany({
      where: { published: true },
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
    }),
  ]);

  return (
    <div className="min-h-screen flex flex-col bg-[#F5F1E8]">
      <SiteHeader />
      <main className="flex-1">
        <BlogListingClient
          featured={featured ? {
            slug: featured.slug,
            title: featured.title,
            subtitle: featured.subtitle ?? undefined,
            excerpt: featured.excerpt ?? undefined,
            category: featured.category,
            image: featured.featuredImage ?? featured.coverImage ?? undefined,
            authorName: featured.author?.name ?? undefined,
            publishedAt: featured.publishedAt ?? undefined,
          } : null}
          posts={posts
            .filter((p) => p.id !== featured?.id)
            .map((p) => ({
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
        />
      </main>
      <footer className="border-t border-gray-200 py-6 text-center text-sm text-muted-foreground bg-white">
        <div className="container mx-auto px-4">
          <p>© {new Date().getFullYear()} BillRelief.com. HIPAA Compliant.</p>
        </div>
      </footer>
    </div>
  );
}
