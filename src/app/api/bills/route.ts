import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { saveUploadedFile } from "@/lib/uploads";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const bills = await prisma.medicalBill.findMany({
    where: { userId: session.user.id },
    orderBy: { uploadDate: "desc" },
    include: { _count: { select: { lineItems: true } } },
  });
  return NextResponse.json(bills);
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let formData: FormData;
  try {
    formData = await req.formData();
  } catch {
    return NextResponse.json(
      { error: "Invalid form data" },
      { status: 400 }
    );
  }

  const file = formData.get("file") as File | null;
  if (!file || !file.size) {
    return NextResponse.json(
      { error: "No file provided" },
      { status: 400 }
    );
  }

  const maxBytes = 10 * 1024 * 1024;
  if (file.size > maxBytes) {
    return NextResponse.json(
      { error: "File must be under 10MB" },
      { status: 400 }
    );
  }

  const providerName = (formData.get("providerName") as string)?.trim() ?? null;
  const fileType = file.type;

  let fileUrl: string;
  let fileName: string;
  try {
    const { isAzureBlobConfigured, uploadToBlob } = await import(
      "@/lib/azure-blob"
    );
    if (isAzureBlobConfigured()) {
      const blobResult = await uploadToBlob(session.user.id, file);
      fileUrl = blobResult.fileUrl;
      fileName = blobResult.fileName;
    } else {
      const saved = await saveUploadedFile(session.user.id, file);
      fileUrl = `/${saved.relativePath}`;
      fileName = file.name;
    }
  } catch (err) {
    console.error("Upload save failed:", err);
    return NextResponse.json(
      { error: "Failed to save file. Please try again." },
      { status: 500 }
    );
  }

  const bill = await prisma.medicalBill.create({
    data: {
      userId: session.user.id,
      fileUrl,
      fileName,
      fileType,
      providerName,
      status: "pending",
    },
  });

  // Simulate async AI analysis: in production this would trigger a job/queue.
  // Update status to analyzing then completed with mock data after a delay could be done via a background job.
  setImmediate(async () => {
    await prisma.medicalBill.update({
      where: { id: bill.id },
      data: { status: "analyzing" },
    });
    // Simulate analysis completion after a short delay (e.g. 2s). In production, call AI pipeline.
    setTimeout(async () => {
      const totalAmount = 12500;
      const estimatedSavings = 7750;
      await prisma.medicalBill.update({
        where: { id: bill.id },
        data: {
          status: "completed",
          totalAmount,
          estimatedSavings,
          analysisCompletedAt: new Date(),
          billDate: new Date(),
        },
      });
      await prisma.billLineItem.createMany({
        data: [
          {
            billId: bill.id,
            description: "Emergency room visit",
            cptCode: "99285",
            quantity: 1,
            unitPrice: 2500,
            totalCharge: 2500,
            isError: true,
            errorType: "upcoding",
            fairPrice: 850,
            overchargeAmount: 1650,
          },
          {
            billId: bill.id,
            description: "Lab panel",
            cptCode: "80053",
            quantity: 1,
            unitPrice: 450,
            totalCharge: 450,
            isError: false,
          },
        ],
      });
    }, 2000);
  });

  return NextResponse.json(bill);
}
