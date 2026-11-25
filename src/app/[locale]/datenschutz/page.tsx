import { setRequestLocale } from "next-intl/server";
import Container from "@/components/layout/Container";
import { localeStaticParams } from "@/i18n/static-params";

export const generateStaticParams = localeStaticParams;

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
        <p className="label-mono text-acid">[LG] — Legal</p>
        <h1 className="mt-5 font-display text-[clamp(2.4rem,7vw,5.5rem)] leading-[0.9] text-cream break-words">
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
            Diese Website wird bei SiteGround (SiteGround Spain S.L., Calle Prim 19,
            28004 Madrid, Spanien) gehostet. Beim
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

          <h2>5. YouTube-Videos</h2>
          <p>
            Auf unserer Website zeigen wir Mitschnitte unserer Events aus unserem
            YouTube-Kanal. Die Vorschaubilder liefern wir über unseren eigenen
            Server aus; beim Laden der Seite wird keine Verbindung zu YouTube
            aufgebaut. Erst wenn du ein Video aktiv startest, wird der Player von
            <strong> YouTube</strong> (Google Ireland Limited, Gordon House, Barrow
            Street, Dublin 4, Irland) im erweiterten Datenschutzmodus
            (youtube-nocookie.com) geladen. Dabei werden u. a. deine IP-Adresse und
            Informationen über die Wiedergabe an YouTube übertragen; eine
            Übermittlung in die USA ist möglich. Rechtsgrundlage ist deine
            Einwilligung durch das Starten des Videos (Art. 6 Abs. 1 lit. a DSGVO).
            Weitere Informationen findest du in der Datenschutzerklärung von Google:{" "}
            <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
              policies.google.com/privacy
            </a>
            .
          </p>

          <h2>6. Deine Rechte</h2>
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
