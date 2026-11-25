import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { listUpcoming } from "@/lib/db/events";
import EventCard from "@/components/events/EventCard";
import Container from "@/components/layout/Container";
import SectionHeader from "@/components/retro/SectionHeader";

export default async function UpcomingEvents({ locale }: { locale: string }) {
  const t = await getTranslations("home.upcoming");
  const events = listUpcoming(3);

  return (
    <section className="relative py-20 md:py-28">
      <Container>
        <SectionHeader
          index="01"
          eyebrow={t("eyebrow")}
          title={t("title")}
          action={
            <Link href="/events" className="btn-hard btn-ghost">
              {t("viewAll")} →
            </Link>
          }
        />

        {events.length === 0 ? (
          <p className="label-mono border border-dashed border-line px-6 py-16 text-center text-muted">
            {t("empty")}
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((ev, i) => (
              <EventCard key={ev.id} event={ev} locale={locale} index={i + 1} />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}
