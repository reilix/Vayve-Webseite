const LOCALE_TAG: Record<string, string> = { de: "de-DE", en: "en-GB" };

/**
 * Alle Events finden in Hamburg statt — Zeiten werden deshalb immer in
 * deutscher Zeit angezeigt und eingegeben, unabhängig davon, in welcher
 * Zeitzone Server (Docker: UTC) oder Browser laufen.
 */
export const EVENT_TIME_ZONE = "Europe/Berlin";

/** ISO-String → Anzeige-Datum, z. B. "Sa, 18. Juli 2026". */
export function formatEventDate(iso: string, locale = "de"): string {
  const tag = LOCALE_TAG[locale] ?? "de-DE";
  return new Intl.DateTimeFormat(tag, {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: EVENT_TIME_ZONE,
  }).format(new Date(iso));
}

/** ISO-String → kompaktes Datum, z. B. "18.07.26". */
export function formatEventDateShort(iso: string, locale = "de"): string {
  const tag = LOCALE_TAG[locale] ?? "de-DE";
  return new Intl.DateTimeFormat(tag, {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    timeZone: EVENT_TIME_ZONE,
  }).format(new Date(iso));
}

/** ISO-String → Uhrzeit, z. B. "16:00". */
export function formatEventTime(iso: string, locale = "de"): string {
  const tag = LOCALE_TAG[locale] ?? "de-DE";
  return new Intl.DateTimeFormat(tag, {
    hour: "2-digit",
    minute: "2-digit",
    timeZone: EVENT_TIME_ZONE,
  }).format(new Date(iso));
}

/** Wanduhr-Bestandteile eines Zeitpunkts in EVENT_TIME_ZONE. */
function wallClockParts(d: Date) {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: EVENT_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "00";
  return {
    year: get("year"),
    month: get("month"),
    day: get("day"),
    hour: get("hour"),
    minute: get("minute"),
  };
}

/** Offset von EVENT_TIME_ZONE zu UTC in Minuten (z. B. 60 im Winter, 120 im Sommer). */
function zoneOffsetMinutes(d: Date): number {
  const p = wallClockParts(d);
  const asUtc = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute);
  return Math.round((asUtc - Math.floor(d.getTime() / 60_000) * 60_000) / 60_000);
}

/**
 * ISO → Wert für <input type="datetime-local"> in deutscher Zeit.
 * Läuft identisch auf Server und im Browser.
 */
export function toDatetimeLocalValue(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const p = wallClockParts(d);
  return `${p.year}-${p.month}-${p.day}T${p.hour}:${p.minute}`;
}

/**
 * <input type="datetime-local"> Wert (deutsche Zeit) → ISO (UTC).
 * Exakte Umkehrung von toDatetimeLocalValue — Speichern ohne Änderung
 * verschiebt die Uhrzeit nicht mehr.
 */
export function fromDatetimeLocalValue(value: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(value);
  if (!m) return new Date(value).toISOString();
  const wallAsUtc = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
  // Offset zweimal bestimmen, damit Tage der Zeitumstellung korrekt sind.
  let ts = wallAsUtc - zoneOffsetMinutes(new Date(wallAsUtc)) * 60_000;
  ts = wallAsUtc - zoneOffsetMinutes(new Date(ts)) * 60_000;
  return new Date(ts).toISOString();
}

export function isPast(iso: string): boolean {
  return new Date(iso).getTime() < Date.now();
}
