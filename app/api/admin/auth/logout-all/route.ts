// veritas-website\app\api\admin\auth\logout-all\route.ts
// UNUSED RIGHT NOW - BUT KEEP FOR FUTURE USE IF NEEDED

import { NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { cookies } from "next/headers";
import { getCurrentAdmin } from "@/lib/auth/admin";

const SESSION_COOKIE = "veritas_admin_session";

export async function POST() {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.adminSession.deleteMany({
    where: { adminId: admin.id },
  });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE, "", {
    path: "/",
    maxAge: 0,
  });

  return NextResponse.json({ success: true });
}
