"use client";

import { useTranslations, useLocale } from "next-intl";
import { motion } from "framer-motion";
import { PartyPopper, CalendarCheck, Lightbulb, ArrowRight } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import StaggerChildren, {
  staggerItemVariants,
} from "@/components/animation/StaggerChildren";
import Link from "next/link";

const services = [
  { key: "own_events", icon: PartyPopper, color: "text-secondary" },
  { key: "planning", icon: CalendarCheck, color: "text-primary" },
  { key: "creative", icon: Lightbulb, color: "text-accent" },
];

export default function ServicesPreview() {
  const t = useTranslations("home.services");
  const locale = useLocale();

  return (
    <section className="py-20 md:py-28 bg-background">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          subtitle={t("subtitle")}
        />

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {services.map((service) => (
            <motion.div key={service.key} variants={staggerItemVariants}>
              <Card className="h-full flex flex-col group">
                <div
                  className={`w-12 h-12 rounded-[12px] bg-primary/5 flex items-center justify-center mb-5 ${service.color}`}
                >
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-heading font-bold text-dark mb-3">
                  {t(service.key)}
                </h3>
                <p className="text-muted leading-relaxed flex-1">
                  {t(`${service.key}_desc`)}
                </p>
                <div className="mt-5 flex items-center gap-2 text-primary font-heading font-semibold text-sm group-hover:gap-3 transition-all">
                  <span>{t("cta")}</span>
                  <ArrowRight size={16} />
                </div>
              </Card>
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
