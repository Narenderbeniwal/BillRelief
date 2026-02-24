import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
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
      url: `${SITE_URL}/blogs/${encodeURIComponent(params.slug)}`,
    },
    alternates: { canonical: `${SITE_URL}/blogs/${encodeURIComponent(params.slug)}` },
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
        select: { name: true, email: true },
      },
    },
  });

  if (!post || !post.published) notFound();

  return (
    <div className="min-h-screen flex flex-col bg-[#F9FAFB]">
      <SiteHeader />
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <article className="prose prose-neutral max-w-none bg-white rounded-xl border border-gray-200 p-6 sm:p-8 shadow-sm">
          <h1>{post.title}</h1>
          <p className="text-sm text-muted-foreground">
            {new Date(post.createdAt).toLocaleDateString()}{" "}
            {post.author?.name || post.author?.email
              ? `· By ${post.author.name ?? post.author.email}`
              : null}
          </p>
          {post.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={post.coverImage}
              alt={post.title}
              className="w-full h-72 object-cover rounded-md my-4"
            />
          )}
          <div
            className="mt-6"
            dangerouslySetInnerHTML={{ __html: post.contentHtml }}
          />
        </article>
      </main>
      <SiteFooter className="border-gray-200 bg-white py-6 pb-8" />
    </div>
  );
}
