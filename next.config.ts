import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./src/i18n/request.ts");

const nextConfig: NextConfig = {
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
