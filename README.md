# BillRelief.com

Production-ready medical bill analysis platform based on the BillRelief HLD and Enhanced UI design documents. Built with Next.js 14 (App Router), TypeScript, Prisma, NextAuth, and Tailwind CSS.

## Features

- **Landing page**: Hero with animated savings counter, AI badge, how-it-works section
- **Qualification quiz**: Multi-step flow with progress and estimated savings
- **Auth**: Email/password sign-up and login (NextAuth, 15-min session for HIPAA guidance)
- **Dashboard**: List of uploaded bills, status, and estimated savings
- **Bill upload**: PDF/JPG/PNG upload with validation (max 10MB)
- **Bill detail**: Line items, error detection placeholder, AI analysis status
- **Database**: PostgreSQL schema per HLD (users, medical_bills, bill_line_items, ai_analysis_results, negotiation_cases, payments)
- **API**: RESTful routes for auth and bills; ready for AI pipeline integration

## Tech stack

| Layer      | Technology        |
|-----------|-------------------|
| Frontend  | Next.js 14, React 18, TypeScript, Tailwind, shadcn-style UI, Framer Motion, TanStack Query |
| Backend   | Next.js API routes, NextAuth, Prisma |
| Database  | PostgreSQL (Prisma ORM) |
| Auth      | NextAuth (credentials), bcrypt |

## Getting started

### Prerequisites

- Node.js 20.x
- PostgreSQL 15 (or compatible)
- npm or pnpm

### Setup

1. **Clone and install**

   ```bash
   cd Project
   npm install
   ```

2. **Environment**

   Copy `.env.example` to `.env` and set:

   - `DATABASE_URL`: PostgreSQL connection string (e.g. `postgresql://user:pass@localhost:5432/billrelief`)
   - `NEXTAUTH_URL`: App URL (e.g. `http://localhost:3000`)
   - `NEXTAUTH_SECRET`: Random secret (e.g. `openssl rand -base64 32`)

3. **Database**

   ```bash
   npm run db:push
   npm run db:generate
   ```

4. **Run**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000).

### Scripts

- `npm run dev` — Start dev server
- `npm run build` — Production build
- `npm run start` — Start production server
- `npm run lint` — Run ESLint
- `npm run db:generate` — Generate Prisma client
- `npm run db:push` — Push schema to DB (no migrations)
- `npm run db:migrate` — Run migrations
- `npm run db:studio` — Open Prisma Studio

## Project structure

```
src/
├── app/
│   ├── api/
│   │   ├── auth/          # NextAuth + register
│   │   └── bills/         # Bills CRUD
│   ├── dashboard/         # Protected dashboard, upload, bill detail
│   ├── get-started/       # Qualification quiz
│   ├── login/             # Login page
│   ├── register/          # Register page
│   ├── layout.tsx
│   ├── page.tsx           # Landing
│   ├── providers.tsx
│   └── globals.css
├── components/
│   ├── dashboard/         # DashboardNav, BillUploadForm, BillDetailClient, etc.
│   ├── get-started/       # QualificationQuiz
│   ├── landing/           # EnhancedHero, HowItWorks, SiteHeader
│   └── ui/                # Button, Card, Input, Label, Progress
├── lib/
│   ├── auth.ts            # NextAuth config
│   ├── prisma.ts         # Prisma client
│   └── utils.ts
├── types/
│   └── next-auth.d.ts
└── middleware.ts         # Protect /dashboard
prisma/
└── schema.prisma         # HLD schema
```

## Design alignment

- **HLD**: Microservices-ready structure, API-first, PostgreSQL + Prisma schema, HIPAA-oriented session timeout, bill pipeline stages (upload → OCR → extraction → error detection → negotiation → report).
- **UI design**: Hero with 48-hour badge, animated counter, savings calculator block, multi-step quiz with progress, how-it-works, trust badges (HIPAA, rating).

## Next steps for production

1. **File storage**: Replace placeholder `fileUrl` with S3/R2 upload (presigned URL or server upload), encryption at rest.
2. **AI pipeline**: Integrate OCR (e.g. Tesseract or Google Vision), then LLM (Claude/GPT) for extraction and error detection; run in a queue/worker.
3. **Stripe**: Add subscription and success-fee payment flows.
4. **Notifications**: Email/SMS for status updates.
5. **Monitoring**: Logging, error tracking, and metrics per HLD.

## License

Proprietary. All rights reserved.
