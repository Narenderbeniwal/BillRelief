import OpenAI from "openai";
import { prisma } from "@/lib/prisma";

export class NotMedicalBillError extends Error {
  constructor(message: string) {
    super(message);
    this.name = "NotMedicalBillError";
  }
}

// ─── Types ───────────────────────────────────────────────────────────────────

export interface BillLineItemAnalysis {
  description: string;
  cptCode?: string;
  icd10Code?: string;
  quantity: number;
  unitPrice: number;
  totalCharge: number;
  isError: boolean;
  errorType?: string;
  errorExplanation?: string;
  fairPrice?: number;
  overchargeAmount?: number;
}

export interface BillError {
  type: string;
  severity: "high" | "medium" | "low";
  description: string;
  cptCode?: string;
  impact: number;
  recommendation: string;
}

export interface NextAction {
  priority: number;
  title: string;
  description: string;
  timeframe: string;
}

export interface BillAnalysis {
  summary: string;
  totalBilled: number;
  estimatedFairValue: number;
  estimatedSavings: number;
  confidenceScore: number;
  lineItems: BillLineItemAnalysis[];
  errors: BillError[];
  redFlags: string[];
  nextActions: NextAction[];
  disputeTemplate: string;
  negotiationScript: string;
  patientRights: string[];
}

type ContentPart =
  | { type: "text"; text: string }
  | { type: "image_url"; image_url: { url: string; detail: "high" } };

// ─── Content extraction ──────────────────────────────────────────────────────

