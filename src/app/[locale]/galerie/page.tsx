import { setRequestLocale, getTranslations } from "next-intl/server";
import type { Metadata } from "next";
import Image from "next/image";
import { listEvents } from "@/lib/db/events";
import { siteConfig } from "@/lib/constants";
import Container from "@/components/layout/Container";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "gallery.hero" });
  return { title: t("title"), description: t("subtitle") };
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
    <div className="pt-28 md:pt-36">
      <section className="relative overflow-hidden pb-12">
        <div className="glow-orb right-[-8%] top-[-10%] size-[34vw] bg-magenta/30" />
        <Container className="relative z-10">
          <span className="font-display text-xs font-bold uppercase tracking-[0.25em] text-mint">
            {t("hero.eyebrow")}
          </span>
          <h1 className="mt-3 font-display text-5xl md:text-7xl font-extrabold tracking-tight text-cream">
            {t("hero.title")}
          </h1>
          <p className="mt-4 max-w-xl text-lg text-muted">{t("hero.subtitle")}</p>
        </Container>
      </section>

      <Container className="pb-24">
        {images.length === 0 ? (
          <div className="rounded-[22px] border border-white/10 bg-[#1a0f33] px-6 py-20 text-center">
            <p className="text-muted">{t("empty")}</p>
            <a
              href={siteConfig.social.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block rounded-full bg-primary px-6 py-3 font-display font-bold text-white hover:shadow-[var(--shadow-glow-pink)] transition-all"
            >
              {t("followCta")} ↗
            </a>
          </div>
        ) : (
          <div className="columns-2 gap-4 md:columns-3 [&>*]:mb-4">
            {images.map((src, i) => (
              <div
                key={`${src}-${i}`}
                className="relative overflow-hidden rounded-[18px] border border-white/10"
              >
                <Image
                  src={src}
                  alt=""
                  width={500}
                  height={650}
                  sizes="(max-width: 768px) 50vw, 33vw"
                  unoptimized={!src.startsWith("/")}
                  className="h-auto w-full object-cover"
                />
              </div>
            ))}
          </div>
        )}
      </Container>
    </div>
  );
}
