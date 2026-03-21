# BillBot — Custom site chat

BillBot is the floating assistant on every page. It uses **OpenAI `gpt-4o`** with a fixed system prompt (BillRelief facts, tone, guardrails) and stores conversations in PostgreSQL.

## Environment

- **`OPENAI_API_KEY`** — Required for BillBot (same key as dashboard bill analysis). Set in `.env` locally and in **Azure App Service → Configuration → Application settings**.

### “Talk with a human” (email to team)

The widget includes a **Customer support** form. Submissions are sent by email to **`SUPPORT_INBOX_EMAIL`** if set, otherwise **`contact@billreliefai.com`** ([`siteConfig`](../src/lib/siteConfig.ts)).

Configure **one** of:

1. **`RESEND_API_KEY`** + **`MAIL_FROM`** (verified domain or Resend onboarding sender) — uses [Resend](https://resend.com) HTTP API.
2. **`SMTP_HOST`**, **`SMTP_PORT`**, **`SMTP_USER`**, **`SMTP_PASSWORD`** (+ optional **`SMTP_SECURE`**) + **`MAIL_FROM`** — uses Nodemailer.

See `.env.example`. Without Resend or SMTP, the form returns a server error until email is configured.

The API attaches a **recent BillBot transcript** when `sessionId` is known and the DB is available.

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/support-human` | Body: `{ name, email, phone?, subject, message, sessionId? }` → sends email to inbox. |

You can remove legacy Tawk variables from Azure if present:

- `NEXT_PUBLIC_TAWK_PROPERTY_ID`
- `NEXT_PUBLIC_TAWK_WIDGET_ID`

## Database

After pulling changes:

```bash
npx prisma generate
npx prisma db push
```

Tables: `support_chat_sessions`, `support_chat_messages`.

- **Anonymous visitors:** A `sessionId` is stored in `localStorage` (`billbot_session_id`) so the thread can continue across page views.
- **Logged-in users:** On first message, the session may be linked to `user_id` when available.

## API

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/support-chat` | Body: `{ message, sessionId?, conversation? }` → `{ sessionId, reply, persisted }`. If PostgreSQL is unreachable, `persisted` is `false`, `sessionId` is `null`, and the server builds context from `conversation` (prior turns from the client). |
| `GET` | `/api/support-chat?sessionId=` | Returns `{ messages: [{ role, content }] }` for history restore. On DB errors, returns `{ messages: [] }`. |

### Ephemeral mode (DB down)

When Prisma cannot connect (e.g. DNS, Neon paused), BillBot still answers using the client-sent **`conversation`** array. Nothing is written to the database until connectivity returns.

**To fix persistence** (remove the yellow banner), restore a working Postgres connection: see **[DATABASE_CONNECTION.md](./DATABASE_CONNECTION.md)** and run `npm run db:ping`.

## Prompt and behavior

System prompt: [`src/lib/billbot-prompt.ts`](../src/lib/billbot-prompt.ts).  
Temperature **0.4**, model **gpt-4o**.

The widget shows a short disclaimer: do not paste PHI or account numbers in chat; use secure bill upload for documents.

## Files

- `src/components/chat/BillBotWidget.tsx` — UI + human form
- `src/app/api/support-chat/route.ts` — API + persistence
- `src/app/api/support-human/route.ts` — Human form → email
- `src/lib/support-mail.ts` — Resend or SMTP send
- `prisma/schema.prisma` — `SupportChatSession`, `SupportChatMessage`
