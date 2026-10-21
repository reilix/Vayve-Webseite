/**
 * Weicher Farbschein oben auf den Unterseiten.
 *
 * Ersetzt die `glow-orb`-Kreise in den Seitenköpfen: Die lagen in einer
 * Sektion mit `overflow-hidden`, ihre Unschärfe reichte über deren Rand
 * hinaus und wurde dort gerade abgeschnitten — als sichtbares Rechteck
 * hinter der Überschrift. Dieser Verlauf läuft innerhalb seiner Fläche
 * vollständig aus und beginnt am oberen Seitenrand; es gibt nichts, woran
 * er abgeschnitten werden könnte.
 *
 * Erwartet einen Eltern-Container mit `relative isolate`.
 */
type Glow = { color: string; x: string; strength?: number };

export default function PageGlow({ glows }: { glows: Glow[] }) {
  const background = glows
    .map(
      ({ color, x, strength = 30 }) =>
        `radial-gradient(ellipse 55% 75% at ${x} 0%, color-mix(in srgb, ${color} ${strength}%, transparent), transparent 70%)`,
    )
    .join(", ");

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[38rem]"
      style={{ background }}
    />
  );
}
