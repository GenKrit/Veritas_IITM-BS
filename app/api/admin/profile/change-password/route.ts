// app/api/admin/profile/change-password/route.ts
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import { prisma } from "@/db/client";
import { cookies } from "next/headers";
import { getCurrentAdmin } from "@/lib/auth/admin";

const SESSION_COOKIE = "veritas_admin_session";

export async function PATCH(req: Request) {
  const admin = await getCurrentAdmin();
  if (!admin) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { oldPassword, newPassword } = await req.json();

  // Validation
  if (!oldPassword || !newPassword) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  if (newPassword.length < 8) {
    return NextResponse.json(
      { error: "New password must be at least 8 characters" },
      { status: 400 }
    );
  }

  try {
    // Verify old password
    if (!admin.passwordHash) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const isValidPassword = await bcrypt.compare(oldPassword, admin.passwordHash);
    
    if (!isValidPassword) {
      return NextResponse.json(
        { error: "Current password is incorrect" },
        { status: 403 }
      );
    }

    // Hash new password
    const newPasswordHash = await bcrypt.hash(newPassword, 12);

    // Update password AND delete ALL sessions in a transaction
    await prisma.$transaction([
      // Update password
      prisma.adminUser.update({
        where: { id: admin.id },
        data: { passwordHash: newPasswordHash },
      }),
      // Delete ALL sessions for this admin
      prisma.adminSession.deleteMany({
        where: { adminId: admin.id },
      }),
    ]);

    // Clear the cookie
    const cookieStore = await cookies();
    cookieStore.delete(SESSION_COOKIE);
    
    
    return NextResponse.json({ 
      success: true, 
      message: "Password changed successfully. All sessions have been logged out.",
    });
  } catch (error) {
    console.error("Error changing password:", error);
    return NextResponse.json(
      { error: "Failed to change password" },
      { status: 500 }
    );
  }
}
