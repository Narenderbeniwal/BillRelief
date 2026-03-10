import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { downloadBlobBuffer, isBlobFileUrl } from "@/lib/azure-blob";
import {
  extractBillContent,
  analyzeBillWithOpenAI,
  saveBillAnalysis,
  NotMedicalBillError,
} from "@/lib/bill-analyzer";
import { readFile } from "fs/promises";
import path from "path";

export const dynamic = "force-dynamic";

function sseEvent(type: string, data: Record<string, unknown>): string {
  return `data: ${JSON.stringify({ type, ...data })}\n\n`;
}

async function getFileBuffer(fileUrl: string): Promise<Buffer> {
  if (isBlobFileUrl(fileUrl)) {
    return downloadBlobBuffer(fileUrl);
  }
  const absolutePath = path.join(
    process.cwd(),
    fileUrl.replace(/^\//, "")
  );
  return readFile(absolutePath);
}

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return new Response("Unauthorized", { status: 401 });
  }

  const { id } = await params;

  const bill = await prisma.medicalBill.findFirst({
    where: { id, userId: session.user.id },
    select: {
      id: true,
      fileUrl: true,
      fileType: true,
      status: true,
      aiAnalysisResults: {
        orderBy: { createdAt: "desc" },
        take: 1,
        select: { analysisJson: true },
      },
    },
  });

  if (!bill) {
    return new Response("Not found", { status: 404 });
  }

  // If already completed, return the cached analysis immediately
  if (bill.status === "completed" && bill.aiAnalysisResults[0]?.analysisJson) {
    const stream = new ReadableStream({
      start(controller) {
        const enc = new TextEncoder();
        controller.enqueue(
          enc.encode(
            sseEvent("result", {
              data: bill.aiAnalysisResults[0].analysisJson,
            })
          )
        );
        controller.enqueue(enc.encode(sseEvent("done", {})));
        controller.close();
      },
    });
    return new Response(stream, {
      headers: {
        "Content-Type": "text/event-stream",
        "Cache-Control": "no-cache",
        Connection: "keep-alive",
      },
    });
  }

  if (!bill.fileUrl) {
    return new Response("No file attached to this bill", { status: 400 });
  }

  const enc = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      const send = (type: string, data: Record<string, unknown>) => {
        try {
          controller.enqueue(enc.encode(sseEvent(type, data)));
        } catch {
          // stream may have been closed by client
        }
      };

      try {
        // Mark as analyzing
        await prisma.medicalBill.update({
          where: { id: bill.id },
          data: { status: "analyzing" },
        });

        send("status", { message: "Reading your bill..." });

        const buffer = await getFileBuffer(bill.fileUrl!);

        send("status", { message: "Extracting content from your document..." });

        const content = await extractBillContent(
          buffer,
          bill.fileType ?? "application/octet-stream"
        );

        send("status", {
          message:
            "Analyzing your bill with AI — checking for errors, overcharges, and savings opportunities...",
        });

        const analysis = await analyzeBillWithOpenAI(content, bill.id);

        send("status", { message: "Saving analysis results..." });

        await saveBillAnalysis(bill.id, analysis);

        send("result", { data: analysis });
        send("done", {});
      } catch (err: any) {
        console.error("Bill analysis failed:", err);

        const isNotBill = err instanceof NotMedicalBillError;

        await prisma.medicalBill
          .update({
            where: { id: bill.id },
            data: { status: "failed" },
          })
          .catch(() => {});

        if (isNotBill) {
          send("error", {
            message: err.message,
            notMedicalBill: true,
          });
        } else {
          send("error", {
            message:
              err?.message ?? "Analysis failed. Please try again later.",
          });
        }
        send("done", {});
      } finally {
        try {
          controller.close();
        } catch {
          // already closed
        }
      }
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
