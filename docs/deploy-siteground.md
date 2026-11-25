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

## Hohe CPU-Sekunden im Site-Tools-Diagramm

Die App selbst braucht im Leerlauf keine CPU und pro Seitenaufruf nur wenige
Millisekunden (gemessen mit dem fertigen Paket). Die Seiten mit Event-Inhalten
werden einmal gerendert und dann bis zu 5 Minuten aus dem Cache ausgeliefert;
weil die Seite keine Cookies mehr setzt, kann auch der Proxy-Cache von
SiteGround sie direkt beantworten. Zeigt das Diagramm trotzdem Tausende
CPU-Sekunden pro Stunde, liegt es fast immer an Prozessen, die auf dem Server
hängen geblieben sind.

Per SSH prüfen (Site Tools → Devs → SSH-Schlüssel):

```bash
ps -u "$(whoami)" -o pid,ppid,etime,pcpu,rss,args --sort=-pcpu | head -30
```

Worauf achten:

- Mehr als **ein** `next-server`- bzw. `node server.js`-Prozess: alte Instanzen
  früherer Deploys. Mit `kill <pid>` beenden, danach die App in Site Tools
  neu starten.
- Prozesse von `next build`, `turbopack`, `postcss` oder `npm` mit langer
  Laufzeit (`etime` in Tagen): Reste der abgebrochenen Builds direkt auf
  SiteGround. Beenden.
- Ein einzelner `next-server` mit dauerhaft hohem `pcpu`: Access-Log auf
  Bot-Fluten prüfen (Site Tools → Statistiken → Access-Log).

Nach Admin-Änderungen zeigt der Proxy-Cache die alte Seite bis zu 5 Minuten.
Sofort sichtbar wird sie über Site Tools → Speed → Caching → Dynamic Cache →
Cache leeren.
