// app/api/admin/team/route.ts
import { prisma } from "@/db/client";
import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth/requireAdmin";

export async function GET() {
  try {
    await requireAdmin();

    const members = await prisma.teamMember.findMany({
      orderBy: [{ department: "asc" }, { orderIndex: "asc" }],
    });

    return NextResponse.json(members);
  } catch (err) {
    console.error("Team fetch error:", err);
    return NextResponse.json(
      { error: "Failed to fetch team members" },
      { status: 500 }
    );
  }
}
