import { Link } from "@/i18n/navigation";
import type { EventRecord } from "@/lib/db/events";
import { seriesLabel, ticketStatusLabel } from "@/lib/labels";
import { formatEventDateShort, isPast } from "@/lib/datetime";
import { cn } from "@/lib/utils";

const STATUS_TONE: Record<string, string> = {
  on_sale: "bg-mint text-[#0c0518]",
  free: "bg-acid text-[#0c0518]",
  sold_out: "bg-white/15 text-cream/70",
  soon: "bg-white/15 text-cream/70",
};

export default function EventCard({
  event,
  locale,
}: {
  event: EventRecord;
  locale: string;
}) {
  const past = isPast(event.starts_at);

  return (
    <Link
      href={{ pathname: "/events/[slug]", params: { slug: event.slug } }}
      className="group flex flex-col overflow-hidden rounded-[22px] border border-white/10 bg-[#1a0f33] transition-colors hover:border-white/25"
    >
      {/* Der Flyer steht im eigenen Seitenverhältnis — quer wie hoch, ohne
          Beschnitt und ohne Füllfläche. Nichts liegt auf dem Flyer: Datum und
          Status stehen im Textteil darunter. */}
      <div className="overflow-hidden bg-[#120826]">
        {event.cover_image ? (
          // Natürliches Seitenverhältnis ist nur mit <img> ohne feste Maße
          // möglich; next/image verlangt Breite und Höhe oder eine feste Fläche.
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={event.cover_image}
            alt={event.title}
            loading="lazy"
            className={cn(
              "block h-auto w-full transition-transform duration-500 group-hover:scale-[1.02]",
              past && "grayscale-[0.4]",
            )}
          />
        ) : (
          <div className="relative aspect-[16/9] grain bg-[radial-gradient(120%_120%_at_30%_0%,#7c3aed_0%,#6d28d9_35%,#150a28_100%)]">
            <span className="font-display absolute inset-0 flex items-center justify-center text-5xl font-extrabold tracking-tight text-white/10">
              VAYVE
            </span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-white/10 px-3 py-1 font-display text-sm font-bold text-cream">
            {formatEventDateShort(event.starts_at, locale)}
          </span>
          {!past && (
            <span
              className={cn(
                "rounded-full px-3 py-1 text-xs font-bold",
                STATUS_TONE[event.ticket_status] ?? STATUS_TONE.soon,
              )}
            >
              {ticketStatusLabel(event.ticket_status, locale)}
            </span>
          )}
        </div>
        <p className="font-display text-xs font-bold uppercase tracking-wider text-mint">
          {seriesLabel(event.series, locale)}
        </p>
        <h3 className="font-display text-2xl font-extrabold leading-tight text-cream">
          {event.title}
        </h3>
        {(event.location_name || event.city) && (
          <p className="mt-1 text-sm text-cream/60">
            {[event.location_name, event.city].filter(Boolean).join(" · ")}
          </p>
        )}
      </div>
    </Link>
  );
}
