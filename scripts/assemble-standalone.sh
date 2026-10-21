#!/usr/bin/env bash
# Baut aus dem Next-Build (output: "standalone") ein lauffähiges Paket, das
# ohne npm install und ohne Build-Schritt mit `node server.js` startet.
# Genutzt von .github/workflows/siteground-deploy.yml — SiteGrounds
# Build-Umgebung kann Next 16 nicht selbst bauen (siehe docs/deploy-siteground.md).
set -euo pipefail

OUT="${1:?Zielverzeichnis angeben}"
rm -rf "$OUT"
mkdir -p "$OUT"
# Nur, was der Server braucht — ausdrücklich keine Kopie von .next/standalone:
# Next verfolgt hier das ganze Projekt mit (Warnung „whole project was traced
# unintentionally"), und damit lägen .git, Quellcode und ggf. .env-Dateien im
# ausgelieferten Paket. Beim Build angelegte Daten (data/) bleiben ebenfalls weg.
cp -a .next/standalone/server.js "$OUT/"
cp -a .next/standalone/node_modules "$OUT/"
cp -a .next/standalone/.next "$OUT/"
# Statische Dateien legt Next bewusst nicht ins Standalone-Paket.
cp -a .next/static "$OUT/.next/static"
cp -a public "$OUT/public"

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
