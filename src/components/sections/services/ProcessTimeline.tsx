"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerChildren, {
  staggerItemVariants,
} from "@/components/animation/StaggerChildren";

export default function ProcessTimeline() {
  const t = useTranslations("services.process");

  const steps = [
    { title: t("steps.0.title"), description: t("steps.0.description") },
    { title: t("steps.1.title"), description: t("steps.1.description") },
    { title: t("steps.2.title"), description: t("steps.2.description") },
    { title: t("steps.3.title"), description: t("steps.3.description") },
  ];

  return (
    <section className="py-20 md:py-28 bg-background">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-0">
          {steps.map((step, i) => (
            <motion.div
              key={i}
              variants={staggerItemVariants}
              className="relative"
            >
              {/* Connector line (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-6 left-[calc(50%+24px)] right-0 h-px bg-border" />
              )}

              <div className="flex flex-col items-center text-center px-4">
                {/* Number circle */}
                <div className="w-12 h-12 rounded-full bg-primary text-white flex items-center justify-center font-heading font-bold text-lg mb-4 relative z-10">
                  {i + 1}
                </div>
                <h3 className="text-lg font-heading font-bold text-dark mb-2">
                  {step.title}
                </h3>
                <p className="text-sm text-muted leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
