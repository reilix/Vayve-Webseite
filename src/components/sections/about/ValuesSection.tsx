"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Heart, Sparkles, Shield, Zap } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import StaggerChildren, {
  staggerItemVariants,
} from "@/components/animation/StaggerChildren";

const values = [
  { key: "passion", icon: Heart, color: "text-secondary" },
  { key: "creativity", icon: Sparkles, color: "text-primary" },
  { key: "reliability", icon: Shield, color: "text-accent" },
  { key: "energy", icon: Zap, color: "text-secondary" },
];

export default function ValuesSection() {
  const t = useTranslations("about.values");

  return (
    <section className="py-20 md:py-28 bg-dark">
      <Container>
        <SectionHeading
          eyebrow={t("eyebrow")}
          title={t("title")}
          light
        />

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((value) => (
            <motion.div key={value.key} variants={staggerItemVariants}>
              <Card dark className="h-full text-center">
                <div
                  className={`w-14 h-14 rounded-[12px] bg-white/5 flex items-center justify-center mx-auto mb-5 ${value.color}`}
                >
                  <value.icon size={28} />
                </div>
                <h3 className="text-lg font-heading font-bold text-white mb-2">
                  {t(`${value.key}.title`)}
                </h3>
                <p className="text-sm text-white/60 leading-relaxed">
                  {t(`${value.key}.description`)}
                </p>
              </Card>
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
