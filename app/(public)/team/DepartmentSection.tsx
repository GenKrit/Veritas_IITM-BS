// // app/(public)/team/DepartmentSection.tsx
// import { Department, TeamMember } from "@prisma/client";
// import MemberCard from "./MemberCard";
// import { 
//   Calendar, 
//   Search, 
//   Code, 
//   Palette, 
//   Radio 
// } from "lucide-react";

// type Props = {
//   department: Department;
//   members: TeamMember[];
// };

// const departmentConfig: Record<
//   Department,
//   { icon: React.ReactNode; color: string; description: string }
// > = {
//   EVENTS: {
//     icon: <Calendar size={20} />,
//     color: "text-blue-400 border-blue-500/20 bg-blue-500/5",
//     description: "Orchestrating impactful debates and discussions",
//   },
//   RESEARCH: {
//     icon: <Search size={20} />,
//     color: "text-purple-400 border-purple-500/20 bg-purple-500/5",
//     description: "Deep-diving into topics that shape perspectives",
//   },
//   WEBOPS: {
//     icon: <Code size={20} />,
//     color: "text-green-400 border-green-500/20 bg-green-500/5",
//     description: "Building and maintaining our digital infrastructure",
//   },
//   CREATIVE: {
//     icon: <Palette size={20} />,
//     color: "text-pink-400 border-pink-500/20 bg-pink-500/5",
//     description: "Crafting compelling visuals and narratives",
//   },
//   PR: {
//     icon: <Radio size={20} />,
//     color: "text-orange-400 border-orange-500/20 bg-orange-500/5",
//     description: "Amplifying our message across channels",
//   },
// };

// export default function DepartmentSection({ department, members }: Props) {
//   const config = departmentConfig[department];

//   // Separate HOD from other members
//   const hod = members.find((m) => m.role === "Head of Department");
//   const otherMembers = members.filter((m) => m.role !== "Head of Department");

//   return (
//     <section className="space-y-8">
//       {/* Section Header */}
//       <div className="space-y-3">
//         <div
//           className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${config.color}`}
//         >
//           {config.icon}
//           <span className="font-medium">{department}</span>
//         </div>
//         <h2 className="text-3xl md:text-4xl font-bold">{department} Department</h2>
//         <p className="text-gray-400 max-w-2xl">{config.description}</p>
//       </div>

//       {/* HOD Section */}
//       {hod && (
//         <div className="space-y-4">
//           <h3 className="text-xl font-semibold text-gray-300">
//             Head of Department
//           </h3>
//           <div className="max-w-md">
//             <MemberCard member={hod} highlight />
//           </div>
//         </div>
//       )}

//       {/* Other Members */}
//       {otherMembers.length > 0 && (
//         <div className="space-y-4">
//           <h3 className="text-xl font-semibold text-gray-300">Team Members</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//             {otherMembers.map((member) => (
//               <MemberCard key={member.id} member={member} />
//             ))}
//           </div>
//         </div>
//       )}
//     </section>
//   );
// }


// app/(public)/team/DepartmentSection.tsx
"use client";

import React, { useLayoutEffect, useRef } from "react";
import { Department, TeamMember } from "@prisma/client";
import MemberCard from "./MemberCard";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { 
  Calendar, 
  Search, 
  Code, 
  Palette, 
  Radio,
  Users
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Props = {
  department: Department;
  members: TeamMember[];
};

const departmentConfig: Record<
  Department,
  { icon: React.ReactNode; description: string }
> = {
  EVENTS: {
    icon: <Calendar size={24} />,
    description: "Orchestrating impactful debates and discussions.",
  },
  RESEARCH: {
    icon: <Search size={24} />,
    description: "Deep-diving into topics that shape perspectives.",
  },
  WEBOPS: {
    icon: <Code size={24} />,
    description: "Building and maintaining our digital infrastructure.",
  },
  CREATIVE: {
    icon: <Palette size={24} />,
    description: "Crafting compelling visuals and narratives.",
  },
  PR: {
    icon: <Radio size={24} />,
    description: "Amplifying our message across channels.",
  },
};

export default function DepartmentSection({ department, members }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const config = departmentConfig[department] || { icon: <Users size={24}/>, description: "Department Team" };

  const hod = members.find((m) => m.role === "Head of Department");
  const otherMembers = members.filter((m) => m.role !== "Head of Department");

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".dept-header",
        { y: 30, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1,
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
        }
      );
      
      gsap.fromTo(".member-card-anim",
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.1, duration: 0.8,
          scrollTrigger: { trigger: containerRef.current, start: "top 75%" }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="space-y-12 py-12 border-t border-amber-900/10">
      {/* Section Header */}
      <div className="dept-header flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="space-y-4">
          <div className="inline-flex items-center gap-3 text-amber-900/60">
            <div className="p-3 bg-amber-900/5 rounded-full border border-amber-900/10">
              {config.icon}
            </div>
            <span className="font-mono text-xs uppercase tracking-[0.3em]">Department</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-serif font-black text-[#2a1c0f]">
            {department}
          </h2>
          <p className="text-xl font-serif italic text-amber-900/60 max-w-xl">
            {config.description}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {/* HOD Card - Takes up first slot, slightly larger visual weight handled by highlighting */}
        {hod && (
          <div className="member-card-anim lg:col-span-1">
             <div className="mb-4 flex items-center gap-2 text-[#bc6c25]">
                <div className="h-px flex-1 bg-[#bc6c25]/30"></div>
                <span className="text-[10px] font-bold uppercase tracking-widest">Head</span>
                <div className="h-px flex-1 bg-[#bc6c25]/30"></div>
             </div>
             <MemberCard member={hod} highlight />
          </div>
        )}

        {/* Other Members */}
        {otherMembers.map((member) => (
          <div key={member.id} className="member-card-anim">
             {hod && <div className="mb-4 h-4"></div>} {/* Spacer to align with HOD title */}
             <MemberCard member={member} />
          </div>
        ))}
      </div>
    </section>
  );
}