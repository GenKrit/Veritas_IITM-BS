import { NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { getCurrentAdmin } from "@/lib/auth/admin";
import { isSuperAdmin } from "@/lib/auth/permissions";

export async function GET() {
  try {
    const admin = await getCurrentAdmin();
    if (!admin) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // 1. Get count of MY active sessions
    const mySessionsCount = await prisma.adminSession.count({
      where: { 
        adminId: admin.id,
        expiresAt: { gt: new Date() } 
      },
    });

    let totalSessionsCount = 0;
    let activeUsersList: { name: string; email: string }[] = [];

    // 2. If Super Admin, get Total Count AND List of Users
    if (isSuperAdmin(admin)) {
      totalSessionsCount = await prisma.adminSession.count({
        where: { expiresAt: { gt: new Date() } }
      });

      // Find users who have at least one active session
      const usersWithSessions = await prisma.adminUser.findMany({
        where: {
          sessions: {
            some: {
              expiresAt: { gt: new Date() }
            }
          }
        },
        select: {
          name: true,
          email: true
        }
      });
      
      activeUsersList = usersWithSessions;
    }

    return NextResponse.json({ 
      mySessions: mySessionsCount, 
      totalSessions: totalSessionsCount,
      activeUsers: activeUsersList
    });

  } catch (error) {
    console.error("Stats error:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}