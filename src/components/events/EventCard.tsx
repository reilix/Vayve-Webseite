import Image from "next/image";
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
      className="group relative block overflow-hidden rounded-[22px] border border-white/10 bg-[#1a0f33]"
    >
      <div className="relative aspect-[4/5] w-full overflow-hidden">
        {event.cover_image ? (
          <Image
            src={event.cover_image}
            alt={event.title}
            fill
            sizes="(max-width: 768px) 100vw, 33vw"
            unoptimized={!event.cover_image.startsWith("/")}
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-105",
              past && "grayscale-[0.4]",
            )}
          />
        ) : (
          <div className="absolute inset-0 grain bg-[radial-gradient(120%_120%_at_30%_0%,#7c3aed_0%,#6d28d9_35%,#150a28_100%)]">
            <span className="font-display absolute inset-0 flex items-center justify-center text-5xl font-extrabold tracking-tight text-white/10">
              VAYVE
            </span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-[#0c0518] via-[#0c0518]/30 to-transparent" />

        {/* Datum-Chip */}
        <span className="absolute left-3 top-3 rounded-full bg-[#0c0518]/80 px-3 py-1 font-display text-sm font-bold text-cream backdrop-blur">
          {formatEventDateShort(event.starts_at, locale)}
        </span>

        {/* Status-Chip */}
        {!past && (
          <span
            className={cn(
              "absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold",
              STATUS_TONE[event.ticket_status] ?? STATUS_TONE.soon,
            )}
          >
            {ticketStatusLabel(event.ticket_status, locale)}
          </span>
        )}

        {/* Inhalt unten */}
        <div className="absolute inset-x-0 bottom-0 p-4">
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
      </div>
    </Link>
  );
}
