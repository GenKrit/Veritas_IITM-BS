// veritas-website\app\admin\(protected)\team\page.tsx

// import { getCurrentAdmin } from "@/lib/auth/admin";
// import { canManageTeam } from "@/lib/auth/permissions";
// import { redirect } from "next/navigation";
// import TeamDepartment from "./TeamDepartment";

// export default async function TeamPage() {
//   const admin = await getCurrentAdmin();

//   if (!admin) redirect("/admin/login");

//   if (!canManageTeam(admin)) {
//     return (
//       <div className="py-24 text-center">
//         <h1 className="text-2xl font-bold text-red-500">
//           Access Restricted
//         </h1>
//         <p className="text-gray-400">
//           You are not allowed to manage teams.
//         </p>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-12">
//       <h1 className="text-3xl font-bold">Team Management</h1>

//       <TeamDepartment department="EVENTS" />
//       <TeamDepartment department="RESEARCH" />
//       <TeamDepartment department="WEBOPS" />
//       <TeamDepartment department="CREATIVE" />
//       <TeamDepartment department="PR" />
//     </div>
//   );
// }

// app/admin/(protected)/team/page.tsx
// import { getCurrentAdmin } from "@/lib/auth/admin";
// import { canManageTeam } from "@/lib/auth/permissions";
// import { redirect } from "next/navigation";
// import TeamDepartment from "./TeamDepartment";
// import { Department } from "@prisma/client";

// export default async function TeamPage() {
//   const admin = await getCurrentAdmin();

//   if (!admin) redirect("/admin/login");

//   if (!canManageTeam(admin)) {
//     return (
//       <div className="py-24 text-center">
//         <h1 className="text-2xl font-bold text-red-500">Access Restricted</h1>
//         <p className="text-gray-400">You are not allowed to manage teams.</p>
//       </div>
//     );
//   }

//   const isSuperAdmin = admin.role === "SUPER_ADMIN";

//   return (
//     <div className="space-y-12">
//       <h1 className="text-3xl font-bold">Team Management</h1>

//       {/* Society Leadership - Only Super Admin can edit */}
//       <TeamDepartment
//         department={null}
//         title="Society Leadership"
//         description="Secretary, Deputy Secretary, and other society-level positions"
//         canEdit={isSuperAdmin}
//         allowFreeRoles={true}
//       />

//       {/* Department Sections - Super Admin or Department Admin */}
//       {Object.values(Department).map((dept) => (
//         <TeamDepartment
//           key={dept}
//           department={dept}
//           canEdit={isSuperAdmin || admin.department === dept}
//           allowFreeRoles={false}
//         />
//       ))}
//     </div>
//   );
// }


// // app/admin/(protected)/team/page.tsx
// import { requireAdmin } from "@/lib/auth/requireAdmin";
// import TeamDepartment from "./TeamDepartment";
// import { Department } from "@prisma/client";

// export default async function TeamPage() {
//   // This returns AdminUser (non-null) or redirects
//   const admin = await requireAdmin();

//   // No null check needed - TypeScript knows admin exists
//   const isFounder = admin.isFounder === true;
//   const isSuperAdmin = admin.role === "SUPER_ADMIN";
//   const isDepartmentAdmin = admin.role === "DEPARTMENT_ADMIN";

//   const canEditEverything = isFounder || isSuperAdmin;
//   const canEditSocietyLeadership = canEditEverything;

//   function canEditDepartment(dept: Department): boolean {
//     if (canEditEverything) return true;

//     if (isDepartmentAdmin) {
//       if (admin.department === null) return true;
//       return admin.department === dept;
//     }

//     return false;
//   }

//   return (
//     <div className="space-y-12">
//       <h1 className="text-3xl font-bold">Team Management</h1>

//       <TeamDepartment
//         department={null}
//         title="Society Leadership"
//         description="Secretary, Deputy Secretary, and other society-level positions"
//         canEdit={canEditSocietyLeadership}
//         allowFreeRoles={true}
//       />

//       {Object.values(Department).map((dept) => (
//         <TeamDepartment
//           key={dept}
//           department={dept}
//           canEdit={canEditDepartment(dept)}
//           allowFreeRoles={false}
//         />
//       ))}
//     </div>
//   );
// }

// app/admin/(protected)/team/page.tsx
import { requireAdmin } from "@/lib/auth/requireAdmin";
import TeamDepartment from "./TeamDepartment";
import { Department } from "@prisma/client";
import { prisma } from "@/db/client";

export default async function TeamPage() {
  const admin = await requireAdmin();

  const isFounder = admin.isFounder === true;
  const isSuperAdmin = admin.role === "SUPER_ADMIN";
  const isDepartmentAdmin = admin.role === "DEPARTMENT_ADMIN";

  const canEditEverything = isFounder || isSuperAdmin;
  const canEditSocietyLeadership = canEditEverything;

  function canEditDepartment(dept: Department): boolean {
    if (canEditEverything) return true;

    if (isDepartmentAdmin) {
      if (admin.department === null) return true;
      return admin.department === dept;
    }

    return false;
  }

  // ✅ Fetch actual counts from database
  const [societyLeadersCount, totalMembersCount] = await Promise.all([
    prisma.teamMember.count({
      where: { department: null }, // Society leadership has null department
    }),
    prisma.teamMember.count(), // All members
  ]);

  const totalDepartments = Object.values(Department).length;

  return (
    <div className="min-h-screen bg-neutral-200">
      <div className="px-6 lg:px-8 py-8">
        {/* Header with gradient */}
        <div className="bg-linear-to-br from-neutral-200 to-neutral-300 rounded-xl p-8 mb-8 shadow-lg">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Team Management</h1>
          <p className="text-neutral-700">Manage society leadership and department members</p>
        </div>

        {/* Stats Overview - NOW WITH REAL DATA */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard 
            label="Total Departments" 
            value={totalDepartments} 
            icon="🏢" 
          />
          <StatCard 
            label="Society Leaders" 
            value={societyLeadersCount} 
            icon="👔" 
            color="blue" 
          />
          <StatCard 
            label="Total Members" 
            value={totalMembersCount} 
            icon="👥" 
            color="green" 
          />
        </div>

        {/* Society Leadership Section */}
        <div className="mb-8">
          <TeamDepartment
            department={null}
            title="Society Leadership"
            description="Secretary, Deputy Secretary, and other society-level positions"
            canEdit={canEditSocietyLeadership}
            allowFreeRoles={true}
          />
        </div>

        {/* Departments */}
        <div className="space-y-6">
          <h2 className="text-2xl font-bold text-neutral-900">Departments</h2>
          {Object.values(Department).map((dept) => (
            <TeamDepartment
              key={dept}
              department={dept}
              canEdit={canEditDepartment(dept)}
              allowFreeRoles={false}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

function StatCard({ 
  label, 
  value, 
  icon,
  color = "neutral"
}: { 
  label: string; 
  value: string | number; // ✅ Can now accept numbers
  icon: string;
  color?: "blue" | "green" | "neutral";
}) {
  const colorClasses = {
    blue: {
      text: "text-blue-600",
      bg: "bg-blue-50",
      border: "border-blue-200",
      hover: "hover:border-blue-300 hover:shadow-blue-100"
    },
    green: {
      text: "text-green-600",
      bg: "bg-green-50",
      border: "border-green-200",
      hover: "hover:border-green-300 hover:shadow-green-100"
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
