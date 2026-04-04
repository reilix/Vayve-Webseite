export const siteConfig = {
  name: "Vayve",
  tagline: {
    de: "Events, die bewegen.",
    en: "Events that move.",
  },
  url: "https://vayve.de",
  email: "hello@vayve.de",
  phone: "+49 123 456 789",
  social: {
    instagram: "https://instagram.com/vayve",
    tiktok: "https://tiktok.com/@vayve",
    linkedin: "https://linkedin.com/company/vayve",
  },
} as const;

export const navLinks = [
  { key: "home", href: "/" },
  { key: "about", href: "/ueber-uns" },
  { key: "services", href: "/services" },
  { key: "gallery", href: "/galerie" },
  { key: "contact", href: "/kontakt" },
] as const;
