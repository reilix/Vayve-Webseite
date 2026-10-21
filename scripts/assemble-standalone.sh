#!/usr/bin/env bash
# Baut aus dem Next-Build (output: "standalone") ein lauffähiges Paket, das
# ohne npm install und ohne Build-Schritt mit `node server.js` startet.
# Genutzt von .github/workflows/siteground-deploy.yml — SiteGrounds
# Build-Umgebung kann Next 16 nicht selbst bauen (siehe docs/deploy-siteground.md).
set -euo pipefail

OUT="${1:?Zielverzeichnis angeben}"
rm -rf "$OUT"
cp -a .next/standalone "$OUT"
# Statische Dateien legt Next bewusst nicht ins Standalone-Paket.
mkdir -p "$OUT/.next"
cp -a .next/static "$OUT/.next/static"
cp -a public "$OUT/public"
# Beim Build angelegte Datenbank gehört nicht ins Paket — sie entsteht beim
# ersten Start in DATA_DIR.
rm -rf "$OUT/data"

# Eigene package.json: keine Abhängigkeiten (alles liegt schon in
# node_modules), kein Build. SiteGround führt nur noch `npm start` aus.
# HOSTNAME=0.0.0.0 ist Pflicht: Steht dort eine feste Adresse, die nicht zur
# angefragten Domain passt, behandelt der Standalone-Server die Sprach-Rewrites
# von next-intl als externe Weiterleitung, und `/` leitet endlos auf `/` um.
cat > "$OUT/package.json" <<'JSON'
{
  "name": "vayve-webseite",
  "private": true,
  "scripts": {
    "build": "echo 'vorgebaut von GitHub Actions'",
    "start": "HOSTNAME=0.0.0.0 node server.js"
  },
  "engines": { "node": ">=22.13" }
}
JSON
rm -f "$OUT/package-lock.json"
