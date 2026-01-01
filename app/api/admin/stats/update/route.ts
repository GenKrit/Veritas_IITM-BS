// app/api/admin/stats/update/route.ts
import { NextResponse } from "next/server";
import { prisma } from "@/db/client";
import { getCurrentAdmin } from "@/lib/auth/admin";
import { canApproveAdmins } from "@/lib/auth/permissions";
// // Revalidation path implemented to update public static event listings after admin changes to be implemented
// import { revalidatePath } from "next/cache";

export async function POST(req: Request) {
  try {
    const admin = await getCurrentAdmin();
    if (!admin || !canApproveAdmins(admin)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    const { societyMemberCount } = await req.json();

    const stats = await prisma.siteStats.upsert({
      where: { id: (await prisma.siteStats.findFirst())?.id || "new" },
      update: { societyMemberCount },
      create: { societyMemberCount },
    });

    // // REVALIDATION when needed in future
    // revalidatePath("/events"); 

    return NextResponse.json({ success: true, stats });
  } catch (error) {
    console.error("Stats update error:", error);
    return NextResponse.json({ error: "Failed to update" }, { status: 500 });
  }
}
