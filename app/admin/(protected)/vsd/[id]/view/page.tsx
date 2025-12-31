// // app/admin/(protected)/vsd/[id]/view/page.tsx
// import { prisma } from "@/db/client";
// import { getCurrentAdmin } from "@/lib/auth/admin";
// import { redirect } from "next/navigation";
// import { ArrowLeft, ExternalLink, Calendar, Hash } from "lucide-react";
// import Link from "next/link";
// import { canAccessVSD } from "@/lib/auth/permissions";

// export default async function ViewVSDPage({
//   params,
// }: {
//   params: Promise<{ id: string }>;
// }) {
//   const admin = await getCurrentAdmin();
//   if (!admin) redirect("/admin/login");

//   const { id } = await params;

//   const digest = await prisma.veritasDigest.findUnique({
//     where: { id },
//   });

//   if (!digest) {
//     redirect("/admin/vsd");
//   }

//   const canEdit = canAccessVSD(admin);

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
//         <Link
//           href="/admin/vsd"
//           className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
//         >
//           <ArrowLeft size={16} />
//           <span>Back to VSD</span>
//         </Link>

//         {canEdit && (
//           <Link
//             href={`/admin/vsd/${digest.id}/edit`}
//             className="inline-flex items-center justify-center px-4 py-2 bg-yellow-600 text-white rounded-lg font-medium hover:bg-yellow-700 transition-colors"
//           >
//             Edit Digest
//           </Link>
//         )}
//       </div>

//       {/* Digest Card */}
//       <div className="border border-gray-800 rounded-lg overflow-hidden bg-gray-900/50">
//         {/* Title Section */}
//         <div className="p-6 md:p-8 border-b border-gray-800">
//           <h1 className="text-2xl md:text-3xl font-bold text-white mb-4 wrap-break-word">
//             {digest.title}
//           </h1>

//           {/* Metadata */}
//           <div className="flex flex-wrap items-center gap-3 text-sm">
//             <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-indigo-500/10 border border-indigo-500/20 rounded-full text-indigo-400">
//               <Hash size={14} />
//               <span>Vol {digest.volume}, Issue {digest.issue}</span>
//             </div>

//             <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-purple-500/10 border border-purple-500/20 rounded-full text-purple-400">
//               <Calendar size={14} />
//               <span>{digest.month}</span>
//             </div>
//           </div>
//         </div>

//         {/* Description Section */}
//         {digest.description && (
//           <div className="p-6 md:p-8 border-b border-gray-800">
//             <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
//               Description
//             </h2>
//             <p className="text-gray-300 leading-relaxed whitespace-pre-wrap wrap-break-word">
//               {digest.description}
//             </p>
//           </div>
//         )}

//         {/* Link Section */}
//         <div className="p-6 md:p-8">
//           <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3">
//             Access Link
//           </h2>
//           <a
//             href={digest.link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="inline-flex items-center gap-2 px-4 py-2 bg-white text-black rounded-lg font-medium hover:bg-gray-100 transition-colors"
//           >
//             <span>Open Digest</span>
//             <ExternalLink size={16} />
//           </a>
//         </div>

//         {/* Footer Metadata */}
//         <div className="px-6 md:px-8 py-4 bg-gray-950/50 border-t border-gray-800">
//           <p className="text-xs text-gray-500">
//             Created: {new Date(digest.createdAt).toLocaleDateString("en-US", {
//               year: "numeric",
//               month: "long",
//               day: "numeric",
//             })}
//           </p>
//         </div>
//       </div>
//     </div>
//   );
// }

// app/admin/(protected)/vsd/[id]/view/page.tsx
import { prisma } from "@/db/client";
import { getCurrentAdmin } from "@/lib/auth/admin";
import { redirect } from "next/navigation";
import { ArrowLeft, ExternalLink, Calendar, Hash, Edit, BookOpen } from "lucide-react";
import Link from "next/link";
import { canAccessVSD } from "@/lib/auth/permissions";

export default async function ViewVSDPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  const { id } = await params;

  const digest = await prisma.veritasDigest.findUnique({
    where: { id },
  });

  if (!digest) {
    redirect("/admin/vsd");
  }

  const canEdit = canAccessVSD(admin);

  return (
    <div className="min-h-screen bg-neutral-200">
      <div className="px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-linear-to-br from-neutral-800 to-neutral-900 rounded-xl p-8 mb-8 shadow-lg">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <Link
                href="/admin/vsd"
                className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors mb-3"
              >
                <ArrowLeft size={16} />
                Back to VSD
              </Link>
              <h1 className="text-3xl font-bold text-white mb-2">Digest Details</h1>
              <p className="text-neutral-300">View digest information</p>
            </div>

            {canEdit && (
              <Link
                href={`/admin/vsd/${digest.id}/edit`}
                className="inline-flex items-center gap-2 px-5 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-orange-200 hover:-translate-y-0.5"
              >
                <Edit className="w-5 h-5" />
                Edit Digest
              </Link>
            )}
          </div>
        </div>

        <div className="max-w-4xl mx-auto space-y-6">
          {/* Main Digest Card */}
          <div className="bg-white border-2 border-neutral-400 rounded-xl overflow-hidden shadow-md">
            {/* Title Section */}
            <div className="p-8 bg-linear-to-br from-blue-50 to-neutral-50 border-b-2 border-neutral-300">
              <div className="flex items-start gap-4 mb-4">
                <div className="h-16 w-16 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow-lg">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <h1 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-4 wrap-break-word">
                    {digest.title}
                  </h1>

                  {/* Metadata Badges */}
                  <div className="flex flex-wrap items-center gap-3">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 border-2 border-blue-300 rounded-full">
                      <Hash className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-bold text-blue-700">
                        Vol {digest.volume}, Issue {digest.issue}
                      </span>
                    </div>

                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-100 border-2 border-green-300 rounded-full">
                      <Calendar className="w-4 h-4 text-green-600" />
                      <span className="text-sm font-bold text-green-700">
                        {digest.month}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Description Section */}
            {digest.description && (
              <div className="p-8 border-b-2 border-neutral-300">
                <h2 className="text-sm font-bold text-neutral-600 uppercase tracking-wider mb-3 flex items-center gap-2">
                  <span className="h-1 w-8 bg-blue-600 rounded-full"></span>
                  Description
                </h2>
                <p className="text-neutral-700 leading-relaxed whitespace-pre-wrap wrap-break-word">
                  {digest.description}
                </p>
              </div>
            )}

            {/* Link Section */}
            <div className="p-8 bg-neutral-50">
              <h2 className="text-sm font-bold text-neutral-600 uppercase tracking-wider mb-4 flex items-center gap-2">
                <span className="h-1 w-8 bg-green-600 rounded-full"></span>
                Access Document
              </h2>
              <a
                href={digest.link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5"
              >
                <span>Open Digest</span>
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Metadata Footer Card */}
          <div className="bg-white border-2 border-neutral-400 rounded-xl p-6 shadow-md">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-neutral-200 rounded-full flex items-center justify-center">
                <Calendar className="w-5 h-5 text-neutral-600" />
              </div>
              <div>
                <p className="text-xs font-semibold text-neutral-600 uppercase tracking-wide mb-1">
                  Created On
                </p>
                <p className="text-sm font-medium text-neutral-900">
                  {new Date(digest.createdAt).toLocaleDateString("en-US", {
                    weekday: 'long',
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
