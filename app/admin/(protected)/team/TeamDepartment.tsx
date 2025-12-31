// // app/admin/(protected)/team/TeamDepartment.tsx
// "use client";

// import { useEffect, useState } from "react";
// import TeamMemberRow from "./TeamMemberRow";
// import EditToolbar from "./EditToolbar";
// import { TeamMember, DepartmentRole } from "./types";
// import { Department } from "@prisma/client";

// type Props = {
//   department: Department | null;
//   title?: string;
//   description?: string;
//   canEdit: boolean;
//   allowFreeRoles: boolean;
// };

// export default function TeamDepartment({
//   department,
//   title,
//   description,
//   canEdit,
//   allowFreeRoles,
// }: Props) {
//   const [members, setMembers] = useState<TeamMember[]>([]);
//   const [localMembers, setLocalMembers] = useState<TeamMember[]>([]);
//   const [editing, setEditing] = useState(false);
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState("");
//   const [allMembers, setAllMembers] = useState<TeamMember[]>([]); // For duplicate check

//   const sectionTitle = title || department || "Unknown";

//   // Fetch members on mount
//   useEffect(() => {
//     setLoading(true);
//     setError("");

//     fetch("/api/admin/team")
//       .then((res) => {
//         if (!res.ok) throw new Error("Failed to fetch");
//         return res.json();
//       })
//       .then((data) => {
//         setAllMembers(data); // Store all members for duplicate check
//         const filtered = data.filter(
//           (m: TeamMember) => m.department === department
//         );
//         setMembers(filtered);
//         setLoading(false);
//       })
//       .catch(() => {
//         setError("Failed to load members");
//         setLoading(false);
//       });
//   }, [department]);

//   function startEdit() {
//     // Deep clone to avoid reference issues
//     setLocalMembers(JSON.parse(JSON.stringify(members)));
//     setEditing(true);
//     setError("");
//   }

//   function cancelEdit() {
//     // Check if changes were made
//     const hasChanges = JSON.stringify(members) !== JSON.stringify(localMembers);

//     if (hasChanges && !confirm("Discard unsaved changes?")) {
//       return;
//     }

//     setEditing(false);
//     setLocalMembers([]);
//     setError("");
//   }

//   function addMember() {
//     const newMember: TeamMember = {
//       id: `temp-${Date.now()}`,
//       name: "",
//       email: "",
//       role: allowFreeRoles ? "" : "Volunteer",
//       imageLink: null,
//       linkedinLink: null,
//       department,
//       orderIndex: localMembers.length,
//     };
//     setLocalMembers([...localMembers, newMember]);
//   }

//   async function publish() {
//     setError("");

//     // Check if any changes were made
//     const hasChanges = JSON.stringify(members) !== JSON.stringify(localMembers);
//     if (!hasChanges) {
//       setEditing(false);
//       return; // No changes, just exit edit mode
//     }

//     // Validation 1: Check if any member has empty required fields
//     let hasEmptyFields = false;
//     for (const member of localMembers) {
//       if (!member.name?.trim() || !member.email?.trim() || !member.role?.trim()) {
//         hasEmptyFields = true;
//         break;
//       }
//     }

//     if (hasEmptyFields) {
//       // If any required field is empty, treat it like cancel
//       if (confirm("Some members have empty required fields. Cancel editing?")) {
//         setEditing(false);
//         setLocalMembers([]);
//         setError("");
//       } else {
//         setError("Please fill all required fields (Name, Email, Role) or cancel");
//       }
//       return;
//     }

//     // Validation 2: Check required fields are filled
//     for (const member of localMembers) {
//       if (!member.name?.trim()) {
//         setError("All members must have a name");
//         return;
//       }
//       if (!member.email?.trim() || !member.email.includes("@")) {
//         setError("All members must have a valid email");
//         return;
//       }
//       if (!member.role?.trim()) {
//         setError("All members must have a role");
//         return;
//       }
//     }

//     // Validation 3: Check for duplicate emails in SAME department
//     const emailsInThisDept = localMembers.map((m) => m.email.toLowerCase().trim());
//     const duplicatesInSameDept = emailsInThisDept.filter(
//       (email, index) => emailsInThisDept.indexOf(email) !== index
//     );

//     if (duplicatesInSameDept.length > 0) {
//       setError(
//         `Duplicate emails in this ${department ? "department" : "section"}: ${duplicatesInSameDept.join(", ")}`
//       );
//       return;
//     }

