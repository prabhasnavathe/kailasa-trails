import type { Express } from "express";
import fs from "fs";
import path from "path";
import { ENV } from "./env";

export function registerStorageProxy(app: Express) {
  app.get("/manus-storage/*", async (req, res) => {
    const key = (req.params as Record<string, string>)[0];
    if (!key) {
      res.status(400).send("Missing storage key");
      return;
    }

    // 1. Check local static directories
    const candidatePaths = [
      path.resolve(process.cwd(), "client/public/manus-storage", key),
      path.resolve(process.cwd(), "dist/public/manus-storage", key),
      path.resolve(import.meta.dirname, "../../client/public/manus-storage", key),
      path.resolve(import.meta.dirname, "../public/manus-storage", key),
    ];

    for (const p of candidatePaths) {
      if (fs.existsSync(p) && fs.statSync(p).isFile()) {
        res.sendFile(p);
        return;
      }
    }

    // 2. Try Forge presigned storage if configured
    if (ENV.forgeApiUrl && ENV.forgeApiKey) {
      try {
        const forgeUrl = new URL(
          "v1/storage/presign/get",
          ENV.forgeApiUrl.replace(/\/+$/, "") + "/",
        );
        forgeUrl.searchParams.set("path", key);

        const forgeResp = await fetch(forgeUrl, {
          headers: { Authorization: `Bearer ${ENV.forgeApiKey}` },
        });

        if (forgeResp.ok) {
          const { url } = (await forgeResp.json()) as { url: string };
          if (url) {
            res.set("Cache-Control", "no-store");
            res.redirect(307, url);
            return;
          }
        }
      } catch (err) {
        console.error("[StorageProxy] forge error:", err);
      }
    }

    // 3. Fallback to upstream space URL
    res.redirect(307, `https://kailasatrail-b3nim5jm.manus.space/manus-storage/${key}`);
  });
}
