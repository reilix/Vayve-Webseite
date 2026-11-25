import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Container from "@/components/layout/Container";
import CornerMarks from "@/components/retro/CornerMarks";

// Feste Höhen/Verzögerungen statt Math.random: identisches HTML bei jedem
// Rendern, damit die Seite sauber gecacht werden kann.
const EQ = Array.from({ length: 40 }, (_, i) => ({
  h: 30 + ((i * 37) % 70),
  d: ((i * 53) % 100) / 100,
}));

export default async function HeroSection() {
  const t = await getTranslations("home.hero");

  return (
    <section className="scanlines relative min-h-[100svh] overflow-hidden bg-background">
      {/* Raster, Licht, Retro-Boden */}
      <div className="absolute inset-0 bg-grid" />
      <div className="glow-orb left-[-12%] top-[-8%] size-[48vw] bg-violet/60" />
      <div className="glow-orb right-[-10%] top-[28%] size-[38vw] bg-primary/45" />
      <div className="retro-floor" />

      <Container className="relative z-10 flex min-h-[100svh] flex-col justify-between pt-24 pb-8 md:pt-28">
        {/* Statuszeile */}
        <div className="label-mono flex items-center justify-between gap-4 border-b border-line pb-3 text-cream/60">
          <span className="flex items-center gap-2">
            <span className="animate-blink inline-block size-2 rounded-full bg-primary" />
            REC — {t("status")}
          </span>
          <span className="hidden md:inline">VAYVE/SYS v26.11</span>
          <span className="hidden sm:inline">HH 53.55°N 9.99°E</span>
        </div>

        {/* Headline */}
        <div className="relative py-12 md:py-16">
          <p className="label-mono mb-6 inline-flex items-center gap-3 border border-acid/60 px-3 py-1.5 text-acid">
            ▸ {t("eyebrow")}
          </p>
          <h1 className="font-display text-[clamp(2.7rem,10.5vw,9.5rem)] leading-[0.86]">
            <span className="block text-cream">{t("line1")}</span>
            <span className="text-outline block">{t("line2")}</span>
            <span className="text-rgb animate-glitch block text-acid">{t("line3")}</span>
          </h1>

          <div className="mt-10 flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
            <p className="max-w-md text-lg leading-relaxed text-cream/75">{t("subtitle")}</p>
            <div className="flex flex-wrap gap-4">
              <Link href="/events" className="btn-hard btn-acid">
                {t("ctaEvents")} →
              </Link>
              <Link href="/tickets" className="btn-hard btn-ghost">
                {t("ctaTickets")}
              </Link>
            </div>
          </div>
        </div>

        {/* Equalizer + Scroll */}
        <div className="relative flex items-end justify-between gap-6 border-t border-line pt-4">
          <div className="flex h-10 items-end gap-[3px]" aria-hidden>
            {EQ.map((b, i) => (
              <span
                key={i}
                className={`eq-bar w-[3px] bg-acid/80 ${i > 18 ? "hidden sm:block" : ""}`}
                style={{ height: `${b.h}%`, animationDelay: `-${b.d}s` }}
              />
            ))}
          </div>
          <span className="label-mono hidden text-cream/50 md:inline">140–165 BPM — 4/4</span>
          <span className="label-mono text-cream/60">↓ {t("scroll")}</span>
        </div>
      </Container>
      <CornerMarks className="m-3 md:m-5" size="size-4" />
    </section>
  );
}
