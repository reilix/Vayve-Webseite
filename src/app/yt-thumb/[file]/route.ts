import { NextResponse, type NextRequest } from "next/server";
import { YT_ID_PATTERN } from "@/lib/youtube";

/**
 * Liefert YouTube-Vorschaubilder über die eigene Domain aus. So baut der
 * Browser beim Laden der Seite keine Verbindung zu Google auf — das passiert
 * erst, wenn jemand ein Set aktiv startet (Zwei-Klick-Lösung, DSGVO).
 *
 * Die Bilder werden nicht umgerechnet (kein CPU-Aufwand) und lange gecacht,
 * sodass der Proxy-Cache von SiteGround sie meist direkt ausliefert.
 *
 * /yt-thumb/<id>.jpg      → hqdefault (480×360)
 * /yt-thumb/<id>-max.jpg  → maxresdefault (1280×720), Fallback hqdefault
 */
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ file: string }> },
) {
  const { file } = await params;
  const m = /^([A-Za-z0-9_-]{11})(-max)?\.jpg$/.exec(file);
  if (!m || !YT_ID_PATTERN.test(m[1])) {
    return new NextResponse("Not found", { status: 404 });
  }
  const [, id, max] = m;
  const candidates = max ? ["maxresdefault", "hqdefault"] : ["hqdefault"];

  for (const name of candidates) {
    try {
      const res = await fetch(`https://i.ytimg.com/vi/${id}/${name}.jpg`, {
        cache: "no-store",
        signal: AbortSignal.timeout(5000),
      });
      if (!res.ok) continue;
      return new NextResponse(res.body, {
        headers: {
          "Content-Type": "image/jpeg",
          "Cache-Control": "public, max-age=604800, stale-while-revalidate=86400",
        },
      });
    } catch {
      // nächste Variante probieren
    }
  }
  return new NextResponse("Not found", { status: 404 });
}
