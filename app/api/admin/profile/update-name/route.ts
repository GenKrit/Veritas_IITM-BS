// app/api/admin/profile/update-name/route.ts
import { getCurrentAdmin } from "@/lib/auth/admin";
import { prisma } from "@/db/client";
import { NextResponse } from "next/server";

export async function PATCH(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { name } = await req.json();

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    return NextResponse.json({ error: "Invalid name" }, { status: 400 });
  }

  try {
    await prisma.adminUser.update({
      where: { id: admin.id },
      data: { name: name.trim() },
    });

    return NextResponse.json({ success: true, message: "Name updated" });
  } catch (error) {
    console.error("Error updating name:", error);
    return NextResponse.json({ error: "Failed to update name" }, { status: 500 });
  }
}
