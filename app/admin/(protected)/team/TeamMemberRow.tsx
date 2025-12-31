// // app/admin/(protected)/team/TeamMemberRow.tsx
// "use client";

// import { TeamMember, DepartmentRole } from "./types";
// import { Trash2 } from "lucide-react";

// type Props = {
//   member: TeamMember;
//   editable: boolean;
//   members: TeamMember[];
//   setMembers: (members: TeamMember[]) => void;
//   allowFreeRoles: boolean;
//   isHod?: boolean;
// };

// export default function TeamMemberRow({
//   member,
//   editable,
//   members,
//   setMembers,
//   allowFreeRoles,
//   isHod = false,
// }: Props) {
//   // Update field using ID comparison
//   function update(field: keyof TeamMember, value: string | null) {
//     setMembers(
//       members.map((m) =>
//         m.id === member.id ? { ...m, [field]: value } : m
//       )
//     );
//   }

//   function makeHod() {
//     setMembers(
//       members.map((m) => ({
//         ...m,
//         // If this member, make HOD
//         // If was HOD, make Core Member
//         // Otherwise keep existing role
//         role:
//           m.id === member.id
//             ? "Head of Department"
//             : m.role === "Head of Department"
//             ? "Core Member"
//             : m.role,
//       }))
//     );
//   }

//   function remove() {
//     if (!confirm(`Remove ${member.name || "this member"}?`)) return;
//     setMembers(members.filter((m) => m.id !== member.id));
//   }

//   const departmentRoles: DepartmentRole[] = [
//     "Volunteer",
//     "Core Member",
//     "Head of Department",
//   ];

//   return (
//     <div className="border border-gray-700 rounded p-3 space-y-2 bg-zinc-900/50">
//       {/* Row 1: Name & Email */}
//       <div className="flex gap-2">
//         <input
//           disabled={!editable}
//           value={member.name}
//           onChange={(e) => update("name", e.target.value)}
//           className="flex-1 bg-zinc-950 border border-gray-700 px-2 py-1.5 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//           placeholder="Full Name *"
//         />
//         <input
//           disabled={!editable}
//           type="email"
//           value={member.email}
//           onChange={(e) => update("email", e.target.value)}
//           className="flex-1 bg-zinc-950 border border-gray-700 px-2 py-1.5 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//           placeholder="Email *"
//         />
//       </div>

//       {/* Row 2: Role & LinkedIn */}
//       <div className="flex gap-2">
//         {allowFreeRoles ? (
//           // Free text role input for society leadership
//           <input
//             disabled={!editable}
//             value={member.role}
//             onChange={(e) => update("role", e.target.value)}
//             className="flex-1 bg-zinc-950 border border-gray-700 px-2 py-1.5 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//             placeholder="Role (e.g. Secretary, Deputy Secretary) *"
//           />
//         ) : (
//           // Dropdown for department roles (ALWAYS EDITABLE - removed isHod check)
//           <select
//           aria-label="Role"
//             disabled={!editable}
//             value={member.role}
//             onChange={(e) => update("role", e.target.value)}
//             className="flex-1 bg-zinc-950 border border-gray-700 px-2 py-1.5 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <option value="">Select Role *</option>
//             {departmentRoles.map((role) => (
//               <option key={role} value={role}>
//                 {role}
//               </option>
//             ))}
//           </select>
//         )}

//         <input
//           disabled={!editable}
//           type="url"
//           value={member.linkedinLink || ""}
//           onChange={(e) => update("linkedinLink", e.target.value)}
//           className="flex-1 bg-zinc-950 border border-gray-700 px-2 py-1.5 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//           placeholder="LinkedIn URL (optional)"
//         />
//       </div>

//       {/* Row 3: Image Link & Actions */}
//       <div className="flex gap-2 items-center">
//         <input
//           disabled={!editable}
//           type="url"
//           value={member.imageLink || ""}
//           onChange={(e) => update("imageLink", e.target.value)}
//           className="flex-1 bg-zinc-950 border border-gray-700 px-2 py-1.5 rounded disabled:opacity-50 disabled:cursor-not-allowed"
//           placeholder="Profile Image URL (optional)"
//         />

//         {editable && (
//           <div className="flex gap-2">
//             {/* Make HOD Button (only for departments, not society) */}
//             {!allowFreeRoles && !isHod && (
//               <button
//                 onClick={makeHod}
//                 className="px-3 py-1.5 text-xs border border-yellow-600 text-yellow-400 rounded hover:bg-yellow-600/10 transition whitespace-nowrap"
//               >
//                 Make HOD
//               </button>
//             )}

//             {/* Remove Button - CLEARER DESIGN */}
//             <button
//               onClick={remove}
//               className="px-3 py-1.5 bg-red-500/10 border border-red-500 text-red-400 rounded hover:bg-red-500/20 transition flex items-center gap-1.5 text-sm font-medium"
//               aria-label="Remove member"
//             >
//               <Trash2 size={14} />
//               Delete
//             </button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }


// app/admin/(protected)/team/TeamMemberRow.tsx
"use client";

