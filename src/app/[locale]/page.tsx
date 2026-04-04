import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/home/HeroSection";
import MarqueeStrip from "@/components/sections/home/MarqueeStrip";
import ServicesPreview from "@/components/sections/home/ServicesPreview";
import OwnEventsSection from "@/components/sections/home/OwnEventsSection";
import StatsCounter from "@/components/sections/home/StatsCounter";
import TestimonialsSection from "@/components/sections/home/TestimonialsSection";
import CTASection from "@/components/sections/home/CTASection";
import PageTransition from "@/components/animation/PageTransition";

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageTransition>
      <HeroSection />
      <MarqueeStrip />
      <ServicesPreview />
      <OwnEventsSection />
      <StatsCounter />
      <TestimonialsSection />
      <CTASection />
    </PageTransition>
  );
}
