import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Music2, Users, Sparkles } from "lucide-react";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/animation/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "about.hero" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("about");

  const values = [
    { key: "music", Icon: Music2 },
    { key: "people", Icon: Users },
    { key: "vibes", Icon: Sparkles },
  ] as const;

  return (
    <div className="pt-28 md:pt-36">
      {/* Hero */}
      <section className="relative overflow-hidden pb-16">
        <div className="glow-orb left-[-8%] top-[-10%] size-[36vw] bg-violet/40" />
        <div className="glow-orb right-[-6%] top-[20%] size-[30vw] bg-mint/20" />
        <Container className="relative z-10 max-w-3xl">
          <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-mint">
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-3 font-display text-5xl md:text-7xl font-extrabold tracking-tight text-cream">
            {t("hero.title")}
          </h1>
          <p className="mt-5 text-xl text-cream/70">{t("hero.subtitle")}</p>
        </Container>
      </section>

      {/* Story */}
      <section className="py-12">
        <Container className="max-w-3xl space-y-6">
          <ScrollReveal>
            <h2 className="font-display text-3xl md:text-4xl font-extrabold text-cream">
              {t("story.title")}
            </h2>
          </ScrollReveal>
          <ScrollReveal delay={0.05}>
            <p className="text-lg leading-relaxed text-cream/75">{t("story.body1")}</p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <p className="text-lg leading-relaxed text-cream/75">{t("story.body2")}</p>
          </ScrollReveal>
        </Container>
      </section>

      {/* Values */}
      <section className="py-16">
        <Container>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {values.map(({ key, Icon }, i) => (
              <ScrollReveal key={key} delay={i * 0.08}>
                <div className="h-full rounded-[22px] border border-white/10 bg-[#1a0f33] p-8">
                  <Icon className="mb-5 size-9 text-primary" />
                  <h3 className="font-display text-2xl font-extrabold text-cream">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="mt-3 leading-relaxed text-cream/70">
                    {t(`values.${key}.body`)}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20">
        <Container>
          <div className="relative overflow-hidden rounded-[28px] border border-white/10 bg-gradient-to-br from-violet via-magenta to-primary p-12 text-center grain">
            <h2 className="font-display text-4xl md:text-5xl font-extrabold text-white">
              {t("cta.title")}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-white/80">{t("cta.body")}</p>
            <Link
              href="/events"
              className="mt-7 inline-block rounded-full bg-white px-7 py-3.5 font-display font-bold text-[#0c0518] hover:scale-105 transition-transform"
            >
              {t("cta.button")}
            </Link>
          </div>
        </Container>
      </section>
    </div>
  );
}
