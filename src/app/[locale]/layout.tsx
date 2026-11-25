import { NextIntlClientProvider, hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { setRequestLocale } from "next-intl/server";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import FbclidCapture from "@/components/tracking/FbclidCapture";

// Bewusst kein generateStaticParams hier: Es würde jede Unterseite beim Build
// vorrendern — auch die mit Datenbank-Inhalten, die dann die Seed-Daten der
// Build-DB zeigen würden. Statische Seiten holen es sich aus
// src/i18n/static-params.ts, DB-Seiten rendern beim ersten Aufruf (ISR).

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!hasLocale(routing.locales, locale)) {
    notFound();
  }

  setRequestLocale(locale);

  const messages = (await import(`@/messages/${locale}.json`)).default;

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <FbclidCapture />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
    </NextIntlClientProvider>
  );
}
