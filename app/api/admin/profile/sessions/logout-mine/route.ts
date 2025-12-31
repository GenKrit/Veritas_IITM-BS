import { NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { cookies } from "next/headers";
import { getCurrentAdmin } from "@/lib/auth/admin";

const SESSION_COOKIE = "veritas_admin_session";

// NOTICE: No 'default' keyword here. It must be 'export async function POST'
export async function POST() {
  try {
    const admin = await getCurrentAdmin();
    
    if (!admin) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Delete all sessions belonging to this user
    await prisma.adminSession.deleteMany({
      where: { adminId: admin.id },
    });

    // Clear the cookie
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Logout-mine error:", error);
    return NextResponse.json({ error: "Internal Error" }, { status: 500 });
  }
}