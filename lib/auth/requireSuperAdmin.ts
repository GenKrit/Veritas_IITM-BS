// veritas-website\lib\auth\requireSuperAdmin.ts

import { getCurrentAdmin } from "@/lib/auth/admin";
import { canViewAdmins } from "@/lib/auth/permissions";
import { NextResponse } from "next/server";

export async function requireSuperAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin || !canViewAdmins(admin)) {
    return {
      error: NextResponse.json(
        { error: "Unauthorized" },
        { status: 403 }
      ),
    };
  }

  return { admin };
}
