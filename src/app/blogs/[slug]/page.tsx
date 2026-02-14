import { prisma } from "@/lib/prisma";

interface BlogPostPageProps {
  params: { slug: string };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
    include: {
      author: {
        select: { name: true, email: true },
      },
    },
  });

  if (!post || !post.published) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Blog post not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12 max-w-3xl">
        <article className="prose prose-neutral max-w-none">
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
    </div>
  );
}

