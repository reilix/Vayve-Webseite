import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["de", "en"],
  defaultLocale: "de",
  pathnames: {
    "/": "/",
    "/ueber-uns": {
      de: "/ueber-uns",
      en: "/about",
    },
    "/services": "/services",
    "/galerie": {
      de: "/galerie",
      en: "/gallery",
    },
    "/kontakt": {
      de: "/kontakt",
      en: "/contact",
    },
  },
});
