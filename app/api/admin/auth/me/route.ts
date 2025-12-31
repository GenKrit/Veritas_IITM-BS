// veritas-website\app\api\admin\auth\me\route.ts
export const runtime = "nodejs";  // Ensure this runs in Node.js environment

import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { prisma } from "@/db/client";

const SESSION_COOKIE = "veritas_admin_session";

export async function POST(req: Request) {
  const cookieStore = await cookies();
  const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  /* -------------------------------------------------
   * 1. Cleanup expired sessions (global hygiene)
   * ------------------------------------------------- */
  await prisma.adminSession.deleteMany({
    where: {
      expiresAt: { lt: new Date() },
    },
  });

  /* -------------------------------------------------
   * 2. Logout logic
   * ------------------------------------------------- */
  if (sessionId) {
    // Check if logout-all is requested
    const url = new URL(req.url);
    const logoutAll = url.searchParams.get("all") === "true";

    if (logoutAll) {
      // Logout from all devices (same admin)
      const session = await prisma.adminSession.findUnique({
        where: { id: sessionId },
        select: { adminId: true },
      });

      if (session) {
        await prisma.adminSession.deleteMany({
          where: { adminId: session.adminId },
        });
      }
    } else {
      // Normal logout: only this session
      await prisma.adminSession.deleteMany({
        where: { id: sessionId },
      });
    }
  }

  /* -------------------------------------------------
   * 3. Clear cookie (always)
   * ------------------------------------------------- */
  cookieStore.set(SESSION_COOKIE, "", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: 0,
  });

  return NextResponse.json({ success: true });
}
