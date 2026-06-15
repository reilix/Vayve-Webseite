export const siteConfig = {
  name: "VAYVE",
  tagline: {
    de: "Good Vibe Raves",
    en: "Good Vibe Raves",
  },
  url: "https://vayve.de",
  email: "info@nios.digital",
  social: {
    instagram: "https://www.instagram.com/vayve.germany/",
  },
  ticketUrl:
    "https://shop.weeztix.com/c1017a81-64f7-11f1-8e27-d65b0659bc31/tickets?utm_source=ig&utm_medium=social&utm_content=link_in_bio",
} as const;

/** Rechtsträger (Impressum) */
export const legal = {
  company: "nios digital UG (haftungsbeschränkt)",
  street: "Haderslebener Str. 2",
  zipCity: "22049 Hamburg",
  represented: "Felix Gudowius",
  email: "info@nios.digital",
  court: "Amtsgericht Hamburg",
  register: "HRB 186579",
  vatId: "DE368264501",
} as const;

export const navLinks = [
  { key: "home", href: "/" },
  { key: "events", href: "/events" },
  { key: "about", href: "/ueber-uns" },
  { key: "gallery", href: "/galerie" },
  { key: "contact", href: "/kontakt" },
] as const;
