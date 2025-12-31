// veritas-website\app\api\admin\admins\create\route.ts

// import { prisma } from "@/db/client";
// import { NextResponse } from "next/server";
// import { requireSuperAdmin } from "@/lib/auth/requireSuperAdmin";
// import bcrypt from "bcrypt";
// import { AdminRole } from "@prisma/client";

// export async function POST(req: Request) {
//   const { admin: currentAdmin, error } = await requireSuperAdmin();
//   if (error) return error;

//   const { name, email, password, role } = await req.json();

//   if (!name || !email || !password || !role) {
//     return NextResponse.json(
//       { error: "All fields are required" },
//       { status: 400 }
//     );
//   }

//   if (!Object.values(AdminRole).includes(role)) {
//     return NextResponse.json(
//       { error: "Invalid role" },
//       { status: 400 }
//     );
//   }

//   if (password.length < 8) {
//     return NextResponse.json(
//       { error: "Password must be at least 8 characters" },
//       { status: 400 }
//     );
//   }

//   const existing = await prisma.adminUser.findUnique({
//     where: { email },
//   });

//   if (existing) {
//     return NextResponse.json(
//       { error: "Admin with this email already exists" },
//       { status: 409 }
//     );
//   }

//   const passwordHash = await bcrypt.hash(password, 12);

//   await prisma.adminUser.create({
//     data: {
//       name,
//       email,
//       passwordHash,
//       role,
//       isApproved: false, // IMPORTANT
//     },
//   });

//   return NextResponse.json({ success: true });
// }

// // new with validation checks
// import { prisma } from "@/db/client";
// import { NextResponse } from "next/server";
// import { requireSuperAdmin } from "@/lib/auth/requireSuperAdmin";
// import bcrypt from "bcrypt";
// import { AdminRole } from "@prisma/client";

// export async function POST(req: Request) {
//   const { error } = await requireSuperAdmin();
//   if (error) return error;

//   const { name, email, password, role } = await req.json();

//   // Validate all fields
//   if (!name?.trim() || !email?.trim() || !password || !role) {
//     return NextResponse.json(
//       { error: "All fields are required" },
//       { status: 400 }
//     );
//   }

//   // Validate email format
//   if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
//     return NextResponse.json(
//       { error: "Invalid email format" },
//       { status: 400 }
//     );
//   }

//   // Validate role
//   if (!Object.values(AdminRole).includes(role)) {
//     return NextResponse.json(
//       { error: "Invalid role" },
//       { status: 400 }
//     );
//   }

//   // Validate password complexity
//   if (password.length < 8) {
//     return NextResponse.json(
//       { error: "Password must be at least 8 characters" },
//       { status: 400 }
//     );
//   }

//   if (!/[A-Z]/.test(password)) {
//     return NextResponse.json(
//       { error: "Password must contain at least one uppercase letter" },
//       { status: 400 }
//     );
//   }

//   if (!/[a-z]/.test(password)) {
//     return NextResponse.json(
//       { error: "Password must contain at least one lowercase letter" },
//       { status: 400 }
//     );
//   }

//   if (!/\d/.test(password)) {
//     return NextResponse.json(
//       { error: "Password must contain at least one number" },
//       { status: 400 }
//     );
//   }

//   // Check for duplicates
//   const existing = await prisma.adminUser.findUnique({
//     where: { email: email.toLowerCase().trim() },
//   });

//   if (existing) {
//     return NextResponse.json(
//       { error: "Admin with this email already exists" },
//       { status: 409 }
//     );
//   }

//   // Hash password
//   const passwordHash = await bcrypt.hash(password, 12);

//   // Create admin
//   const newAdmin = await prisma.adminUser.create({
//     data: {
//       name: name.trim(),
//       email: email.toLowerCase().trim(),
//       passwordHash,
//       role,
//       isApproved: false,
//     },
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       role: true,
//       createdAt: true,
//     },
//   });

//   return NextResponse.json({
//     success: true,
//     admin: newAdmin,
//   });
// }
// app/api/admin/admins/create/route.ts
import { prisma } from "@/db/client";
import { NextResponse } from "next/server";
import { requireSuperAdmin } from "@/lib/auth/requireSuperAdmin";
import bcrypt from "bcrypt";
import { AdminRole, Department } from "@prisma/client";

export async function POST(req: Request) {
  const { error } = await requireSuperAdmin();
  if (error) return error;

  const { name, email, password, role, department } = await req.json();

  // Validate all fields
  if (!name?.trim() || !email?.trim() || !password || !role) {
    return NextResponse.json(
      { error: "All fields are required" },
      { status: 400 }
    );
  }

  // Validate email format
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json(
      { error: "Invalid email format" },
      { status: 400 }
    );
  }

  // Validate role
  if (!Object.values(AdminRole).includes(role)) {
    return NextResponse.json(
      { error: "Invalid role" },
      { status: 400 }
    );
  }

  // Validate department (if provided)
  if (department !== null && department !== undefined) {
    if (!Object.values(Department).includes(department)) {
      return NextResponse.json(
        { error: "Invalid department" },
        { status: 400 }
      );
    }
  }

  // Validate password complexity
  if (password.length < 8) {
    return NextResponse.json(
      { error: "Password must be at least 8 characters" },
      { status: 400 }
    );
  }

  if (!/[A-Z]/.test(password)) {
    return NextResponse.json(
      { error: "Password must contain at least one uppercase letter" },
      { status: 400 }
    );
  }

  if (!/[a-z]/.test(password)) {
    return NextResponse.json(
      { error: "Password must contain at least one lowercase letter" },
      { status: 400 }
    );
  }

  if (!/\d/.test(password)) {
    return NextResponse.json(
      { error: "Password must contain at least one number" },
      { status: 400 }
    );
  }

  // Check for duplicates
  const existing = await prisma.adminUser.findUnique({
    where: { email: email.toLowerCase().trim() },
  });

  if (existing) {
    return NextResponse.json(
      { error: "Admin with this email already exists" },
      { status: 409 }
    );
  }

  // Hash password
  const passwordHash = await bcrypt.hash(password, 12);

  // Create admin
  const newAdmin = await prisma.adminUser.create({
    data: {
      name: name.trim(),
      email: email.toLowerCase().trim(),
      passwordHash,
      role,
      department: department || null, // Store null if not provided
      isApproved: false,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      department: true,
      createdAt: true,
    },
  });

  return NextResponse.json({
    success: true,
    admin: newAdmin,
  });
}
