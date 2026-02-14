import Link from "next/link";
import { prisma } from "@/lib/prisma";

export default async function BlogsPage() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <h1 className="text-3xl font-bold mb-6">BillRelief Blog</h1>
        <p className="text-muted-foreground mb-8">
          Articles about negotiating medical bills, understanding charges, and getting the most
          out of BillRelief.
        </p>
        <div className="space-y-6">
          {posts.map((post) => (
            <article
              key={post.id}
              className="border rounded-lg p-4 hover:shadow-sm transition-shadow bg-background"
            >
              <Link href={`/blogs/${post.slug}`}>
                <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
              </Link>
              <p className="text-xs text-muted-foreground mb-2">
                {new Date(post.createdAt).toLocaleDateString()}
              </p>
              {post.coverImage && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-48 object-cover rounded-md mb-3"
                />
              )}
              <Link
                href={`/blogs/${post.slug}`}
                className="text-sm font-medium text-billrelief-blue hover:underline"
              >
                Read more
              </Link>
            </article>
          ))}
          {posts.length === 0 && (
            <p className="text-muted-foreground">No blog posts yet. Create one from your dashboard.</p>
          )}
        </div>
      </main>
    </div>
  );
}

