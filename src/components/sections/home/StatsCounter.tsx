"use client";

import { useTranslations } from "next-intl";
import Container from "@/components/layout/Container";
import AnimatedCounter from "@/components/animation/AnimatedCounter";
import ScrollReveal from "@/components/animation/ScrollReveal";

const stats = [
  { key: "events", value: 150, suffix: "+" },
  { key: "attendees", value: 12000, suffix: "+" },
  { key: "cities", value: 8, suffix: "" },
  { key: "satisfaction", value: 98, suffix: "%" },
];

export default function StatsCounter() {
  const t = useTranslations("home.stats");

  return (
    <section className="py-16 md:py-20 bg-background border-y border-border">
      <Container>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, i) => (
            <ScrollReveal key={stat.key} delay={i * 0.1}>
              <div className="text-center">
                <div className="text-4xl md:text-5xl font-heading font-bold text-primary">
                  <AnimatedCounter
                    target={stat.value}
                    suffix={stat.suffix}
                  />
                </div>
                <p className="mt-2 text-sm md:text-base font-heading font-medium text-muted uppercase tracking-wider">
                  {t(stat.key)}
                </p>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </Container>
    </section>
  );
}
