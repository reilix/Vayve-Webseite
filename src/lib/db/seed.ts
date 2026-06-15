import type { DatabaseSync } from "node:sqlite";

/**
 * Initiale Events (einmalig, marker-geschützt). Danach im Admin editierbar —
 * wird auch nach Löschen nicht erneut eingespielt.
 *
 * Hinweis: Stadt/Termine sind Platzhalter und im Admin anpassbar.
 */

const WEEZTIX_URL =
  "https://shop.weeztix.com/c1017a81-64f7-11f1-8e27-d65b0659bc31/tickets?utm_source=ig&utm_medium=social&utm_content=link_in_bio";

type SeedEvent = {
  slug: string;
  title: string;
  series: string;
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
  ticket_status: string;
  price_info: string | null;
  status: string;
  featured: number;
};

const EVENTS: SeedEvent[] = [
  {
    slug: "vayve-air-2026",
    title: "Vayve:Air",
    series: "vayve_air",
    starts_at: "2026-07-18T14:00:00.000Z",
    ends_at: null,
    doors: "14:00",
    location_name: "Thomas Read",
    location_address: null,
    city: "Bonn",
    lineup: null,
    genres: "Hard House · Trance · Bounce",
    description_de:
      "Unser Open Air unter freiem Himmel. Hard House, Trance und Bounce vom Nachmittag bis tief in die Nacht, gute Leute und beste Stimmung. Schnapp dir deine Crew und tanz mit uns in den Sommer.",
    description_en:
      "Our open air under the open sky. Hard House, Trance and Bounce from afternoon till deep into the night, good people and the best energy. Grab your crew and dance into summer with us.",
    cover_image: null,
    gallery: null,
    ticket_url: WEEZTIX_URL,
    ticket_status: "on_sale",
    price_info: null,
    status: "published",
    featured: 1,
  },
  {
    slug: "vayve-run",
    title: "Vayve:Run",
    series: "vayve_run",
    starts_at: "2026-06-27T16:00:00.000Z",
    ends_at: null,
    doors: null,
    location_name: "Treffpunkt wird angekündigt",
    location_address: null,
    city: "",
    lineup: null,
    genres: "House · Bounce",
    description_de:
      "Ein DJ fährt voraus, du läufst hinterher – der Rave auf Beinen. Wir ziehen gemeinsam los, der Beat gibt das Tempo vor. Lockeres Tempo, große Vibes, alle sind eingeladen. Genauer Termin und Startpunkt folgen.",
    description_en:
      "A DJ rolls ahead, you run behind – the rave on legs. We set off together and the beat sets the pace. Easy tempo, big vibes, everyone is invited. Exact date and meeting point to follow.",
    cover_image: null,
    gallery: null,
    ticket_url: null,
    ticket_status: "free",
    price_info: "Kostenlos",
    status: "published",
    featured: 0,
  },
];

export function seedIfEmpty(db: DatabaseSync): void {
  try {
    const flag = db
      .prepare("SELECT value FROM meta WHERE key = 'seeded'")
      .get() as unknown as { value: string } | undefined;
    if (flag) return;

    const now = new Date().toISOString();
    // INSERT OR IGNORE + Transaktion: robust gegen parallele Build-Worker.
    const insert = db.prepare(`
      INSERT OR IGNORE INTO events (
        id, slug, title, series, starts_at, ends_at, doors,
        location_name, location_address, city, lineup, genres,
        description_de, description_en, cover_image, gallery, ticket_url,
        ticket_status, price_info, status, featured, created_at, updated_at
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    db.exec("BEGIN IMMEDIATE");
    for (const e of EVENTS) {
      insert.run(
        crypto.randomUUID(), e.slug, e.title, e.series, e.starts_at, e.ends_at,
        e.doors, e.location_name, e.location_address, e.city, e.lineup, e.genres,
        e.description_de, e.description_en, e.cover_image, e.gallery, e.ticket_url,
        e.ticket_status, e.price_info, e.status, e.featured, now, now,
      );
    }
    db.prepare(
      "INSERT OR IGNORE INTO meta (key, value) VALUES ('seeded', ?)",
    ).run(now);
    db.exec("COMMIT");
  } catch {
    try {
      db.exec("ROLLBACK");
    } catch {
      /* ignore */
    }
  }
}
