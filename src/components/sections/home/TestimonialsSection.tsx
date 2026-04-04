"use client";

import { useTranslations } from "next-intl";
import { Quote } from "lucide-react";
import Container from "@/components/layout/Container";
import SectionHeading from "@/components/ui/SectionHeading";
import Card from "@/components/ui/Card";
import StaggerChildren, {
  staggerItemVariants,
} from "@/components/animation/StaggerChildren";
import { motion } from "framer-motion";

const testimonials = [
  {
    name: "Laura M.",
    role: "Hochzeitspaar",
    roleEn: "Wedding Couple",
    quote: "Vayve hat unsere Hochzeit zu etwas ganz Besonderem gemacht. Jedes Detail war perfekt — wir konnten den Tag einfach genießen.",
    quoteEn: "Vayve turned our wedding into something truly special. Every detail was perfect — we could simply enjoy the day.",
  },
  {
    name: "Thomas K.",
    role: "Marketing Director",
    roleEn: "Marketing Director",
    quote: "Das Corporate Event war ein voller Erfolg. Professionell, kreativ und mit einer Energie, die alle mitgerissen hat.",
    quoteEn: "The corporate event was a complete success. Professional, creative and with an energy that captivated everyone.",
  },
  {
    name: "Sophie R.",
    role: "Silent Disco Teilnehmerin",
    roleEn: "Silent Disco Attendee",
    quote: "Der Sunrise Silent Disco Run war das beste Erlebnis des Jahres. Die Stimmung, die Musik, der Sonnenaufgang — pure Magie.",
    quoteEn: "The Sunrise Silent Disco Run was the best experience of the year. The atmosphere, the music, the sunrise — pure magic.",
  },
];

export default function TestimonialsSection() {
  const t = useTranslations("home.testimonials");

  return (
    <section className="py-20 md:py-28 bg-background">
      <Container>
        <SectionHeading eyebrow={t("eyebrow")} title={t("title")} />

        <StaggerChildren className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {testimonials.map((item) => (
            <motion.div key={item.name} variants={staggerItemVariants}>
              <Card hoverable={false} className="h-full flex flex-col">
                <Quote size={24} className="text-primary/30 mb-4" />
                <p className="text-dark leading-relaxed flex-1">{item.quote}</p>
                <div className="mt-6 pt-4 border-t border-border">
                  <p className="font-heading font-bold text-dark">{item.name}</p>
                  <p className="text-sm text-muted">{item.role}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </StaggerChildren>
      </Container>
    </section>
  );
}
