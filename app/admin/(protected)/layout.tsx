// veritas-website\app\admin\(protected)\layout.tsx

import { redirect } from "next/navigation";
import { getCurrentAdmin } from "@/lib/auth/admin";
import AdminNavbar from "@/components/admin/AdminNavbar";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <AdminNavbar admin={admin} />
      <main className="p-6">{children}</main>
    </div>
  );
}
