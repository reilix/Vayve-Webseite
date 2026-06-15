const LOCALE_TAG: Record<string, string> = { de: "de-DE", en: "en-GB" };

/** ISO-String → Anzeige-Datum, z. B. "Sa, 18. Juli 2026". */
export function formatEventDate(iso: string, locale = "de"): string {
  const tag = LOCALE_TAG[locale] ?? "de-DE";
  return new Intl.DateTimeFormat(tag, {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(iso));
}

/** ISO-String → kompaktes Datum, z. B. "18.07.26". */
export function formatEventDateShort(iso: string, locale = "de"): string {
  const tag = LOCALE_TAG[locale] ?? "de-DE";
  return new Intl.DateTimeFormat(tag, {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
  }).format(new Date(iso));
}

/** ISO-String → Uhrzeit, z. B. "16:00". */
export function formatEventTime(iso: string, locale = "de"): string {
  const tag = LOCALE_TAG[locale] ?? "de-DE";
  return new Intl.DateTimeFormat(tag, {
    hour: "2-digit",
    minute: "2-digit",
  }).format(new Date(iso));
}

/** ISO → Wert für <input type="datetime-local"> (lokale Zeit). */
export function toDatetimeLocalValue(iso: string | null | undefined): string {
  if (!iso) return "";
  const d = new Date(iso);
  const off = d.getTimezoneOffset();
  const local = new Date(d.getTime() - off * 60_000);
  return local.toISOString().slice(0, 16);
}

/** <input type="datetime-local"> Wert → ISO (UTC). */
export function fromDatetimeLocalValue(value: string): string {
  return new Date(value).toISOString();
}

export function isPast(iso: string): boolean {
  return new Date(iso).getTime() < Date.now();
}
