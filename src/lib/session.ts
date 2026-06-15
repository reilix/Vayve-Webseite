import { SignJWT, jwtVerify } from "jose";

/**
 * Edge-sichere JWT-Primitive (nur `jose`, kein next/headers, kein bcrypt).
 * Wird sowohl von der Middleware als auch von src/lib/auth.ts genutzt.
 */

export const SESSION_COOKIE = "vayve_session";

const SECRET = new TextEncoder().encode(
  process.env.SESSION_SECRET ?? "dev-insecure-secret-please-set-SESSION_SECRET",
);

export async function signSession(): Promise<string> {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("30d")
    .sign(SECRET);
}

export async function verifyToken(token: string | undefined): Promise<boolean> {
  if (!token) return false;
  try {
    const { payload } = await jwtVerify(token, SECRET);
    return payload.role === "admin";
  } catch {
    return false;
  }
}
