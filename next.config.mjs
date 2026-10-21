// Bewusst JavaScript statt TypeScript: Eine next.config.ts muss Next erst mit
// seinem nativen Compiler (SWC) übersetzen, und der stürzt in der Build-Umgebung
// von SiteGround beim Laden der Konfiguration ab ("stacker … panicked").
// Die .mjs wird ohne Übersetzung geladen.
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    serverActions: {
      // Cover-Uploads (bis 8 MB) über Server Actions zulassen.
      bodySizeLimit: "10mb",
    },
  },
};

export default withNextIntl(nextConfig);
