// // veritas-website/app/admin/(protected)/admins/AdminsTable.tsx

// // "use client";

// // import { AdminRole } from "@prisma/client";
// // import { useRouter } from "next/navigation";
// // import { useState } from "react";

// // type Admin = {
// //   id: string;
// //   name: string;
// //   email: string;
// //   role: AdminRole;
// //   isApproved: boolean;
// //   isFounder: boolean;
// // };

// // export default function AdminsTable({
// //   title,
// //   admins,
// //   currentAdminId,
// // }: {
// //   title: string;
// //   admins: Admin[];
// //   currentAdminId: string;
// // }) {
// //   const router = useRouter();
// //   const [confirmAdmin, setConfirmAdmin] = useState<Admin | null>(null);
// //   const [confirmStep, setConfirmStep] = useState<1 | 2>(1);

// //   const sortedAdmins = [
// //     admins.find(a => a.id === currentAdminId),
// //     ...admins.filter(a => a.id !== currentAdminId),
// //   ].filter(Boolean) as Admin[];

// //   async function approve(id: string) {
// //     await fetch("/api/admin/admins/approve", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ adminId: id }),
// //     });
// //     router.refresh();
// //   }

// //   async function changeRole(id: string, role: AdminRole) {
// //     await fetch("/api/admin/admins/role", {
// //       method: "PATCH",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({ adminId: id, role }),
// //     });
// //     router.refresh();
// //   }

// //   async function removeConfirmed() {
// //     if (!confirmAdmin) return;

// //     await fetch(`/api/admin/admins/${confirmAdmin.id}`, {
// //       method: "DELETE",
// //     });

// //     setConfirmAdmin(null);
// //     setConfirmStep(1);
// //     router.refresh();
// //   }

// //   return (
// //     <section className="space-y-3">
// //       <h2 className="text-xl font-semibold">{title}</h2>

// //       <div className="border border-gray-800 rounded">
// //         {sortedAdmins.length === 0 && (
// //           <p className="p-4 text-gray-400">None</p>
// //         )}

// //         {sortedAdmins.map(admin => {
// //           const isSelf = admin.id === currentAdminId;

// //           return (
// //             <div
// //               key={admin.id}
// //               className={`flex items-center justify-between p-4 border-b border-gray-800 ${
// //                 isSelf ? "bg-gray-900" : ""
// //               }`}
// //             >
// //               <div>
// //                 <p className="font-medium">
// //                   {admin.name}
// //                   {isSelf && (
// //                     <span className="ml-2 text-xs text-green-400">
// //                       (You)
// //                     </span>
// //                   )}
// //                 </p>
// //                 <p className="text-sm text-gray-400">{admin.email}</p>
// //               </div>

// //               <div className="flex items-center gap-3">
// //                 {!admin.isApproved && (
// //                   <button
// //                     onClick={() => approve(admin.id)}
// //                     className="px-3 py-1 bg-green-600 text-black rounded"
// //                   >
// //                     Approve
// //                   </button>
// //                 )}

// //                 {admin.isApproved && !admin.isFounder && (
// //                   <select
// //                     aria-label="Admin role"
// //                     disabled={isSelf}
// //                     value={admin.role}
// //                     onChange={(e) =>
// //                       changeRole(admin.id, e.target.value as AdminRole)
// //                     }
// //                     className="bg-black border border-gray-700 rounded px-2 py-1 disabled:opacity-50"
// //                   >
// //                     <option value="SUPER_ADMIN">SUPER_ADMIN</option>
// //                     <option value="DEPARTMENT_ADMIN">DEPARTMENT_ADMIN</option>
// //                     <option value="CONTENT_ADMIN">CONTENT_ADMIN</option>
// //                   </select>
// //                 )}

// //                 {!isSelf && !admin.isFounder && (
// //                   <button
// //                     onClick={() => setConfirmAdmin(admin)}
// //                     className="text-red-500"
// //                   >
// //                     Remove
// //                   </button>
// //                 )}
// //               </div>
// //             </div>
// //           );
// //         })}
// //       </div>

