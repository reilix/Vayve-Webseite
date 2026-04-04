import { setRequestLocale } from "next-intl/server";
import ServicesHero from "@/components/sections/services/ServicesHero";
import OwnEventsDetail from "@/components/sections/services/OwnEventsDetail";
import EventPlanningSection from "@/components/sections/services/EventPlanningSection";
import ProcessTimeline from "@/components/sections/services/ProcessTimeline";
import CTASection from "@/components/sections/home/CTASection";
import PageTransition from "@/components/animation/PageTransition";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: "Services",
    description:
      locale === "de"
        ? "Sunrise Silent Disco Run, Sunrise Disco am Strand, Hochzeiten, Corporate Events — entdecke unsere Services."
        : "Sunrise Silent Disco Run, Sunrise Beach Disco, Weddings, Corporate Events — discover our services.",
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageTransition>
      <ServicesHero />
      <OwnEventsDetail />
      <EventPlanningSection />
      <ProcessTimeline />
      <CTASection />
    </PageTransition>
  );
}
