import { setRequestLocale } from "next-intl/server";
import HeroSection from "@/components/sections/home/HeroSection";
import UpcomingEvents from "@/components/sections/home/UpcomingEvents";
import VibeSection from "@/components/sections/home/VibeSection";
import InstagramCTA from "@/components/sections/home/InstagramCTA";
import SetsSection from "@/components/sets/SetsSection";
import Ticker from "@/components/retro/Ticker";

// Inhalte aus der Datenbank: nicht beim Build vorrendern (dort gäbe es nur
// die Seed-Daten der Build-DB), sondern beim ersten Aufruf rendern und dann
// 5 Minuten aus dem Cache ausliefern. Admin-Änderungen leeren den Cache sofort
// (revalidatePath in app/admin/actions.ts).
export const revalidate = 300;
export function generateStaticParams() {
  return [];
}

const TICKER = ["Good Vibe Raves", "Hamburg", "Hard House", "Hard Groove", "Trance", "Bounce", "Vayve:Air", "Open Air"];

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
      <Ticker items={TICKER} />
      <UpcomingEvents locale={locale} />
      <Ticker items={["Live Sets", "Recorded on the floor", "Press play", "VAYVE TV"]} variant="dark" reverse />
      <SetsSection locale={locale} />
      <VibeSection />
      <InstagramCTA />
    </>
  );
}
