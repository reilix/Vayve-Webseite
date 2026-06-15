import Link from "next/link";
import { logoutAction } from "@/app/admin/actions";

export default function AdminHeader() {
  return (
    <header className="border-b border-white/10 bg-[#160c2c]/80 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <Link href="/admin" className="font-display text-xl font-extrabold tracking-tight text-cream">
          VAYVE <span className="text-primary">Admin</span>
        </Link>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-sm text-muted hover:text-cream transition-colors">
            Zur Website
          </Link>
          <form action={logoutAction}>
            <button className="rounded-full border border-white/15 px-4 py-1.5 text-sm text-cream hover:bg-white/5 transition-colors cursor-pointer">
              Logout
            </button>
          </form>
        </div>
      </div>
    </header>
  );
}
