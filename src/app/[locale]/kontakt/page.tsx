import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import Container from "@/components/layout/Container";
import ContactForm from "@/components/sections/contact/ContactForm";
import InstagramIcon from "@/components/brand/InstagramIcon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "contact.hero" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("contact");

  return (
    <div className="pt-28 md:pt-36">
      <section className="relative overflow-hidden pb-12">
        <div className="glow-orb left-[-8%] top-[-10%] size-[34vw] bg-primary/30" />
        <Container className="relative z-10 max-w-3xl">
          <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-mint">
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-3 font-display text-5xl md:text-7xl font-extrabold tracking-tight text-cream">
            {t("hero.title")}
          </h1>
          <p className="mt-4 text-lg text-muted">{t("hero.subtitle")}</p>
        </Container>
      </section>

      <Container className="grid grid-cols-1 gap-12 pb-24 lg:grid-cols-[1fr_320px]">
        <div className="rounded-[22px] border border-white/10 bg-[#160c2c] p-8">
          <ContactForm />
        </div>

        <aside className="space-y-4">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-muted">
            {t("info.title")}
          </h2>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-[#1a0f33] px-5 py-4 text-cream hover:border-primary transition-colors"
          >
            <Mail className="size-5 text-primary" />
            <span>{siteConfig.email}</span>
          </a>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 rounded-[18px] border border-white/10 bg-[#1a0f33] px-5 py-4 text-cream hover:border-mint transition-colors"
          >
            <InstagramIcon className="size-5 text-mint" />
            <span>@vayve.germany</span>
          </a>
        </aside>
      </Container>
    </div>
  );
}
