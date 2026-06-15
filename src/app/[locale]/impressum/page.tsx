import { setRequestLocale } from "next-intl/server";
import Container from "@/components/layout/Container";

export async function generateMetadata() {
  return {
    title: "Impressum",
    description: "Impressum — Angaben gemäß § 5 TMG",
  };
}

export default async function ImpressumPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="pt-32 md:pt-40 pb-24">
      <Container>
        <h1 className="font-display text-5xl md:text-7xl font-extrabold tracking-tight text-cream">
          Impressum
        </h1>
        <div className="mt-12 max-w-3xl prose-styles">
          <h2>Angaben gemäß § 5 TMG</h2>
          <p>
            nios digital UG (haftungsbeschränkt)
            <br />
            Haderslebener Str. 2
            <br />
            22049 Hamburg
          </p>
          <p>
            <strong>Vertreten durch:</strong> Felix Gudowius
          </p>

          <h3>Kontakt</h3>
          <p>
            E-Mail: <a href="mailto:info@nios.digital">info@nios.digital</a>
          </p>

          <h3>Registereintrag</h3>
          <p>
            Eintragung im Handelsregister.
            <br />
            Registergericht: Amtsgericht Hamburg
            <br />
            Registernummer: HRB 186579
          </p>

          <h3>Umsatzsteuer</h3>
          <p>
            Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
            DE368264501
          </p>

          <h2>Haftung für Links</h2>
          <p>
            Unser Angebot enthält Links zu externen Webseiten Dritter, auf deren
            Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
            Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
            Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
            verantwortlich. Bei Bekanntwerden von Rechtsverletzungen werden wir
            derartige Links umgehend entfernen.
          </p>

          <h2>Urheberrecht</h2>
          <p>
            Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
            Seiten unterliegen dem deutschen Urheberrecht. Downloads und Kopien
            dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch
            gestattet. Soweit die Inhalte auf dieser Seite nicht vom Betreiber
            erstellt wurden, werden die Urheberrechte Dritter beachtet.
          </p>
        </div>
      </Container>
    </div>
  );
}
