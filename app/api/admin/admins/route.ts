// veritas-website\app\api\admin\admins\route.ts

import { prisma } from "@/db/client";
import { NextResponse } from "next/server";
import { requireSuperAdmin } from "@/lib/auth/requireSuperAdmin";

export async function GET() {
  const { error } = await requireSuperAdmin();
  if (error) return error;

  const admins = await prisma.adminUser.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      isApproved: true,
      isFounder: true,
      createdAt: true,
    },
  });

  return NextResponse.json(admins);
}
