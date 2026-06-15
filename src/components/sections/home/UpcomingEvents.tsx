import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { listUpcoming } from "@/lib/db/events";
import EventCard from "@/components/events/EventCard";
import Container from "@/components/layout/Container";

export default async function UpcomingEvents({ locale }: { locale: string }) {
  const t = await getTranslations("home.upcoming");
  const events = listUpcoming(3);

  return (
    <section className="relative py-20 md:py-28">
      <Container>
        <div className="mb-12 flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-primary">
              {t("eyebrow")}
            </span>
            <h2 className="mt-3 font-display text-4xl md:text-5xl font-extrabold tracking-tight text-cream">
              {t("title")}
            </h2>
          </div>
          <Link
            href="/events"
            className="rounded-full border border-white/20 px-5 py-2.5 font-display font-semibold text-cream hover:border-mint hover:text-mint transition-all"
          >
            {t("viewAll")} →
          </Link>
        </div>

        {events.length === 0 ? (
          <p className="rounded-[22px] border border-white/10 bg-[#1a0f33] px-6 py-16 text-center text-muted">
            {t("empty")}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((ev) => (
              <EventCard key={ev.id} event={ev} locale={locale} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
