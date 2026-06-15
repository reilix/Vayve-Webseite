import fs from "node:fs/promises";
import path from "node:path";
import { UPLOADS_DIR } from "./paths";

const MAX_BYTES = 8 * 1024 * 1024; // 8 MB

const EXT_BY_MIME: Record<string, string> = {
  "image/jpeg": "jpg",
  "image/png": "png",
  "image/webp": "webp",
  "image/avif": "avif",
  "image/gif": "gif",
};

export const CONTENT_TYPE_BY_EXT: Record<string, string> = {
  jpg: "image/jpeg",
  jpeg: "image/jpeg",
  png: "image/png",
  webp: "image/webp",
  avif: "image/avif",
  gif: "image/gif",
};

export class UploadError extends Error {}

/**
 * Speichert ein hochgeladenes Bild im Volume und gibt den öffentlichen
 * Pfad (`/uploads/<uuid>.<ext>`) zurück.
 */
export async function saveUpload(file: File): Promise<string> {
  const ext = EXT_BY_MIME[file.type];
  if (!ext) {
    throw new UploadError("Nicht unterstütztes Bildformat (JPG, PNG, WEBP, AVIF, GIF).");
  }
  if (file.size > MAX_BYTES) {
    throw new UploadError("Bild ist zu groß (max. 8 MB).");
  }

  await fs.mkdir(UPLOADS_DIR, { recursive: true });
  const filename = `${crypto.randomUUID()}.${ext}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await fs.writeFile(path.join(UPLOADS_DIR, filename), buffer);
  return `/uploads/${filename}`;
}

/** Löscht eine zuvor hochgeladene Datei (best effort). */
export async function deleteUpload(publicPath: string | null | undefined): Promise<void> {
  if (!publicPath || !publicPath.startsWith("/uploads/")) return;
  const name = path.basename(publicPath);
  const resolved = path.resolve(UPLOADS_DIR, name);
  if (!resolved.startsWith(path.resolve(UPLOADS_DIR))) return;
  await fs.rm(resolved, { force: true });
}
