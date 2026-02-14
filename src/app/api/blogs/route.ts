import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/blogs - public list of published posts (?category=) or own posts (?mine=1)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get("category") ?? undefined;
  const mine = searchParams.get("mine") === "1";

  if (mine) {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      select: { id: true },
    });
    if (!user) return new NextResponse("User not found", { status: 404 });
    const posts = await prisma.blogPost.findMany({
      where: { authorId: user.id },
      orderBy: { updatedAt: "desc" },
      select: {
        id: true,
        title: true,
        slug: true,
        status: true,
        published: true,
        publishedAt: true,
        views: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    const commentCounts = await prisma.comment.groupBy({
      by: ["postId"],
      where: { postId: { in: posts.map((p) => p.id) } },
      _count: true,
    });
    const countMap = Object.fromEntries(
      commentCounts.map((c) => [c.postId, c._count])
    );
    return NextResponse.json(
      posts.map((p) => ({
        ...p,
        commentCount: countMap[p.id] ?? 0,
      }))
    );
  }

  const posts = await prisma.blogPost.findMany({
    where: {
      published: true,
      ...(category ? { category } : {}),
    },
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
      tags: true,
      readTime: true,
      publishedAt: true,
      createdAt: true,
      author: { select: { name: true } },
    },
  });

  return NextResponse.json(posts);
}

// POST /api/blogs - create new post (authenticated)
export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const body = await req.json();
  const {
    title,
    subtitle,
    contentHtml,
    excerpt,
    featuredImage,
    coverImage,
    category,
    tags,
    metaTitle,
    metaDescription,
    status,
    published,
    readTime,
    commentsEnabled,
  } = body as {
    title?: string;
    subtitle?: string | null;
    contentHtml?: string;
    excerpt?: string | null;
    featuredImage?: string | null;
    coverImage?: string | null;
    category?: string;
    tags?: string[];
    metaTitle?: string | null;
    metaDescription?: string | null;
    status?: string;
    published?: boolean;
    readTime?: number | null;
    commentsEnabled?: boolean;
  };

  if (!title || !contentHtml) {
    return new NextResponse("Missing title or content", { status: 400 });
  }

  const baseSlug = title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 80);
  let slug = baseSlug || "post";
  let suffix = 1;
  while (true) {
    const existing = await prisma.blogPost.findUnique({ where: { slug } });
    if (!existing) break;
    slug = `${baseSlug}-${suffix++}`;
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) return new NextResponse("User not found", { status: 404 });

  const isPublished = published ?? status === "published";
  const post = await prisma.blogPost.create({
    data: {
      title,
      subtitle: subtitle ?? null,
      slug,
      contentHtml,
      excerpt: excerpt ?? null,
      featuredImage: featuredImage ?? coverImage ?? null,
      coverImage: coverImage ?? featuredImage ?? null,
      category: category ?? "General",
      tags: Array.isArray(tags) ? tags : [],
      metaTitle: metaTitle ?? null,
      metaDescription: metaDescription ?? null,
      status: status ?? (isPublished ? "published" : "draft"),
      published: isPublished,
      publishedAt: isPublished ? new Date() : null,
      readTime: readTime ?? null,
      commentsEnabled: commentsEnabled ?? true,
      authorId: user.id,
    },
  });

  return NextResponse.json(post, { status: 201 });
}

