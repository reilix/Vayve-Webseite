import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Container from "@/components/layout/Container";
import WeeztixEmbed from "@/components/tickets/WeeztixEmbed";
import PageGlow from "@/components/layout/PageGlow";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "tickets.hero" });
  return { title: t("title"), description: t("subtitle") };
}

/** Nur Weeztix-URLs als Embed-Ziel zulassen. */
function safeWeeztixUrl(to: string | undefined): string | undefined {
  if (!to) return undefined;
  try {
    const u = new URL(to);
    return u.protocol === "https:" && u.hostname.endsWith("weeztix.com")
      ? to
      : undefined;
  } catch {
    return undefined;
  }
}

export default async function TicketsPage({
  params,
  searchParams,
}: {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ to?: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const { to } = await searchParams;
  const t = await getTranslations("tickets");

  return (
    <div className="relative isolate pt-28 md:pt-32">
      <PageGlow glows={[{ color: "var(--color-primary)", x: "10%" }]} />
      <section className="relative overflow-hidden pb-8">
        <Container className="relative z-10">
          <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-mint">
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-3 font-display text-5xl md:text-6xl font-extrabold tracking-tight text-cream">
            {t("hero.title")}
          </h1>
          <p className="mt-3 max-w-xl text-lg text-muted">{t("hero.subtitle")}</p>
        </Container>
      </section>

      <Container className="pb-20">
        <WeeztixEmbed url={safeWeeztixUrl(to)} />
      </Container>
    </div>
  );
}
