import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { z } from "zod";
import { prisma } from "@/lib/prisma";
import { getClientIp, getClientUserAgent } from "@/lib/request-meta";

const registerSchema = z.object({
  email: z.string().email().max(255),
  password: z.string().min(8, "Password must be at least 8 characters").max(128),
  name: z
    .string()
    .max(120)
    .optional()
    .transform((v) => {
      const t = v?.trim();
      return t ? t : undefined;
    }),
  phone: z
    .string()
    .max(32)
    .optional()
    .transform((v) => {
      const t = v?.trim();
      return t ? t : undefined;
    }),
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parsed = registerSchema.safeParse(body);
    if (!parsed.success) {
      const flat = parsed.error.flatten();
      return NextResponse.json(
        {
          error: "Invalid input.",
          fieldErrors: flat.fieldErrors,
        },
        { status: 400 }
      );
    }
    const { email: rawEmail, password, name, phone } = parsed.data;
    const email = rawEmail.trim().toLowerCase();

    const existing = await prisma.user.findUnique({ where: { email } });
    if (existing) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    // Never persist plaintext password — only bcrypt hash
    const passwordHash = await hash(password, 12);
    const registrationIp = getClientIp(req);
    const registrationUserAgent = getClientUserAgent(req);

    await prisma.user.create({
      data: {
        email,
        passwordHash,
        name: name?.trim() ? name.trim() : null,
        phone: phone ?? null,
        subscriptionTier: "free",
        registrationIp,
        registrationUserAgent,
      },
    });

    return NextResponse.json({
      message: "Account created. You can sign in.",
    });
  } catch (e) {
    console.error("Register error:", e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
