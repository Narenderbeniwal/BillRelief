/**
 * Google Indexing API integration for automatic indexing notifications.
 *
 * Setup:
 * 1. Go to Google Cloud Console → Create project (or use existing)
 * 2. Enable "Web Search Indexing API"
 * 3. Create a Service Account → Download JSON key
 * 4. In Google Search Console → Settings → Owners → Add the service account email as owner
 * 5. Set environment variables:
 *    - GOOGLE_INDEXING_CLIENT_EMAIL (from JSON key)
 *    - GOOGLE_INDEXING_PRIVATE_KEY (from JSON key, keep the \n characters)
 */

import { SITE_URL } from "./siteConfig";

const INDEXING_API_URL = "https://indexing.googleapis.com/v3/urlNotifications:publish";

interface IndexingResult {
  success: boolean;
  url: string;
  error?: string;
}

async function getAccessToken(): Promise<string | null> {
  const clientEmail = process.env.GOOGLE_INDEXING_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_INDEXING_PRIVATE_KEY?.replace(/\\n/g, "\n");

  if (!clientEmail || !privateKey) {
    console.log("Google Indexing API not configured (missing credentials)");
    return null;
  }

  try {
    const now = Math.floor(Date.now() / 1000);
    const header = { alg: "RS256", typ: "JWT" };
    const payload = {
      iss: clientEmail,
      scope: "https://www.googleapis.com/auth/indexing",
      aud: "https://oauth2.googleapis.com/token",
      iat: now,
      exp: now + 3600,
    };

    const { subtle } = globalThis.crypto;
    const encoder = new TextEncoder();

    const base64url = (data: string | object) => {
      const str = typeof data === "string" ? data : JSON.stringify(data);
      return Buffer.from(str).toString("base64url");
    };

    const headerB64 = base64url(header);
    const payloadB64 = base64url(payload);
    const signInput = `${headerB64}.${payloadB64}`;

    const keyData = privateKey
      .replace(/-----BEGIN PRIVATE KEY-----/, "")
      .replace(/-----END PRIVATE KEY-----/, "")
      .replace(/\s/g, "");

    const binaryKey = Buffer.from(keyData, "base64");
    const cryptoKey = await subtle.importKey(
      "pkcs8",
      binaryKey,
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signature = await subtle.sign("RSASSA-PKCS1-v1_5", cryptoKey, encoder.encode(signInput));
    const signatureB64 = Buffer.from(signature).toString("base64url");
    const jwt = `${signInput}.${signatureB64}`;

    const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: `grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=${jwt}`,
    });

    if (!tokenRes.ok) {
      console.error("Failed to get Google access token:", await tokenRes.text());
      return null;
    }

    const tokenData = await tokenRes.json();
    return tokenData.access_token;
  } catch (err) {
    console.error("Error getting Google access token:", err);
    return null;
  }
}

export async function notifyGoogleIndexing(
  url: string,
  type: "URL_UPDATED" | "URL_DELETED" = "URL_UPDATED"
): Promise<IndexingResult> {
  const fullUrl = url.startsWith("http") ? url : `${SITE_URL}${url}`;

  const accessToken = await getAccessToken();
  if (!accessToken) {
    return { success: false, url: fullUrl, error: "Indexing API not configured" };
  }

  try {
    const res = await fetch(INDEXING_API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ url: fullUrl, type }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error("Google Indexing API error:", errorText);
      return { success: false, url: fullUrl, error: errorText };
    }

    console.log(`Google notified: ${type} - ${fullUrl}`);
    return { success: true, url: fullUrl };
  } catch (err) {
    console.error("Error calling Google Indexing API:", err);
    return { success: false, url: fullUrl, error: String(err) };
  }
}

export async function notifyGoogleBatch(urls: string[]): Promise<IndexingResult[]> {
  return Promise.all(urls.map((url) => notifyGoogleIndexing(url)));
}

export async function pingGoogleSitemap(): Promise<boolean> {
  const sitemapUrl = `${SITE_URL}/sitemap.xml`;
  try {
    const res = await fetch(
      `https://www.google.com/ping?sitemap=${encodeURIComponent(sitemapUrl)}`
    );
    console.log(`Pinged Google sitemap: ${res.status}`);
    return res.ok;
  } catch (err) {
    console.error("Error pinging Google sitemap:", err);
    return false;
  }
}
