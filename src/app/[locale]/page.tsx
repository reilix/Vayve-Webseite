import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/home/HeroSection";
import MarqueeStrip from "@/components/sections/home/MarqueeStrip";
import UpcomingEvents from "@/components/sections/home/UpcomingEvents";
import VibeSection from "@/components/sections/home/VibeSection";
import InstagramCTA from "@/components/sections/home/InstagramCTA";

export const dynamic = "force-dynamic";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <HeroSection />
      <MarqueeStrip />
      <UpcomingEvents locale={locale} />
      <VibeSection />
      <InstagramCTA />
    </>
  );
}
