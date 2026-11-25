import { cn } from "@/lib/utils";

/**
 * Laufband wie die Ticker-Zeilen auf Rave-Flyern. Reines CSS (transform),
 * kein JavaScript.
 */
export default function Ticker({
  items,
  variant = "acid",
  reverse = false,
  className,
}: {
  items: string[];
  variant?: "acid" | "dark" | "pink";
  reverse?: boolean;
  className?: string;
}) {
  const tone = {
    acid: "bg-acid text-ink",
    pink: "bg-primary text-ink",
    dark: "bg-base text-cream border-y border-line",
  }[variant];

  // Genug Wiederholungen, damit eine Hälfte breiter ist als jeder Bildschirm.
  const row = [...items, ...items, ...items];

  return (
    <div className={cn("relative overflow-hidden py-3", tone, className)} aria-hidden="true">
      <div
        className="flex w-max animate-marquee"
        style={{ animationDirection: reverse ? "reverse" : undefined, animationDuration: "40s" }}
      >
        {[0, 1].map((half) => (
          <div key={half} className="flex shrink-0 items-center">
            {row.map((item, i) => (
              <span key={`${half}-${i}`} className="flex items-center">
                <span className="whitespace-nowrap font-display text-lg md:text-2xl">{item}</span>
                <span className="mx-5 text-base md:mx-7">✶</span>
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
