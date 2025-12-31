// // app/(public)/team/page.tsx
// import { prisma } from "@/db/client";
// import { Department } from "@prisma/client";
// import DepartmentSection from "./DepartmentSection";
// import SocietyLeadership from "./SocietyLeadership";
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";

// export const metadata = {
//   title: "Our Team | VERITAS",
//   description: "Meet the brilliant minds behind VERITAS - Truth Seeker Protocol",
// };

// export default async function TeamPage() {
//   // Fetch all approved team members
//   const allMembers = await prisma.teamMember.findMany({
//     orderBy: [
//       { department: "asc" },
//       { orderIndex: "asc" },
//     ],
//   });

//   // Separate society leadership (department = null) from departments
//   const societyLeadership = allMembers.filter((m) => m.department === null);
//   const departmentMembers = allMembers.filter((m) => m.department !== null);

//   // Group by department
//   const membersByDepartment: Record<Department, typeof allMembers> = {
//     EVENTS: [],
//     RESEARCH: [],
//     WEBOPS: [],
//     CREATIVE: [],
//     PR: [],
//   };

//   departmentMembers.forEach((member) => {
//     if (member.department) {
//       membersByDepartment[member.department].push(member);
//     }
//   });

//   return (
//     <main className="min-h-screen bg-black text-white">
//       {/* Gradient Background */}
//       <div className="fixed inset-0 -z-10">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[24px_24px]"></div>
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-200 h-200 bg-indigo-500/20 rounded-full blur-[120px]"></div>
//       </div>

//       {/* Header */}
//       <div className="relative border-b border-gray-800 bg-black/50 backdrop-blur-xl">
//         <div className="max-w-7xl mx-auto px-4 py-8">
//           <Link
//             href="/"
//             className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-6"
//           >
//             <ArrowLeft size={18} />
//             <span>Back to Home</span>
//           </Link>

//           <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-linear-to-b from-white via-white to-gray-600">
//             Our Team
//           </h1>
//           <p className="text-gray-400 text-lg mt-4 max-w-2xl">
//             The brilliant minds driving intellectual discourse and debate culture at VERITAS.
//           </p>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-7xl mx-auto px-4 py-16 space-y-24">
//         {/* Society Leadership */}
//         {societyLeadership.length > 0 && (
//           <SocietyLeadership members={societyLeadership} />
//         )}

//         {/* Departments */}
//         {Object.entries(membersByDepartment).map(([dept, members]) => {
//           if (members.length === 0) return null;
//           return (
//             <DepartmentSection
//               key={dept}
//               department={dept as Department}
//               members={members}
//             />
//           );
//         })}
//       </div>

//       {/* Footer */}
//       <div className="border-t border-gray-800 mt-24">
//         <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
//           © 2025 VERITAS • Truth Seeker Protocol
//         </div>
//       </div>
//     </main>
//   );
// }

// app/(public)/team/page.tsx
import { prisma } from "@/db/client";
import { Department } from "@prisma/client";
import DepartmentSection from "./DepartmentSection";
import SocietyLeadership from "./SocietyLeadership";
import MagneticCursor from "@/components/effects/MagneticCursor";
import ParchmentBackground from "@/components/effects/ParchmentBackground";
import Navbar from "@/components/navbar/Navbar";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export const metadata = {
  title: "Our Team | VERITAS",
  description: "Meet the brilliant minds behind VERITAS - Truth Seeker Protocol",
};

export default async function TeamPage() {
  // Fetch all approved team members
  const allMembers = await prisma.teamMember.findMany({
    orderBy: [
      { department: "asc" },
      { orderIndex: "asc" },
    ],
  });

  // Separate society leadership (department = null) from departments
  const societyLeadership = allMembers.filter((m) => m.department === null);
  const departmentMembers = allMembers.filter((m) => m.department !== null);

  // Group by department
  const membersByDepartment: Record<Department, typeof allMembers> = {
    EVENTS: [],
    RESEARCH: [],
    WEBOPS: [],
    CREATIVE: [],
    PR: [],
  };

  departmentMembers.forEach((member) => {
    if (member.department) {
      membersByDepartment[member.department].push(member);
    }
  });

  return (
    <main className="min-h-screen bg-[#fdfcf8] selection:bg-[#bc6c25] selection:text-white">
      <MagneticCursor />
      <ParchmentBackground />
      <Navbar />

      {/* Header */}
      <div className="relative pt-32 pb-16 px-6 text-center z-10">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-900/40 hover:text-amber-900 transition-colors mb-8 font-mono text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={14} />
            <span>Return Home</span>
          </Link>

          <h1 className="text-7xl md:text-9xl font-serif font-black tracking-tight text-[#2a1c0f] mb-6">
            OUR TEAM
          </h1>
          <div className="w-24 h-1 bg-[#bc6c25] mx-auto mb-6"></div>
          <p className="text-xl md:text-2xl font-serif text-amber-900/60 max-w-2xl mx-auto leading-relaxed">
            The architects of discourse. The voices of reason. <br/>
            Meet the minds behind Veritas.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-6 pb-32 space-y-32 relative z-10">
        
        {/* Society Leadership */}
        {societyLeadership.length > 0 && (
          <SocietyLeadership members={societyLeadership} />
        )}

        {/* Departments - Vertical Stack */}
        <div className="space-y-20">
            {Object.entries(membersByDepartment).map(([dept, members]) => {
            if (members.length === 0) return null;
            return (
                <DepartmentSection
                key={dept}
                department={dept as Department}
                members={members}
                />
            );
            })}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-amber-900/10 mt-12 bg-[#f4f1ea] relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
           <p className="font-mono text-xs text-amber-900/40 uppercase tracking-[0.2em]">
             © 2025 VERITAS • Truth Seeker Protocol
           </p>
        </div>
      </div>
    </main>
  );
}
