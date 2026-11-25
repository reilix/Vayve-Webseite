import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { listEvents } from "@/lib/db/events";
import { siteConfig } from "@/lib/constants";
import Container from "@/components/layout/Container";
import PageHero from "@/components/retro/PageHero";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery.hero" });
  return { title: t("title"), description: t("subtitle") };
}

// Inhalte aus der Datenbank: nicht beim Build vorrendern (dort gäbe es nur
// die Seed-Daten der Build-DB), sondern beim ersten Aufruf rendern und dann
// 5 Minuten aus dem Cache ausliefern. Admin-Änderungen leeren den Cache sofort
// (revalidatePath in app/admin/actions.ts).
export const revalidate = 300;
export function generateStaticParams() {
  return [];
}

function collectImages(): string[] {
  const out: string[] = [];
  for (const ev of listEvents({ onlyPublished: true })) {
    if (ev.cover_image) out.push(ev.cover_image);
    if (ev.gallery) {
      try {
        const arr = JSON.parse(ev.gallery) as string[];
        if (Array.isArray(arr)) out.push(...arr.filter((s) => typeof s === "string"));
      } catch {
        /* ignore */
      }
    }
  }
  return out;
}

export default async function GalleryPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("gallery");
  const images = collectImages();

  return (
    <div>
      <PageHero code="GA" eyebrow={t("hero.eyebrow")} title={t("hero.title")} subtitle={t("hero.subtitle")} />

      <Container className="py-16 md:py-20">
        {images.length === 0 ? (
          <div className="border border-dashed border-line px-6 py-20 text-center">
            <p className="label-mono text-muted">{t("empty")}</p>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-hard btn-acid mt-8"
            >
              {t("followCta")} ↗
            </a>
          </div>
        ) : (
          <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
            {images.map((src, i) => (
              <figure
                key={`${src}-${i}`}
                className="group relative overflow-hidden border border-line bg-surface"
              >
                <Image
                  src={src}
                  alt=""
                  width={500}
                  height={650}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  unoptimized={!src.startsWith("/")}
                  className="h-auto w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                />
                <figcaption className="label-mono absolute left-0 top-0 bg-background/85 px-2 py-1 text-cream/70">
                  IMG_{String(i + 1).padStart(3, "0")}
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
