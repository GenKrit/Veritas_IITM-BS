// // app/admin/(protected)/vsd/page.tsx
// import { prisma } from "@/db/client";
// import { getCurrentAdmin } from "@/lib/auth/admin";
// import { canAccessVSD } from "@/lib/auth/permissions";
// import { redirect } from "next/navigation";
// import VSDTable from "./VSDTable";
// import Link from "next/link";
// import { Plus } from "lucide-react";

// export default async function VSDPage() {
//   const admin = await getCurrentAdmin();
//   if (!admin) redirect("/admin/login");

//   // Fetch all digests - sorting and filtering will happen on client side
//   const digests = await prisma.veritasDigest.findMany({
//     orderBy: [{ volume: "desc" }, { issue: "desc" }],
//   });

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <div>
//           <h1 className="text-3xl font-bold">Veritas Speaking Digest</h1>
//           <p className="text-gray-400 mt-1">
//             Manage and publish VSD editions
//           </p>
//         </div>

//         {canAccessVSD(admin) && (
//           <Link
//             href="/admin/vsd/new"
//             className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
//           >
//             <Plus size={18} />
//             <span>Add Digest</span>
//           </Link>
//         )}
//       </div>

//       {/* Table with Search and Sort */}
//       <VSDTable digests={digests} canEdit={canAccessVSD(admin)} />
//     </div>
//   );
// }

// app/admin/(protected)/vsd/page.tsx
import { prisma } from "@/db/client";
import { getCurrentAdmin } from "@/lib/auth/admin";
import { canAccessVSD } from "@/lib/auth/permissions";
import { redirect } from "next/navigation";
import VSDTable from "./VSDTable";
import Link from "next/link";
import { Plus, BookOpen } from "lucide-react";

export default async function VSDPage() {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const digests = await prisma.veritasDigest.findMany({
    orderBy: [{ volume: "desc" }, { issue: "desc" }],
  });

  // Calculate stats
  const totalVolumes = new Set(digests.map(d => d.volume)).size;
  const currentYear = new Date().getFullYear();
  const thisYearCount = digests.filter(d => d.month.includes(String(currentYear))).length;

  return (
    <div className="min-h-screen bg-neutral-200">
      <div className="px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-linear-to-br from-neutral-800 to-neutral-900 rounded-xl p-8 mb-8 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2">Veritas Speaking Digest</h1>
              <p className="text-neutral-300">Manage and publish VSD editions</p>
            </div>

            {canAccessVSD(admin) && (
              <Link
                href="/admin/vsd/new"
                className="inline-flex items-center gap-2 px-5 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5"
              >
                <Plus className="w-5 h-5" />
                Add Digest
              </Link>
            )}
          </div>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
          <StatCard label="Total Digests" value={digests.length} icon="📚" />
          <StatCard label="Volumes" value={totalVolumes} icon="📖" color="blue" />
          <StatCard label="This Year" value={thisYearCount} icon="📅" color="green" />
        </div>

        {/* Table with Search and Sort */}
        <VSDTable digests={digests} canEdit={canAccessVSD(admin)} />
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
  value: number; 
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
    <div className={`${styles.bg} border-2 ${styles.border} rounded-xl p-6 transition-all duration-300 hover:shadow-lg ${styles.hover} hover:-translate-y-1`}>
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
