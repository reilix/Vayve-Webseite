import { routing } from "./routing";

/** Für Seiten ohne Datenbank-Inhalte: beim Build für alle Sprachen vorrendern. */
export function localeStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
