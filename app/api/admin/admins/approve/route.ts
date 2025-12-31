// veritas-website\app\api\admin\admins\approve\route.ts

// import { prisma } from "@/db/client";
// import { NextResponse } from "next/server";
// import { requireSuperAdmin } from "@/lib/auth/requireSuperAdmin";

// export async function POST(req: Request) {
//   const { error } = await requireSuperAdmin();
//   if (error) return error;

//   const { adminId } = await req.json();

//   await prisma.adminUser.update({
//     where: { id: adminId },
//     data: { isApproved: true },
//   });

//   return NextResponse.json({ success: true });
// }


// veritas-website\app\api\admin\admins\approve\route.ts
import { prisma } from "@/db/client";
import { NextResponse } from "next/server";
import { requireSuperAdmin } from "@/lib/auth/requireSuperAdmin";
import { AdminRole } from "@prisma/client";

export async function POST(req: Request) {
  // STEP 1: Check if current user is allowed to manage admins
  const { admin: currentAdmin, error } = await requireSuperAdmin();
  if (error) return error;

  const { adminId, role } = await req.json();

  if (!adminId) {
    return NextResponse.json(
      { error: "Admin ID required" },
      { status: 400 }
    );
  }

  // Validate role if provided
  if (role && !Object.values(AdminRole).includes(role)) {
    return NextResponse.json(
      { error: "Invalid role" },
      { status: 400 }
    );
  }

  // STEP 2: Load the target admin
  const targetAdmin = await prisma.adminUser.findUnique({
    where: { id: adminId },
  });
  
  if (!targetAdmin) {
    return NextResponse.json({ error: "Admin not found" }, { status: 404 });
  }

  // STEP 3: Check dangerous actions
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

  const finalRole = role || targetAdmin.role;

  // if (finalRole === AdminRole.SUPER_ADMIN && !currentAdmin.isFounder) {
  //     return NextResponse.json(
  //     { error: "Only founder can approve as super admin" },
  //     { status: 403 }
  //   );
  // }

  //  Allow both Founder AND Super Admin to approve as Super Admin
  const canApproveSuperAdmin = 
    currentAdmin.isFounder === true || 
    currentAdmin.role === AdminRole.SUPER_ADMIN;

  if (finalRole === AdminRole.SUPER_ADMIN && !canApproveSuperAdmin) {
    return NextResponse.json(
      { error: "Only founder or super admin can approve as super admin" },
      { status: 403 }
    );
  }

  // Approve and optionally update role
  await prisma.adminUser.update({
    where: { id: adminId },
    data: {
      isApproved: true,
      ...(role && { role }),
    },
  });

  return NextResponse.json({ success: true });
}
