// veritas-website\app\api\admin\vsd\route.ts

import { prisma } from "@/db/client";
import { getCurrentAdmin } from "@/lib/auth/admin";
import { canAccessVSD } from "@/lib/auth/permissions";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin || !canAccessVSD(admin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const data = await req.json();

  await prisma.veritasDigest.create({ data });
  return NextResponse.json({ success: true });
}
