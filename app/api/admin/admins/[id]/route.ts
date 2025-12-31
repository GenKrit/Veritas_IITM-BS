// veritas-website\app\api\admin\admins\[id]\route.ts
// method to remove admin by id

import { prisma } from "@/db/client";
import { NextResponse } from "next/server";
import { requireSuperAdmin } from "@/lib/auth/requireSuperAdmin";

export async function DELETE(
  _req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { admin: currentAdmin, error } = await requireSuperAdmin();
  if (error) return error;

  const { id } = await params;

  const targetAdmin = await prisma.adminUser.findUnique({
    where: { id },
  });
  
  if (!targetAdmin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  // Protection checks
  if (targetAdmin.id === currentAdmin.id) {
    return NextResponse.json(
      { error: "You cannot delete your own account" },
      { status: 403 }
    );
  }

  if (targetAdmin.isFounder) {
    return NextResponse.json(
      { error: "Founder account cannot be deleted" },
      { status: 403 }
    );
  }

  await prisma.adminUser.delete({ where: { id } });

  return NextResponse.json({ success: true });
}
