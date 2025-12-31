// app/api/admin/profile/sessions/logout-mine/route.ts

import { NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { cookies } from "next/headers";
import { getCurrentAdmin } from "@/lib/auth/admin";

const SESSION_COOKIE = "veritas_admin_session";

export async function POST() {
  try {
    const admin = await getCurrentAdmin();
    
    if (!admin) {
      console.log("❌ Logout-mine failed: No admin found from session");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log(`👤 Logging out all sessions for admin: ${admin.id}`);

    // Delete all sessions belonging to this user
    await prisma.adminSession.deleteMany({
      where: { adminId: admin.id },
    });

    // Clear the cookie on the current browser immediately
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);

    console.log("✅ Logout successful");
    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("❌ Logout-mine error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" }, 
      { status: 500 }
    );
  }
}