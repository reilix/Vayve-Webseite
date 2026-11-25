import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Link } from "@/i18n/navigation";
import { Music2, Users, Sparkles } from "lucide-react";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/animation/ScrollReveal";
import PageHero from "@/components/retro/PageHero";
import { localeStaticParams } from "@/i18n/static-params";

export const generateStaticParams = localeStaticParams;

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
    <div>
      <PageHero code="AB" eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

      {/* Story */}
      <section className="py-16 md:py-24">
        <Container className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <p className="label-mono text-acid">[01] — Story</p>
          </div>
          <div className="space-y-6 lg:col-span-8">
            <ScrollReveal>
              <h2 className="font-display text-[clamp(2rem,5vw,3.75rem)] leading-[0.9] text-cream">
                {t("story.title")}
              </h2>
            </ScrollReveal>
            <ScrollReveal delay={0.05}>
              <p className="text-lg leading-relaxed text-cream/75">{t("story.body1")}</p>
            </ScrollReveal>
            <ScrollReveal delay={0.1}>
              <p className="text-lg leading-relaxed text-cream/75">{t("story.body2")}</p>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section className="border-y border-line bg-surface py-16 md:py-20">
        <Container>
          <p className="label-mono mb-10 text-acid">[02] — Values</p>
          <div className="grid grid-cols-1 border-l border-t border-line md:grid-cols-3">
            {values.map(({ key, Icon }, i) => (
              <ScrollReveal key={key} delay={i * 0.08} className="border-b border-r border-line">
                <div className="h-full p-8">
                  <div className="flex items-center justify-between">
                    <Icon className="size-8 text-acid" strokeWidth={1.5} />
                    <span className="label-mono text-cream/35">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 font-display text-3xl leading-none text-cream">
                    {t(`values.${key}.title`)}
                  </h3>
                  <p className="mt-4 leading-relaxed text-cream/70">{t(`values.${key}.body`)}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-20">
        <Container>
          <div className="bg-hazard p-2">
            <div className="relative overflow-hidden bg-background p-10 text-center md:p-16">
              <div className="absolute inset-0 bg-grid opacity-60" />
              <div className="relative z-10">
                <h2 className="font-display text-[clamp(2.2rem,6vw,4.5rem)] leading-[0.9] text-cream">
                  {t("cta.title")}
                </h2>
                <p className="mx-auto mt-4 max-w-md text-cream/70">{t("cta.body")}</p>
                <Link href="/events" className="btn-hard btn-acid mt-8">
                  {t("cta.button")} →
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
