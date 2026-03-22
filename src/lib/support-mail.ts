import nodemailer from "nodemailer";
import { CONTACT_EMAIL } from "@/lib/siteConfig";

export type SupportHumanPayload = {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
  chatTranscript?: string;
};

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function getSupportInbox(): string {
  return process.env.SUPPORT_INBOX_EMAIL?.trim() || CONTACT_EMAIL;
}

function getLeadInbox(): string {
  return (
    process.env.LEAD_NOTIFY_EMAIL?.trim() ||
    process.env.SUPPORT_INBOX_EMAIL?.trim() ||
    CONTACT_EMAIL
  );
}

function getFromAddress(): string {
  return (
    process.env.MAIL_FROM?.trim() || `BillRelief <${CONTACT_EMAIL}>`
  );
}

/**
 * Low-level send: Resend API or SMTP (same env as BillBot human form).
 */
async function deliverMail(params: {
  to: string;
  from: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
}): Promise<void> {
  const { to, from, subject, text, html, replyTo } = params;

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    const body: Record<string, unknown> = {
      from,
      to: [to],
      subject,
      text,
      html,
    };
    if (replyTo) body.reply_to = [replyTo];

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const errText = await res.text().catch(() => res.statusText);
      throw new Error(`Resend error ${res.status}: ${errText}`);
    }
    return;
  }

  const host = process.env.SMTP_HOST?.trim();
  if (!host) {
    throw new Error(
      "Email not configured: set RESEND_API_KEY or SMTP_HOST (and SMTP_USER / SMTP_PASSWORD) in the server environment."
    );
  }

  const port = Number(process.env.SMTP_PORT) || 587;
  const secure = process.env.SMTP_SECURE === "true" || port === 465;
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASSWORD?.trim();

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: user && pass ? { user, pass } : undefined,
  });

  await transporter.sendMail({
    from,
    to,
    replyTo: replyTo || undefined,
    subject,
    text,
    html,
  });
}

function buildBodies(payload: SupportHumanPayload) {
  const lines = [
    `Name: ${payload.name}`,
    `Email: ${payload.email}`,
    payload.phone ? `Phone: ${payload.phone}` : null,
    "",
    "Message:",
    payload.message,
    "",
    payload.chatTranscript
      ? "--- Recent BillBot chat (if any) ---\n" + payload.chatTranscript
      : null,
  ].filter(Boolean) as string[];

  const text = lines.join("\n");
  const html = `
    <h2>BillBot — Talk with a human</h2>
    <p><strong>Name:</strong> ${escapeHtml(payload.name)}</p>
    <p><strong>Email:</strong> ${escapeHtml(payload.email)}</p>
    ${
      payload.phone
        ? `<p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>`
        : ""
    }
    <p><strong>Subject:</strong> ${escapeHtml(payload.subject)}</p>
    <hr />
    <pre style="white-space:pre-wrap;font-family:sans-serif;">${escapeHtml(
      payload.message
    )}</pre>
    ${
      payload.chatTranscript
        ? `<hr /><h3>Recent chat</h3><pre style="white-space:pre-wrap;font-family:sans-serif;font-size:12px;">${escapeHtml(
            payload.chatTranscript
          )}</pre>`
        : ""
    }
  `.trim();

  return { text, html };
}

/**
 * Exit popup / lead: notify team at inbox (contact@ by default).
 */
export async function sendLeadCaptureNotification(
  leadEmail: string,
  options?: { source?: string; submittedAt?: string; clientHint?: string }
): Promise<void> {
  const to = getLeadInbox();
  const from = getFromAddress();
  const source = options?.source ?? "exit_intent_popup";
  const when = options?.submittedAt ?? new Date().toISOString();
  const hint = options?.clientHint?.trim();

  const subject = `[BillRelief] Free guide signup — ${leadEmail}`;
  const text = [
    "Someone requested the free Medical Bill Guide + AI scan (exit popup).",
    "",
    `Lead email: ${leadEmail}`,
    `Source: ${source}`,
    `Time (UTC): ${when}`,
    hint ? `Note: ${hint}` : null,
    "",
    "Reply to the lead using Reply — their address is set as Reply-To.",
  ]
    .filter(Boolean)
    .join("\n");

  const html = `
    <h2>Free guide / scan signup</h2>
    <p><strong>Email:</strong> ${escapeHtml(leadEmail)}</p>
    <p><strong>Source:</strong> ${escapeHtml(source)}</p>
    <p><strong>Time (UTC):</strong> ${escapeHtml(when)}</p>
    ${
      hint
        ? `<p><strong>Note:</strong> ${escapeHtml(hint)}</p>`
        : ""
    }
    <p style="margin-top:1rem;color:#666;font-size:14px;">Reply to this message to email the lead directly.</p>
  `.trim();

  await deliverMail({
    to,
    from,
    subject,
    text,
    html,
    replyTo: leadEmail,
  });
}

/**
 * Sends support form to inbox. Uses Resend HTTP API if RESEND_API_KEY is set,
 * otherwise SMTP via nodemailer (SMTP_HOST + credentials).
 */
export async function sendSupportHumanEmail(
  payload: SupportHumanPayload
): Promise<void> {
  const to = getSupportInbox();
  const from = getFromAddress();
  const { text, html } = buildBodies(payload);
  const subject = `[BillBot — Human request] ${payload.subject}`;

  await deliverMail({
    to,
    from,
    subject,
    text,
    html,
    replyTo: payload.email,
  });
}
