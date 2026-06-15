import { db } from "./index";

export type EventSeries = "good_vibe_rave" | "vayve_run" | "vayve_air" | "other";
export type TicketStatus = "on_sale" | "sold_out" | "free" | "soon";
export type EventStatus = "draft" | "published";

export interface EventRecord {
  id: string;
  slug: string;
  title: string;
  series: EventSeries;
  starts_at: string;
  ends_at: string | null;
  doors: string | null;
  location_name: string;
  location_address: string | null;
  city: string;
  lineup: string | null;
  genres: string | null;
  description_de: string | null;
  description_en: string | null;
  cover_image: string | null;
  gallery: string | null;
  ticket_url: string | null;
  ticket_status: TicketStatus;
  price_info: string | null;
  status: EventStatus;
  featured: number;
  created_at: string;
  updated_at: string;
}

export interface EventInput {
  slug: string;
  title: string;
  series: EventSeries;
  starts_at: string;
  ends_at?: string | null;
  doors?: string | null;
  location_name: string;
  location_address?: string | null;
  city: string;
  lineup?: string | null;
  genres?: string | null;
  description_de?: string | null;
  description_en?: string | null;
  cover_image?: string | null;
  gallery?: string | null;
  ticket_url?: string | null;
  ticket_status: TicketStatus;
  price_info?: string | null;
  status: EventStatus;
  featured: boolean;
}

const COLUMNS = [
  "id", "slug", "title", "series", "starts_at", "ends_at", "doors",
  "location_name", "location_address", "city", "lineup", "genres",
  "description_de", "description_en", "cover_image", "gallery", "ticket_url",
  "ticket_status", "price_info", "status", "featured", "created_at", "updated_at",
] as const;

function nowISO() {
  return new Date().toISOString();
}

// node:sqlite liefert Objekte mit null-Prototyp — diese können nicht an
// Client-Komponenten übergeben werden. In plain Objects umwandeln.
function toEvent(row: unknown): EventRecord | undefined {
  return row ? ({ ...(row as object) } as unknown as EventRecord) : undefined;
}
function toEvents(rows: unknown[]): EventRecord[] {
  return rows.map((r) => ({ ...(r as object) }) as unknown as EventRecord);
}

export function slugify(input: string): string {
  return input
    .toLowerCase()
    .replace(/[äàá]/g, "a").replace(/[öòó]/g, "o").replace(/[üùú]/g, "u")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .slice(0, 80) || "event";
}

/** Stellt einen eindeutigen Slug sicher (hängt -2, -3 … an). */
export function ensureUniqueSlug(base: string, ignoreId?: string): string {
  const root = slugify(base);
  let candidate = root;
  let i = 1;
  while (true) {
    const row = db
      .prepare("SELECT id FROM events WHERE slug = ?")
      .get(candidate) as unknown as { id: string } | undefined;
    if (!row || row.id === ignoreId) return candidate;
    i += 1;
    candidate = `${root}-${i}`;
  }
}

export function listEvents(opts: { onlyPublished?: boolean } = {}): EventRecord[] {
  const where = opts.onlyPublished ? "WHERE status = 'published'" : "";
  return toEvents(
    db.prepare(`SELECT * FROM events ${where} ORDER BY starts_at DESC`).all(),
  );
}

/** Kommende, veröffentlichte Events (chronologisch). */
export function listUpcoming(limit?: number): EventRecord[] {
  const lim = limit ? `LIMIT ${Number(limit)}` : "";
  return toEvents(
    db
      .prepare(
        `SELECT * FROM events
       WHERE status = 'published' AND starts_at >= ?
       ORDER BY starts_at ASC ${lim}`,
      )
      .all(nowISO()),
  );
}

/** Vergangene, veröffentlichte Events (neueste zuerst). */
export function listPast(limit?: number): EventRecord[] {
  const lim = limit ? `LIMIT ${Number(limit)}` : "";
  return toEvents(
    db
      .prepare(
        `SELECT * FROM events
       WHERE status = 'published' AND starts_at < ?
       ORDER BY starts_at DESC ${lim}`,
      )
      .all(nowISO()),
  );
}

export function getFeatured(): EventRecord | undefined {
  return toEvent(
    db
      .prepare(
        `SELECT * FROM events
       WHERE status = 'published' AND featured = 1 AND starts_at >= ?
       ORDER BY starts_at ASC LIMIT 1`,
      )
      .get(nowISO()),
  );
}

export function getBySlug(slug: string): EventRecord | undefined {
  return toEvent(db.prepare("SELECT * FROM events WHERE slug = ?").get(slug));
}

export function getById(id: string): EventRecord | undefined {
  return toEvent(db.prepare("SELECT * FROM events WHERE id = ?").get(id));
}

export function createEvent(input: EventInput): EventRecord {
  const id = crypto.randomUUID();
  const ts = nowISO();
  const row: EventRecord = {
    id,
    slug: input.slug,
    title: input.title,
    series: input.series,
    starts_at: input.starts_at,
    ends_at: input.ends_at ?? null,
    doors: input.doors ?? null,
    location_name: input.location_name,
    location_address: input.location_address ?? null,
    city: input.city,
    lineup: input.lineup ?? null,
    genres: input.genres ?? null,
    description_de: input.description_de ?? null,
    description_en: input.description_en ?? null,
    cover_image: input.cover_image ?? null,
    gallery: input.gallery ?? null,
    ticket_url: input.ticket_url ?? null,
    ticket_status: input.ticket_status,
    price_info: input.price_info ?? null,
    status: input.status,
    featured: input.featured ? 1 : 0,
    created_at: ts,
    updated_at: ts,
  };
  const placeholders = COLUMNS.map(() => "?").join(", ");
  db.prepare(
    `INSERT INTO events (${COLUMNS.join(", ")}) VALUES (${placeholders})`,
  ).run(...COLUMNS.map((c) => row[c] as string | number | null));
  return row;
}

export function updateEvent(id: string, input: EventInput): void {
  const ts = nowISO();
  db.prepare(
    `UPDATE events SET
      slug = ?, title = ?, series = ?, starts_at = ?, ends_at = ?, doors = ?,
      location_name = ?, location_address = ?, city = ?, lineup = ?, genres = ?,
      description_de = ?, description_en = ?, cover_image = ?, gallery = ?,
      ticket_url = ?, ticket_status = ?, price_info = ?, status = ?, featured = ?,
      updated_at = ?
     WHERE id = ?`,
  ).run(
    input.slug, input.title, input.series, input.starts_at, input.ends_at ?? null,
    input.doors ?? null, input.location_name, input.location_address ?? null,
    input.city, input.lineup ?? null, input.genres ?? null,
    input.description_de ?? null, input.description_en ?? null,
    input.cover_image ?? null, input.gallery ?? null, input.ticket_url ?? null,
    input.ticket_status, input.price_info ?? null, input.status,
    input.featured ? 1 : 0, ts, id,
  );
}

export function deleteEvent(id: string): void {
  db.prepare("DELETE FROM events WHERE id = ?").run(id);
}

export function countEvents(): number {
  const row = db.prepare("SELECT COUNT(*) AS n FROM events").get() as unknown as {
    n: number;
  };
  return row.n;
}
