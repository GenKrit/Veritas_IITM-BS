// components/admin/dashboard/ApprovalsSection.tsx
import { AdminUser } from "@prisma/client";
import Link from "next/link";

type ApprovalsProps = {
  pendingAdmins: AdminUser[];
  approvedAdmins: AdminUser[];
  canEdit: boolean;
};

export default function ApprovalsSection({
  pendingAdmins,
  approvedAdmins,
  canEdit,
}: ApprovalsProps) {
  return (
    <div className="bg-white rounded-lg border border-neutral-200 p-6 shadow-sm">
      <h2 className="text-lg font-bold text-neutral-900 mb-6">Admin Approvals</h2>

      {pendingAdmins.length > 0 && (
        <div className="mb-8">
          <h3 className="text-sm font-semibold text-neutral-700 mb-4 flex items-center gap-2">
            <span className="h-2 w-2 bg-orange-500 rounded-full"></span>
            Pending Approval ({pendingAdmins.length})
          </h3>
          <div className="space-y-2">
            {pendingAdmins.map((admin) => (
              <AdminRow
                key={admin.id}
                admin={admin}
                status="pending"
                canEdit={canEdit}
              />
            ))}
          </div>
        </div>
      )}

      <div>
        <h3 className="text-sm font-semibold text-neutral-700 mb-4 flex items-center gap-2">
          <span className="h-2 w-2 bg-green-500 rounded-full"></span>
          Approved Members ({approvedAdmins.length})
        </h3>
        <div className="space-y-2">
          {approvedAdmins.map((admin) => (
            <AdminRow key={admin.id} admin={admin} status="approved" canEdit={canEdit} />
          ))}
        </div>
      </div>
    </div>
  );
}

function AdminRow({
  admin,
  status,
  canEdit,
}: {
  admin: AdminUser;
  status: "pending" | "approved";
  canEdit: boolean;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-neutral-50 rounded-lg border border-neutral-200 hover:bg-neutral-100 transition-colors">
      <div className="flex items-center gap-4 flex-1 min-w-0">
        <div
          className={`h-10 w-10 rounded-full flex items-center justify-center shrink-0 font-bold text-sm ${
            status === "pending" 
              ? "bg-orange-100 text-orange-700" 
              : "bg-green-100 text-green-700"
          }`}
        >
          {admin.name.charAt(0).toUpperCase()}
        </div>
        <div className="flex-1 min-w-0 grid grid-cols-1 sm:grid-cols-3 gap-2 sm:gap-4">
          <span className="font-semibold text-neutral-900 truncate">{admin.name}</span>
          <span className="text-neutral-600 text-sm truncate">{admin.email}</span>
          <span className="text-neutral-900 font-medium text-sm uppercase">
            {admin.role.replace(/_/g, " ")}
          </span>
        </div>
      </div>

      {canEdit && (
        <Link
          href={`/admin/admins`}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm whitespace-nowrap"
        >
          View Details →
        </Link>
      )}
    </div>
  );
}
