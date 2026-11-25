import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import PageHero from "@/components/retro/PageHero";
import WeeztixEmbed from "@/components/tickets/WeeztixEmbed";
import { localeStaticParams } from "@/i18n/static-params";

export const generateStaticParams = localeStaticParams;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tickets.hero" });
  return { title: t("title"), description: t("subtitle") };
}

export default async function TicketsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("tickets");

  return (
    <div>
      <PageHero code="TX" eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <Container className="py-12 md:py-16">
        {/* `?to=<weeztix-url>` liest die Komponente im Browser — so bleibt die Seite statisch. */}
        <WeeztixEmbed allowQueryOverride />
      </Container>
    </div>
  );
}
