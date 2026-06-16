import { setRequestLocale } from "next-intl/server";
import Container from "@/components/layout/Container";

export async function generateMetadata() {
  return {
    title: "AGB",
    description: "Allgemeine Geschäftsbedingungen und Widerrufsbelehrung",
  };
}

export default async function AgbPage({
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
          AGB
        </h1>
        <p className="mt-4 text-muted">Stand: Juni 2026</p>

        <div className="mt-12 max-w-3xl prose-styles">
          <h2>Allgemeine Geschäftsbedingungen</h2>

          <h3>§ 1 Geltungsbereich, Begriffsbestimmungen</h3>
          <p>
            Die nios digital UG (haftungsbeschränkt), Haderslebener Str. 2, 22049
            Hamburg (nachfolgend „VAYVE", „wir" oder „uns") veranstaltet Events
            (u. a. Raves und Open Airs) und verkauft hierfür Eintrittskarten
            (nachfolgend „Tickets") über die Website vayve.de sowie über den
            Ticketing-Dienstleister Weeztix. Diese Allgemeinen Geschäftsbedingungen
            (AGB) gelten für alle Verträge zwischen uns und dem Kunden in ihrer zum
            Zeitpunkt der Bestellung gültigen Fassung.
          </p>
          <p>
            „Verbraucher" ist jede natürliche Person, die ein Rechtsgeschäft zu
            Zwecken abschließt, die überwiegend weder ihrer gewerblichen noch ihrer
            selbständigen beruflichen Tätigkeit zugerechnet werden können.
            „Unternehmer" ist eine natürliche oder juristische Person oder eine
            rechtsfähige Personengesellschaft, die bei Abschluss des Rechtsgeschäfts
            in Ausübung ihrer gewerblichen oder selbständigen beruflichen Tätigkeit
            handelt.
          </p>

          <h3>§ 2 Zustandekommen des Vertrages, Speicherung des Vertragstextes</h3>
          <p>
            Die Darstellung von Events und Tickets stellt kein bindendes Angebot
            dar, sondern eine unverbindliche Aufforderung zur Abgabe einer
            Bestellung. Der Kunde gibt durch Abschluss des Bestellvorgangs (Auswahl
            des Tickets, Eingabe der erforderlichen Daten, Auswahl der Zahlungsart,
            Bestätigung dieser AGB und Betätigung des Buttons „kostenpflichtig
            bestellen" o. ä.) ein verbindliches Angebot zum Abschluss eines
            Kaufvertrages ab.
          </p>
          <p>
            Der Vertrag kommt zustande, indem Ihnen innerhalb von drei Werktagen
            eine Bestellbestätigung an die angegebene E-Mail-Adresse zugeht bzw. das
            Ticket bereitgestellt wird. Vertragspartner ist die nios digital UG
            (haftungsbeschränkt). Erfolgt der Ticketkauf über den
            Ticketing-Dienstleister Weeztix, wickelt dieser den Bestell- und
            Zahlungsvorgang technisch ab; Veranstalterin der jeweiligen
            Veranstaltung bleibt die nios digital UG.
          </p>
          <p>
            Sie können den Vertragstext vor Absenden der Bestellung über die
            Druckfunktion Ihres Browsers ausdrucken oder elektronisch speichern.
            Eingabefehler können Sie vor dem Absenden der Bestellung über die
            üblichen Tastatur- und Mausfunktionen korrigieren. Alle weiteren
            Informationen erhalten Sie per E-Mail; bitte stellen Sie sicher, dass
            die angegebene Adresse korrekt ist und der Empfang technisch
            gewährleistet ist.
          </p>

          <h3>§ 3 Vertragsgegenstand und wesentliche Merkmale</h3>
          <p>
            Gegenstand des Vertrages ist der Verkauf von Tickets, die zum einmaligen
            Einlass zu der jeweils bezeichneten Veranstaltung berechtigen. Die
            wesentlichen Merkmale (Veranstaltung, Datum, Veranstaltungsort, Einlass-
            bzw. Beginnzeit sowie ggf. Alters- oder Zugangsbeschränkungen) ergeben
            sich aus der jeweiligen Event-Beschreibung. Tickets werden in der Regel
            als personalisiertes oder nicht personalisiertes E-Ticket bereitgestellt.
          </p>

          <h3>§ 4 Preise und Zahlung</h3>
          <p>
            Alle angegebenen Preise sind Gesamtpreise und enthalten die gesetzliche
            Umsatzsteuer. Etwaige Vorverkaufs- oder Servicegebühren des
            Ticketing-Dienstleisters werden vor Abschluss der Bestellung gesondert
            ausgewiesen. Der Kaufpreis ist mit Vertragsschluss sofort zur Zahlung
            fällig (Vorkasse), soweit nicht anders angegeben. Die verfügbaren
            Zahlungsarten werden im Bestellvorgang angezeigt. Das Ticket wird nach
            vollständigem Zahlungseingang bereitgestellt.
          </p>

          <h3>§ 5 Einlass, Hausrecht, Durchführung der Veranstaltung</h3>
          <p>
            Das Ticket ist beim Einlass vorzuzeigen. Wir bzw. die Betreiber der
            jeweiligen Veranstaltungsstätte üben das Hausrecht aus. Aus Gründen der
            Sicherheit, der Kapazität, der Hausordnung oder bei Nichterfüllung von
            Alters- oder Zugangsvoraussetzungen kann der Einlass verweigert werden.
            Bei berechtigter Einlassverweigerung oder berechtigtem Verweis von der
            Veranstaltung besteht kein Anspruch auf Erstattung des Ticketpreises.
          </p>

          <h3>§ 6 Absage, Verlegung und Programmänderungen</h3>
          <p>
            Wird eine Veranstaltung vollständig abgesagt, erstatten wir den
            Ticketpreis; bereits gezahlte Vorverkaufs- bzw. Servicegebühren des
            Dienstleisters können hiervon ausgenommen sein, soweit gesetzlich
            zulässig. Wird eine Veranstaltung auf einen anderen Termin verlegt,
            behält das Ticket grundsätzlich seine Gültigkeit für den Ersatztermin;
            gesetzliche Rechte des Kunden bleiben unberührt. Änderungen des
            Programms oder des Line-ups bleiben vorbehalten und berechtigen nicht zur
            Rückgabe des Tickets, sofern der Gesamtcharakter der Veranstaltung
            gewahrt bleibt.
          </p>

          <h3>§ 7 Weitergabe von Tickets</h3>
          <p>
            Eine private Weitergabe von Tickets, höchstens zum aufgedruckten bzw.
            ursprünglichen Verkaufspreis zzgl. nachgewiesener Nebenkosten, ist
            zulässig. Der gewerbliche oder kommerzielle Weiterverkauf sowie der
            Verkauf zu überhöhten Preisen sind untersagt. Wir behalten uns vor,
            Tickets, die unter Verstoß hiergegen erworben oder veräußert wurden, zu
            sperren.
          </p>

          <h3>§ 8 Bild- und Tonaufnahmen</h3>
          <p>
            Bei unseren Veranstaltungen können Foto-, Film- und Tonaufnahmen
            angefertigt werden. Mit dem Betreten der Veranstaltung erklärt sich der
            Gast damit einverstanden, dass solche Aufnahmen, auf denen er ggf.
            erkennbar ist, im Rahmen der üblichen Öffentlichkeitsarbeit (z. B. auf
            unseren Social-Media-Kanälen und unserer Website) unentgeltlich
            verbreitet und veröffentlicht werden dürfen. Weitere Informationen
            enthält unsere Datenschutzerklärung.
          </p>

          <h3>§ 9 Widerrufsrecht</h3>
          <p>
            Verbrauchern steht ein Widerrufsrecht nach Maßgabe der nachstehenden
            Widerrufsbelehrung zu. Wir weisen ausdrücklich darauf hin, dass ein
            Widerrufsrecht gemäß § 312g Abs. 2 Nr. 9 BGB bei Verträgen zur Erbringung
            von Dienstleistungen im Zusammenhang mit Freizeitbetätigungen
            <strong>
              {" "}nicht besteht, wenn der Vertrag für die Erbringung einen
              spezifischen Termin oder Zeitraum vorsieht
            </strong>
            . Der Kauf von Tickets für terminierte Veranstaltungen ist daher in der
            Regel unmittelbar verbindlich und nicht widerrufbar.
          </p>

          <h3>§ 10 Zurückbehaltungsrecht</h3>
          <p>
            Ein Zurückbehaltungsrecht können Sie nur ausüben, soweit es sich um
            Forderungen aus demselben Vertragsverhältnis handelt.
          </p>

          <h3>§ 11 Haftung</h3>
          <p>
            Für Schäden aus der Verletzung des Lebens, des Körpers oder der
            Gesundheit sowie für sonstige Schäden, die auf einer vorsätzlichen oder
            grob fahrlässigen Pflichtverletzung beruhen, haften wir unbeschränkt.
            Bei leicht fahrlässiger Verletzung wesentlicher Vertragspflichten ist die
            Haftung auf den vertragstypisch vorhersehbaren Schaden begrenzt;
            wesentliche Vertragspflichten sind solche, deren Erfüllung die
            ordnungsgemäße Durchführung des Vertrages überhaupt erst ermöglicht und
            auf deren Einhaltung der Kunde regelmäßig vertrauen darf. Im Übrigen ist
            die Haftung für leichte Fahrlässigkeit ausgeschlossen. Zwingende
            gesetzliche Haftungsregelungen (insbesondere nach dem Produkthaftungs­gesetz)
            bleiben unberührt.
          </p>

          <h3>§ 12 Gewährleistung</h3>
          <p>
            Es gelten die gesetzlichen Gewährleistungsrechte. Gegenüber Unternehmern
            beträgt die Gewährleistungsfrist auf gelieferte Sachen 12 Monate.
          </p>

          <h3>§ 13 Vertragssprache</h3>
          <p>Als Vertragssprache steht ausschließlich Deutsch zur Verfügung.</p>

          <h3>§ 14 Schlussbestimmungen, Streitbeilegung</h3>
          <p>
            Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des
            UN-Kaufrechts. Bei Verbrauchern gilt diese Rechtswahl nur insoweit, als
            nicht der durch zwingende Bestimmungen des Rechts des Staates des
            gewöhnlichen Aufenthalts des Verbrauchers gewährte Schutz entzogen wird.
            Ist der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder
            öffentlich-rechtliches Sondervermögen, ist Gerichtsstand der Sitz der
            nios digital UG in Hamburg.
          </p>
          <p>
            Die Europäische Kommission stellt eine Plattform zur
            Online-Streitbeilegung (OS) bereit:{" "}
            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
              ec.europa.eu/consumers/odr
            </a>
            . Zur Teilnahme an einem Streitbeilegungsverfahren vor einer
            Verbraucherschlichtungsstelle sind wir nicht verpflichtet und nicht
            bereit.
          </p>

          <h2>Widerrufsbelehrung</h2>

          <h3>Widerrufsrecht</h3>
          <p>
            Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen
            Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn Tage ab dem
            Tag des Vertragsschlusses.
          </p>
          <p>
            Um Ihr Widerrufsrecht auszuüben, müssen Sie uns
          </p>
          <p>
            nios digital UG (haftungsbeschränkt)
            <br />
            Haderslebener Str. 2, 22049 Hamburg
            <br />
            E-Mail: <a href="mailto:info@nios.digital">info@nios.digital</a>
          </p>
          <p>
            mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter
            Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu
            widerrufen, informieren. Sie können dafür das nachstehende
            Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
            Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung
            über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist
            absenden.
          </p>

          <h3>Folgen des Widerrufs</h3>
          <p>
            Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die
            wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit
            Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine
            andere Art der Lieferung als die von uns angebotene, günstigste
            Standardlieferung gewählt haben), unverzüglich und spätestens binnen
            vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über
            Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese
            Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der
            ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde
            ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen
            dieser Rückzahlung Entgelte berechnet.
          </p>

          <h3>Ausschluss des Widerrufsrechts</h3>
          <p>
            Das Widerrufsrecht besteht nicht bei Verträgen zur Erbringung von
            Dienstleistungen im Zusammenhang mit Freizeitbetätigungen, wenn der
            Vertrag für die Erbringung einen spezifischen Termin oder Zeitraum
            vorsieht (§ 312g Abs. 2 Nr. 9 BGB). Der Erwerb von Tickets für
            terminierte Veranstaltungen ist daher von einem Widerruf ausgeschlossen.
          </p>

          <h3>Muster-Widerrufsformular</h3>
          <p>
            (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses
            Formular aus und senden Sie es zurück.)
          </p>
          <p>
            — An nios digital UG (haftungsbeschränkt), Haderslebener Str. 2, 22049
            Hamburg, E-Mail: info@nios.digital:
            <br />
            — Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen
            Vertrag über den Kauf der folgenden Tickets / die Erbringung der
            folgenden Dienstleistung (*)
            <br />
            — Bestellt am (*) / erhalten am (*)
            <br />
            — Name des/der Verbraucher(s)
            <br />
            — Anschrift des/der Verbraucher(s)
            <br />
            — Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)
            <br />
            — Datum
            <br />
            (*) Unzutreffendes streichen.
          </p>
        </div>
      </Container>
    </div>
  );
}
