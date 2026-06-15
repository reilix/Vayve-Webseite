import path from "node:path";

/**
 * Reine Pfad-Konstanten ohne Seiteneffekte (keine DB, kein fs-Zugriff beim Import).
 * So muss z. B. die Upload-Route nicht die ganze DB-Verbindung mitladen.
 */
export const DATA_DIR =
  process.env.DATA_DIR ?? path.join(process.cwd(), "data");

export const DATABASE_PATH =
  process.env.DATABASE_PATH ?? path.join(DATA_DIR, "vayve.db");

export const UPLOADS_DIR =
  process.env.UPLOADS_DIR ?? path.join(DATA_DIR, "uploads");
