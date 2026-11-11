// Storage helpers for Kailasa Trails
// Supports both Forge S3 storage and local filesystem fallback.

import fs from "fs";
import path from "path";
import crypto from "crypto";
import { ENV } from "./_core/env";

function getForgeConfig() {
  const forgeUrl = ENV.forgeApiUrl;
  const forgeKey = ENV.forgeApiKey;

  if (!forgeUrl || !forgeKey) {
    return null;
  }

  return { forgeUrl: forgeUrl.replace(/\/+$/, ""), forgeKey };
}

function normalizeKey(relKey: string): string {
  return relKey.replace(/^\/+/, "");
}

function appendHashSuffix(relKey: string): string {
  const hash = crypto.randomUUID().replace(/-/g, "").slice(0, 8);
  const lastDot = relKey.lastIndexOf(".");
  if (lastDot === -1) return `${relKey}_${hash}`;
  return `${relKey.slice(0, lastDot)}_${hash}${relKey.slice(lastDot)}`;
}

function saveLocalFile(relKey: string, data: Buffer | Uint8Array | string): { key: string; url: string } {
  const key = appendHashSuffix(normalizeKey(relKey));
  const projectRoot = process.cwd();

  const clientDest = path.join(projectRoot, "client", "public", "uploads", key);
  const distDest = path.join(projectRoot, "dist", "public", "uploads", key);

  try {
    fs.mkdirSync(path.dirname(clientDest), { recursive: true });
    fs.mkdirSync(path.dirname(distDest), { recursive: true });

    const buf = typeof data === "string" ? Buffer.from(data) : Buffer.from(data);
    fs.writeFileSync(clientDest, buf);
    fs.writeFileSync(distDest, buf);
    console.log(`[Storage] Saved uploaded file locally: /uploads/${key}`);
  } catch (err) {
    console.error("[Storage] Failed to save local file:", err);
  }

  return { key, url: `/uploads/${key}` };
}

export async function storagePut(
  relKey: string,
  data: Buffer | Uint8Array | string,
  contentType = "application/octet-stream",
): Promise<{ key: string; url: string }> {
  const forge = getForgeConfig();

  // If no Forge credentials, save to local static storage
  if (!forge) {
    return saveLocalFile(relKey, data);
  }

  try {
    const { forgeUrl, forgeKey } = forge;
    const key = appendHashSuffix(normalizeKey(relKey));

    // 1. Get presigned PUT URL from Forge
    const presignUrl = new URL("v1/storage/presign/put", forgeUrl + "/");
    presignUrl.searchParams.set("path", key);

    const presignResp = await fetch(presignUrl, {
      headers: { Authorization: `Bearer ${forgeKey}` },
    });

    if (!presignResp.ok) {
      console.warn("[Storage] Forge presign failed, falling back to local file storage");
      return saveLocalFile(relKey, data);
    }

    const { url: s3Url } = (await presignResp.json()) as { url: string };
    if (!s3Url) return saveLocalFile(relKey, data);

    // 2. PUT file directly to S3
    const blob =
      typeof data === "string"
        ? new Blob([data], { type: contentType })
        : new Blob([data as any], { type: contentType });

    const uploadResp = await fetch(s3Url, {
      method: "PUT",
      headers: { "Content-Type": contentType },
      body: blob,
    });

    if (!uploadResp.ok) {
      console.warn("[Storage] S3 upload failed, falling back to local file storage");
      return saveLocalFile(relKey, data);
    }

    return { key, url: `/manus-storage/${key}` };
  } catch (err) {
    console.warn("[Storage] Forge upload threw error, using local fallback:", err);
    return saveLocalFile(relKey, data);
  }
}

export async function storageGet(relKey: string): Promise<{ key: string; url: string }> {
  const key = normalizeKey(relKey);
  const forge = getForgeConfig();
  if (!forge) {
    return { key, url: `/uploads/${key}` };
  }
  return { key, url: `/manus-storage/${key}` };
}

export async function storageGetSignedUrl(relKey: string): Promise<string> {
  const forge = getForgeConfig();
  if (!forge) {
    const key = normalizeKey(relKey);
    return `/uploads/${key}`;
  }

  const key = normalizeKey(relKey);
  const getUrl = new URL("v1/storage/presign/get", forge.forgeUrl + "/");
  getUrl.searchParams.set("path", key);

  const resp = await fetch(getUrl, {
    headers: { Authorization: `Bearer ${forge.forgeKey}` },
  });

  if (!resp.ok) {
    return `/uploads/${key}`;
  }

  const { url } = (await resp.json()) as { url: string };
  return url || `/uploads/${key}`;
}
