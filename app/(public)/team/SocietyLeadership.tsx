// // app/(public)/team/SocietyLeadership.tsx
// import { TeamMember } from "@prisma/client";
// import MemberCard from "./MemberCard";
// import { Crown } from "lucide-react";

// type Props = {
//   members: TeamMember[];
// };

// export default function SocietyLeadership({ members }: Props) {
//   return (
//     <section className="space-y-8">
//       {/* Section Header */}
//       <div className="text-center space-y-3">
//         <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/20 bg-yellow-500/5 text-yellow-400">
//           <Crown size={18} />
//           <span className="font-medium">Society Leadership</span>
//         </div>
//         <h2 className="text-3xl md:text-4xl font-bold">
//           Leading the Truth Seekers
//         </h2>
//         <p className="text-gray-400 max-w-2xl mx-auto">
//           Our core leadership team steering the society's vision and mission.
//         </p>
//       </div>

//       {/* Members Grid */}
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
//         {members.map((member) => (
//           <MemberCard key={member.id} member={member} highlight />
//         ))}
//       </div>
//     </section>
//   );
// }

// app/(public)/team/SocietyLeadership.tsx
"use client";

import React, { useLayoutEffect, useRef } from "react";
import { TeamMember } from "@prisma/client";
import MemberCard from "./MemberCard";
import { Crown } from "lucide-react";
import { gsap } from "gsap";

export default function SocietyLeadership({ members }: { members: TeamMember[] }) {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(".leader-card",
        { y: 60, opacity: 0 },
        {
          y: 0, opacity: 1, stagger: 0.2, duration: 1, ease: "power3.out",
          scrollTrigger: { trigger: containerRef.current, start: "top 80%" }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="space-y-16 pb-12">
      {/* Section Header */}
      <div className="text-center space-y-6">
        <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-[#bc6c25]/30 bg-[#bc6c25]/5 text-[#bc6c25]">
          <Crown size={16} />
          <span className="text-xs font-bold uppercase tracking-widest">The Council</span>
        </div>
        
        <h2 className="text-5xl md:text-7xl font-serif font-black text-[#2a1c0f]">
          Society Leadership
        </h2>
        <p className="font-serif italic text-xl text-amber-900/60 max-w-2xl mx-auto">
          "The guardians of our charter, steering the society towards truth and eloquence."
        </p>
      </div>

      {/* Members Grid - Centered */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 justify-center max-w-6xl mx-auto">
        {members.map((member) => (
          <div key={member.id} className="leader-card">
            <MemberCard member={member} highlight />
          </div>
        ))}
      </div>
    </section>
  );
}
