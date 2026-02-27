# BillRelief

**Lower medical bills in 48 hours.** AI-powered bill analysis, error detection, and negotiation—no savings, no fee. Production-ready platform for [BillReliefAI](https://www.billreliefai.com).

---

## Features

| Area | Description |
|------|-------------|
| **Landing** | Hero with savings counter, trust badges, how-it-works, testimonials, FAQ, exit-intent popup |
| **Get started** | Multi-step qualification quiz with progress and estimated savings |
| **Auth** | Email/password sign-up and login (NextAuth, session timeout aligned with HIPAA guidance) |
| **Dashboard** | Uploaded bills, status, estimated savings; bill detail with line items and AI analysis status |
| **Bill upload** | PDF/JPG/PNG up to 10MB; local disk or **Azure Blob Storage** |
| **Blog** | Listing, categories, single post, author dashboard, comments; TipTap editor, AI readability |
| **Pricing** | Plans, sticky CTA; **PayPal** checkout for one-time and subscription |
| **Legal** | Patient agreement, privacy, HIPAA & security |
| **Live chat** | **Tawk.to** widget (shortcuts, triggers, optional chatbot) |
| **SEO** | Sitemap, robots, metadata, canonicals, structured data (Organization, WebSite, FAQ, Article) |

---

## Tech stack

| Layer | Technology |
|-------|------------|
| **Frontend** | Next.js 14 (App Router), React 18, TypeScript, Tailwind CSS, shadcn-style UI, Framer Motion, TanStack Query |
| **Backend** | Next.js API routes, NextAuth, Prisma ORM |
| **Database** | PostgreSQL (Neon-friendly: pooled + direct URLs) |
| **Auth** | NextAuth (credentials), bcrypt |
| **Payments** | PayPal (React SDK + server API); Stripe (SDK present for future use) |
| **Storage** | Local uploads or Azure Blob Storage |
| **AI** | Anthropic (blog readability); pipeline-ready for bill analysis |
| **Chat** | Tawk.to (live chat, canned responses, triggers) |

---

## Prerequisites

- **Node.js** 20.x
- **PostgreSQL** 15+ (or [Neon](https://neon.tech))
- **npm** or pnpm

---

## Quick start

### 1. Clone and install

```bash
git clone <repo-url>
cd BillRelief
npm install
```

### 2. Environment

Copy `.env.example` to `.env` (or `.env.local`) and set at least:

```bash
cp .env.example .env
```

| Variable | Required | Description |
|----------|----------|-------------|
| `DATABASE_URL` | Yes | PostgreSQL connection (use **pooled** URL for Neon) |
| `DIRECT_URL` | Yes (Prisma) | Direct DB URL (for migrations; use non-pooled for Neon) |
| `NEXTAUTH_URL` | Yes | App URL, e.g. `http://localhost:3000` |
| `NEXTAUTH_SECRET` | Yes | e.g. `openssl rand -base64 32` |
| `PAYPAL_CLIENT_ID` / `PAYPAL_CLIENT_SECRET` | For payments | [developer.paypal.com](https://developer.paypal.com) |
| `NEXT_PUBLIC_PAYPAL_CLIENT_ID` / `NEXT_PUBLIC_PAYPAL_MODE` | For payments | Same app; `sandbox` or `live` |
| `NEXT_PUBLIC_TAWK_PROPERTY_ID` / `NEXT_PUBLIC_TAWK_WIDGET_ID` | For chat | Tawk.to dashboard → Administration |
| `NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION` | Optional | Google Search Console verification |
| `ANTHROPIC_API_KEY` | Optional | Blog AI readability |
| `AZURE_STORAGE_CONNECTION_STRING` | Optional | Bill uploads to Azure Blob instead of local |
| `AZURE_STORAGE_CONTAINER_NAME` | Optional | Default: `bill-uploads` |

### 3. Database

```bash
npm run db:generate
npm run db:push
```

For migrations instead: `npm run db:migrate`.

### 4. Run

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | ESLint |
| `npm run db:generate` | Generate Prisma client |
| `npm run db:push` | Push schema to DB (no migration files) |
| `npm run db:migrate` | Run Prisma migrations |
| `npm run db:studio` | Open Prisma Studio |

---

## Project structure

```
BillRelief/
├── prisma/
│   └── schema.prisma          # DB schema (users, medical_bills, blog_posts, etc.)
├── src/
│   ├── app/
│   │   ├── api/                # Auth, bills, blogs, PayPal, AI, email-capture
│   │   ├── blog/               # Blog listing, [slug], category/[category]
│   │   ├── blogs/              # Alternate blog listing and [slug]
│   │   ├── dashboard/          # Dashboard, bills/[id], upload
│   │   ├── get-started/        # Qualification quiz
│   │   ├── legal/              # patient-agreement
│   │   ├── pricing/            # Pricing page
│   │   ├── checkout/           # PayPal checkout
│   │   ├── login, register, onboarding
│   │   ├── layout.tsx, page.tsx, providers.tsx
│   │   ├── sitemap.ts, robots.ts, not-found.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── chat/               # TawkToWidget
│   │   ├── dashboard/          # DashboardNav, BillUploadForm, BillDetailClient
│   │   ├── get-started/        # QualificationQuiz
│   │   ├── landing/            # HeroSection, SiteHeader, SiteFooter, etc.
│   │   ├── blog-platform/      # BlogListingClient, BlogPostContent
│   │   ├── pricing/            # Pricing components
│   │   ├── seo/                # StructuredData (Organization, FAQ, Article)
│   │   └── ui/                # Button, Card, Input, etc.
│   ├── lib/
│   │   ├── auth.ts             # NextAuth config
│   │   ├── prisma.ts           # Prisma client
│   │   ├── siteConfig.ts       # SITE_URL, CONTACT_EMAIL, etc.
│   │   ├── azure-blob.ts       # Blob uploads
│   │   ├── paypal.ts
│   │   └── googleIndexing.ts
│   └── middleware.ts           # Auth protection, canonical redirect (www)
├── docs/                       # TAWK_CHAT, TAWK_SETUP_CHECKLIST, HIPAA_CHECKLIST, etc.
├── .env.example
└── README.md
```

---

## Documentation

| Doc | Purpose |
|-----|---------|
| [docs/TAWK_CHAT.md](docs/TAWK_CHAT.md) | Tawk.to live chat overview and env vars |
| [docs/TAWK_SETUP_CHECKLIST.md](docs/TAWK_SETUP_CHECKLIST.md) | Chat widget and shortcuts setup |
| [docs/TAWK_SMART_REPLIES.md](docs/TAWK_SMART_REPLIES.md) | Shortcuts, triggers, chatbot (copy-paste templates) |
| [docs/TAWK_CANNED_RESPONSES.md](docs/TAWK_CANNED_RESPONSES.md) | Canned response text for dashboard |
| [docs/HIPAA_CHECKLIST.md](docs/HIPAA_CHECKLIST.md) | HIPAA-oriented checklist |

---

## Design and production

- **HLD alignment**: API-first, PostgreSQL + Prisma, HIPAA-oriented session timeout, bill pipeline (upload → analysis → negotiation → report).
- **UI**: Hero with 48-hour badge, animated counter, how-it-works, trust badges (HIPAA, ratings).
- **Production**: Configure PayPal (live mode), Azure Blob (or S3/R2) for uploads, Stripe when adding subscriptions, monitoring and error tracking.

---

## License

Proprietary. All rights reserved.
