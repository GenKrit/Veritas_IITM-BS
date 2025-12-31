// // // veritas-website\app\admin\(protected)\admins\page.tsx
// // // Server-side Admins Management Page

// // import { redirect } from "next/navigation";
// // import { getCurrentAdmin } from "@/lib/auth/admin";
// // import { canViewAdmins } from "@/lib/auth/permissions";
// // import { prisma } from "@/db/client";
// // import AdminsTable from "./AdminsTable";

// // export default async function AdminsPage() {
// //   const admin = await getCurrentAdmin();

// //   if (!admin || !canViewAdmins(admin)) {
// //     redirect("/admin/dashboard");
// //   }

// //   const admins = await prisma.adminUser.findMany({
// //     orderBy: { createdAt: "desc" },
// //     select: {
// //       id: true,
// //       name: true,
// //       email: true,
// //       role: true,
// //       isApproved: true,
// //       isFounder: true,
// //       createdAt: true,
// //     },
// //   });

// //   const pending = admins.filter(a => !a.isApproved);
// //   const active = admins.filter(a => a.isApproved);

// //   return (
// //     <div className="space-y-10">
// //       <h1 className="text-3xl font-bold">Admins</h1>

// //       <AdminsTable title="Pending Approval" admins={pending} />
// //       <AdminsTable title="Active Admins" admins={active} />
// //     </div>
// //   );
  
// // }

// // veritas-website/app/admin/(protected)/admins/page.tsx

// import { getCurrentAdmin } from "@/lib/auth/admin";
// import { canViewAdmins } from "@/lib/auth/permissions";
// import { prisma } from "@/db/client";
// import { redirect } from "next/navigation";
// import AdminsTable from "./AdminsTable";
// // For new admin creation page
// import CreateAdminButton from "./CreateAdminButton";


// export default async function AdminsPage() {
//   const admin = await getCurrentAdmin();

//   if (!admin) {
//     redirect("/admin/login");
//   }

//   if (!canViewAdmins(admin)) {
//     return (
//       <div className="max-w-xl mx-auto py-24 text-center">
//         <h1 className="text-2xl font-bold text-red-500">
//           Access Restricted
//         </h1>
//         <p className="text-gray-400 mt-2">
//           You do not have permission to manage admins.
//         </p>
//       </div>
//     );
//   }

//   const admins = await prisma.adminUser.findMany({
//     orderBy: { createdAt: "desc" },
//     select: {
//       id: true,
//       name: true,
//       email: true,
//       role: true,
//       isApproved: true,
//       isFounder: true,
//       createdAt: true,
//     },
//   });

//   const pending = admins.filter(a => !a.isApproved);
//   const active = admins.filter(a => a.isApproved);

//   return (
//     <div className="space-y-10">
//       <h1 className="text-3xl font-bold">Admins</h1>
//       <CreateAdminButton />

//       <AdminsTable
//         title="Pending Approval"
//         admins={pending}
//         currentAdminId={admin.id}
//       />

//       <AdminsTable
//         title="Active Admins"
//         admins={active}
//         currentAdminId={admin.id}
//       />
//     </div>
//   );
// }

// app/admin/(protected)/admins/page.tsx
import { getCurrentAdmin } from "@/lib/auth/admin";
import { canViewAdmins } from "@/lib/auth/permissions";
import { prisma } from "@/db/client";
import { redirect } from "next/navigation";
import AdminsTable from "./AdminsTable";
import CreateAdminButton from "./CreateAdminButton";

export default async function AdminsPage() {
  const admin = await getCurrentAdmin();

  if (!admin) {
    redirect("/admin/login");
  }

  if (!canViewAdmins(admin)) {
    return (
      <div className="min-h-screen bg-neutral-200 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border border-neutral-400 rounded-xl p-8 text-center shadow-lg">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Access Restricted
          </h1>
          <p className="text-neutral-600">
            You do not have permission to manage admins.
          </p>
        </div>
      </div>
    );
  }

  const admins = await prisma.adminUser.findMany({
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      department: true,
      isApproved: true,
      isFounder: true,
      createdAt: true,
    },
  });

  const pending = admins.filter(a => !a.isApproved);
  const active = admins.filter(a => a.isApproved);

  return (
    <div className="min-h-screen bg-neutral-200">
      <div className="px-6 lg:px-8 py-8">
        {/* Header with gradient */}
        <div className="bg-linear-to-br from-neutral-200 to-neutral-300 rounded-xl p-8 mb-8 shadow-lg">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Admin Management</h1>
          <p className="text-neutral-700">Manage admin users, roles, and permissions</p>
        </div>

        {/* Stats Cards with hover effects */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard 
            label="Total Admins" 
            value={admins.length}
            icon="👥"
          />
          <StatCard 
            label="Active Admins" 
            value={active.length}
            color="green"
            icon="✓"
          />
          <StatCard 
            label="Pending Approval" 
            value={pending.length}
            color="orange"
            icon="⏳"
          />
        </div>

        {/* Create Admin Button */}
        <div className="mb-8">
          <CreateAdminButton />
        </div>

        {/* Tables */}
        <div className="space-y-6">
          {pending.length > 0 && (
            <AdminsTable
              title="Pending Approval"
              admins={pending}
              currentAdminId={admin.id}
            />
          )}

          <AdminsTable
            title="Active Admins"
            admins={active}
            currentAdminId={admin.id}
          />
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  color = "neutral",
  icon
}: { 
  label: string; 
  value: number; 
  color?: "green" | "orange" | "neutral";
  icon: string;
}) {
  const colorClasses = {
    green: {
      text: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      hover: "hover:border-green-300 hover:shadow-green-100"
    },
    orange: {
      text: "text-orange-600",
      bg: "bg-orange-50",
      border: "border-orange-200",
      hover: "hover:border-orange-300 hover:shadow-orange-100"
    },
    neutral: {
      text: "text-neutral-900",
      bg: "bg-neutral-50",
      border: "border-neutral-400",
      hover: "hover:border-neutral-500 hover:shadow-neutral-200"
    },
  };

  const styles = colorClasses[color];

  return (
    <div className={`${styles.bg} border-2 ${styles.border} rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${styles.hover} hover:-translate-y-1 cursor-pointer`}>
      <div className="flex items-center justify-between mb-3">
        <p className="text-sm font-semibold text-neutral-600 uppercase tracking-wide">{label}</p>
        <span className="text-2xl">{icon}</span>
      </div>
      <p className={`text-4xl font-bold ${styles.text}`}>
        {value}
      </p>
    </div>
  );
}
