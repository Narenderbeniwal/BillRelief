import { NextResponse } from "next/server";
import { z } from "zod";

const bodySchema = z.object({
  email: z.string().email("Invalid email address"),
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
    const { email } = parsed.data;
    // Optional: persist to DB or send to CRM. For now we just validate and return success.
    // e.g. await prisma.lead.create({ data: { email, source: "exit_popup" } });
    return NextResponse.json({ ok: true });
  } catch (e) {
    console.error("Email capture error:", e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
