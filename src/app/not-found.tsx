import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#150a28] flex items-center justify-center px-4 grain">
      <div className="relative z-10 text-center">
        <h1 className="font-display text-8xl md:text-9xl font-extrabold text-gradient">
          404
        </h1>
        <p className="mt-4 font-display text-xl text-cream/60">
          Seite nicht gefunden
        </p>
        <Link
          href="/"
          className="mt-8 inline-block rounded-full bg-primary px-6 py-3 font-display font-bold text-white hover:shadow-[var(--shadow-glow-pink)] transition-all"
        >
          Zur Startseite
        </Link>
      </div>
    </div>
  );
}
