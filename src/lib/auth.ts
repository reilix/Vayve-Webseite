import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import { SESSION_COOKIE, signSession, verifyToken } from "./session";

export { SESSION_COOKIE };

/** Prüft das Passwort gegen ADMIN_PASSWORD_HASH (bcrypt). */
export async function verifyPassword(password: string): Promise<boolean> {
  const hash = process.env.ADMIN_PASSWORD_HASH;
  if (!hash) return false;
  try {
    return await bcrypt.compare(password, hash);
  } catch {
    return false;
  }
}

/** Setzt das Session-Cookie (nach erfolgreichem Login). */
export async function createSession(): Promise<void> {
  const token = await signSession();
  const c = await cookies();
  c.set(SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}

/** Löscht das Session-Cookie (Logout). */
export async function destroySession(): Promise<void> {
  const c = await cookies();
  c.delete(SESSION_COOKIE);
}

/** True, wenn ein gültiges Admin-Cookie vorliegt (Server Components / Actions). */
export async function isAuthenticated(): Promise<boolean> {
  const c = await cookies();
  return verifyToken(c.get(SESSION_COOKIE)?.value);
}
