import { setRequestLocale } from "next-intl/server";
import ContactHero from "@/components/sections/contact/ContactHero";
import ContactForm from "@/components/sections/contact/ContactForm";
import ContactInfo from "@/components/sections/contact/ContactInfo";
import Container from "@/components/layout/Container";
import PageTransition from "@/components/animation/PageTransition";
import ScrollReveal from "@/components/animation/ScrollReveal";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return {
    title: locale === "de" ? "Kontakt" : "Contact",
    description:
      locale === "de"
        ? "Kontaktiere Vayve — wir freuen uns auf deine Ideen und Anfragen."
        : "Contact Vayve — we look forward to your ideas and inquiries.",
  };
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <PageTransition>
      <ContactHero />
      <section className="py-16 md:py-24 bg-background">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16">
            <div className="lg:col-span-3">
              <ScrollReveal direction="left">
                <div className="bg-white rounded-[16px] p-6 md:p-8 shadow-[0_1px_3px_rgba(15,10,26,0.08)]">
                  <ContactForm />
                </div>
              </ScrollReveal>
            </div>
            <div className="lg:col-span-2">
              <ContactInfo />
            </div>
          </div>
        </Container>
      </section>
    </PageTransition>
  );
}
