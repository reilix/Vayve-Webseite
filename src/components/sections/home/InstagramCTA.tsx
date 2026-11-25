import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/constants";
import Container from "@/components/layout/Container";
import InstagramIcon from "@/components/brand/InstagramIcon";
import YouTubeIcon from "@/components/brand/YouTubeIcon";
import CornerMarks from "@/components/retro/CornerMarks";

export default async function InstagramCTA() {
  const t = await getTranslations("home.instagram");

  return (
    <section className="relative py-20 md:py-24">
      <Container>
        <div className="bg-hazard p-2">
          <div className="relative overflow-hidden bg-background px-6 py-14 text-center md:px-16 md:py-20">
            <div className="absolute inset-0 bg-grid opacity-60" />
            <CornerMarks className="m-4" />
            <div className="relative z-10">
              <p className="label-mono text-acid">[04] — Social</p>
              <h2 className="mt-5 font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.9] text-cream">
                {t("title")}
              </h2>
              <p className="mx-auto mt-5 max-w-md text-cream/70">{t("body")}</p>
              <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
                <a
                  href={siteConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hard btn-acid"
                >
                  <InstagramIcon className="size-4" />
                  {t("cta")}
                </a>
                <a
                  href={siteConfig.social.youtube}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hard btn-ghost"
                >
                  <YouTubeIcon className="size-4" />
                  {t("youtube")}
                </a>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
