import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";

export async function GET(
  _req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
    select: { id: true },
  });
  if (!post) return new NextResponse("Not found", { status: 404 });

  const comments = await prisma.comment.findMany({
    where: { postId: post.id, parentId: null },
    orderBy: { createdAt: "desc" },
    include: {
      author: { select: { name: true } },
      replies: {
        include: { author: { select: { name: true } } },
        orderBy: { createdAt: "asc" },
      },
    },
  });

  const list = comments.map((c) => ({
    id: c.id,
    content: c.content,
    authorName: c.author?.name ?? "Anonymous",
    createdAt: c.createdAt.toISOString(),
    replies: c.replies.map((r) => ({
      id: r.id,
      content: r.content,
      authorName: r.author?.name ?? "Anonymous",
      createdAt: r.createdAt.toISOString(),
    })),
  }));

  return NextResponse.json(list);
}

export async function POST(
  req: NextRequest,
  { params }: { params: { slug: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new NextResponse("Unauthorized", { status: 401 });
  }

  const post = await prisma.blogPost.findUnique({
    where: { slug: params.slug },
    select: { id: true, commentsEnabled: true },
  });
  if (!post || !post.commentsEnabled) {
    return new NextResponse("Not found", { status: 404 });
  }

  const body = await req.json();
  const content = (body?.content as string)?.trim();
  if (!content) {
    return new NextResponse("Missing content", { status: 400 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    select: { id: true, name: true },
  });
  if (!user) return new NextResponse("User not found", { status: 404 });

  const comment = await prisma.comment.create({
    data: {
      postId: post.id,
      authorId: user.id,
      content,
    },
    include: { author: { select: { name: true } } },
  });

  return NextResponse.json({
    id: comment.id,
    content: comment.content,
    author: { name: comment.author?.name },
    createdAt: comment.createdAt.toISOString(),
  });
}
