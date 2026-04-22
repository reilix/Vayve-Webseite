"use client";

import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Headphones, Sun } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/animation/ScrollReveal";
import GlowOrb from "@/components/ui/GlowOrb";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function OwnEventsSection() {
  const t = useTranslations("home.events");
  const locale = useLocale();

  return (
    <section className="py-20 md:py-28 bg-dark relative overflow-hidden">
      <GlowOrb color="primary" size="lg" className="-top-32 -right-32" />
      <GlowOrb color="secondary" size="md" className="-bottom-24 -left-24" />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          light
        />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Silent Disco Run */}
          <ScrollReveal direction="left">
            <div className="group rounded-[16px] overflow-hidden bg-white/5 border border-white/10 hover:border-primary/30 transition-all duration-300">
              <div className="aspect-[16/10] bg-gradient-to-br from-primary/20 to-secondary/20 relative flex items-center justify-center">
                <Headphones
                  size={64}
                  className="text-white/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-primary/80 text-white text-xs font-heading font-semibold rounded-[9999px] uppercase tracking-wider">
                  Silent Disco
                </span>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-heading font-bold text-white mb-3">
                  {t("silent_disco.title")}
                </h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  {t("silent_disco.description")}
                </p>
                <Link href={`/${locale}/services`}>
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                    {t("silent_disco.cta")}
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>

          {/* Beach Disco */}
          <ScrollReveal direction="right">
            <div className="group rounded-[16px] overflow-hidden bg-white/5 border border-white/10 hover:border-secondary/30 transition-all duration-300">
              <div className="aspect-[16/10] bg-gradient-to-br from-secondary/20 to-accent/20 relative flex items-center justify-center">
                <Sun
                  size={64}
                  className="text-white/20"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <span className="absolute bottom-4 left-4 px-3 py-1 bg-secondary/80 text-white text-xs font-heading font-semibold rounded-[9999px] uppercase tracking-wider">
                  Beach Disco
                </span>
              </div>
              <div className="p-6 md:p-8">
                <h3 className="text-2xl font-heading font-bold text-white mb-3">
                  {t("beach_disco.title")}
                </h3>
                <p className="text-white/60 leading-relaxed mb-6">
                  {t("beach_disco.description")}
                </p>
                <Link href={`/${locale}/services`}>
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10 hover:text-white">
                    {t("beach_disco.cta")}
                    <ArrowRight size={16} />
                  </Button>
                </Link>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
