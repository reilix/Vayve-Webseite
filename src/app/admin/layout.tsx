import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "VAYVE Admin",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#100722] text-cream">{children}</div>
  );
}
