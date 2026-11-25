// Bewusst JavaScript statt TypeScript: Eine next.config.ts muss Next erst mit
// seinem nativen Compiler (SWC) übersetzen, und der stürzt in der Build-Umgebung
// von SiteGround beim Laden der Konfiguration ab ("stacker … panicked").
// Die .mjs wird ohne Übersetzung geladen.
//
// Aus demselben Grund ohne `next-intl/plugin`: Das Plugin lädt beim Import
// @swc/core für seinen Nachrichten-Extraktor, den wir nicht nutzen — und dessen
// natives Modul lässt sich auf SiteGround nicht laden ("read Linux mount table").
// Gebraucht wird vom Plugin nur der Alias auf die Request-Konfiguration; der
// steht hier direkt. Turbopack ist in Next 16 Standard für dev und build.

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",
  images: {
    // Nur WebP: AVIF-Kodierung kostet mit sharp ein Vielfaches an CPU, und
    // jede Variante (Breite × Format) wird einzeln berechnet.
    formats: ["image/webp"],
    // Wenige Breiten = wenige Varianten, die je einmal berechnet werden.
    deviceSizes: [640, 828, 1080, 1600],
    imageSizes: [64, 128, 256, 384],
    // Optimierte Bilder 31 Tage cachen (Uploads ändern sich nie: neue Datei = neuer Name).
    minimumCacheTTL: 2678400,
  },
  turbopack: {
    resolveAlias: {
      "next-intl/config": "./src/i18n/request.ts",
    },
  },
  experimental: {
    serverActions: {
      // Cover-Uploads (bis 8 MB) über Server Actions zulassen.
      bodySizeLimit: "10mb",
    },
  },
};

export default nextConfig;
