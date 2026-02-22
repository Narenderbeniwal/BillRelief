# HIPAA-Aligned Practices & Checklist

This document summarizes what is implemented in the codebase to support HIPAA-aligned handling of PHI and what you still need to do to reduce legal risk.

## What We Implemented (Code & Config)

- **Security headers:** Strict-Transport-Security, X-Content-Type-Options, X-Frame-Options, Referrer-Policy, Permissions-Policy (next.config).
- **Session timeout:** 15-minute automatic logoff (auth options).
- **Audit logging:** Access to bill files (downloads) is logged to `AuditLog` (userId, action, resourceType, resourceId, IP, userAgent). Run the migration to create the table (see below).
- **File download:** Response uses a generic filename (e.g. `bill.pdf`) so PHI is not sent in the `Content-Disposition` header; `Cache-Control: private, no-store` to avoid caching of PHI.
- **Privacy Policy & HIPAA page:** `/privacy` and `/hipaa` with clear language and disclaimer that full compliance depends on BAAs, risk assessments, and legal advice.
- **Marketing wording:** Site uses "HIPAA-aligned" instead of "HIPAA Compliant" to reduce liability (compliance is ongoing and depends on many factors).
- **Footer links:** Privacy and HIPAA & Security linked from footer.

## Required: Database Migration for Audit Log

Create and apply the migration for the new `AuditLog` table:

```bash
npx prisma migrate dev --name add_audit_log_hipaa
```

Or if you prefer to apply manually, create a migration that adds the `audit_logs` table as defined in `prisma/schema.prisma` (AuditLog model).

## What You Must Do (Legal / Operational)

1. **Business Associate Agreements (BAAs):** If you are a business associate of a covered entity (or they of you), you must have a signed BAA. Have a lawyer draft or review.
2. **Risk assessment:** Conduct a formal risk assessment (e.g., NIST or HIPAA Security Rule–based) and document it. Update it periodically.
3. **Notice of Privacy Practices:** If you are a covered entity, you must provide a Notice of Privacy Practices. The `/hipaa` and `/privacy` pages are not a substitute for a full NPP where required by law.
4. **Encryption at rest:** Confirm that your database and file storage (e.g., Azure Blob, local disk) use encryption at rest. Azure and most cloud providers do by default.
5. **Vendor BAAs:** Ensure any vendor that touches PHI (hosting, email, analytics if they see PHI) has a BAA or equivalent and is HIPAA-compliant.
6. **Training:** Train staff on HIPAA and your policies. Document training.
7. **Incident response:** Have a written plan for breach notification and incident response; test it periodically.
8. **Legal review:** Have a qualified attorney review your privacy policy, HIPAA page, and overall compliance posture. This repo does not provide legal advice.

## Optional Improvements

- Log listing of bills (e.g., `bill_list` action) in addition to file download.
- Add a “Privacy Officer” or “HIPAA contact” email on the HIPAA page if required.
- Consider encryption at rest for local `uploads/` if you use filesystem storage (e.g., encrypt the volume or use only cloud storage with encryption).
