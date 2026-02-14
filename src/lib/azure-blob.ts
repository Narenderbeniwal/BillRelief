import {
  BlobServiceClient,
  StorageSharedKeyCredential,
  generateBlobSASQueryParameters,
  BlobSASPermissions,
} from "@azure/storage-blob";
import path from "path";

const BLOB_PREFIX = "azure:";
const CONTAINER_NAME = process.env.AZURE_STORAGE_CONTAINER_NAME ?? "bill-uploads";

function parseConnectionString(conn: string): { accountName: string; accountKey: string } {
  const parts = conn.split(";").reduce<Record<string, string>>((acc, part) => {
    const [key, ...v] = part.split("=");
    if (key && v.length) acc[key.trim()] = v.join("=").trim();
    return acc;
  }, {});
  const accountName = parts.AccountName;
  const accountKey = parts.AccountKey;
  if (!accountName || !accountKey) {
    throw new Error("Invalid connection string: missing AccountName or AccountKey");
  }
  return { accountName, accountKey };
}

export function isAzureBlobConfigured(): boolean {
  return Boolean(process.env.AZURE_STORAGE_CONNECTION_STRING?.trim());
}

/**
 * Sanitize blob path segment: safe for container path.
 */
function sanitizeBlobName(name: string): string {
  const base = path.basename(name);
  return base.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 200) || "document";
}

/**
 * Upload a file to Azure Blob Storage.
 * Returns a stored fileUrl value to save in DB: "azure:<userId>/<timestamp>-<sanitized>".
 */
export async function uploadToBlob(
  userId: string,
  file: File
): Promise<{ fileUrl: string; fileName: string }> {
  const conn = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME ?? CONTAINER_NAME;
  if (!conn?.trim()) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING is not set");
  }

  const client = BlobServiceClient.fromConnectionString(conn);
  const container = client.getContainerClient(containerName);

  const sanitized = sanitizeBlobName(file.name);
  const timestamp = Date.now();
  const blobName = `${userId}/${timestamp}-${sanitized}`;

  const arrayBuffer = await file.arrayBuffer();
  const buffer = Buffer.from(arrayBuffer);
  const blobClient = container.getBlockBlobClient(blobName);
  await blobClient.uploadData(buffer, {
    blobHTTPHeaders: { blobContentType: file.type || "application/octet-stream" },
  });

  const fileUrl = `${BLOB_PREFIX}${blobName}`;
  return { fileUrl, fileName: file.name };
}

/**
 * Check if fileUrl points to Azure Blob (stored as "azure:...").
 */
export function isBlobFileUrl(fileUrl: string): boolean {
  return fileUrl.startsWith(BLOB_PREFIX);
}

/**
 * Get a time-limited download URL (SAS) for a blob stored as "azure:<blobName>".
 * Use for redirect in the file serve route.
 */
export async function getBlobDownloadUrl(blobPath: string): Promise<string> {
  if (!blobPath.startsWith(BLOB_PREFIX)) {
    throw new Error("Not a blob path");
  }
  const conn = process.env.AZURE_STORAGE_CONNECTION_STRING;
  const containerName = process.env.AZURE_STORAGE_CONTAINER_NAME ?? CONTAINER_NAME;
  if (!conn?.trim()) {
    throw new Error("AZURE_STORAGE_CONNECTION_STRING is not set");
  }

  const blobName = blobPath.slice(BLOB_PREFIX.length);
  const { accountName, accountKey } = parseConnectionString(conn);
  const credential = new StorageSharedKeyCredential(accountName, accountKey);
  const client = BlobServiceClient.fromConnectionString(conn);
  const container = client.getContainerClient(containerName);
  const blobClient = container.getBlobClient(blobName);

  const expiresOn = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
  const sas = generateBlobSASQueryParameters(
    {
      containerName,
      blobName,
      permissions: BlobSASPermissions.parse("r"),
      expiresOn,
    },
    credential
  ).toString();

  const url = blobClient.url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}${sas}`;
}
