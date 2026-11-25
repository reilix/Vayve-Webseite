import Container from "@/components/layout/Container";
import { cn } from "@/lib/utils";

/** Kopfbereich der Unterseiten: Raster, Index-Label, breite Headline. */
export default function PageHero({
  code,
  eyebrow,
  title,
  subtitle,
  className,
  children,
}: {
  /** z. B. "EV" → Label „[EV] — EVENTS“ */
  code: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-line pt-28 pb-12 md:pt-40 md:pb-16",
        className,
      )}
    >
      <div className="absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,black,transparent)]" />
      <div className="glow-orb right-[-10%] top-[-30%] size-[36vw] bg-primary/40" />
      <Container className="relative z-10">
        <p className="label-mono text-acid">
          [{code}] — {eyebrow}
        </p>
        <h1 className="mt-5 font-display text-[clamp(2.6rem,8vw,6.5rem)] leading-[0.88] text-cream break-words">
          {title}
        </h1>
        {subtitle && <p className="mt-6 max-w-xl text-lg text-muted">{subtitle}</p>}
        {children}
      </Container>
    </section>
  );
}
