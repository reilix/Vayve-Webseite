"use client";

import { useTranslations, useLocale } from "next-intl";
import { ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import Button from "@/components/ui/Button";
import ScrollReveal from "@/components/animation/ScrollReveal";
import GlowOrb from "@/components/ui/GlowOrb";
import Link from "next/link";

export default function CTASection() {
  const t = useTranslations("home.cta");
  const locale = useLocale();

  return (
    <section className="py-20 md:py-28 bg-gradient-to-br from-primary via-primary-dark to-dark relative overflow-hidden">
      <GlowOrb color="secondary" size="lg" className="-top-24 -right-24 opacity-30" />
      <GlowOrb color="accent" size="md" className="-bottom-16 -left-16 opacity-20" />

      {/* Grid pattern */}
      <div
        className="absolute inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,.2) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.2) 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      <Container className="relative z-10">
        <ScrollReveal>
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-heading font-bold text-white leading-tight">
              {t("title")}
            </h2>
            <p className="mt-4 text-lg text-white/70 leading-relaxed">
              {t("subtitle")}
            </p>
            <div className="mt-8">
              <Link href={`/${locale}/kontakt`}>
                <Button
                  variant="secondary"
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90"
                >
                  {t("button")}
                  <ArrowRight size={18} />
                </Button>
              </Link>
            </div>
          </div>
        </ScrollReveal>
      </Container>
    </section>
  );
}
