// // app/(public)/vsd/page.tsx
// import { prisma } from "@/db/client";
// import VSDList from "./VSDList";
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";

// export const metadata = {
//   title: "Veritas Speaking Digest | VERITAS",
//   description: "Browse and access all editions of Veritas Speaking Digest",
// };

// export default async function PublicVSDPage() {
//   const digests = await prisma.veritasDigest.findMany({
//     orderBy: [{ volume: "desc" }, { issue: "desc" }],
//   });

//   return (
//     <main className="min-h-screen bg-black text-white">
//       {/* Background */}
//       <div className="fixed inset-0 -z-10">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-purple-500/20 rounded-full blur-[120px]"></div>
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

//           <div className="flex items-center gap-3 mb-4">
//             <div className="p-3 bg-purple-500/10 border border-purple-500/20 rounded-xl">
//               <svg
//                 className="w-8 h-8 text-purple-400"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
//                 />
//               </svg>
//             </div>
//             <div>
//               <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-600">
//                 Veritas Speaking Digest
//               </h1>
//               <p className="text-gray-400 text-lg mt-2">
//                 Explore weekly dose of speaking brilliance with VSD editions.
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-7xl mx-auto px-4 py-12">
//         <VSDList digests={digests} />
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

import { prisma } from "@/db/client";
import { VSDListClient } from "@/components/veritas/vsd/vsd-ui"; // Import the client component
import MagneticCursor from "@/components/effects/MagneticCursor";
import ParchmentBackground from "@/components/effects/ParchmentBackground";
import Navbar from "@/components/navbar/Navbar";

export const metadata = {
  title: "Veritas Speaking Digest | VERITAS",
  description: "Browse and access all editions of Veritas Speaking Digest",
};

export default async function PublicVSDPage() {
  const digests = await prisma.veritasDigest.findMany({
    orderBy: [{ volume: "desc" }, { issue: "desc" }],
  });

  return (
    <main className="min-h-screen bg-[#fdfcf8] selection:bg-[#bc6c25] selection:text-white">
      
      <div className="hidden md:block">
        <MagneticCursor />
      </div>

      <ParchmentBackground />
      <Navbar />
      
      {/* Delegate rendering to Client Component */}
      <VSDListClient digests={digests} />
      
      {/* Footer */}
      <div className="border-t border-amber-900/10 mt-12 bg-[#f4f1ea]">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
           <p className="font-mono text-xs text-amber-900/40 uppercase tracking-[0.2em]">
             © 2025 VERITAS • Truth Seeker Protocol
           </p>
        </div>
      </div>
    </main>
  );
}
