/**
 * Neueste Live-Sets vom YouTube-Kanal @vayve.germany.
 *
 * Quelle ist der öffentliche RSS-Feed der Playlist „UULF…“: YouTube führt sie
 * automatisch für jeden Kanal und listet darin nur lange Videos, also keine
 * Shorts. Kein API-Key nötig. Der Abruf wird eine Stunde gecacht; schlägt er
 * fehl, zeigt die Seite die zuletzt bekannten Sets (FALLBACK) statt nichts.
 */

export const YT_CHANNEL_ID = "UC_XU_nREcigY7HcTmQeNOGg";
export const YT_CHANNEL_URL = "https://www.youtube.com/@vayve.germany";

const FEED_URL = `https://www.youtube.com/feeds/videos.xml?playlist_id=UULF${YT_CHANNEL_ID.slice(2)}`;

export type YtSet = {
  id: string;
  title: string;
  /** ISO-Zeitstempel der Veröffentlichung */
  published: string;
};

const FALLBACK: YtSet[] = [
  { id: "Wpg4Ag9I4S4", title: "REILIX live @ VAYVE", published: "2026-11-15T00:00:00Z" },
  { id: "MdNpXQ2GEYE", title: "PAMADII live @ VAYVE", published: "2026-11-08T00:00:00Z" },
  { id: "3-yPd8E8-94", title: "UNROMANTIC live @ VAYVE:AIR 2026", published: "2026-11-01T00:00:00Z" },
  { id: "CqrVhJAZTJ4", title: "TRYPTAJ Live @ VAYVE:AIR 2026", published: "2026-10-11T00:00:00Z" },
  { id: "Zk7hLck4dJU", title: "Misssophie live @ VAYVE:AIR 2026", published: "2026-09-21T00:00:00Z" },
];

export const YT_ID_PATTERN = /^[A-Za-z0-9_-]{11}$/;

function decodeXml(s: string): string {
  return s
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&#(\d+);/g, (_, n) => String.fromCodePoint(Number(n)))
    .replace(/&amp;/g, "&");
}

function parseFeed(xml: string): YtSet[] {
  const out: YtSet[] = [];
  for (const [, entry] of xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)) {
    const id = /<yt:videoId>([^<]+)<\/yt:videoId>/.exec(entry)?.[1]?.trim();
    const title = /<title>([^<]*)<\/title>/.exec(entry)?.[1];
    const published = /<published>([^<]+)<\/published>/.exec(entry)?.[1];
    if (!id || !YT_ID_PATTERN.test(id) || !title || !published) continue;
    out.push({ id, title: decodeXml(title).trim(), published });
  }
  return out;
}

export async function getLatestSets(limit?: number): Promise<YtSet[]> {
  let sets = FALLBACK;
  try {
    const res = await fetch(FEED_URL, {
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(5000),
    });
    if (res.ok) {
      const parsed = parseFeed(await res.text());
      if (parsed.length > 0) sets = parsed;
    }
  } catch {
    // Netzwerkfehler/Timeout: zuletzt bekannte Sets zeigen
  }
  return limit ? sets.slice(0, limit) : sets;
}

/** Vorschaubild über den eigenen Server (siehe app/yt-thumb), nicht direkt von YouTube. */
export function thumbUrl(id: string, size: "hq" | "max" = "hq"): string {
  return `/yt-thumb/${id}${size === "max" ? "-max" : ""}.jpg`;
}
