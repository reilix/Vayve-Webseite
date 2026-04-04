# Vayve Brand Guidelines v1.0

> Last updated: 2026-04-04
> Status: Draft

## Quick Reference

| Element | Value |
|---------|-------|
| Primary Color | #7C3AED (Electric Violet) |
| Secondary Color | #FF6B35 (Coral Orange) |
| Accent Color | #06B6D4 (Electric Cyan) |
| Primary Font | Space Grotesk |
| Body Font | Inter |
| Voice | Mutig, Energetisch, Direkt |

---

## 1. Color Palette

### Primary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Electric Violet | #7C3AED | rgb(124,58,237) | CTAs, Headlines, Markenelemente |
| Violet Dark | #6D28D9 | rgb(109,40,217) | Hover-States, Betonung |
| Violet Light | #A78BFA | rgb(167,139,250) | Hintergrundelemente, dezente Akzente |

### Secondary Colors

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Coral Orange | #FF6B35 | rgb(255,107,53) | Akzente, CTAs sekundaer, Highlights |
| Coral Dark | #EA580C | rgb(234,88,12) | Hover-States |
| Electric Cyan | #06B6D4 | rgb(6,182,212) | Info-Elemente, Links, Icons |

### Neutral Palette

| Name | Hex | RGB | Usage |
|------|-----|-----|-------|
| Background | #FAFAFA | rgb(250,250,250) | Seitenhintergrund |
| Surface | #FFFFFF | rgb(255,255,255) | Karten, Sektionen |
| Dark Background | #0F0A1A | rgb(15,10,26) | Dunkle Sektionen, Footer |
| Text Primary | #0F0A1A | rgb(15,10,26) | Ueberschriften, Fliesstext |
| Text Secondary | #6B7280 | rgb(107,114,128) | Untertitel, dezenter Text |
| Border | #E5E7EB | rgb(229,231,235) | Trennlinien, Rahmen |

### Semantic Colors

| State | Hex | Usage |
|-------|-----|-------|
| Success | #22C55E | Bestaetigungen, Erfolg |
| Warning | #F59E0B | Hinweise, ausstehende Aktionen |
| Error | #EF4444 | Fehler, destruktive Aktionen |
| Info | #06B6D4 | Informationsmeldungen |

### Accessibility

- Text auf hellem Hintergrund: 15.2:1 Kontrastratio (AAA)
- Primary auf weiss: 5.4:1 Kontrastratio (AA)
- Alle interaktiven Elemente erfuellen WCAG 2.1 AA Standards

---

## 2. Typography

### Font Stack

```css
--font-heading: 'Space Grotesk', system-ui, -apple-system, sans-serif;
--font-body: 'Inter', system-ui, -apple-system, sans-serif;
--font-mono: 'JetBrains Mono', 'Fira Code', monospace;
```

### Type Scale

| Element | Size (Desktop) | Size (Mobile) | Weight | Line Height |
|---------|----------------|---------------|--------|-------------|
| H1 | 56px | 36px | 700 | 1.1 |
| H2 | 42px | 30px | 700 | 1.15 |
| H3 | 32px | 26px | 600 | 1.2 |
| H4 | 24px | 20px | 600 | 1.3 |
| Body | 16px | 16px | 400 | 1.6 |
| Body Large | 20px | 18px | 400 | 1.6 |
| Small | 14px | 14px | 400 | 1.5 |
| Caption | 12px | 12px | 500 | 1.4 |

