import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { listUpcoming, listPast } from "@/lib/db/events";
import EventCard from "@/components/events/EventCard";
import Container from "@/components/layout/Container";
import PageHero from "@/components/retro/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "events.hero" });
  return { title: t("title"), description: t("subtitle") };
}

// Inhalte aus der Datenbank: nicht beim Build vorrendern (dort gäbe es nur
// die Seed-Daten der Build-DB), sondern beim ersten Aufruf rendern und dann
// 5 Minuten aus dem Cache ausliefern. Admin-Änderungen leeren den Cache sofort
// (revalidatePath in app/admin/actions.ts).
export const revalidate = 300;
export function generateStaticParams() {
  return [];
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("events");

  const upcoming = listUpcoming();
  const past = listPast(12);

  return (
    <div>
      <PageHero code="EV" eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <Container className="py-16 md:py-20">
        {upcoming.length === 0 && past.length === 0 ? (
          <p className="label-mono border border-dashed border-line px-6 py-16 text-center text-muted">
            {t("empty")}
          </p>
        ) : (
          <>
            {upcoming.length > 0 && (
              <div className="mb-20">
                <h2 className="label-mono mb-8 flex items-center gap-3 text-acid">
                  <span className="inline-block size-2 animate-blink rounded-full bg-acid" />
                  {t("upcomingTitle")} — {String(upcoming.length).padStart(2, "0")}
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {upcoming.map((ev, i) => (
                    <EventCard key={ev.id} event={ev} locale={locale} index={i + 1} />
                  ))}
                </div>
              </div>
            )}

            {past.length > 0 && (
              <div>
                <h2 className="label-mono mb-8 border-t border-line pt-5 text-cream/45">
                  {t("pastTitle")} — {String(past.length).padStart(2, "0")}
                </h2>
                <div className="grid grid-cols-1 gap-6 opacity-85 sm:grid-cols-2 lg:grid-cols-3">
                  {past.map((ev) => (
                    <EventCard key={ev.id} event={ev} locale={locale} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </Container>
    </div>
  );
}
