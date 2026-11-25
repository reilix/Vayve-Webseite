import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import { getLatestSets, YT_CHANNEL_URL } from "@/lib/youtube";
import Container from "@/components/layout/Container";
import PageHero from "@/components/retro/PageHero";
import SetPlayer from "@/components/sets/SetPlayer";
import { toPlayerSets } from "@/components/sets/SetsSection";
import YouTubeIcon from "@/components/brand/YouTubeIcon";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "sets.hero" });
  return { title: t("title"), description: t("subtitle") };
}

// Feed wird stündlich neu geholt; die Seite selbst nicht beim Build rendern.
export const revalidate = 3600;
export function generateStaticParams() {
  return [];
}

export default async function SetsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("sets");
  const tHome = await getTranslations("home.sets");
  const sets = await getLatestSets();

  return (
    <div>
      <PageHero code="TV" eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")}>
        <a
          href={YT_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-hard btn-ghost mt-8"
        >
          <YouTubeIcon className="size-4" />
          {tHome("channel")} ↗
        </a>
      </PageHero>

      <Container className="py-16 md:py-20">
        <SetPlayer
          sets={toPlayerSets(sets, locale)}
          labels={{
            play: tHome("play"),
            nowPlaying: tHome("nowPlaying"),
            queue: tHome("queue"),
            consent: tHome("consent"),
          }}
        />
      </Container>
    </div>
  );
}
