import createMiddleware from "next-intl/middleware";
import { NextResponse, type NextRequest } from "next/server";
import { routing } from "./src/i18n/routing";
import { SESSION_COOKIE, verifyToken } from "./src/lib/session";

const intlMiddleware = createMiddleware(routing);

export default async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // === Admin-Bereich: Auth-Gate, KEIN i18n ===
  if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
    const isApi = pathname.startsWith("/api/admin");
    const isLoginPage = pathname === "/admin/login";
    const isLoginApi = pathname === "/api/admin/login";
    const authed = await verifyToken(request.cookies.get(SESSION_COOKIE)?.value);

    if (authed) {
      if (isLoginPage) {
        return NextResponse.redirect(new URL("/admin", request.url));
      }
      return NextResponse.next();
    }

    if (isLoginPage || isLoginApi) return NextResponse.next();
    if (isApi) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // === Öffentliche Seite: next-intl ===
  return intlMiddleware(request);
}

export const config = {
  // Alles außer Next-Internals und Dateien mit Endung (z. B. /uploads/x.jpg,
  // favicon, Logos) — dadurch laufen Uploads & Assets an i18n vorbei.
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.).*)"],
};