import { TeamMember, DepartmentRole } from "./types";
import { Trash2, Crown } from "lucide-react";

type Props = {
  member: TeamMember;
  editable: boolean;
  members: TeamMember[];
  setMembers: (members: TeamMember[]) => void;
  allowFreeRoles: boolean;
  isHod?: boolean;
};

export default function TeamMemberRow({
  member,
  editable,
  members,
  setMembers,
  allowFreeRoles,
  isHod = false,
}: Props) {
  function update(field: keyof TeamMember, value: string | null) {
    setMembers(
      members.map((m) =>
        m.id === member.id ? { ...m, [field]: value } : m
      )
    );
  }

  function makeHod() {
    setMembers(
      members.map((m) => ({
        ...m,
        role:
          m.id === member.id
            ? "Head of Department"
            : m.role === "Head of Department"
            ? "Core Member"
            : m.role,
      }))
    );
  }

  function remove() {
    if (!confirm(`Remove ${member.name || "this member"}?`)) return;
    setMembers(members.filter((m) => m.id !== member.id));
  }

  const departmentRoles: DepartmentRole[] = [
    "Volunteer",
    "Core Member",
    "Head of Department",
  ];

  return (
    <div className={`
      bg-neutral-50 border-2 border-neutral-300 rounded-lg p-4 space-y-3
      transition-all duration-200
      ${editable ? 'hover:border-blue-400 hover:shadow-md' : ''}
      ${isHod ? 'border-green-400 bg-green-50' : ''}
    `}>
      {/* Row 1: Name & Email */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wide mb-1 block">
            Full Name *
          </label>
          <input
            disabled={!editable}
            value={member.name}
            onChange={(e) => update("name", e.target.value)}
            className="w-full bg-white border-2 border-neutral-300 text-neutral-900 px-3 py-2 rounded-lg disabled:bg-neutral-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="Your Name"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wide mb-1 block">
            Email *
          </label>
          <input
            disabled={!editable}
            type="email"
            value={member.email}
            onChange={(e) => update("email", e.target.value)}
            className="w-full bg-white border-2 border-neutral-300 text-neutral-900 px-3 py-2 rounded-lg disabled:bg-neutral-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="me@example.com"
          />
        </div>
      </div>

      {/* Row 2: Role & LinkedIn */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wide mb-1 block">
            Role *
          </label>
          {allowFreeRoles ? (
            <input
              disabled={!editable}
              value={member.role}
              onChange={(e) => update("role", e.target.value)}
              className="w-full bg-white border-2 border-neutral-300 text-neutral-900 px-3 py-2 rounded-lg disabled:bg-neutral-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              placeholder="Secretary, Deputy Secretary..."
            />
          ) : (
            <select
              aria-label="Role"
              disabled={!editable}
              value={member.role}
              onChange={(e) => update("role", e.target.value)}
              className="w-full bg-white border-2 border-neutral-300 text-neutral-900 px-3 py-2 rounded-lg disabled:bg-neutral-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            >
              <option value="">Select Role *</option>
              {departmentRoles.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          )}
        </div>
        <div>
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wide mb-1 block">
            LinkedIn URL
          </label>
          <input
            disabled={!editable}
            type="url"
            value={member.linkedinLink || ""}
            onChange={(e) => update("linkedinLink", e.target.value)}
            className="w-full bg-white border-2 border-neutral-300 text-blue-500 px-3 py-2 rounded-lg disabled:bg-neutral-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="URL to LinkedIn profile"
          />
        </div>
      </div>

      {/* Row 3: Image Link & Actions */}
      <div className="flex flex-col md:flex-row gap-3">
        <div className="flex-1">
          <label className="text-xs font-semibold text-neutral-600 uppercase tracking-wide mb-1 block">
            Profile Image URL
          </label>
          <input
            disabled={!editable}
            type="url"
            value={member.imageLink || ""}
            onChange={(e) => update("imageLink", e.target.value)}
            className="w-full bg-white border-2 border-neutral-300 text-blue-500 px-3 py-2 rounded-lg disabled:bg-neutral-100 disabled:cursor-not-allowed focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            placeholder="URL to profile image"
          />
        </div>

        {editable && (
          <div className="flex gap-2 items-end">
            {!allowFreeRoles && !isHod && (
              <button
                onClick={makeHod}
                className="px-4 py-2 bg-orange-100 border-2 border-orange-300 text-orange-700 rounded-lg hover:bg-orange-200 transition-all duration-200 font-semibold whitespace-nowrap flex items-center gap-2"
                aria-label="Make HOD"
              >
                <Crown className="w-4 h-4" />
                Make HOD
              </button>
            )}

            <button
              onClick={remove}
              className="px-4 py-2 bg-red-100 border-2 border-red-300 text-red-700 rounded-lg hover:bg-red-600 hover:text-white hover:border-red-600 transition-all duration-200 font-semibold flex items-center gap-2"
              aria-label="Remove member"
            >
              <Trash2 className="w-4 h-4" />
              Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
