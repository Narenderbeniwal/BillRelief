import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

// GET /api/blogs/[slug] - public single post (or own draft for author)
export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const { slug } = params;
  const session = await getServerSession(authOptions);

  const post = await prisma.blogPost.findUnique({
    where: { slug },
    include: {
      author: {
        select: { name: true, email: true, image: true, bio: true },
      },
    },
  });

  if (!post) return new NextResponse("Not found", { status: 404 });
  if (!post.published) {
    const user = session?.user?.email
      ? await prisma.user.findUnique({
          where: { email: session.user.email },
          select: { id: true },
        })
      : null;
    if (user?.id !== post.authorId) {
      return new NextResponse("Not found", { status: 404 });
    }
  }

  return NextResponse.json(post);
}

// PATCH /api/blogs/[slug] - update post (author only)
export async function PATCH(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true },
  });
  if (!user) return new NextResponse("User not found", { status: 404 });

  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
  });
  if (!post || post.authorId !== user.id) {
    return new NextResponse("Not found", { status: 404 });
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
    slug: newSlug,
  } = body as Record<string, unknown>;

  const data: Record<string, unknown> = {};
  if (typeof title === "string") data.title = title;
  if (subtitle !== undefined) data.subtitle = subtitle ?? null;
  if (typeof contentHtml === "string") data.contentHtml = contentHtml;
  if (excerpt !== undefined) data.excerpt = excerpt ?? null;
  if (featuredImage !== undefined) data.featuredImage = featuredImage ?? null;
  if (coverImage !== undefined) data.coverImage = coverImage ?? null;
  if (typeof category === "string") data.category = category;
  if (Array.isArray(tags)) data.tags = tags;
  if (metaTitle !== undefined) data.metaTitle = metaTitle ?? null;
  if (metaDescription !== undefined) data.metaDescription = metaDescription ?? null;
  if (typeof status === "string") data.status = status;
  if (typeof published === "boolean") {
    data.published = published;
    data.publishedAt = published ? new Date() : post.publishedAt;
  }
  if (typeof readTime === "number") data.readTime = readTime;
  if (typeof commentsEnabled === "boolean") data.commentsEnabled = commentsEnabled;
  if (typeof newSlug === "string" && newSlug !== params.slug) {
    const existing = await prisma.blogPost.findUnique({ where: { slug: newSlug } });
    if (!existing) data.slug = newSlug;
  }

  const updated = await prisma.blogPost.update({
    where: { id: post.id },
    data: data as any,
  });
  return NextResponse.json(updated);
}

