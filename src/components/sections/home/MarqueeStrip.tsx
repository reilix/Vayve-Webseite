"use client";

import { useTranslations } from "next-intl";
import InfiniteMarquee from "@/components/animation/InfiniteMarquee";

export default function MarqueeStrip() {
  const t = useTranslations("home.marquee");

  return (
    <div className="bg-dark border-y border-white/10 py-4 md:py-5">
      <InfiniteMarquee
        text={t("items")}
        speed={30}
        textClassName="text-xl md:text-2xl font-heading font-bold text-white/80 tracking-wider"
      />
    </div>
  );
}
