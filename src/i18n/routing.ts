import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
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
  },
});
