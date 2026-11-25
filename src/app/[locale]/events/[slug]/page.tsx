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

// Inhalte aus der Datenbank: nicht beim Build vorrendern (dort gäbe es nur
// die Seed-Daten der Build-DB), sondern beim ersten Aufruf rendern und dann
// 5 Minuten aus dem Cache ausliefern. Admin-Änderungen leeren den Cache sofort
// (revalidatePath in app/admin/actions.ts).
export const revalidate = 300;
export function generateStaticParams() {
  return [];
}

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
    <article className="pt-16 md:pt-[72px]">
      {/* Cover — der Flyer wird immer vollständig gezeigt (kein Beschnitt).
          Dahinter liegt eine weichgezeichnete Kopie als Atmosphäre, die bei
          jedem Seitenverhältnis und jeder Bildschirmbreite den Raum füllt. */}
      <section className="scanlines relative overflow-hidden border-b border-line">
        {ev.cover_image ? (
          <Image
            src={ev.cover_image}
            alt=""
            aria-hidden
            fill
            sizes="128px"
            unoptimized={!ev.cover_image.startsWith("/")}
            className="scale-125 object-cover opacity-45 blur-3xl"
          />
        ) : (
          <div className="absolute inset-0 bg-grid" />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background" />

        <Container className="relative z-10 pt-8 pb-10 md:pt-12">
          <Link
            href="/events"
            className="label-mono mb-8 inline-block border border-line px-3 py-2 text-cream/70 transition-colors hover:border-acid hover:text-acid"
          >
            ← {t("back")}
          </Link>

          <div className="flex flex-col gap-8">
            {ev.cover_image && (
              // Natürliches Seitenverhältnis: begrenzt durch Breite und Höhe,
              // damit Hoch- wie Querformat komplett sichtbar bleiben.
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={ev.cover_image}
                alt={ev.title}
                fetchPriority="high"
                className="mx-auto block h-auto max-h-[70vh] w-auto max-w-full border border-line shadow-[8px_8px_0_0_var(--color-acid)] md:mx-0"
              />
            )}
            <div className="min-w-0">
              <p className="label-mono text-acid">
                [EV] — {seriesLabel(ev.series, locale)}
              </p>
              <h1 className="mt-4 font-display text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.88] text-cream break-words">
                {ev.title}
              </h1>
            </div>
          </div>
        </Container>
      </section>

      <Container className="grid grid-cols-1 gap-12 py-16 lg:grid-cols-[1fr_360px]">
        {/* Line-up + Beschreibung — min-w-0 verhindert, dass lange Inhalte
            (z. B. eingebettete Player-URLs) die Grid-Spalte über den Screen
            hinaus aufblähen und die Info-Card wegschieben. */}
        <div className="min-w-0">
          {past && (
            <p className="label-mono mb-8 inline-block border border-dashed border-line px-4 py-2 text-cream/60">
              {t("past")}
            </p>
          )}

          {/* Line-up steht oben — in der Szene relevanter als der Fließtext */}
          {lineup.length > 0 && (
            <div className="mb-10">
              <h2 className="label-mono mb-5 text-acid">▸ {t("lineup")}</h2>
              <div className="flex flex-wrap gap-2">
                {lineup.map((act) => (
                  <span
                    key={act}
                    className="border border-line bg-surface px-4 py-2.5 font-display text-lg text-cream md:text-xl"
                  >
                    {act}
                  </span>
                ))}
              </div>
            </div>
          )}

          {description && <EventDescription html={description} />}
        </div>

        {/* Details-Card */}
        <aside className="h-fit border border-line bg-surface lg:sticky lg:top-28">
          <p className="label-mono border-b border-line px-5 py-3 text-cream/50">[ {t("details")} ]</p>
          <dl className="space-y-5 p-5">
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

          <div className="border-t border-line p-5">
            {ev.ticket_status === "on_sale" && ev.ticket_url ? (
              <a
                href="#tickets"
                className="btn-hard btn-acid w-full"
              >
                {ticketStatusLabel("on_sale", locale)} ↓
              </a>
            ) : (
              <span
                className={
                  ev.ticket_status === "free"
                    ? "btn-hard w-full border-mint bg-mint text-ink"
                    : "btn-hard w-full border-line text-cream/60"
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
        <section id="tickets" className="scroll-mt-24 border-t border-line bg-surface">
          <Container className="py-16">
            <p className="label-mono text-acid">[TX] — Weeztix</p>
            <h2 className="mb-8 mt-4 font-display text-[clamp(2rem,5vw,3.5rem)] leading-[0.9] text-cream">
              Tickets
            </h2>
            <WeeztixEmbed url={ev.ticket_url} />
          </Container>
        </section>
      )}
    </article>
  );
}

/**
 * Rendert die Event-Beschreibung. Der Text wird im Admin (hinter Login)
 * gepflegt und kann eingebettetes HTML enthalten — z. B. SoundCloud-Player
 * der DJs. Enthält der Text HTML-Tags, wird er als Markup gerendert, sonst
 * als reiner Text (mit erhaltenen Zeilenumbrüchen).
 *
 * whitespace-pre-line erhält die Absätze des Fließtexts; overflow-wrap-anywhere
 * bricht überlange Tokens (URLs) um; die iframe-Regeln machen die Player
 * responsive, sodass nichts aus dem Container ragt.
 */
function EventDescription({ html }: { html: string }) {
  const containsHtml = /<\/?(iframe|a|div|p|br|img|strong|em|ul|ol|li|span)\b/i.test(
    html,
  );

  const base =
    "text-lg leading-relaxed text-cream/80 whitespace-pre-line [overflow-wrap:anywhere]";

  if (!containsHtml) {
    return <p className={base}>{html}</p>;
  }

  return (
    <div
      className={
        base +
        " [&_iframe]:my-4 [&_iframe]:block [&_iframe]:w-full [&_iframe]:max-w-full [&_iframe]:border [&_iframe]:border-line" +
        " [&_a]:text-acid [&_a]:underline [&_a]:decoration-acid/40 hover:[&_a]:decoration-acid"
      }
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

function Detail({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <dt className="label-mono text-acid">
        {label}
      </dt>
      <dd className="mt-1 font-semibold text-cream">{children}</dd>
    </div>
  );
}
