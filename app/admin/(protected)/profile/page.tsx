// app/admin/(protected)/profile/page.tsx
import { getCurrentAdmin } from "@/lib/auth/admin";
import { redirect } from "next/navigation";
import ProfileView from "./ProfileView";

export default async function ProfilePage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  return <ProfileView admin={admin} />;
}
