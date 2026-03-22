# Medical bill uploads — security & HIPAA alignment

This document maps **product claims** (encryption, secure handling) to **what the codebase does** and what **you must configure** in production.

## In transit (browser → app)

- Production should use **HTTPS only** (see `middleware` canonical redirect + HSTS in `next.config.mjs`).
- Upload uses `POST /api/bills` with **session auth** (`getServerSession`); unauthenticated uploads are rejected (`401`).

## At rest

| Storage mode | Behavior |
|--------------|----------|
| **Azure Blob** (recommended when `AZURE_STORAGE_CONNECTION_STRING` is set) | Files stored under `userId/…` in a private container. **Encryption at rest** is provided by **Azure Storage** (SSE, 256-bit AES with Microsoft-managed keys by default). Downloads use **short-lived SAS URLs** (read-only, ~1 hour) from `/api/bills/[id]/file`. |
| **Local disk** (`uploads/<userId>/…`) | Not under `public/`; not served as static files. Access only through the same authenticated **file API** route. **Disk encryption** is your **host/OS** responsibility (e.g. Azure App Service encrypted storage). |

## Access control

- **Upload:** Only the logged-in user; file path includes `userId`.
- **Download / view file:** `/api/bills/[id]/file` checks `medicalBill.userId === session.user.id`.
- **AI analysis:** `/api/bills/[id]/analyze` reads the file only after the same ownership check.

## Audit trail (`audit_logs`)

| Event | When |
|-------|------|
| `bill_upload` | After a successful `POST /api/bills` (new `MedicalBill`). |
| `bill_view` | When `GET /api/bills/[id]/analyze` runs (viewing / streaming analysis; includes cached results). |
| `bill_file_download` | When `GET /api/bills/[id]/file` serves or redirects to the file. |

## Third parties (organizational, not automatic in code)

- **OpenAI** (bill analysis): Sending bill text/images to OpenAI is **PHI leaving your system**. For regulated use, you typically need a **BAA** (or equivalent) and approved configuration with the vendor — this is a **legal/contract** step, not something this repo can “turn on.”
- **Marketing copy** (“HIPAA-aligned”, “256-bit encryption”) must stay consistent with your **actual** hosting, BAAs, and policies; have qualified counsel review.

## Checklist for operators

1. Prefer **Azure Blob** in production; avoid world-readable containers.
2. Enforce **HTTPS**, strong session settings (`auth.ts` session `maxAge`).
3. Restrict **database** and **storage account keys** in env / Key Vault.
4. Review **`audit_logs`** periodically for unusual access patterns.
