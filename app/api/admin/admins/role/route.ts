// veritas-website\app\api\admin\admins\role\route.ts

// import { prisma } from "@/db/client";
// import { NextResponse } from "next/server";
// import { requireSuperAdmin } from "@/lib/auth/requireSuperAdmin";
// import { AdminRole } from "@prisma/client";

// export async function PATCH(req: Request) {
//   // STEP 1: Check if current user is allowed to manage admins
//   const { admin: currentAdmin, error } = await requireSuperAdmin();
//   if (error) return error;

//   const { adminId, role } = await req.json();

//   if (!Object.values(AdminRole).includes(role)) {
//     return NextResponse.json(
//       { error: "Invalid role" },
//       { status: 400 }
//     );
//   }

//   // STEP 2: Load the target admin
//   const targetAdmin = await prisma.adminUser.findUnique({
//     where: { id: adminId },
//   });
  
//   if (!targetAdmin) {
//     return NextResponse.json({ error: "Admin not found" }, { status: 404 });
//   }

//   // STEP 3: Check dangerous actions
//   if (targetAdmin.id === currentAdmin.id) {
//     return NextResponse.json(
//       { error: "You cannot modify your own account" },
//       { status: 403 }
//     );
//   }

//   if (targetAdmin.isFounder) {
//     return NextResponse.json(
//       { error: "Founder account cannot be modified" },
//       { status: 403 }
//     );
//   }

//   if (
//     targetAdmin.role === AdminRole.SUPER_ADMIN &&
//     !currentAdmin.isFounder
//   ) {
//     return NextResponse.json(
//       { error: "Only founder can modify super admins" },
//       { status: 403 }
//     );
//   }

//   // All checks passed, perform the action
//   await prisma.adminUser.update({
//     where: { id: adminId },
//     data: { role },
//   });

//   return NextResponse.json({ success: true });
// }


// upper code blocks super admin from editing other super admin
// app/api/admin/admins/role/route.ts
import { prisma } from "@/db/client";
import { NextResponse } from "next/server";
import { requireSuperAdmin } from "@/lib/auth/requireSuperAdmin";
import { AdminRole } from "@prisma/client";

export async function PATCH(req: Request) {
  // STEP 1: Check if current user is allowed to manage admins
  const { admin: currentAdmin, error } = await requireSuperAdmin();
  if (error) return error;

  const { adminId, role } = await req.json();

  if (!Object.values(AdminRole).includes(role)) {
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

  // Super admins can modify other super admins, but not founders
  // upper code blocks super admin from editing other super admin

  // All checks passed, perform the action
  await prisma.adminUser.update({
    where: { id: adminId },
    data: { role },
  });

  return NextResponse.json({ success: true });
}
