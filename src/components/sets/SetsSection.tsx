import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { getLatestSets, thumbUrl, type YtSet } from "@/lib/youtube";
import { formatEventDateShort } from "@/lib/datetime";
import Container from "@/components/layout/Container";
import SectionHeader from "@/components/retro/SectionHeader";
import SetPlayer, { type PlayerSet } from "./SetPlayer";

export function toPlayerSets(sets: YtSet[], locale: string): PlayerSet[] {
  return sets.map((s) => ({
    id: s.id,
    title: s.title,
    date: formatEventDateShort(s.published, locale),
    thumb: thumbUrl(s.id),
    thumbLarge: thumbUrl(s.id, "max"),
  }));
}

/** Startseite: die neuesten Live-Sets vom YouTube-Kanal. */
export default async function SetsSection({ locale }: { locale: string }) {
  const t = await getTranslations("home.sets");
  const sets = await getLatestSets(5);
  if (sets.length === 0) return null;

  return (
    <section className="relative py-20 md:py-28">
      <Container>
        <SectionHeader
          index="02"
          eyebrow={t("eyebrow")}
          title={t("title")}
          action={
            <Link href="/sets" className="btn-hard btn-ghost">
              {t("viewAll")} →
            </Link>
          }
        />
        <p className="-mt-4 mb-10 max-w-xl text-cream/70 md:-mt-6">{t("subtitle")}</p>
        <SetPlayer
          sets={toPlayerSets(sets, locale)}
          labels={{
            play: t("play"),
            nowPlaying: t("nowPlaying"),
            queue: t("queue"),
            consent: t("consent"),
          }}
        />
      </Container>
    </section>
  );
}
