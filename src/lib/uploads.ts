import { mkdir, writeFile } from "fs/promises";
import path from "path";

const UPLOADS_DIR = "uploads";

/**
 * Sanitize filename: remove path traversal and dangerous chars, keep extension.
 */
function sanitizeFileName(name: string): string {
  const base = path.basename(name);
  const safe = base.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 200);
  return safe || "document";
}

/**
 * Get the absolute directory path for a user's uploads.
 */
export function getUserUploadsDir(userId: string): string {
  return path.join(process.cwd(), UPLOADS_DIR, userId);
}

/**
 * Save an uploaded file to disk under uploads/<userId>/<timestamp>-<sanitized>.
 * Returns the relative path (e.g. uploads/userId/123-file.pdf) for storing in DB.
 */
export async function saveUploadedFile(
  userId: string,
  file: File
): Promise<{ relativePath: string; fileName: string }> {
  const dir = getUserUploadsDir(userId);
  await mkdir(dir, { recursive: true });

  const sanitized = sanitizeFileName(file.name);
  const timestamp = Date.now();
  const fileName = `${timestamp}-${sanitized}`;
  const filePath = path.join(dir, fileName);

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  await writeFile(filePath, buffer);

  const relativePath = `${UPLOADS_DIR}/${userId}/${fileName}`;
  return { relativePath, fileName };
}
