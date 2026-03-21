import { NextResponse } from "next/server";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { sendSupportHumanEmail } from "@/lib/support-mail";

export const dynamic = "force-dynamic";

const bodySchema = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(255),
  phone: z.string().max(32).optional().or(z.literal("")),
  subject: z.string().min(1).max(200),
  message: z.string().min(1).max(8000),
  sessionId: z.string().max(128).optional(),
  /** Honeypot — bots fill this; omit or leave empty */
  website: z.string().max(200).optional(),
});

function trimPhone(p: string | undefined) {
  const t = p?.trim();
  return t ? t : undefined;
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: "Invalid input.", fieldErrors: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    if (parsed.data.website?.trim()) {
      return NextResponse.json({ ok: true }, { status: 200 });
    }

    const { name, email, subject, message, sessionId } = parsed.data;
    const phone = trimPhone(parsed.data.phone);

    let chatTranscript: string | undefined;
    if (sessionId?.trim()) {
      try {
        const rows = await prisma.supportChatMessage.findMany({
          where: { sessionId: sessionId.trim() },
          orderBy: { createdAt: "asc" },
          take: 50,
          select: { role: true, content: true },
        });
        if (rows.length) {
          chatTranscript = rows
            .map((r) => `${r.role}: ${r.content}`)
            .join("\n\n");
        }
      } catch {
        /* DB optional */
      }
    }

    await sendSupportHumanEmail({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone,
      subject: subject.trim(),
      message: message.trim(),
      chatTranscript,
    });

    return NextResponse.json({
      ok: true,
      message: "Thanks — we received your message and will get back to you soon.",
    });
  } catch (e) {
    console.error("support-human:", e);
    const msg =
      e instanceof Error && e.message.includes("not configured")
        ? "Support email is not configured on the server yet."
        : "Could not send your message. Please try again or email us directly.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
