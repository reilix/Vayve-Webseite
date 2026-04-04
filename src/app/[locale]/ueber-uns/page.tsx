import { setRequestLocale } from "next-intl/server";
import AboutHero from "@/components/sections/about/AboutHero";
import MissionSection from "@/components/sections/about/MissionSection";
import ValuesSection from "@/components/sections/about/ValuesSection";
import TeamGrid from "@/components/sections/about/TeamGrid";
import InfiniteMarquee from "@/components/animation/InfiniteMarquee";
import PageTransition from "@/components/animation/PageTransition";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "de" ? "Über uns" : "About",
    description:
      locale === "de"
        ? "Lerne das Team hinter Vayve kennen — Leidenschaft, Kreativität und Energie für unvergessliche Events."
        : "Meet the team behind Vayve — passion, creativity and energy for unforgettable events.",
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageTransition>
      <AboutHero />
      <MissionSection />
      <ValuesSection />
      <TeamGrid />
      <div className="bg-dark border-y border-white/10 py-4">
        <InfiniteMarquee
          text="LEIDENSCHAFT · KREATIVITÄT · ZUVERLÄSSIGKEIT · ENERGIE · LEIDENSCHAFT · KREATIVITÄT · ZUVERLÄSSIGKEIT · ENERGIE ·"
          speed={35}
          textClassName="text-xl md:text-2xl font-heading font-bold text-white/80 tracking-wider"
        />
      </div>
    </PageTransition>
  );
}
