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
 * Sends support form to inbox. Uses Resend HTTP API if RESEND_API_KEY is set,
 * otherwise SMTP via nodemailer (SMTP_HOST + credentials).
 */
export async function sendSupportHumanEmail(
  payload: SupportHumanPayload
): Promise<void> {
  const to =
    process.env.SUPPORT_INBOX_EMAIL?.trim() || CONTACT_EMAIL;
  const from =
    process.env.MAIL_FROM?.trim() ||
    `BillRelief <${CONTACT_EMAIL}>`;

  const { text, html } = buildBodies(payload);
  const subject = `[BillBot — Human request] ${payload.subject}`;

  const resendKey = process.env.RESEND_API_KEY?.trim();
  if (resendKey) {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${resendKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: [payload.email],
        subject,
        text,
        html,
      }),
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
    replyTo: payload.email,
    subject,
    text,
    html,
  });
}
