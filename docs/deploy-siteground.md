# Deployment auf SiteGround

## Warum nicht auf SiteGround gebaut wird

SiteGrounds Build-Umgebung ist stark abgeschottet (kein `/proc`, keine lokalen
Ports). Die nativen Werkzeuge von Next.js 16 scheitern daran nacheinander:

1. SWC beim Laden der Konfiguration (`stacker … panicked`)
2. `@swc/core` aus `next-intl/plugin` (`read Linux mount table`)
3. Turbopack beim CSS (PostCSS-Hilfsprozess: `binding to a port – Operation not permitted`)

Deshalb baut eine GitHub Action (`.github/workflows/siteground-deploy.yml`) bei
jedem Push auf `main` und legt das fertige Paket auf den Branch
**`siteground-deploy`**. SiteGround startet davon nur noch den Server.

## Einstellungen im Node.js-Projekt bei SiteGround

| Feld | Wert |
|---|---|
| Repository / Branch | `reilix/Vayve-Webseite`, Branch **`siteground-deploy`** |
| Node-Version | 22 |
| Install-Befehl | `npm install` (das Paket hat keine Abhängigkeiten — läuft in Sekunden) |
| Build-Befehl | `npm run build` (gibt nur einen Hinweis aus) |
| Start-Befehl | `npm start` |
| Ausgabeverzeichnis | leer lassen / Projektwurzel |

### Umgebungsvariablen

| Variable | Wert |
|---|---|
| `SESSION_SECRET` | wie bisher (im Passwort-Manager sichern) |
| `ADMIN_PASSWORD_HASH` | wie bisher (im Passwort-Manager sichern) |
| `DATA_DIR` | **absoluter Pfad außerhalb des App-Ordners**, z. B. `/home/customer/www/<deine-site>/vayve-data` |

`DATA_DIR` ist der wichtigste Punkt: SiteGround legt jeden Deploy in einen
neuen Ordner (`public_html/.nodeapp/<id>/app_source`). Ohne `DATA_DIR` lägen
Datenbank und Flyer darin und wären nach dem nächsten Deploy weg. Der Ordner
sollte **nicht** unter `public_html` liegen, sonst ist die Datenbank aus dem
Netz abrufbar.

**Vor dem Umzug der Domain prüfen:** Test-Event anlegen, neu deployen, Event
muss noch da sein.

## Ablauf eines Deploys

1. Änderung auf `main` mergen.
2. Action „SiteGround-Paket bauen“ läuft (GitHub → Actions), ca. 2–3 Minuten.
3. Bei SiteGround neu deployen (oder automatisch, falls der Branch-Webhook aktiv ist).
