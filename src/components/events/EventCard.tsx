import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { EventRecord } from "@/lib/db/events";
import { seriesLabel, ticketStatusLabel } from "@/lib/labels";
import { formatEventDateShort, isPast } from "@/lib/datetime";
import { cn } from "@/lib/utils";

const STATUS_TONE: Record<string, string> = {
  on_sale: "bg-acid text-ink",
  free: "bg-mint text-ink",
  sold_out: "bg-cream/15 text-cream/70",
  soon: "bg-cream/15 text-cream/70",
};

export default function EventCard({
  event,
  locale,
  index,
}: {
  event: EventRecord;
  locale: string;
  /** Laufende Nummer auf der Karte (#01, #02 …) */
  index?: number;
}) {
  const past = isPast(event.starts_at);
  const external = !event.cover_image?.startsWith("/");

  return (
    <Link
      href={{ pathname: "/events/[slug]", params: { slug: event.slug } }}
      className="group relative flex flex-col border border-line bg-surface transition-[transform,box-shadow,border-color] duration-150 hover:-translate-x-1 hover:-translate-y-1 hover:border-acid hover:shadow-[var(--shadow-hard-acid)]"
    >
      {/* Kopfzeile */}
      <div className="label-mono flex items-center justify-between gap-3 border-b border-line px-3 py-2.5 text-cream/60">
        <span>{index ? `#${String(index).padStart(2, "0")}` : "VAYVE"}</span>
        <span className="text-cream">{formatEventDateShort(event.starts_at, locale)}</span>
      </div>

      {/* Flyer im 4:5-Format, nie beschnitten (object-contain). Freie Ränder
          füllt eine weichgezeichnete Mini-Kopie — 64 px reichen dafür. */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-base">
        {event.cover_image ? (
          <>
            <Image
              src={event.cover_image}
              alt=""
              aria-hidden
              fill
              sizes="64px"
              unoptimized={external}
              className="scale-125 object-cover opacity-60 blur-2xl"
            />
            <Image
              src={event.cover_image}
              alt={event.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              unoptimized={external}
              className={cn(
                "object-contain transition-transform duration-500 group-hover:scale-[1.03]",
                past && "grayscale-[0.5]",
              )}
            />
          </>
        ) : (
          <div className="absolute inset-0 bg-grid">
            <span className="font-display absolute inset-0 flex items-center justify-center text-5xl text-cream/10">
              VAYVE
            </span>
          </div>
        )}

        {!past && (
          <span
            className={cn(
              "label-mono absolute right-0 top-0 px-2.5 py-1.5 font-bold",
              STATUS_TONE[event.ticket_status] ?? STATUS_TONE.soon,
            )}
          >
            {ticketStatusLabel(event.ticket_status, locale)}
          </span>
        )}
      </div>

      {/* Inhalt unter dem Flyer — überdeckt keine Flyer-Texte */}
      <div className="flex flex-1 flex-col border-t border-line p-4">
        <p className="label-mono text-acid">{seriesLabel(event.series, locale)}</p>
        <h3 className="mt-2 font-display text-2xl leading-[0.95] text-cream break-words">{event.title}</h3>
        {(event.location_name || event.city) && (
          <p className="label-mono mt-3 text-cream/50">
            {[event.location_name, event.city].filter(Boolean).join(" / ")}
          </p>
        )}
        <span className="label-mono mt-auto pt-5 text-cream/40 transition-colors group-hover:text-acid">
          → Details
        </span>
      </div>
    </Link>
  );
}
