const LOCALE_TAG: Record<string, string> = { de: "de-DE", en: "en-GB" };

/**
 * Alle Events finden in Hamburg statt — Zeiten werden deshalb immer in
 * deutscher Zeit angezeigt und eingegeben, unabhängig davon, in welcher
 * Zeitzone Server oder Browser laufen.
 *
 * Bewusst OHNE `Intl`-Zeitzone ("Europe/Berlin"): Ob die zur Laufzeit
 * stimmt, hängt von den ICU-Zeitzonendaten der Node-Installation ab. Fehlen
 * sie (so auf SiteGround), rechnet `Intl` still in UTC — das Formular zeigte
 * dann 23:00, der Server las 23:00 als UTC, und jedes Speichern schob die
 * Uhrzeit um eine Stunde. Deshalb steht die deutsche Regel hier selbst:
 * MEZ (UTC+1), Sommerzeit MESZ (UTC+2) vom letzten Sonntag im März bis zum
 * letzten Sonntag im Oktober, jeweils um 01:00 UTC (EU-Richtlinie 2000/84/EG).
 */
const HOUR = 3_600_000;
const MINUTE = 60_000;

/** Letzter Sonntag eines Monats (0-basiert) um 01:00 UTC, als Zeitstempel. */
function lastSundayAt1Utc(year: number, month: number): number {
  const lastDay = Date.UTC(year, month + 1, 0);
  const weekday = new Date(lastDay).getUTCDay();
  return lastDay - weekday * 24 * HOUR + HOUR;
}

/** Offset der deutschen Zeit zu UTC in Minuten (60 im Winter, 120 im Sommer). */
function berlinOffsetMinutes(utcMs: number): number {
  const year = new Date(utcMs).getUTCFullYear();
  const summerStart = lastSundayAt1Utc(year, 2); // März
  const summerEnd = lastSundayAt1Utc(year, 9); // Oktober
  return utcMs >= summerStart && utcMs < summerEnd ? 120 : 60;
}

/** Zeitpunkt als Date, dessen UTC-Felder die deutsche Wanduhr zeigen. */
function berlinWallClock(iso: string): Date {
  const t = new Date(iso).getTime();
  return new Date(t + berlinOffsetMinutes(t) * MINUTE);
}

/** ISO-String → Anzeige-Datum, z. B. "Sa, 18. Juli 2026". */
export function formatEventDate(iso: string, locale = "de"): string {
  const tag = LOCALE_TAG[locale] ?? "de-DE";
  // timeZone "UTC" gibt es in jeder ICU-Ausstattung; die Verschiebung auf
  // deutsche Zeit steckt bereits im Datum.
  return new Intl.DateTimeFormat(tag, {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(berlinWallClock(iso));
}

/** ISO-String → kompaktes Datum, z. B. "18.07.26". */
export function formatEventDateShort(iso: string, locale = "de"): string {
  const tag = LOCALE_TAG[locale] ?? "de-DE";
  return new Intl.DateTimeFormat(tag, {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    timeZone: "UTC",
  }).format(berlinWallClock(iso));
}

/** ISO-String → Uhrzeit, z. B. "16:00". */
export function formatEventTime(iso: string, locale = "de"): string {
  const tag = LOCALE_TAG[locale] ?? "de-DE";
  return new Intl.DateTimeFormat(tag, {
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
    timeZone: "UTC",
  }).format(berlinWallClock(iso));
}

const pad = (n: number) => String(n).padStart(2, "0");

/**
 * ISO → Wert für <input type="datetime-local"> in deutscher Zeit.
 * Läuft identisch auf Server und im Browser.
 */
export function toDatetimeLocalValue(iso: string | null | undefined): string {
  if (!iso) return "";
  if (Number.isNaN(new Date(iso).getTime())) return "";
  const w = berlinWallClock(iso);
  return (
    `${w.getUTCFullYear()}-${pad(w.getUTCMonth() + 1)}-${pad(w.getUTCDate())}` +
    `T${pad(w.getUTCHours())}:${pad(w.getUTCMinutes())}`
  );
}

/**
 * <input type="datetime-local"> Wert (deutsche Zeit) → ISO (UTC).
 * Exakte Umkehrung von toDatetimeLocalValue — Speichern ohne Änderung
 * verschiebt die Uhrzeit nicht.
 */
export function fromDatetimeLocalValue(value: string): string {
  const m = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/.exec(value);
  if (!m) return new Date(value).toISOString();
  const wallAsUtc = Date.UTC(+m[1], +m[2] - 1, +m[3], +m[4], +m[5]);
  // Offset zweimal bestimmen, damit Tage der Zeitumstellung korrekt sind.
  let ts = wallAsUtc - berlinOffsetMinutes(wallAsUtc) * MINUTE;
  ts = wallAsUtc - berlinOffsetMinutes(ts) * MINUTE;
  return new Date(ts).toISOString();
}

export function isPast(iso: string): boolean {
  return new Date(iso).getTime() < Date.now();
}
