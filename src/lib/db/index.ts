import { DatabaseSync } from "node:sqlite";
import fs from "node:fs";
import { DATA_DIR, DATABASE_PATH, UPLOADS_DIR } from "../paths";
import { seedIfEmpty } from "./seed";

/**
 * Self-gehostetes SQLite via Node-Built-in `node:sqlite` (keine nativen Deps).
 * DB-Datei + Uploads liegen im Docker-Volume (`/app/data`), lokal in `./data`.
 */

export { DATA_DIR, DATABASE_PATH, UPLOADS_DIR };

const SCHEMA = /* sql */ `
CREATE TABLE IF NOT EXISTS events (
  id              TEXT PRIMARY KEY,
  slug            TEXT NOT NULL UNIQUE,
  title           TEXT NOT NULL,
  series          TEXT NOT NULL DEFAULT 'other',
  starts_at       TEXT NOT NULL,
  ends_at         TEXT,
  doors           TEXT,
  location_name   TEXT NOT NULL,
  location_address TEXT,
  city            TEXT NOT NULL,
  lineup          TEXT,
  genres          TEXT,
  description_de  TEXT,
  description_en  TEXT,
  cover_image     TEXT,
  gallery         TEXT,
  ticket_url      TEXT,
  ticket_status   TEXT NOT NULL DEFAULT 'soon',
  price_info      TEXT,
  status          TEXT NOT NULL DEFAULT 'draft',
  featured        INTEGER NOT NULL DEFAULT 0,
  created_at      TEXT NOT NULL,
  updated_at      TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_events_starts_at ON events(starts_at);
CREATE INDEX IF NOT EXISTS idx_events_status ON events(status);

CREATE TABLE IF NOT EXISTS submissions (
  id          TEXT PRIMARY KEY,
  name        TEXT NOT NULL,
  email       TEXT NOT NULL,
  subject     TEXT,
  message     TEXT NOT NULL,
  created_at  TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS meta (
  key   TEXT PRIMARY KEY,
  value TEXT
);
`;

function createConnection(): DatabaseSync {
  fs.mkdirSync(DATA_DIR, { recursive: true });
  fs.mkdirSync(UPLOADS_DIR, { recursive: true });

  const db = new DatabaseSync(DATABASE_PATH);
  db.exec("PRAGMA journal_mode = WAL;");
  db.exec("PRAGMA foreign_keys = ON;");
  db.exec("PRAGMA busy_timeout = 5000;");
  db.exec(SCHEMA);
  seedIfEmpty(db);
  return db;
}

// HMR-sicher: Verbindung über globalThis cachen.
const globalForDb = globalThis as unknown as { __vayveDb?: DatabaseSync };

export const db: DatabaseSync = globalForDb.__vayveDb ?? createConnection();

if (process.env.NODE_ENV !== "production") {
  globalForDb.__vayveDb = db;
}
