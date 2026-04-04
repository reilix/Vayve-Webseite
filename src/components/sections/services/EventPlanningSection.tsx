"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Heart, Building2, Gift } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import StaggerChildren, {
  staggerItemVariants,
} from "@/components/animation/StaggerChildren";

const planningServices = [
  { key: "weddings", icon: Heart, color: "text-secondary" },
  { key: "corporate", icon: Building2, color: "text-primary" },
  { key: "private", icon: Gift, color: "text-accent" },
];

export default function EventPlanningSection() {
  const t = useTranslations("services.planning");

  return (
    <section className="py-20 md:py-28 bg-dark">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          light
        />

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {planningServices.map((service) => (
            <motion.div key={service.key} variants={staggerItemVariants}>
              <Card dark className="h-full">
                <div
                  className={`w-12 h-12 rounded-[12px] bg-white/5 flex items-center justify-center mb-5 ${service.color}`}
                >
                  <service.icon size={24} />
                </div>
                <h3 className="text-xl font-heading font-bold text-white mb-3">
                  {t(`${service.key}.title`)}
                </h3>
                <p className="text-white/60 leading-relaxed">
                  {t(`${service.key}.description`)}
                </p>
              </Card>
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
