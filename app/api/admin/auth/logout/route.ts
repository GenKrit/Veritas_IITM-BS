// veritas-website\app\api\admin\auth\logout\route.ts

import { NextResponse } from "next/server";
import { destroyAdminSession } from "@/lib/auth/session";
// import { cookies } from "next/headers";
// import { prisma } from "@/db/client";

// const SESSION_COOKIE = "veritas_admin_session";

export async function POST() {

  await destroyAdminSession(); // deletes the cookie and session inside!


  // session and cookie deltion managed via session
  // const cookieStore = await cookies();
  // const sessionId = cookieStore.get(SESSION_COOKIE)?.value;

  // if (sessionId) {
  //   // Delete ONLY the current session
  //   await prisma.adminSession.deleteMany({
  //     where: { id: sessionId },
  //   });
  // }

  // // Clear cookie
  // cookieStore.set(SESSION_COOKIE, "", {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === "production",
  //   sameSite: "strict",
  //   path: "/",
  //   maxAge: 0,
  // });

  return NextResponse.json({ success: true });
}
