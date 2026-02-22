/**
 * HIPAA-aligned audit logging for PHI access.
 * Log access to medical bills and other PHI so you can demonstrate compliance.
 */

import { prisma } from "./prisma";

export type AuditAction =
  | "bill_file_download"
  | "bill_list"
  | "bill_view"
  | "bill_upload";

export async function logPhiAccess(params: {
  userId: string;
  action: AuditAction;
  resourceType: string;
  resourceId: string;
  request?: Request;
}): Promise<void> {
  try {
    let ipAddress: string | null = null;
    let userAgent: string | null = null;
    if (params.request) {
      ipAddress =
        params.request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
        params.request.headers.get("x-real-ip") ??
        null;
      userAgent = params.request.headers.get("user-agent");
    }
    await prisma.auditLog.create({
      data: {
        userId: params.userId,
        action: params.action,
        resourceType: params.resourceType,
        resourceId: params.resourceId,
        ipAddress: ipAddress ?? undefined,
        userAgent: userAgent ?? undefined,
      },
    });
  } catch (e) {
    // Do not throw; logging failure must not break the request
    console.error("Audit log write failed:", e);
  }
}
