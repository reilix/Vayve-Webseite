import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { Mail } from "lucide-react";
import { siteConfig } from "@/lib/constants";
import Container from "@/components/layout/Container";
import ContactForm from "@/components/sections/contact/ContactForm";
import InstagramIcon from "@/components/brand/InstagramIcon";
import YouTubeIcon from "@/components/brand/YouTubeIcon";
import PageHero from "@/components/retro/PageHero";
import { localeStaticParams } from "@/i18n/static-params";

export const generateStaticParams = localeStaticParams;

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
    <div>
      <PageHero code="CT" eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <Container className="grid grid-cols-1 gap-12 py-16 md:py-20 lg:grid-cols-[1fr_340px]">
        <div className="border border-line bg-surface">
          <p className="label-mono border-b border-line px-6 py-3 text-cream/50">[ MSG ] — Formular</p>
          <div className="p-6 md:p-8">
            <ContactForm />
          </div>
        </div>

        <aside className="space-y-3">
          <h2 className="label-mono mb-5 text-acid">[ {t("info.title")} ]</h2>
          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-3 border border-line bg-surface px-5 py-4 text-cream transition-colors hover:border-acid hover:text-acid"
          >
            <Mail className="size-5 text-acid" strokeWidth={1.5} />
            <span className="font-mono text-sm">{siteConfig.email}</span>
          </a>
          <a
            href={siteConfig.social.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-line bg-surface px-5 py-4 text-cream transition-colors hover:border-acid hover:text-acid"
          >
            <InstagramIcon className="size-5 text-acid" />
            <span className="font-mono text-sm">@vayve.germany</span>
          </a>
          <a
            href={siteConfig.social.youtube}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 border border-line bg-surface px-5 py-4 text-cream transition-colors hover:border-acid hover:text-acid"
          >
            <YouTubeIcon className="size-5 text-acid" />
            <span className="font-mono text-sm">YouTube</span>
          </a>
        </aside>
      </Container>
    </div>
  );
}
