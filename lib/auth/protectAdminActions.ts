// lib/auth/protectAdminActions.ts

import { NextResponse } from "next/server";
import { AdminUser, AdminRole } from "@prisma/client";

export function checkAdminModificationRules(
  currentAdmin: AdminUser,
  targetAdmin: AdminUser
) {
  if (!currentAdmin) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  if (targetAdmin.id === currentAdmin.id) {
    return NextResponse.json(
      { error: "You cannot modify your own account" },
      { status: 403 }
    );
  }

  if (targetAdmin.isFounder) {
    return NextResponse.json(
      { error: "Founder account cannot be modified" },
      { status: 403 }
    );
  }

  if (
    targetAdmin.role === AdminRole.SUPER_ADMIN &&
    !currentAdmin.isFounder
  ) {
    return NextResponse.json(
      { error: "Only founder can modify super admins" },
      { status: 403 }
    );
  }

  return null; // all good
}
