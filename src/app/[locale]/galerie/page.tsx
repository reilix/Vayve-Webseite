import { setRequestLocale } from "next-intl/server";
import GalleryHero from "@/components/sections/gallery/GalleryHero";
import GalleryGrid from "@/components/sections/gallery/GalleryGrid";
import PageTransition from "@/components/animation/PageTransition";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "de" ? "Galerie" : "Gallery",
    description:
      locale === "de"
        ? "Unsere Events in Bildern — Momente, die bewegen."
        : "Our events in pictures — moments that move.",
  };
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageTransition>
      <GalleryHero />
      <GalleryGrid />
    </PageTransition>
  );
}