//     // Validation 4: Warn if email exists in OTHER departments
//     const otherDeptMembers = allMembers.filter((m) => m.department !== department);
//     const duplicatesInOtherDepts = localMembers.filter((local) =>
//       otherDeptMembers.some(
//         (other) => other.email.toLowerCase().trim() === local.email.toLowerCase().trim()
//       )
//     );

//     if (duplicatesInOtherDepts.length > 0) {
//       const names = duplicatesInOtherDepts.map((m) => m.name || m.email).join(", ");
//       if (
//         !confirm(
//           `Warning: ${names} already exist(s) in other department(s). They can be in multiple departments. Continue?`
//         )
//       ) {
//         return;
//       }
//     }

//     // Final confirmation
//     if (!confirm("Save changes and publish?")) {
//       return;
//     }

//     setSaving(true);

//     try {
//       const res = await fetch("/api/admin/team/publish", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           department,
//           members: localMembers,
//         }),
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         setError(data.error || "Failed to save");
//         setSaving(false);
//         return;
//       }

//       // Success - reload all members to update duplicate check
//       const refreshRes = await fetch("/api/admin/team");
//       if (refreshRes.ok) {
//         const refreshedData = await refreshRes.json();
//         setAllMembers(refreshedData);
//         const filtered = refreshedData.filter(
//           (m: TeamMember) => m.department === department
//         );
//         setMembers(filtered);
//       } else {
//         setMembers(localMembers);
//       }

//       setEditing(false);
//       setSaving(false);
//     } catch (err) {
//       setError("Network error. Please try again.");
//       setSaving(false);
//     }
//   }

//   const displayMembers = editing ? localMembers : members;
//   const hod = displayMembers.find((m) => m.role === "Head of Department");
//   const rest = displayMembers.filter((m) => m.role !== "Head of Department");

//   if (loading) {
//     return (
//       <section className="border border-gray-800 rounded p-6">
//         <p className="text-gray-400">Loading {sectionTitle}...</p>
//       </section>
//     );
//   }

//   return (
//     <section className="border border-gray-800 rounded p-6 space-y-4">
//       {/* Header */}
//       <div className="flex justify-between items-center">
//         <div>
//           <h2 className="text-xl font-semibold">{sectionTitle}</h2>
//           {description && (
//             <p className="text-sm text-gray-400 mt-1">{description}</p>
//           )}
//         </div>
//         {!editing && canEdit && (
//           <button
//             onClick={startEdit}
//             className="px-3 py-1.5 text-blue-400 border border-blue-400 rounded hover:bg-blue-400/10 transition"
//           >
//             Edit {department ? "Department" : "Leadership"}
//           </button>
//         )}
//         {!canEdit && (
//           <span className="text-sm text-gray-500">View Only</span>
//         )}
//       </div>

//       {/* Error Message */}
//       {error && (
//         <div className="bg-red-500/10 border border-red-500 rounded p-3 text-sm text-red-400">
//           {error}
//         </div>
//       )}

//       {/* Edit Toolbar */}
//       {editing && (
//         <EditToolbar onSave={publish} onCancel={cancelEdit} saving={saving} />
//       )}

//       {/* HOD Section (only for departments) */}
//       {department && hod && (
//         <>
//           <h3 className="text-sm font-medium text-green-400">
//             Head of Department
//           </h3>
//           <TeamMemberRow
//             member={hod}
//             editable={editing}
//             members={localMembers}
//             setMembers={setLocalMembers}
//             allowFreeRoles={allowFreeRoles}
//             isHod
//           />
//         </>
//       )}

//       {/* Members Section */}
//       <h3 className="text-sm font-medium text-gray-400 mt-4">
//         {department
//           ? `Members (${rest.length})`
//           : `Positions (${displayMembers.length})`}
//       </h3>

//       {(department ? rest : displayMembers).length > 0 ? (
//         (department ? rest : displayMembers).map((m) => (
//           <TeamMemberRow
//             key={m.id}
//             member={m}
//             editable={editing}
//             members={localMembers}
//             setMembers={setLocalMembers}
//             allowFreeRoles={allowFreeRoles}
//           />
//         ))
//       ) : (
//         <p className="text-sm text-gray-500">No members yet</p>
//       )}

//       {/* Add Member Button */}
//       {editing && (
//         <button
//           onClick={addMember}
//           className="w-full py-2 border-2 border-dashed border-gray-700 rounded hover:border-gray-500 hover:bg-gray-800/50 text-green-400 transition"
//         >
//           + Add Member
//         </button>
//       )}
//     </section>
//   );
// }

// app/admin/(protected)/team/TeamDepartment.tsx
"use client";

