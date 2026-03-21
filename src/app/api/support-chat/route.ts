import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import OpenAI from "openai";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { BILLBOT_SYSTEM_PROMPT } from "@/lib/billbot-prompt";

export const dynamic = "force-dynamic";

const MAX_MESSAGE_LEN = 4000;
const MAX_HISTORY_MESSAGES = 24;

type ClientTurn = { role: string; content: string };

function parseConversation(raw: unknown): OpenAI.Chat.ChatCompletionMessageParam[] {
  if (!Array.isArray(raw)) return [];
  const out: OpenAI.Chat.ChatCompletionMessageParam[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object") continue;
    const role = (item as ClientTurn).role;
    const content = String((item as ClientTurn).content ?? "").slice(
      0,
      MAX_MESSAGE_LEN
    );
    if (role !== "user" && role !== "assistant") continue;
    if (!content.trim()) continue;
    out.push({ role, content });
  }
  return out.slice(-MAX_HISTORY_MESSAGES);
}

/** Load prior messages for a returning visitor (same browser session). */
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId")?.trim();
  if (!sessionId) {
    return NextResponse.json({ messages: [] });
  }

  try {
    const chatSession = await prisma.supportChatSession.findUnique({
      where: { id: sessionId },
      include: {
        messages: {
          orderBy: { createdAt: "asc" },
          take: 40,
          select: { role: true, content: true },
        },
      },
    });

    if (!chatSession) {
      return NextResponse.json({ messages: [] });
    }

    return NextResponse.json({
      messages: chatSession.messages.filter(
        (m) => m.role === "user" || m.role === "assistant"
      ),
    });
  } catch (e) {
    console.warn("BillBot GET history: DB unavailable", e);
    return NextResponse.json({ messages: [] });
  }
}

export async function POST(req: Request) {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey?.trim() || apiKey === "your-openai-api-key-here") {
    return NextResponse.json(
      { error: "Chat is temporarily unavailable. Please try again later." },
      { status: 503 }
    );
  }

  let body: {
    message?: string;
    sessionId?: string | null;
    conversation?: unknown;
  };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const message = String(body.message ?? "").trim();
  if (!message) {
    return NextResponse.json({ error: "Message is required" }, { status: 400 });
  }
  if (message.length > MAX_MESSAGE_LEN) {
    return NextResponse.json(
      { error: `Message must be under ${MAX_MESSAGE_LEN} characters` },
      { status: 400 }
    );
  }

  const clientPrior = parseConversation(body.conversation);
  const ephemeralThread: OpenAI.Chat.ChatCompletionMessageParam[] = [
    ...clientPrior,
    { role: "user", content: message },
  ];

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id ?? null;

  let sessionId: string | null = body.sessionId?.trim() || null;
  let openaiMessages: OpenAI.Chat.ChatCompletionMessageParam[];
  let persisted = true;

  try {
    let chatSession = sessionId
      ? await prisma.supportChatSession.findUnique({ where: { id: sessionId } })
      : null;

    if (!chatSession) {
      chatSession = await prisma.supportChatSession.create({
        data: { userId },
      });
      sessionId = chatSession.id;
    } else if (userId && !chatSession.userId) {
      await prisma.supportChatSession.update({
        where: { id: sessionId! },
        data: { userId },
      });
    }

    await prisma.supportChatMessage.create({
      data: {
        sessionId: sessionId!,
        role: "user",
        content: message,
      },
    });

    const history = await prisma.supportChatMessage.findMany({
      where: { sessionId: sessionId! },
      orderBy: { createdAt: "asc" },
      take: MAX_HISTORY_MESSAGES,
    });

    openaiMessages = history.map((m) => ({
      role: m.role === "user" ? "user" : "assistant",
      content: m.content,
    }));
  } catch (e) {
    console.warn(
      "BillBot: database unavailable — using ephemeral mode (no save)",
      e
    );
    persisted = false;
    sessionId = null;
    openaiMessages = ephemeralThread;
  }

  const openai = new OpenAI({ apiKey });

  let reply: string;
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o",
      temperature: 0.4,
      max_tokens: 1024,
      messages: [
        { role: "system", content: BILLBOT_SYSTEM_PROMPT },
        ...openaiMessages,
      ],
    });
    reply =
      completion.choices[0]?.message?.content?.trim() ||
      "I'm sorry, I couldn't generate a response. Please try again in a moment.";
  } catch (e: unknown) {
    console.error("BillBot OpenAI error:", e);
    return NextResponse.json(
      { error: "Something went wrong. Please try again shortly." },
      { status: 502 }
    );
  }

  if (persisted && sessionId) {
    try {
      await prisma.supportChatMessage.create({
        data: {
          sessionId,
          role: "assistant",
          content: reply,
        },
      });
    } catch (e) {
      console.warn("BillBot: failed to save assistant message", e);
    }
  }

  return NextResponse.json({
    sessionId: persisted ? sessionId : null,
    reply,
    persisted,
  });
}
