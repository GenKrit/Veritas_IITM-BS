// app/api/admin/vsd/[id]/route.ts
import { prisma } from "@/db/client";
import { getCurrentAdmin } from "@/lib/auth/admin";
import { canAccessVSD } from "@/lib/auth/permissions";
import { NextResponse } from "next/server";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin || !canAccessVSD(admin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params; // ⭐ AWAIT params

  try {
    await prisma.veritasDigest.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const admin = await getCurrentAdmin();
  if (!admin || !canAccessVSD(admin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const { id } = await params; // ⭐ AWAIT params
  const data = await req.json();

  try {
    await prisma.veritasDigest.update({
      where: { id },
      data: {
        title: data.title,
        description: data.description || null,
        volume: Number(data.volume),
        issue: Number(data.issue),
        month: data.month,
        link: data.link,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