import { useEffect, useState } from "react";
import TeamMemberRow from "./TeamMemberRow";
import EditToolbar from "./EditToolbar";
import { TeamMember, DepartmentRole } from "./types";
import { Department } from "@prisma/client";
import { Users, Shield, Eye } from "lucide-react";

type Props = {
  department: Department | null;
  title?: string;
  description?: string;
  canEdit: boolean;
  allowFreeRoles: boolean;
};

export default function TeamDepartment({
  department,
  title,
  description,
  canEdit,
  allowFreeRoles,
}: Props) {
  const [members, setMembers] = useState<TeamMember[]>([]);
  const [localMembers, setLocalMembers] = useState<TeamMember[]>([]);
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [allMembers, setAllMembers] = useState<TeamMember[]>([]);

  const sectionTitle = title || department || "Unknown";

  // Fetch members on mount
  useEffect(() => {
    setLoading(true);
    setError("");

    fetch("/api/admin/team")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        setAllMembers(data);
        const filtered = data.filter(
          (m: TeamMember) => m.department === department
        );
        setMembers(filtered);
        setLoading(false);
      })
      .catch(() => {
        setError("Failed to load members");
        setLoading(false);
      });
  }, [department]);

  function startEdit() {
    setLocalMembers(JSON.parse(JSON.stringify(members)));
    setEditing(true);
    setError("");
  }

  function cancelEdit() {
    const hasChanges = JSON.stringify(members) !== JSON.stringify(localMembers);

    if (hasChanges && !confirm("Discard unsaved changes?")) {
      return;
    }

    setEditing(false);
    setLocalMembers([]);
    setError("");
  }

  function addMember() {
    const newMember: TeamMember = {
      id: `temp-${Date.now()}`,
      name: "",
      email: "",
      role: allowFreeRoles ? "" : "Volunteer",
      imageLink: null,
      linkedinLink: null,
      department,
      orderIndex: localMembers.length,
    };
    setLocalMembers([...localMembers, newMember]);
  }

  async function publish() {
    setError("");

    const hasChanges = JSON.stringify(members) !== JSON.stringify(localMembers);
    if (!hasChanges) {
      setEditing(false);
      return;
    }

    let hasEmptyFields = false;
    for (const member of localMembers) {
      if (!member.name?.trim() || !member.email?.trim() || !member.role?.trim()) {
        hasEmptyFields = true;
        break;
      }
    }

    if (hasEmptyFields) {
      if (confirm("Some members have empty required fields. Cancel editing?")) {
        setEditing(false);
        setLocalMembers([]);
        setError("");
      } else {
        setError("Please fill all required fields (Name, Email, Role) or cancel");
      }
      return;
    }

    for (const member of localMembers) {
      if (!member.name?.trim()) {
        setError("All members must have a name");
        return;
      }
      if (!member.email?.trim() || !member.email.includes("@")) {
        setError("All members must have a valid email");
        return;
      }
      if (!member.role?.trim()) {
        setError("All members must have a role");
        return;
      }
    }

    const emailsInThisDept = localMembers.map((m) => m.email.toLowerCase().trim());
    const duplicatesInSameDept = emailsInThisDept.filter(
      (email, index) => emailsInThisDept.indexOf(email) !== index
    );

    if (duplicatesInSameDept.length > 0) {
      setError(
        `Duplicate emails in this ${department ? "department" : "section"}: ${duplicatesInSameDept.join(", ")}`
      );
      return;
    }

    const otherDeptMembers = allMembers.filter((m) => m.department !== department);
    const duplicatesInOtherDepts = localMembers.filter((local) =>
      otherDeptMembers.some(
        (other) => other.email.toLowerCase().trim() === local.email.toLowerCase().trim()
      )
    );

    if (duplicatesInOtherDepts.length > 0) {
      const names = duplicatesInOtherDepts.map((m) => m.name || m.email).join(", ");
      if (
        !confirm(
          `Warning: ${names} already exist(s) in other department(s). They can be in multiple departments. Continue?`
        )
      ) {
        return;
      }
    }

    if (!confirm("Save changes and publish?")) {
      return;
    }

    setSaving(true);

    try {
      const res = await fetch("/api/admin/team/publish", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          department,
          members: localMembers,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || "Failed to save");
        setSaving(false);
        return;
      }

      const refreshRes = await fetch("/api/admin/team");
      if (refreshRes.ok) {
        const refreshedData = await refreshRes.json();
        setAllMembers(refreshedData);
        const filtered = refreshedData.filter(
          (m: TeamMember) => m.department === department
        );
        setMembers(filtered);
      } else {
        setMembers(localMembers);
      }

      setEditing(false);
      setSaving(false);
    } catch (err) {
      setError("Network error. Please try again.");
      setSaving(false);
    }
  }

  const displayMembers = editing ? localMembers : members;
  const hod = displayMembers.find((m) => m.role === "Head of Department");
  const rest = displayMembers.filter((m) => m.role !== "Head of Department");

  if (loading) {
    return (
      <section className="bg-white border-2 border-neutral-400 rounded-xl p-8 shadow-md">
        <div className="flex items-center justify-center">
          <div className="animate-spin h-8 w-8 border-4 border-neutral-300 border-t-blue-600 rounded-full"></div>
          <p className="text-neutral-600 ml-3">Loading {sectionTitle}...</p>
        </div>
      </section>
    );
  }

  return (
    <section className="bg-white border-2 border-neutral-400 rounded-xl p-6 shadow-md transition-all duration-200 hover:shadow-lg">
      {/* Header */}
      <div className="flex justify-between items-start mb-6">
        <div className="flex items-start gap-3">
          <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
            <Users className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-neutral-900">{sectionTitle}</h2>
            {description && (
              <p className="text-sm text-neutral-600 mt-1">{description}</p>
            )}
            <div className="flex items-center gap-2 mt-2">
              <span className="text-xs bg-neutral-200 text-neutral-700 px-2 py-1 rounded-full font-medium">
                {displayMembers.length} {displayMembers.length === 1 ? "Member" : "Members"}
              </span>
              {hod && (
                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full font-medium">
                  ✓ HOD Assigned
                </span>
              )}
            </div>
          </div>
        </div>

        {!editing && canEdit && (
          <button
            onClick={startEdit}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-all duration-200 hover:shadow-lg hover:shadow-blue-200 hover:-translate-y-0.5 flex items-center gap-2"
          >
            <Shield className="w-4 h-4" />
            Edit {department ? "Department" : "Leadership"}
          </button>
        )}
        {!canEdit && (
          <span className="text-sm text-neutral-500 bg-neutral-100 px-3 py-2 rounded-lg flex items-center gap-2">
            <Eye className="w-4 h-4" />
            View Only
          </span>
        )}
      </div>

      {/* Error Message */}
      {error && (
        <div className="bg-red-50 border-2 border-red-300 rounded-lg p-4 mb-4 flex items-start gap-3">
          <span className="text-2xl">⚠️</span>
          <div>
            <p className="font-semibold text-red-800 mb-1">Error</p>
            <p className="text-sm text-red-700">{error}</p>
          </div>
        </div>
      )}

      {/* Edit Toolbar */}
      {editing && (
        <div className="mb-6">
          <EditToolbar onSave={publish} onCancel={cancelEdit} saving={saving} />
        </div>
      )}

      {/* HOD Section */}
      {department && hod && (
        <div className="mb-6">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-2 w-2 bg-green-500 rounded-full"></div>
            <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
              Head of Department
            </h3>
          </div>
          <TeamMemberRow
            member={hod}
            editable={editing}
            members={localMembers}
            setMembers={setLocalMembers}
            allowFreeRoles={allowFreeRoles}
            isHod
          />
        </div>
      )}

      {/* Members Section */}
      <div>
        <div className="flex items-center gap-2 mb-3">
          <div className="h-2 w-2 bg-blue-500 rounded-full"></div>
          <h3 className="text-sm font-bold text-neutral-900 uppercase tracking-wide">
            {department ? `Members (${rest.length})` : `Positions (${displayMembers.length})`}
          </h3>
        </div>

        <div className="space-y-3">
          {(department ? rest : displayMembers).length > 0 ? (
            (department ? rest : displayMembers).map((m) => (
              <TeamMemberRow
                key={m.id}
                member={m}
                editable={editing}
                members={localMembers}
                setMembers={setLocalMembers}
                allowFreeRoles={allowFreeRoles}
              />
            ))
          ) : (
            <div className="text-center py-8 bg-neutral-50 rounded-lg border-2 border-dashed border-neutral-300">
              <span className="text-4xl mb-2 block">👤</span>
              <p className="text-sm text-neutral-500 font-medium">No members yet</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Member Button */}
      {editing && (
        <button
          onClick={addMember}
          className="w-full mt-4 py-3 border-2 border-dashed border-neutral-400 rounded-lg hover:border-green-500 hover:bg-green-50 text-green-600 font-semibold transition-all duration-200 flex items-center justify-center gap-2"
        >
          <span className="text-xl">+</span>
          Add Member
        </button>
      )}
    </section>
  );
}

