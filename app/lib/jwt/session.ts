import "server-only";
import { jwtVerify, SignJWT } from "jose";
import { SessionPayload } from "../types/session-payload";
import { cookies } from "next/headers";

const secretKey = process.env.SECRET;

if (!secretKey) {
  throw new Error("SECRET environment variable is not set");
}

const encodedKey = new TextEncoder().encode(secretKey);

export async function createSession(userId: number) {
  const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days from now
  const time = Math.floor(expiresAt.getTime() / 1000); // Convert to seconds for JWT
  
  const payload: SessionPayload = {
    userId,
    exp: time,
  };
  
  const session = await encrypt(payload);
  const cookieStore = await cookies();
  
  cookieStore.set("session", session, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    sameSite: "lax",
    path: "/",
  });
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256", typ: "JWT" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(encodedKey);
}

export async function decrypt(session: string | undefined = "") {
  if (!session) {
    return null;
  }
  
  try {
    const { payload } = await jwtVerify(session, encodedKey, {
      algorithms: ["HS256"],
    });
    return payload as SessionPayload;
  } catch (error) {
    console.log("JWT Error:", error);
    return null;
  }
}

export async function killSession() {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export async function getSession(): Promise<SessionPayload | null> {
  const cookieStore = await cookies();
  const sessionCookie = cookieStore.get("session");
  
  if (!sessionCookie?.value) {
    return null;
  }
  
  return await decrypt(sessionCookie.value);
}