// //       {/* Confirm Modals */}
// //       {confirmAdmin && (
// //         <div className="fixed inset-0 bg-black/70 flex items-center justify-center">
// //           <div className="bg-black border border-gray-700 rounded p-6 max-w-md space-y-4">
// //             {confirmStep === 1 ? (
// //               <>
// //                 <h3 className="text-lg font-semibold">
// //                   Remove admin?
// //                 </h3>
// //                 <p className="text-sm text-gray-400">
// //                   You are about to remove{" "}
// //                   <strong>{confirmAdmin.name}</strong> (
// //                   {confirmAdmin.email})
// //                 </p>

// //                 <div className="flex justify-end gap-3">
// //                   <button
// //                     onClick={() => setConfirmAdmin(null)}
// //                     className="px-3 py-1 border border-gray-600 rounded"
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     onClick={() => setConfirmStep(2)}
// //                     className="px-3 py-1 bg-red-600 text-black rounded"
// //                   >
// //                     Yes
// //                   </button>
// //                 </div>
// //               </>
// //             ) : (
// //               <>
// //                 <h3 className="text-lg font-semibold text-red-500">
// //                   Confirm Removal
// //                 </h3>
// //                 <p className="text-sm text-gray-400">
// //                   This will permanently remove{" "}
// //                   <strong>{confirmAdmin.name}</strong> and revoke all access.
// //                 </p>

// //                 <div className="flex justify-end gap-3">
// //                   <button
// //                     onClick={() => {
// //                       setConfirmStep(1);
// //                       setConfirmAdmin(null);
// //                     }}
// //                     className="px-3 py-1 border border-gray-600 rounded"
// //                   >
// //                     Cancel
// //                   </button>
// //                   <button
// //                     onClick={removeConfirmed}
// //                     className="px-3 py-1 bg-red-600 text-black rounded"
// //                   >
// //                     Confirm Remove
// //                   </button>
// //                 </div>
// //               </>
// //             )}
// //           </div>
// //         </div>
// //       )}
// //     </section>
// //   );
// // }






// // 2nd modification
// // note:-  Updated for some ui changes..upper and lower both correct
// // veritas-website\app\admin\(protected)\admins\AdminsTable.tsx
// "use client";

// import { AdminRole } from "@prisma/client";
// import { useRouter } from "next/navigation";
// import { useState } from "react";

// type Admin = {
//   id: string;
//   name: string;
//   email: string;
//   role: AdminRole;
//   isApproved: boolean;
//   isFounder: boolean;
// };

// export default function AdminsTable({
//   title,
//   admins,
//   currentAdminId,
// }: {
//   title: string;
//   admins: Admin[];
//   currentAdminId: string;
// }) {
//   const router = useRouter();
//   const [confirmAdmin, setConfirmAdmin] = useState<Admin | null>(null);
//   const [confirmStep, setConfirmStep] = useState<1 | 2>(1);
//   const [roleChangeConfirm, setRoleChangeConfirm] = useState<{
//     admin: Admin;
//     newRole: AdminRole;
//   } | null>(null);

//   // Track selected role for each pending admin
//   const [approvalDialog, setApprovalDialog] = useState<{
//     admin: Admin;
//     selectedRole: AdminRole;
//   } | null>(null);

//   const sortedAdmins = [
//     admins.find(a => a.id === currentAdminId),
//     ...admins.filter(a => a.id !== currentAdminId),
//   ].filter(Boolean) as Admin[];

//   async function approveWithRole(adminId: string, role: AdminRole) {
//     const res = await fetch("/api/admin/admins/approve", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({ adminId, role }),
//     });

//     if (!res.ok) {
//       const data = await res.json();
//       alert(data.error || "Failed to approve");
//       return;
//     }

//     setApprovalDialog(null);
//     router.refresh();
//   }

//   async function changeRoleConfirmed() {
//     if (!roleChangeConfirm) return;

//     const res = await fetch("/api/admin/admins/role", {
//       method: "PATCH",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify({
//         adminId: roleChangeConfirm.admin.id,
//         role: roleChangeConfirm.newRole,
//       }),
//     });

//     if (!res.ok) {
//       const data = await res.json();
//       alert(data.error || "Failed to change role");
//       return;
//     }

