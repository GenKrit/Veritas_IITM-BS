// veritas-website\app\api\admin\vsd\route.ts

import { prisma } from "@/db/client";
import { getCurrentAdmin } from "@/lib/auth/admin";
import { canAccessVSD } from "@/lib/auth/permissions";
import { NextResponse } from "next/server";

// Revalidation path implemented to update public static event listings after admin changes
import { revalidatePath } from "next/cache";


export async function POST(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin || !canAccessVSD(admin)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  const data = await req.json();

  await prisma.veritasDigest.create({ data });

  // Revalidate public pages
  revalidatePath("/vsd");

  return NextResponse.json({ success: true });
}
