// // app/(public)/team/MemberCard.tsx
// "use client";

// import { TeamMember } from "@prisma/client";
// import { Linkedin, User } from "lucide-react";
// import Image from "next/image";
// import { useState } from "react";

// type Props = {
//   member: TeamMember;
//   highlight?: boolean;
// };

// export default function MemberCard({ member, highlight = false }: Props) {
//   const [imageError, setImageError] = useState(false);
//   const hasImage = member.imageLink && !imageError;

//   return (
//     <div
//       className={`group relative rounded-2xl border overflow-hidden transition-all duration-300 hover:scale-[1.02] ${
//         highlight
//           ? "border-indigo-500/30 bg-linear-to-b from-indigo-500/5 to-transparent hover:border-indigo-500/50"
//           : "border-gray-800 bg-gray-900/50 hover:border-gray-700"
//       }`}
//     >
//       {/* Hover Glow Effect */}
//       <div className="absolute inset-0 bg-linear-to-b from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

//       {/* Profile Image */}
//       <div className="relative aspect-square bg-linear-to-br from-gray-800 to-gray-900 overflow-hidden">
//         {hasImage ? (
//           <Image
//             src={member.imageLink!}
//             alt={member.name}
//             fill
//             className="object-cover transition-transform duration-300 group-hover:scale-110"
//             onError={() => setImageError(true)}
//           />
//         ) : (
//           <div className="absolute inset-0 flex items-center justify-center">
//             <User size={64} className="text-gray-700" />
//           </div>
//         )}

//         {/* LinkedIn Overlay */}
//         {member.linkedinLink && (
//           <a
//             href={member.linkedinLink}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="absolute top-4 right-4 p-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20 opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white/20 hover:scale-110"
//             aria-label="LinkedIn Profile"
//           >
//             <Linkedin size={18} className="text-white" />
//           </a>
//         )}

//         {/* Role Badge */}
//         <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-black/80 to-transparent p-4">
//           <span
//             className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${
//               member.role === "Head of Department"
//                 ? "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30"
//                 : member.role === "Core Member"
//                 ? "bg-blue-500/20 text-blue-400 border border-blue-500/30"
//                 : "bg-gray-500/20 text-gray-400 border border-gray-500/30"
//             }`}
//           >
//             {member.role}
//           </span>
//         </div>
//       </div>

//       {/* Member Info */}
//       <div className="p-5 space-y-2">
//         <h3 className="text-xl font-semibold text-white group-hover:text-indigo-400 transition-colors">
//           {member.name}
//         </h3>
//         <p className="text-gray-400 text-sm">{member.email}</p>
//       </div>
//     </div>
//   );
// }

// app/(public)/team/MemberCard.tsx
"use client";

import { TeamMember } from "@prisma/client";
import { Linkedin, User } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";

type Props = {
  member: TeamMember;
  highlight?: boolean;
};

// === 1. ADD THIS HELPER FUNCTION ===
const getValidUrl = (url: string | null | undefined) => {
  if (!url) return "#";
  if (url.startsWith("http://") || url.startsWith("https://")) {
    return url;
  }
  return `https://${url}`;
};


export default function MemberCard({ member, highlight = false }: Props) {
  const [imageError, setImageError] = useState(false);
  const hasImage = member.imageLink && !imageError;

  return (
    <motion.div
      whileHover={{ y: -8 }}
      className={`group relative bg-[#f4f1ea] rounded-sm overflow-hidden border transition-all duration-500 ${
        highlight
          ? "border-[#bc6c25] shadow-[0_8px_30px_rgba(188,108,37,0.15)]"
          : "border-[#d4c5b0] shadow-md hover:shadow-xl hover:border-[#bc6c25]/50"
      }`}
    >
      {/* Image Section with Vintage Effect */}
      <div className="relative aspect-4/5 overflow-hidden border-b border-[#d4c5b0] bg-[#e8e4db]">
        {hasImage ? (
          <Image
            src={member.imageLink!}
            alt={member.name}
            unoptimized // added this to handle non-authorised image links
            fill
            className="object-cover transition-all duration-700 group-hover:scale-105 sepia-[0.3] contrast-[1.1] group-hover:sepia-0 group-hover:contrast-100"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center opacity-20">
            <User size={64} className="text-amber-900" />
          </div>
        )}

        {/* Paper Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')] opacity-20 mix-blend-multiply pointer-events-none" />
        
        {/* Gradient Overlay for Text Readability */}
        <div className="absolute inset-0 bg-linear-to-t from-[#2a1c0f]/90 via-transparent to-transparent opacity-80" />

        {/* LinkedIn "Stamp" */}
{member.linkedinLink && (
  <a
    href={getValidUrl(member.linkedinLink)} // === 2. USE HELPER HERE ===
    target="_blank"
    rel="noopener noreferrer"
    className="absolute top-4 right-4 px-3 py-2 bg-white/40 backdrop-blur-md rounded-full border 
    border-blue-500/90 opacity-0 group-hover:opacity-100 transition-all duration-500 
    hover:bg-[#0077b5] hover:border-transparent hover:scale-110 flex items-center gap-2"
    aria-label="LinkedIn Profile"
  >
    <span className="text-neutral-700 text-xs font-medium uppercase tracking-wider">Contact</span>
    <Linkedin size={16} className="text-blue-400" />
  </a>
)}


        {/* Role Badge (Over Image) */}
        <div className="absolute bottom-4 left-4 right-4">
           <span
            className={`inline-block px-2 py-1 text-[10px] font-bold uppercase tracking-widest rounded-sm backdrop-blur-md border ${
              member.role === "Head of Department"
                ? "bg-amber-100/10 text-amber-100 border-amber-200/30"
                : "bg-white/10 text-white/80 border-white/20"
            }`}
          >
            {member.role}
          </span>
        </div>
      </div>

      {/* Info Section */}
      <div className="p-5 text-center relative">
        <h3 className="text-xl font-serif font-bold text-[#2a1c0f] group-hover:text-[#bc6c25] transition-colors">
          {member.name}
        </h3>
        <p className="text-xs font-mono text-amber-900/40 mt-1 uppercase tracking-wider truncate">
          {member.email}
        </p>
        
        {/* Decorative corner accents */}
        <div className="absolute top-2 left-2 w-2 h-2 border-t border-l border-[#d4c5b0]" />
        <div className="absolute top-2 right-2 w-2 h-2 border-t border-r border-[#d4c5b0]" />
        <div className="absolute bottom-2 left-2 w-2 h-2 border-b border-l border-[#d4c5b0]" />
        <div className="absolute bottom-2 right-2 w-2 h-2 border-b border-r border-[#d4c5b0]" />
      </div>
    </motion.div>
  );
}