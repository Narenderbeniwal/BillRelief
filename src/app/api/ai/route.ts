import { NextRequest, NextResponse } from "next/server";
import Anthropic from "@anthropic-ai/sdk";

// Simple Claude-backed AI endpoint for blog studio actions
export async function POST(req: NextRequest) {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "ANTHROPIC_API_KEY is not set on the server." },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => ({}));
  const { action, content } = body as {
    action?: string;
    content?: string;
  };

  if (!action || !content) {
    return NextResponse.json(
      { error: "Missing action or content." },
      { status: 400 }
    );
  }

  const anthropic = new Anthropic({ apiKey });

  let systemPrompt =
    "You are a writing assistant helping improve blog posts for BillRelief, a product that helps people lower their medical bills. You must preserve factual meaning but improve clarity, flow, and readability for a general audience (grade 8–10). Return ONLY the rewritten markdown/HTML body, no commentary.";

  if (action === "improve_readability") {
    systemPrompt +=
      " Focus on simplifying complex sentences, removing jargon, and keeping paragraphs tight.";
  }

  const message = await anthropic.messages.create({
    model: "claude-3-5-sonnet-latest",
    max_tokens: 800,
    temperature: 0.5,
    system: systemPrompt,
    messages: [
      {
        role: "user",
        content: `Here is the article body to rewrite for better readability:\n\n${content}`,
      },
    ],
  });

  const text =
    message.content
      .filter((c) => c.type === "text")
      .map((c: any) => c.text)
      .join("\n\n") || "";

  return NextResponse.json({ action, content: text });
}

