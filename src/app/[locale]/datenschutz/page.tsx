import { setRequestLocale } from "next-intl/server";
import Container from "@/components/layout/Container";

export async function generateMetadata() {
  return {
    title: "Datenschutz",
    description: "Datenschutzerklärung",
  };
}

export default async function DatenschutzPage({
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
          Datenschutz
        </h1>
        <div className="mt-12 max-w-3xl prose-styles">
          <h2>1. Verantwortlicher</h2>
          <p>
            Verantwortlich für die Datenverarbeitung auf dieser Website ist:
            <br />
            nios digital UG (haftungsbeschränkt)
            <br />
            Haderslebener Str. 2, 22049 Hamburg
            <br />
            E-Mail: <a href="mailto:info@nios.digital">info@nios.digital</a>
          </p>

          <h2>2. Hosting</h2>
          <p>
            Diese Website wird auf einem selbst betriebenen Server gehostet. Beim
            Aufruf der Website werden technisch notwendige Server-Logdaten
            (z. B. IP-Adresse, Datum und Uhrzeit des Zugriffs, abgerufene Seite)
            verarbeitet. Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO
            (berechtigtes Interesse am sicheren und stabilen Betrieb).
          </p>

          <h2>3. Kontaktformular</h2>
          <p>
            Wenn du uns über das Kontaktformular schreibst, verarbeiten wir die von
            dir angegebenen Daten (Name, E-Mail-Adresse, Betreff, Nachricht), um
            deine Anfrage zu bearbeiten. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
            bzw. lit. f DSGVO. Die Daten werden gelöscht, sobald sie für die
            Bearbeitung nicht mehr erforderlich sind.
          </p>

          <h2>4. Externe Dienste</h2>
          <p>
            Für den Ticketverkauf verlinken wir auf den externen Anbieter
            <strong> Weeztix</strong>. Zudem verlinken wir auf unser
            <strong> Instagram</strong>-Profil. Beim Aufruf dieser externen Seiten
            gelten die Datenschutzbestimmungen der jeweiligen Anbieter. Es werden
            keine Tracking- oder Analyse-Dienste Dritter auf dieser Website
            eingesetzt.
          </p>

          <h2>5. Deine Rechte</h2>
          <p>
            Du hast jederzeit das Recht auf Auskunft, Berichtigung, Löschung,
            Einschränkung der Verarbeitung, Datenübertragbarkeit sowie Widerspruch.
            Außerdem steht dir ein Beschwerderecht bei einer Aufsichtsbehörde zu.
            Wende dich dafür an die oben genannte Adresse.
          </p>
        </div>
      </Container>
    </div>
  );
}
