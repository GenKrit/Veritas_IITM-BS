// veritas-website\lib\auth\requireAdmin.ts
import { getCurrentAdmin } from "@/lib/auth/admin";
import { redirect } from "next/navigation";

export async function requireAdmin() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return admin;
}
