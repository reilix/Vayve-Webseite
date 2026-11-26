// Startpunkt des SiteGround-Pakets (statt direkt server.js).
//
// Problem (SiteGround-Ticket 5178240): Nach einem Deploy lief die alte
// Instanz tagelang weiter, hielt den Socket fest und lieferte alten Code.
// Jeder neue Start scheiterte und wurde sofort wiederholt, was Tausende
// CPU-Sekunden gekostet hat.
//
// Der Wächter prüft alle 30 Sekunden, ob diese Instanz noch aktuell ist, und
// beendet sie sauber (SIGTERM → Next schließt den Server), wenn
//   1. die eigenen Build-Dateien verschwunden sind, oder
//   2. SiteGrounds "latest"-Deploy einen anderen Build enthält.
// Den nächsten Request beantwortet dann eine frische Instanz aus "latest".
// Bewusst vorsichtig: Ist etwas nicht eindeutig lesbar, passiert nichts.
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dir = path.dirname(fileURLToPath(import.meta.url));
const read = (p) => {
  try {
    return fs.readFileSync(p, "utf8").trim();
  } catch {
    return null;
  }
};

const ownBuild = read(path.join(dir, ".next", "BUILD_ID"));

// SiteGround: …/.nodeapp/<deploy-id>/app_source, daneben …/.nodeapp/latest
const nodeapp = path.basename(dir) === "app_source" ? path.resolve(dir, "..", "..") : null;
const latestCandidates = nodeapp
  ? [
      path.join(nodeapp, "latest", "app_source", ".next", "BUILD_ID"),
      path.join(nodeapp, "latest", ".next", "BUILD_ID"),
    ]
  : [];

function isStale() {
  if (!ownBuild) return false;
  if (!fs.existsSync(path.join(dir, ".next", "BUILD_ID"))) return "eigene Build-Dateien fehlen";
  for (const candidate of latestCandidates) {
    const latest = read(candidate);
    if (latest) return latest !== ownBuild ? `neuer Build in latest (${latest})` : false;
  }
  return false;
}

let stopping = false;
setInterval(() => {
  if (stopping) return;
  const reason = isStale();
  if (!reason) return;
  stopping = true;
  console.log(`[vayve] Instanz ${ownBuild} veraltet: ${reason}. Beende sauber.`);
  process.kill(process.pid, "SIGTERM");
  // Falls sich der Server nicht beendet (offene Keep-Alive-Verbindungen):
  setTimeout(() => process.exit(0), 10_000).unref();
}, 30_000).unref();

await import("./server.js");