### Font Loading

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
```

### Typografie-Richtlinien

- Ueberschriften nutzen Space Grotesk fuer einen modernen, geometrischen Look
- Fliesstext nutzt Inter fuer optimale Lesbarkeit
- Grossbuchstaben sparsam einsetzen, nur fuer Labels und CTAs
- Maximale Zeilenlaenge: 65-75 Zeichen fuer Fliesstext

---

## 3. Logo Usage

### Variants

| Variant | File | Use Case |
|---------|------|----------|
| Full Horizontal | logo-full-horizontal.svg | Header, Dokumente |
| Stacked | logo-stacked.svg | Quadratische Flaechen |
| Icon Only | logo-icon.svg | Favicons, kleine Flaechen |
| Monochrome Light | logo-mono-light.svg | Auf dunklem Hintergrund |
| Monochrome Dark | logo-mono-dark.svg | Auf hellem Hintergrund |

### Clear Space

Mindestabstand = Hoehe des Logo-Icons (Bildmarke)

### Minimum Size

| Context | Minimum Width |
|---------|---------------|
| Digital - Vollstaendiges Logo | 120px |
| Digital - Icon | 32px |
| Print - Vollstaendiges Logo | 35mm |
| Print - Icon | 10mm |

### Don'ts

- Logo nicht rotieren oder verzerren
- Keine Farben ausserhalb der genehmigten Palette verwenden
- Keine Schatten oder Effekte hinzufuegen
- Proportionen nicht beschneiden oder aendern
- Nicht auf unruhigen Hintergruenden ohne ausreichenden Kontrast platzieren

---

## 4. Voice & Tone

### Markenpersoenlichkeit

| Eigenschaft | Beschreibung |
|-------------|-------------|
| **Mutig** | Selbstbewusst, entschlossen, vorwaertsgerichtet |
| **Energetisch** | Dynamisch, begeisternd, mitreissend |
| **Direkt** | Klar, praegnant, auf den Punkt |
| **Kreativ** | Inspirierend, unerwartet, ideenreich |

### Voice Chart

| Eigenschaft | Wir sind | Wir sind nicht |
|-------------|----------|----------------|
| Mutig | Selbstbewusst, entschlossen | Arrogant, ueberheblich |
| Energetisch | Begeisternd, mitreissend | Ueberdreht, aufdringlich |
| Direkt | Klar, praegnant | Barsch, unhoflich |
| Kreativ | Inspirierend, ueberraschend | Chaotisch, unstrukturiert |

### Tone by Context

| Kontext | Ton | Beispiel |
|---------|-----|---------|
| Website/Marketing | Begeisternd, einladend | "Events, die bewegen." |
| Social Media | Locker, energetisch | "Das wird episch." |
| Kundenkommunikation | Professionell, warmherzig | "Wir kuemmern uns um jedes Detail." |
| Fehlermeldungen | Ruhig, loesungsorientiert | "Etwas hat nicht geklappt. Versuche es erneut." |
| Erfolg/Bestaetigung | Kurz, feiernd | "Anfrage gesendet!" |

### Voice Spectrums

```
Formell ←―――――●―――――――→ Locker
               [leicht locker]

Einfach ←―――――――●――――→ Komplex
                [klar und einfach]

Ernst ←―――――――――●――→ Verspielt
                [energetisch mit Humor]

Zurueckhaltend ←―――――――――●→ Expressiv
                          [sehr expressiv]
