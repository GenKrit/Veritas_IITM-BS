// veritas-website\app\api\admin\auth\login\route.ts

export const runtime = "nodejs";

import { NextResponse } from "next/server";
import { getAdminByEmail } from "@/lib/auth/admin";
import { verifyPassword } from "@/lib/auth/password";
import { createAdminSession } from "@/lib/auth/session";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and Password required" },
        { status: 400 }
      );
    }

    const admin = await getAdminByEmail(email);

    if (!admin) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!admin.isApproved) {
      return NextResponse.json(
        { error: "Admin approved pending" },
        { status: 403 }
      );
    }
        // Password check for hash
    if (!admin.passwordHash) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const passwordValid = await verifyPassword(
      password,
      admin.passwordHash
    );

    if (!passwordValid) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    await createAdminSession(admin.id);

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Admin login error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
