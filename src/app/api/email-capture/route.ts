import { NextResponse } from "next/server";
import { z } from "zod";
import { sendLeadCaptureNotification } from "@/lib/support-mail";
import { getClientIp } from "@/lib/request-meta";

export const dynamic = "force-dynamic";

const bodySchema = z.object({
  email: z.string().email("Invalid email address").max(255),
  /** Honeypot — must be empty */
  website: z.string().max(200).optional(),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = bodySchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    if (parsed.data.website?.trim()) {
      return NextResponse.json({ ok: true });
    }

    const email = parsed.data.email.trim().toLowerCase();
    const ip = getClientIp(req);

    await sendLeadCaptureNotification(email, {
      source: "exit_intent_free_guide",
      submittedAt: new Date().toISOString(),
      clientHint: ip ? `IP (best-effort): ${ip}` : undefined,
    });

    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Email capture error:", e);
    const msg =
      e instanceof Error && e.message.includes("not configured")
        ? "Email is not configured on the server. Please try again later."
        : "Something went wrong. Please try again.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
