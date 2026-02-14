import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { readFile } from "fs/promises";
import path from "path";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const bill = await prisma.medicalBill.findFirst({
    where: { id, userId: session.user.id },
    select: { fileUrl: true, fileName: true, fileType: true },
  });

  if (!bill?.fileUrl) {
    return NextResponse.json({ error: "File not found" }, { status: 404 });
  }

  const { isBlobFileUrl, getBlobDownloadUrl } = await import(
    "@/lib/azure-blob"
  );
  if (isBlobFileUrl(bill.fileUrl)) {
    try {
      const downloadUrl = await getBlobDownloadUrl(bill.fileUrl);
      return NextResponse.redirect(downloadUrl, 302);
    } catch (err) {
      console.error("Blob SAS failed:", err);
      return NextResponse.json(
        { error: "File not available" },
        { status: 502 }
      );
    }
  }

  const absolutePath = path.join(process.cwd(), bill.fileUrl.replace(/^\//, ""));
  let buffer: Buffer;
  try {
    buffer = await readFile(absolutePath);
  } catch {
    return NextResponse.json({ error: "File not found on server" }, { status: 404 });
  }

  const contentType = bill.fileType || "application/octet-stream";
  const disposition = `inline; filename="${(bill.fileName || "bill").replace(/"/g, "%22")}"`;

  return new NextResponse(buffer, {
    headers: {
      "Content-Type": contentType,
      "Content-Disposition": disposition,
      "Cache-Control": "private, max-age=3600",
    },
  });
}
