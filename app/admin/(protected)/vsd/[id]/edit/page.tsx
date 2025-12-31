// // app/admin/(protected)/vsd/[id]/edit/page.tsx
// import { prisma } from "@/db/client";
// import { getCurrentAdmin } from "@/lib/auth/admin";
// import { canAccessVSD } from "@/lib/auth/permissions";
// import { redirect } from "next/navigation";
// import EditVSDForm from "./EditVSDForm";

// export default async function EditVSDPage({
//   params,
// }: {
//   params: Promise<{ id: string }>; // ⭐ Promise type
// }) {
//   const admin = await getCurrentAdmin();
//   if (!admin) redirect("/admin/login");

//   if (!canAccessVSD(admin)) {
//     return (
//       <div className="py-24 text-center text-red-500">
//         Access Restricted
//       </div>
//     );
//   }

//   const { id } = await params; // ⭐ AWAIT params

//   const digest = await prisma.veritasDigest.findUnique({
//     where: { id },
//   });

//   if (!digest) {
//     redirect("/admin/vsd");
//   }

//   return <EditVSDForm digest={digest} />;
// }

// app/admin/(protected)/vsd/[id]/edit/page.tsx
import { prisma } from "@/db/client";
import { getCurrentAdmin } from "@/lib/auth/admin";
import { canAccessVSD } from "@/lib/auth/permissions";
import { redirect } from "next/navigation";
import EditVSDForm from "./EditVSDForm";

export default async function EditVSDPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const admin = await getCurrentAdmin();
  if (!admin) redirect("/admin/login");

  if (!canAccessVSD(admin)) {
    return (
      <div className="min-h-screen bg-neutral-200 flex items-center justify-center p-6">
        <div className="max-w-md w-full bg-white border-2 border-neutral-400 rounded-xl p-8 text-center shadow-lg">
          <div className="h-16 w-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="h-8 w-8 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-neutral-900 mb-2">
            Access Restricted
          </h1>
          <p className="text-neutral-600">
            You don't have permission to edit digests.
          </p>
        </div>
      </div>
    );
  }

  const { id } = await params;

  const digest = await prisma.veritasDigest.findUnique({
    where: { id },
  });

  if (!digest) {
    redirect("/admin/vsd");
  }

  return <EditVSDForm digest={digest} />;
}