//     setRoleChangeConfirm(null);
//     router.refresh();
//   }

//   async function removeConfirmed() {
//     if (!confirmAdmin) return;

//     const res = await fetch(`/api/admin/admins/${confirmAdmin.id}`, {
//       method: "DELETE",
//     });

//     if (!res.ok) {
//       const data = await res.json();
//       alert(data.error || "Failed to remove");
//       return;
//     }

//     setConfirmAdmin(null);
//     setConfirmStep(1);
//     router.refresh();
//   }

//   return (
//     <section className="space-y-3">
//       <h2 className="text-xl font-semibold">{title}</h2>

//       <div className="border border-gray-800 rounded">
//         {sortedAdmins.length === 0 && (
//           <p className="p-4 text-gray-400">None</p>
//         )}

//         {sortedAdmins.map(admin => {
//           const isSelf = admin.id === currentAdminId;

//           return (
//             <div
//               key={admin.id}
//               className={`flex items-center justify-between p-4 border-b border-gray-800 ${
//                 isSelf ? "bg-gray-900" : ""
//               }`}
//             >
//               <div>
//                 <p className="font-medium">
//                   {admin.name}
//                   {isSelf && (
//                     <span className="ml-2 text-xs text-green-400">
//                       (You)
//                     </span>
//                   )}
//                 </p>
//                 <p className="text-sm text-gray-400">{admin.email}</p>
//               </div>

//               <div className="flex items-center gap-3">
//                 {/* ✅ PENDING APPROVAL - Show dropdown + approve button */}
//                 {!admin.isApproved && (
//                   <>
//                     <select
//                       aria-label="Select role for approval"
//                       value={
//                         approvalDialog?.admin.id === admin.id 
//                           ? approvalDialog.selectedRole 
//                           : admin.role
//                       }
//                       onChange={(e) => 
//                         setApprovalDialog({
//                           admin,
//                           selectedRole: e.target.value as AdminRole
//                         })
//                       }
//                       className="bg-black border border-gray-700 rounded px-2 py-1"
//                     >
//                       <option value="DEPARTMENT_ADMIN">Department Admin</option>
//                       <option value="CONTENT_ADMIN">Content Admin</option>
//                       <option value="SUPER_ADMIN">Super Admin</option>
//                     </select>
                    
//                     <button
//                       onClick={() => {
//                         const role = approvalDialog?.admin.id === admin.id 
//                           ? approvalDialog.selectedRole 
//                           : admin.role;
//                         approveWithRole(admin.id, role);
//                       }}
//                       className="px-3 py-1 bg-green-600 text-white rounded hover:bg-green-700"
//                     >
//                       Approve
//                     </button>
//                   </>
//                 )}

//                 {/* ACTIVE ADMINS - Show role dropdown */}
//                 {admin.isApproved && !admin.isFounder && (
//                   <select
//                     aria-label="Admin role"
//                     disabled={isSelf}
//                     value={admin.role}
//                     onChange={(e) => {
//                       const newRole = e.target.value as AdminRole;
//                       if (newRole !== admin.role) {
//                         setRoleChangeConfirm({ admin, newRole });
//                       }
//                     }}
//                     className="bg-black border border-gray-700 rounded px-2 py-1 disabled:opacity-50"
//                   >
//                     <option value="SUPER_ADMIN">SUPER_ADMIN</option>
//                     <option value="DEPARTMENT_ADMIN">DEPARTMENT_ADMIN</option>
//                     <option value="CONTENT_ADMIN">CONTENT_ADMIN</option>
//                   </select>
//                 )}

//                 {/* REMOVE BUTTON */}
//                 {!isSelf && !admin.isFounder && (
//                   <button
//                     onClick={() => setConfirmAdmin(admin)}
//                     className="text-red-500 hover:text-red-400 transition-colors"
//                   >
//                     Remove
//                   </button>
//                 )}
//               </div>
//             </div>
//           );
//         })}
//       </div>

