import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { listUpcoming, listPast } from "@/lib/db/events";
import EventCard from "@/components/events/EventCard";
import Container from "@/components/layout/Container";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "events.hero" });
  return { title: t("title"), description: t("subtitle") };
}

export const dynamic = "force-dynamic";

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
    <div className="pt-28 md:pt-36">
      {/* Hero */}
      <section className="relative overflow-hidden pb-12">
        <div className="glow-orb left-[-5%] top-[-10%] size-[34vw] bg-primary/30" />
        <Container className="relative z-10">
          <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-mint">
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-3 font-display text-5xl md:text-7xl font-extrabold tracking-tight text-cream">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">{t("hero.subtitle")}</p>
        </Container>
      </section>

      <Container className="pb-24">
        {upcoming.length === 0 && past.length === 0 ? (
          <p className="rounded-[22px] border border-white/10 bg-[#1a0f33] px-6 py-16 text-center text-muted">
            {t("empty")}
          </p>
        ) : (
          <>
            {upcoming.length > 0 && (
              <div className="mb-16">
                <h2 className="mb-8 font-display text-2xl font-extrabold uppercase tracking-wide text-cream/80">
                  {t("upcomingTitle")}
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {upcoming.map((ev) => (
                    <EventCard key={ev.id} event={ev} locale={locale} />
                  ))}
                </div>
              </div>
            )}

            {past.length > 0 && (
              <div>
                <h2 className="mb-8 font-display text-2xl font-extrabold uppercase tracking-wide text-cream/40">
                  {t("pastTitle")}
                </h2>
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