const IMAGE_MIMES = new Set([
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const DOCX_MIMES = new Set([
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "application/msword",
]);

export async function extractBillContent(
  buffer: Buffer,
  mimeType: string
): Promise<{ text?: string; images?: string[] }> {
  const mime = mimeType.toLowerCase();

  if (mime === "application/pdf") {
    return extractPdfContent(buffer);
  }

  if (DOCX_MIMES.has(mime)) {
    return extractDocxContent(buffer);
  }

  if (IMAGE_MIMES.has(mime)) {
    const base64 = buffer.toString("base64");
    return { images: [`data:${mime};base64,${base64}`] };
  }

  throw new Error(`Unsupported file type: ${mimeType}`);
}

async function extractPdfContent(
  buffer: Buffer
): Promise<{ text?: string; images?: string[] }> {
  // pdf-parse v1.1.1 — CommonJS default export
  const pdfParse = (await import("pdf-parse")).default;
  const parsed = await pdfParse(buffer);
  const text = parsed.text?.trim() ?? "";

  if (text.length >= 100) {
    return { text };
  }

  // Scanned PDF — send as base64 image for GPT-4o vision
  const base64 = buffer.toString("base64");
  return {
    text: text.length > 0 ? text : undefined,
    images: [`data:application/pdf;base64,${base64}`],
  };
}

async function extractDocxContent(
  buffer: Buffer
): Promise<{ text?: string }> {
  const mammoth = await import("mammoth");
  const result = await mammoth.extractRawText({ buffer });
  const text = result.value?.trim() ?? "";
  if (!text) {
    throw new Error("Could not extract text from the Word document.");
  }
  return { text };
}

// ─── OpenAI analysis ─────────────────────────────────────────────────────────

const SYSTEM_PROMPT = `You are an expert medical billing analyst and patient advocate. Your job is to thoroughly analyze medical bills to find billing errors, overcharges, and opportunities for patients to save money.

You specialize in detecting:
- **Upcoding**: When a provider bills for a more expensive service than what was actually provided
- **Duplicate charges**: The same service billed more than once
- **Unbundling**: Billing separately for procedures that should be billed together at a lower bundled rate
- **Quantity errors**: Incorrect quantities of supplies, medications, or services
- **Balance billing violations**: Illegal charges beyond what insurance should cover
- **Missing insurance adjustments**: Charges that should have been reduced by insurance contracts
- **Incorrect CPT/ICD codes**: Wrong procedure or diagnosis codes that inflate the bill
- **Charges for services not rendered**: Items billed but never provided

IMPORTANT GUARDRAIL: Before analyzing, first determine if the uploaded document is actually a medical bill, medical invoice, Explanation of Benefits (EOB), hospital statement, or healthcare-related billing document. If the document is NOT a medical bill (e.g. a resume, receipt for non-medical services, random document, legal contract, etc.), you MUST return the following JSON and nothing else:
{"isMedicalBill": false, "rejectionReason": "A brief explanation of what the document appears to be and why it is not a medical bill."}

If the document IS a medical bill, include "isMedicalBill": true in your response along with the full analysis.

You must return ONLY valid JSON matching the exact schema specified. Do not include any text outside the JSON.`;

function buildAnalysisSchema(): string {
  return JSON.stringify({
    isMedicalBill:
      "true if this document is a medical bill/invoice/EOB/healthcare statement, false otherwise (boolean, required)",
    rejectionReason:
      "If isMedicalBill is false, explain what the document appears to be. null if isMedicalBill is true (string or null)",
    summary:
      "A 2-3 sentence plain-English summary of the bill and key findings",
    totalBilled: "Total amount billed in dollars (number)",
    estimatedFairValue:
      "What the bill should reasonably cost based on fair market rates (number)",
    estimatedSavings:
      "totalBilled minus estimatedFairValue (number)",
    confidenceScore:
      "Your confidence in this analysis from 0.0 to 1.0 (number)",
    lineItems: [
      {
        description: "Service description",
        cptCode: "CPT code if identified (string or null)",
        icd10Code: "ICD-10 diagnosis code if identified (string or null)",
        quantity: "Number of units (integer)",
        unitPrice: "Price per unit in dollars (number)",
        totalCharge: "Total charge for this line in dollars (number)",
        isError: "true if this line has a billing issue (boolean)",
        errorType:
          "Type of error: upcoding | duplicate | unbundling | quantity | balance_billing | not_rendered | incorrect_code | missing_adjustment | null",
        errorExplanation:
          "Plain-English explanation of the error if isError is true, else null",
        fairPrice: "Fair market price for this service if isError (number or null)",
        overchargeAmount:
          "Amount overcharged (totalCharge - fairPrice) if isError (number or null)",
      },
    ],
    errors: [
      {
        type: "Error type category",
        severity: "high | medium | low",
        description: "Detailed explanation of the error",
        cptCode: "Related CPT code if applicable (string or null)",
        impact: "Dollar impact of this error (number)",
        recommendation: "What the patient should do about it",
      },
    ],
    redFlags:
      "Array of short strings — critical issues the patient must address immediately",
    nextActions: [
      {
        priority: "1 = most urgent (integer)",
        title: "Short action title",
        description: "What to do and why",
        timeframe: "e.g. 'Within 48 hours', 'Within 30 days'",
      },
    ],
    disputeTemplate:
      "A complete, ready-to-send dispute letter addressed to the billing department. Include placeholders like [YOUR NAME], [DATE], [ACCOUNT NUMBER]. Reference specific errors and amounts found.",
    negotiationScript:
      "A phone script the patient can use when calling the billing department. Include what to say, questions to ask, and how to respond to common pushback.",
    patientRights:
      "Array of relevant patient rights and protections that apply (e.g., No Surprises Act, state-specific laws)",
  });
}

export async function analyzeBillWithOpenAI(
  content: { text?: string; images?: string[] },
  billId: string
): Promise<BillAnalysis> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey || apiKey === "your-openai-api-key-here") {
    throw new Error(
      "OPENAI_API_KEY is not configured. Please set it in your .env file."
    );
  }

  const openai = new OpenAI({ apiKey });

  const userParts: ContentPart[] = [];

  if (content.text) {
    userParts.push({
      type: "text",
      text: `Here is the medical bill text content to analyze:\n\n---\n${content.text}\n---\n\nAnalyze this medical bill comprehensively. Return the result as JSON matching this exact schema:\n${buildAnalysisSchema()}`,
    });
  }

  if (content.images?.length) {
    if (!content.text) {
      userParts.push({
        type: "text",
        text: `Analyze this medical bill image comprehensively. Extract all line items, charges, and codes visible. Return the result as JSON matching this exact schema:\n${buildAnalysisSchema()}`,
      });
    }
    for (const img of content.images) {
      userParts.push({
        type: "image_url",
        image_url: { url: img, detail: "high" },
      });
    }
  }

  if (userParts.length === 0) {
    throw new Error("No content to analyze — extraction yielded nothing.");
  }

  let response;
  try {
    response = await openai.chat.completions.create({
      model: "gpt-4o",
      max_tokens: 4096,
      temperature: 0.1,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        { role: "user", content: userParts },
      ],
    });
  } catch (err: any) {
    const msg = err?.message ?? String(err);
    console.error("OpenAI API error:", msg);
    throw new Error(`OpenAI API call failed: ${msg}`);
  }

  const choice = response.choices[0];
  const finishReason = choice?.finish_reason;
  const raw = choice?.message?.content;
  const refusal = (choice?.message as any)?.refusal;

  if (refusal) {
    throw new Error(`OpenAI refused the request: ${refusal}`);
  }

  if (!raw) {
    console.error("OpenAI empty response. Finish reason:", finishReason, "Full response:", JSON.stringify(response));
    throw new Error(
      `OpenAI returned an empty response (finish_reason: ${finishReason ?? "unknown"}). The document may not be a medical bill or the content could not be processed.`
    );
  }

  let parsed: BillAnalysis & { isMedicalBill?: boolean; rejectionReason?: string };
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.error("OpenAI returned invalid JSON:", raw.slice(0, 500));
    throw new Error("OpenAI returned invalid JSON. Please try again.");
  }

  if (parsed.isMedicalBill === false) {
    const reason = parsed.rejectionReason ?? "The uploaded document does not appear to be a medical bill.";
    throw new NotMedicalBillError(reason);
  }

  // Store token usage alongside the analysis
  const usage = response.usage;
  await prisma.aiAnalysisResult.create({
    data: {
      billId,
      modelUsed: "gpt-4o",
      promptTokens: usage?.prompt_tokens ?? null,
      completionTokens: usage?.completion_tokens ?? null,
      cost: usage
        ? Number(
            (
              (usage.prompt_tokens ?? 0) * 0.0025 / 1000 +
              (usage.completion_tokens ?? 0) * 0.01 / 1000
            ).toFixed(6)
          )
        : null,
      confidenceScore: parsed.confidenceScore ?? null,
      analysisJson: parsed as any,
    },
  });

  return parsed;
}

// ─── Save analysis to DB ─────────────────────────────────────────────────────

export async function saveBillAnalysis(
  billId: string,
  analysis: BillAnalysis
): Promise<void> {
  await prisma.medicalBill.update({
    where: { id: billId },
    data: {
      status: "completed",
      totalAmount: analysis.totalBilled,
      estimatedSavings: analysis.estimatedSavings,
      analysisCompletedAt: new Date(),
    },
  });

  if (analysis.lineItems?.length) {
    await prisma.billLineItem.createMany({
      data: analysis.lineItems.map((item) => ({
        billId,
        description: item.description,
        cptCode: item.cptCode ?? null,
        icd10Code: item.icd10Code ?? null,
        quantity: item.quantity ?? 1,
        unitPrice: item.unitPrice ?? null,
        totalCharge: item.totalCharge ?? null,
        isError: item.isError ?? false,
        errorType: item.errorType ?? null,
        fairPrice: item.fairPrice ?? null,
        overchargeAmount: item.overchargeAmount ?? null,
      })),
    });
  }
}