//       {/* Role Change Confirmation Modal */}
//       {roleChangeConfirm && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-gray-950 border border-gray-700 rounded-lg p-6 max-w-md space-y-4">
//             <h3 className="text-lg font-semibold text-yellow-500">
//               Confirm Role Change
//             </h3>
//             <p className="text-sm text-gray-400">
//               Change <strong>{roleChangeConfirm.admin.name}</strong>'s role from{" "}
//               <span className="text-blue-400">{roleChangeConfirm.admin.role}</span> to{" "}
//               <span className="text-green-400">{roleChangeConfirm.newRole}</span>?
//             </p>

//             <div className="flex justify-end gap-3">
//               <button
//                 onClick={() => setRoleChangeConfirm(null)}
//                 className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-800 transition-colors"
//               >
//                 Cancel
//               </button>
//               <button
//                 onClick={changeRoleConfirmed}
//                 className="px-4 py-2 bg-yellow-600 text-black rounded hover:bg-yellow-700 transition-colors font-medium"
//               >
//                 Confirm Change
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Remove Admin Confirmation Modals */}
//       {confirmAdmin && (
//         <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
//           <div className="bg-gray-950 border border-gray-700 rounded-lg p-6 max-w-md space-y-4">
//             {confirmStep === 1 ? (
//               <>
//                 <h3 className="text-lg font-semibold">
//                   Remove admin?
//                 </h3>
//                 <p className="text-sm text-gray-400">
//                   You are about to remove{" "}
//                   <strong>{confirmAdmin.name}</strong> (
//                   {confirmAdmin.email})
//                 </p>

//                 <div className="flex justify-end gap-3">
//                   <button
//                     onClick={() => setConfirmAdmin(null)}
//                     className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-800 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={() => setConfirmStep(2)}
//                     className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium"
//                   >
//                     Yes, Remove
//                   </button>
//                 </div>
//               </>
//             ) : (
//               <>
//                 <h3 className="text-lg font-semibold text-red-500">
//                   ⚠️ Final Confirmation
//                 </h3>
//                 <p className="text-sm text-gray-400">
//                   This will <strong className="text-red-400">permanently remove</strong>{" "}
//                   <strong>{confirmAdmin.name}</strong> and revoke all access. This action cannot be undone.
//                 </p>

//                 <div className="flex justify-between gap-3">
//                   <button
//                     onClick={removeConfirmed}
//                     className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors font-medium"
//                   >
//                     Confirm Remove
//                   </button>
//                   <button
//                     onClick={() => {
//                       setConfirmStep(1);
//                       setConfirmAdmin(null);
//                     }}
//                     className="px-4 py-2 border border-gray-600 rounded hover:bg-gray-800 transition-colors"
//                   >
//                     Cancel
//                   </button>
//                 </div>
//               </>
//             )}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }




// app/admin/(protected)/admins/AdminsTable.tsx
"use client";

import { AdminRole, Department } from "@prisma/client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export type AdminTableAdmin = {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  department: Department | null;
  isApproved: boolean;
  isFounder: boolean;
};

interface AdminsTableProps {
  title: string;
  admins: AdminTableAdmin[];
  currentAdminId: string;
}

