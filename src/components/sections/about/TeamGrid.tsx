"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { User } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import StaggerChildren, {
  staggerItemVariants,
} from "@/components/animation/StaggerChildren";

const team = [
  { name: "Alex Müller", role: "Gründer & Creative Director", roleEn: "Founder & Creative Director" },
  { name: "Sarah Weber", role: "Event Management", roleEn: "Event Management" },
  { name: "Max Fischer", role: "Produktion & Technik", roleEn: "Production & Technology" },
  { name: "Lena Schmidt", role: "Marketing & Kommunikation", roleEn: "Marketing & Communications" },
];

export default function TeamGrid() {
  const t = useTranslations("about.team");

  return (
    <section className="py-20 md:py-28 bg-background">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <StaggerChildren className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {team.map((member) => (
            <motion.div key={member.name} variants={staggerItemVariants}>
              <div className="group text-center">
                <div className="aspect-square rounded-[16px] bg-gradient-to-br from-primary/10 to-secondary/10 mb-4 flex items-center justify-center overflow-hidden">
                  <User size={48} className="text-primary/30" />
                </div>
                <h3 className="font-heading font-bold text-dark">{member.name}</h3>
                <p className="text-sm text-muted mt-1">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
