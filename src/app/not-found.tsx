import Link from "next/link";

export default function NotFound() {
  return (
    <div className="scanlines relative flex min-h-screen items-center justify-center overflow-hidden bg-background px-4">
      <div className="absolute inset-0 bg-grid" />
      <div className="relative z-10 text-center">
        <p className="label-mono text-acid">[ERR] — Signal lost</p>
        <h1 className="text-rgb animate-glitch mt-6 font-display text-[clamp(6rem,22vw,14rem)] leading-none text-cream">
          404
        </h1>
        <p className="label-mono mt-6 text-cream/60">Seite nicht gefunden / Page not found</p>
        <Link href="/" className="btn-hard btn-acid mt-10">
          ← Zur Startseite
        </Link>
      </div>
    </div>
  );
}
