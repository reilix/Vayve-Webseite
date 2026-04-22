"use client";

import { useTranslations } from "next-intl";
import { Check } from "lucide-react";
import Image from "next/image";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import ScrollReveal from "@/components/animation/ScrollReveal";
import GlowOrb from "@/components/ui/GlowOrb";

export default function OwnEventsDetail() {
  const t = useTranslations("services.own_events");

  const silentDiscoFeatures = [
    t("silent_disco.features.0"),
    t("silent_disco.features.1"),
    t("silent_disco.features.2"),
    t("silent_disco.features.3"),
  ];

  const beachDiscoFeatures = [
    t("beach_disco.features.0"),
    t("beach_disco.features.1"),
    t("beach_disco.features.2"),
    t("beach_disco.features.3"),
  ];

  return (
    <section className="py-20 md:py-28 bg-background relative overflow-hidden">
      <GlowOrb color="primary" size="sm" className="top-1/4 -right-16 opacity-40" />

      <Container className="relative z-10">
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          centered={false}
        />

        <div className="space-y-16 md:space-y-24">
          {/* Silent Disco Run */}
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="aspect-[4/3] rounded-[16px] relative overflow-hidden">
                <Image
                  src="/images/events/event-crowd-phone.jpg"
                  alt="Silent Disco Run – Crowd"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-4">
                  {t("silent_disco.title")}
                </h3>
                <p className="text-muted leading-relaxed mb-6">
                  {t("silent_disco.description")}
                </p>
                <ul className="space-y-3">
                  {silentDiscoFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-primary" />
                      </div>
                      <span className="text-dark">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </ScrollReveal>

          {/* Beach Disco */}
          <ScrollReveal>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl md:text-3xl font-heading font-bold text-dark mb-4">
                  {t("beach_disco.title")}
                </h3>
                <p className="text-muted leading-relaxed mb-6">
                  {t("beach_disco.description")}
                </p>
                <ul className="space-y-3">
                  {beachDiscoFeatures.map((feature, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded-full bg-secondary/10 flex items-center justify-center flex-shrink-0">
                        <Check size={12} className="text-secondary" />
                      </div>
                      <span className="text-dark">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="order-1 lg:order-2 aspect-[4/3] rounded-[16px] relative overflow-hidden">
                <Image
                  src="/images/events/event-crowd-aerial.jpg"
                  alt="Beach Disco – Festival Atmosphere"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </section>
  );
}
