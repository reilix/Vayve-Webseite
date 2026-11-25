import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import Container from "@/components/layout/Container";

export default async function VibeSection() {
  const t = await getTranslations("home.vibe");

  return (
    <section className="relative overflow-hidden border-y border-line bg-surface py-24 md:py-32">
      <div className="absolute inset-0 bg-dots opacity-60" />
      <div className="glow-orb left-[55%] top-[0%] size-[34vw] bg-violet/50" />
      <Container className="relative z-10 grid gap-10 lg:grid-cols-12">
        <div className="lg:col-span-4">
          <p className="label-mono text-acid">[03] — {t("eyebrow")}</p>
          <p className="label-mono mt-6 hidden max-w-[16rem] leading-relaxed text-cream/40 lg:block">
            Hard House / Trance / Bounce / House — Open Air / Club / Run
          </p>
        </div>
        <div className="lg:col-span-8">
          <h2 className="font-display text-[clamp(2.4rem,7vw,6rem)] leading-[0.88] text-cream">
            {t("title")}
          </h2>
          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-cream/75 md:text-xl">{t("body")}</p>
          <Link href="/ueber-uns" className="btn-hard btn-ghost mt-10">
            {t("cta")} →
          </Link>
        </div>
      </Container>
    </section>
  );
}