```

### Verbotene Begriffe

| Vermeiden | Grund |
|-----------|-------|
| Revolutionaer | Abgenutzt |
| Einzigartig | Leere Behauptung |
| Synergie | Unternehmens-Jargon |
| Nahtlos | Abgenutzt |
| Ganzheitlich | Zu vage |
| Mehrwert | Abgenutzt |

### Bevorzugte Begriffe

| Nutzen | Statt |
|--------|-------|
| Erlebnis | Veranstaltung |
| Kreieren | Organisieren |
| Bewegen | Beeindrucken |
| Zusammen | Gemeinsam |

---

## 5. Imagery Guidelines

### Photography Style

- **Beleuchtung:** Dramatisch, kontrastreich, dynamische Lichtstimmung
- **Motive:** Echte Events, Menschen in Bewegung, emotionale Momente
- **Farbbehandlung:** Leicht erhoehte Saettigung, Markenfarben als Overlay moeglich
- **Komposition:** Dynamisch, Bewegung einfangen, nah am Geschehen

### Illustrations

- Stil: Geometrisch, bold, mit Farbverlaeufen aus der Markenpalette
- Farben: Ausschliesslich Markenpalette
- Linienstärke: 2-3px konsistenter Strich
- Ecken: 4px abgerundet

### Icons

- Stil: Gefuellt (Filled), 24px Basisraster
- Stil: Bold, geometrisch
- Stroke: 2px konsistent
- Eckenradius: 2px

---

## 6. Design Components

### Buttons

| Typ | Background | Text | Border Radius |
|-----|------------|------|---------------|
| Primary | #7C3AED | #FFFFFF | 12px |
| Secondary | #FF6B35 | #FFFFFF | 12px |
| Outline | Transparent | #7C3AED | 12px |
| Ghost | Transparent | #6B7280 | 12px |

### Spacing Scale

| Token | Value | Usage |
|-------|-------|-------|
| xs | 4px | Enger Abstand |
| sm | 8px | Kompakte Elemente |
| md | 16px | Standard-Abstand |
| lg | 24px | Sektions-Abstand |
| xl | 32px | Grosse Abstaende |
| 2xl | 48px | Sektions-Trenner |
| 3xl | 64px | Hero-Bereiche |
| 4xl | 96px | Grossflaechige Trenner |

### Border Radius

| Element | Radius |
|---------|--------|
| Buttons | 12px |
| Cards | 16px |
| Inputs | 12px |
| Modals | 20px |
| Pills/Tags | 9999px |
| Images/Thumbnails | 12px |

### Schatten & Tiefe

| Level | Wert | Usage |
|-------|------|-------|
| Subtle | 0 1px 3px rgba(15,10,26,0.08) | Karten, erhoehte Elemente |
| Medium | 0 4px 12px rgba(15,10,26,0.12) | Dropdowns, Hover-States |
| Strong | 0 8px 24px rgba(15,10,26,0.16) | Modals, Overlays |
| Glow | 0 0 24px rgba(124,58,237,0.3) | Highlight-Effekte, CTAs |

---

## AI Image Generation

### Base Prompt Template

Always prepend to image generation prompts:

```
Vibrant, energetic event photography style. Bold colors with electric violet (#7C3AED) and coral orange (#FF6B35) accents. Dynamic composition with dramatic lighting, high contrast, and sense of movement. Modern, editorial quality.
```

### Style Keywords

| Category | Keywords |
|----------|----------|
| **Lighting** | dramatic, high contrast, neon glow, stage lighting |
| **Mood** | energetic, vibrant, celebratory, electric |
| **Composition** | dynamic angles, motion blur, close-up, wide establishing |
| **Treatment** | high saturation, bold contrast, violet/orange color grading |
| **Aesthetic** | modern, bold, editorial, festival |

### Visual Mood Descriptors

- Elektrisierende Energie, die man spueren kann
- Mutige Kontraste zwischen Licht und Schatten
- Dynamische Bewegung, eingefangen im perfekten Moment

### Visual Don'ts

| Avoid | Reason |
|-------|--------|
| Stock-artige, gestellte Bilder | Wirkt unecht und langweilig |
| Uebersaettigte Neonfarben | Wirkt billig, nicht premium |
| Leere Raeume ohne Menschen | Passt nicht zur Event-Energie |
| Schwarz-weiss Fotografie | Widerspricht der energetischen Identitaet |

### Example Prompts

**Hero Banner:**
```
Vibrant event scene, crowd of people at a modern indoor venue, dramatic stage lighting with violet and orange hues, dynamic composition from elevated angle, editorial quality photography, high energy atmosphere, bokeh lights
```

**Social Media Post:**
```
Close-up of excited event attendees, warm lighting with violet ambient glow, candid authentic moment, modern event space, shallow depth of field, vibrant color grading
```

---

## 7. Markenwerte & Positionierung

### Mission

Vayve kreiert Events, die Menschen bewegen und Momente schaffen, die in Erinnerung bleiben.

### Vision

Die erste Adresse fuer unvergessliche Event-Erlebnisse.

### Markenwerte

1. **Leidenschaft** - Wir brennen fuer das, was wir tun
2. **Kreativitaet** - Jedes Event ist ein Unikat
3. **Zuverlaessigkeit** - Wir halten, was wir versprechen
4. **Energie** - Wir bringen Bewegung in jedes Projekt

### Positionierung

> Fuer Unternehmen und Privatpersonen, die Events suchen, die mehr als nur eine Veranstaltung sind. Vayve kreiert Erlebnisse mit Energie, Kreativitaet und Liebe zum Detail.

### Tagline

**"Events, die bewegen."**

---

## Changelog

| Version | Date | Changes |
|---------|------|---------|
| 1.0 | 2026-04-04 | Initiale Brand Guidelines |
