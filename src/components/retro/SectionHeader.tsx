import { cn } from "@/lib/utils";

/** Abschnittskopf im Flyer-Stil: „[01] — DEMNÄCHST“ + breite Headline. */
export default function SectionHeader({
  index,
  eyebrow,
  title,
  action,
  className,
}: {
  index: string;
  eyebrow: string;
  title: string;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "mb-10 flex flex-wrap items-end justify-between gap-6 border-t border-line pt-5 md:mb-14",
        className,
      )}
    >
      <div className="min-w-0">
        <p className="label-mono text-acid">
          [{index}] — {eyebrow}
        </p>
        <h2 className="mt-4 font-display text-[clamp(2.1rem,6vw,4.5rem)] leading-[0.9] text-cream">
          {title}
        </h2>
      </div>
      {action}
    </div>
  );
}
