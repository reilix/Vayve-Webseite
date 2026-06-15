import { notFound } from "next/navigation";
import Image from "next/image";
import type { Metadata } from "next";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getBySlug } from "@/lib/db/events";
import { seriesLabel, ticketStatusLabel } from "@/lib/labels";
import {
  formatEventDate,
  formatEventTime,
  isPast,
} from "@/lib/datetime";
import Container from "@/components/layout/Container";
import WeeztixEmbed from "@/components/tickets/WeeztixEmbed";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const ev = getBySlug(slug);
  if (!ev) return {};
  return {
    title: ev.title,
    description: ev.description_de ?? undefined,
    openGraph: ev.cover_image ? { images: [ev.cover_image] } : undefined,
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string; locale: string }>;
}) {
  const { slug, locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("eventDetail");

  const ev = getBySlug(slug);
  if (!ev || ev.status !== "published") notFound();

  const description =
    locale === "en"
      ? ev.description_en || ev.description_de
      : ev.description_de || ev.description_en;
  const past = isPast(ev.starts_at);
  const lineup = ev.lineup
    ? ev.lineup.split(/[,\n]/).map((s) => s.trim()).filter(Boolean)
    : [];

  return (
    <article className="pt-16">
      {/* Cover */}
      <section className="relative h-[52vh] min-h-[360px] w-full overflow-hidden grain">
        {ev.cover_image ? (
          <Image
            src={ev.cover_image}
            alt={ev.title}
            fill
            priority
            sizes="100vw"
            unoptimized={!ev.cover_image.startsWith("/")}
            className="object-cover"
          />
        ) : (
          <div className="absolute inset-0 bg-[radial-gradient(120%_120%_at_50%_0%,#3b1576_0%,#1a0b2e_50%,#0c0518_100%)]" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-[#150a28] via-[#150a28]/40 to-transparent" />
        <Container className="absolute inset-x-0 bottom-0 z-10 pb-8">
          <Link
            href="/events"
            className="mb-4 inline-block text-sm font-semibold text-cream/70 hover:text-mint transition-colors"
          >
            ← {t("back")}
          </Link>
          <p className="font-display text-sm font-bold uppercase tracking-wider text-mint">
            {seriesLabel(ev.series, locale)}
          </p>
          <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-cream">
            {ev.title}
          </h1>
        </Container>
      </section>

      <Container className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-[1fr_360px]">
        {/* Beschreibung + Line-up */}
        <div>
          {past && (
            <p className="mb-6 inline-block rounded-full bg-white/10 px-4 py-1.5 text-sm text-cream/60">
              {t("past")}
            </p>
          )}
          {description && (
            <p className="whitespace-pre-line text-lg leading-relaxed text-cream/80">
              {description}
            </p>
          )}

          {lineup.length > 0 && (
            <div className="mt-10">
              <h2 className="mb-4 font-display text-2xl font-extrabold text-cream">
                {t("lineup")}
              </h2>
              <div className="flex flex-wrap gap-2">
                {lineup.map((act) => (
                  <span
                    key={act}
                    className="rounded-full border border-white/15 bg-white/5 px-4 py-2 font-display font-semibold text-cream"
                  >
                    {act}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Details-Card */}
        <aside className="h-fit rounded-[22px] border border-white/10 bg-[#1a0f33] p-6 lg:sticky lg:top-28">
          <dl className="space-y-5">
            <Detail label={t("when")}>
              {formatEventDate(ev.starts_at, locale)}
              <span className="block text-cream/60">
                {formatEventTime(ev.starts_at, locale)}
                {ev.doors ? ` · ${t("doors")} ${ev.doors}` : ""}
              </span>
            </Detail>
            {(ev.location_name || ev.city) && (
              <Detail label={t("where")}>
                {ev.location_name}
                {ev.city && <span className="block text-cream/60">{ev.city}</span>}
              </Detail>
            )}
            {ev.genres && <Detail label={t("genres")}>{ev.genres}</Detail>}
            {ev.price_info && <Detail label={t("price")}>{ev.price_info}</Detail>}
          </dl>

          <div className="mt-6">
            {ev.ticket_status === "on_sale" && ev.ticket_url ? (
              <a
                href="#tickets"
                className="block rounded-full bg-primary px-6 py-3.5 text-center font-display font-bold text-white hover:shadow-[var(--shadow-glow-pink)] transition-all"
              >
                {ticketStatusLabel("on_sale", locale)} ↓
              </a>
            ) : (
              <span
                className={
                  ev.ticket_status === "free"
                    ? "block rounded-full bg-acid px-6 py-3.5 text-center font-display font-bold text-[#0c0518]"
                    : "block rounded-full bg-white/10 px-6 py-3.5 text-center font-display font-bold text-cream/60"
                }
              >
                {ticketStatusLabel(ev.ticket_status, locale)}
              </span>
            )}
          </div>
        </aside>
      </Container>

      {/* Tickets direkt auf der Event-Seite kaufen (Weeztix-iframe, mit fbclid) */}
      {ev.ticket_status === "on_sale" && ev.ticket_url && (
        <section id="tickets" className="scroll-mt-24 border-t border-white/10 bg-[#120826]">
          <Container className="py-16">
            <h2 className="mb-8 font-display text-3xl md:text-4xl font-extrabold text-cream">
              Tickets
            </h2>
            <WeeztixEmbed url={ev.ticket_url} />
          </Container>
        </section>
      )}
    </article>
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="font-display text-xs font-bold uppercase tracking-wider text-mint">
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-cream">{children}</dd>
    </div>
  );
}