export default function AdminsTable({
  title,
  admins,
  currentAdminId,
}: AdminsTableProps) {
  const router = useRouter();
  const [confirmAdmin, setConfirmAdmin] = useState<AdminTableAdmin | null>(null);
  const [confirmStep, setConfirmStep] = useState<1 | 2>(1);
  const [roleChangeConfirm, setRoleChangeConfirm] = useState<{
    admin: AdminTableAdmin;
    newRole: AdminRole;
  } | null>(null);

  const [approvalDialog, setApprovalDialog] = useState<{
    admin: AdminTableAdmin;
    selectedRole: AdminRole;
  } | null>(null);

  const sortedAdmins = [
    admins.find(a => a.id === currentAdminId),
    ...admins.filter(a => a.id !== currentAdminId),
  ].filter(Boolean) as AdminTableAdmin[];

  async function approveWithRole(adminId: string, role: AdminRole) {
    const res = await fetch("/api/admin/admins/approve", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ adminId, role }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to approve");
      return;
    }

    setApprovalDialog(null);
    router.refresh();
  }

  async function changeRoleConfirmed() {
    if (!roleChangeConfirm) return;

    const res = await fetch("/api/admin/admins/role", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        adminId: roleChangeConfirm.admin.id,
        role: roleChangeConfirm.newRole,
      }),
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to change role");
      return;
    }

    setRoleChangeConfirm(null);
    router.refresh();
  }

  async function removeConfirmed() {
    if (!confirmAdmin) return;

    const res = await fetch(`/api/admin/admins/${confirmAdmin.id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      const data = await res.json();
      alert(data.error || "Failed to remove");
      return;
    }

    setConfirmAdmin(null);
    setConfirmStep(1);
    router.refresh();
  }

  return (
    <section className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-neutral-900">{title}</h2>
        <span className="text-sm font-medium text-neutral-600 bg-neutral-300 px-3 py-1 rounded-full">
          {admins.length} {admins.length === 1 ? "Admin" : "Admins"}
        </span>
      </div>

      <div className="bg-white border-2 border-neutral-400 rounded-xl overflow-hidden shadow-md">
        {sortedAdmins.length === 0 && (
          <div className="p-12 text-center">
            <div className="h-16 w-16 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-3xl">👤</span>
            </div>
            <p className="text-neutral-500 font-medium">No admins in this category</p>
          </div>
        )}

        {sortedAdmins.map((admin, index) => {
          const isSelf = admin.id === currentAdminId;

          return (
            <div
              key={admin.id}
              className={`
                flex items-center justify-between p-5 
                border-b-2 border-neutral-300 last:border-b-0 
                transition-all duration-200
                ${isSelf 
                  ? "bg-blue-50 hover:bg-blue-100" 
                  : "bg-white hover:bg-neutral-100"
                }
                ${index === 0 ? '' : 'hover:shadow-inner'}
              `}
            >
              {/* Left: Avatar + Info */}
              <div className="flex items-center gap-4 flex-1">
                {/* Avatar with gradient */}
                <div className="relative">
                  <div className={`
                    h-12 w-12 rounded-full flex items-center justify-center font-bold text-white text-lg
                    transition-transform duration-200 hover:scale-110
                    ${isSelf 
                      ? "bg-linear-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-200" 
                      : "bg-linear-to-br from-neutral-600 to-neutral-800 shadow-md"
                    }
                  `}>
                    {admin.name.charAt(0).toUpperCase()}
                  </div>
                  {isSelf && (
                    <div className="absolute -bottom-1 -right-1 h-4 w-4 bg-green-500 rounded-full border-2 border-white shadow-sm"></div>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <p className="font-semibold text-neutral-900 text-lg">
                      {admin.name}
                    </p>
                    {isSelf && (
                      <span className="text-xs bg-blue-200 text-blue-800 px-2.5 py-1 rounded-full font-bold animate-pulse">
                        YOU
                      </span>
                    )}
                    
                  </div>
                  <p className="text-sm text-neutral-600 mb-1">{admin.email}</p>
                  {admin.department && (
                    <span className="inline-flex items-center text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-md font-medium">
                      {admin.department} Department
                    </span>
                  )}
                  {admin.role === "DEPARTMENT_ADMIN" && !admin.department && (
                    <span className="inline-flex items-center text-xs bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded-md font-medium">
                      All Departments
                    </span>
                  )}
                </div>
              </div>

              <div className="flex items-center gap-3">
                {/* PENDING APPROVAL */}
                {!admin.isApproved && (
                  <>
                    <select
                      aria-label="Select role for approval"
                      value={
                        approvalDialog?.admin.id === admin.id 
                          ? approvalDialog.selectedRole 
                          : admin.role
                      }
                      onChange={(e) => 
                        setApprovalDialog({
                          admin,
                          selectedRole: e.target.value as AdminRole
                        })
                      }
                      className="bg-white border-2 border-neutral-400 rounded-lg px-3 py-2 text-sm font-medium text-neutral-900 focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all"
                    >
                      <option value="DEPARTMENT_ADMIN">Department Admin</option>
                      <option value="CONTENT_ADMIN">Content Admin</option>
                      <option value="SUPER_ADMIN">Super Admin</option>
                    </select>
                    
                    <button
                      onClick={() => {
                        const role = approvalDialog?.admin.id === admin.id 
                          ? approvalDialog.selectedRole 
                          : admin.role;
                        approveWithRole(admin.id, role);
                      }}
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-green-200 hover:-translate-y-0.5"
                    >
                      ✓ Approve
                    </button>
                  </>
                )}

                {/* ACTIVE ADMINS */}
                {admin.isApproved && (
                  <select
                    aria-label="Admin role"
                    disabled={isSelf || admin.isFounder}
                    value={admin.role}
                    onChange={(e) => {
                      const newRole = e.target.value as AdminRole;
                      if (newRole !== admin.role) {
                        setRoleChangeConfirm({ admin, newRole });
                      }
                    }}
                    className="bg-white border-2 border-neutral-400 rounded-lg px-3 py-2 text-sm font-medium text-neutral-900 disabled:bg-neutral-200 disabled:text-neutral-500 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                  >
                    <option value="SUPER_ADMIN">SUPER_ADMIN</option>
                    <option value="DEPARTMENT_ADMIN">DEPARTMENT_ADMIN</option>
                    <option value="CONTENT_ADMIN">CONTENT_ADMIN</option>
                  </select>
                )}

                {/* REMOVE BUTTON */}
                {!isSelf && !admin.isFounder && (
                  <button
                    onClick={() => setConfirmAdmin(admin)}
                    className="px-4 py-2 bg-red-100 text-red-700 rounded-lg hover:bg-red-600 hover:text-white font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-red-200"
                  >
                   Remove
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Role Change Confirmation Modal */}
      {roleChangeConfirm && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border-2 border-neutral-400 rounded-xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in duration-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-12 w-12 bg-orange-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-2xl">⚡</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  Confirm Role Change
                </h3>
                <p className="text-sm text-neutral-700">
                  Change <strong className="text-neutral-900">{roleChangeConfirm.admin.name}</strong>'s role from{" "}
                  <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded font-semibold">{roleChangeConfirm.admin.role}</span> to{" "}
                  <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded font-semibold">{roleChangeConfirm.newRole}</span>?
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setRoleChangeConfirm(null)}
                className="px-5 py-2.5 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300 transition-all duration-200 font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={changeRoleConfirmed}
                className="px-5 py-2.5 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition-all duration-200 font-semibold hover:shadow-lg hover:shadow-orange-200"
              >
                Confirm Change
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Remove Admin Confirmation Modals */}
      {confirmAdmin && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border-2 border-neutral-400 rounded-xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in duration-200">
            {confirmStep === 1 ? (
              <>
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-2xl">⚠️</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-neutral-900 mb-2">
                      Remove Admin?
                    </h3>
                    <p className="text-sm text-neutral-700">
                      You are about to remove{" "}
                      <strong className="text-neutral-900">{confirmAdmin.name}</strong> ({confirmAdmin.email})
                    </p>
                  </div>
                </div>

                <div className="flex justify-end gap-3">
                  <button
                    onClick={() => setConfirmAdmin(null)}
                    className="px-5 py-2.5 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300 transition-all duration-200 font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={() => setConfirmStep(2)}
                    className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold hover:shadow-lg hover:shadow-red-200"
                  >
                    Yes, Remove
                  </button>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-start gap-4 mb-4">
                  <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center shrink-0 animate-pulse">
                    <span className="text-2xl">🚨</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-red-600 mb-2">
                      ⚠️ Final Confirmation
                    </h3>
                    <p className="text-sm text-neutral-700">
                      This will <strong className="text-red-600">permanently remove</strong>{" "}
                      <strong className="text-neutral-900">{confirmAdmin.name}</strong> and revoke all access. This action cannot be undone.
                    </p>
                  </div>
                </div>

                <div className="flex justify-between gap-3">
                  <button
                    onClick={removeConfirmed}
                    className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold hover:shadow-lg hover:shadow-red-200"
                  >
                    Confirm Remove
                  </button>
                  <button
                    onClick={() => {
                      setConfirmStep(1);
                      setConfirmAdmin(null);
                    }}
                    className="px-5 py-2.5 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300 transition-all duration-200 font-semibold"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
}
