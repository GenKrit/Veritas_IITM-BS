import { requireAdmin } from "@/lib/auth/requireAdmin";
import SessionsManager from "./SessionsManager";

export default async function SessionsPage() {
  const admin = await requireAdmin();

  return (
    <div className="min-h-screen bg-neutral-200">
      <SessionsManager admin={admin} />
    </div>
  );
}