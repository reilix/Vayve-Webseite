import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-dark flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="text-8xl md:text-9xl font-heading font-bold text-primary">
          404
        </h1>
        <p className="mt-4 text-xl text-white/60 font-heading">
          Seite nicht gefunden
        </p>
        <Link
          href="/de"
          className="inline-block mt-8 px-6 py-3 bg-primary text-white rounded-[12px] font-heading font-semibold hover:bg-primary-dark transition-colors"
        >
          Zurück zur Startseite
        </Link>
      </div>
    </div>
  );
}
