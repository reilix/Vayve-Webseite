import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  // DE ohne Prefix auf der Hauptdomain (vayve.de), EN unter /en.
  localePrefix: "as-needed",
  pathnames: {
    "/": "/",
    "/tickets": "/tickets",
    "/events": "/events",
    "/events/[slug]": "/events/[slug]",
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
