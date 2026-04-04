"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import ScrollReveal from "@/components/animation/ScrollReveal";
import GlowOrb from "@/components/ui/GlowOrb";

export default function MissionSection() {
  const t = useTranslations("about.mission");

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <GlowOrb color="primary" size="sm" className="top-1/2 -right-24 opacity-50" />

      <Container className="relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <ScrollReveal direction="left">
            <div>
              <span className="text-xs font-heading font-semibold uppercase tracking-[0.2em] text-primary mb-4 block">
                {t("eyebrow")}
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold text-dark leading-tight">
                {t("title")}
              </h2>
              <p className="mt-6 text-lg text-muted leading-relaxed">
                {t("text")}
              </p>
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="bg-dark rounded-[16px] p-8 md:p-10">
              <h3 className="text-xl font-heading font-bold text-white mb-4">
                {t("vision_title")}
              </h3>
              <p className="text-2xl md:text-3xl font-heading font-bold text-primary-light leading-tight">
                {t("vision_text")}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
