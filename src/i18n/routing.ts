import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  // DE ohne Prefix auf der Hauptdomain (vayve.de), EN unter /en.
  localePrefix: "as-needed",
  // Kein NEXT_LOCALE-Cookie und keine Umleitung nach Browsersprache: Jede URL
  // liefert für alle Besucher dieselbe Antwort. Nur so darf der Proxy-Cache
  // von SiteGround die Seiten ausliefern, ohne den Node-Prozess zu wecken
  // (mit Set-Cookie überspringt er den Cache: "SKIP_CACHE_SET_COOKIE").
  // Englisch bleibt über /en und den Sprachumschalter erreichbar.
  localeCookie: false,
  localeDetection: false,
  pathnames: {
    "/": "/",
    "/tickets": "/tickets",
    "/events": "/events",
    "/events/[slug]": "/events/[slug]",
    "/sets": "/sets",
    "/ueber-uns": {
      de: "/ueber-uns",
      en: "/about",
    },
    "/galerie": {
      de: "/galerie",
      en: "/gallery",
    },
    "/kontakt": {
      de: "/kontakt",
      en: "/contact",
    },
    "/impressum": "/impressum",
    "/datenschutz": "/datenschutz",
    "/agb": "/agb",
  },
});
