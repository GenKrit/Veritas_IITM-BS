// // app/(public)/about/page.tsx
// import Link from "next/link";
// import { ArrowLeft, Target, Users, Lightbulb, Award } from "lucide-react";

// export const metadata = {
//   title: "About Us | VERITAS",
//   description: "Learn about VERITAS - Truth Seeker Protocol and our mission",
// };

// export default function AboutPage() {
//   return (
//     <main className="min-h-screen bg-black text-white">
//       {/* Background */}
//       <div className="fixed inset-0 -z-10">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-indigo-500/20 rounded-full blur-[120px]"></div>
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

//           <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-600">
//             About VERITAS
//           </h1>
//           <p className="text-gray-400 text-xl mt-4 max-w-3xl">
//             Truth Seeker Protocol • Dismantling Echo Chambers Through Intellectual Discourse
//           </p>
//         </div>
//       </div>

//       {/* Content */}
//       <div className="max-w-5xl mx-auto px-4 py-16 space-y-20">
//         {/* Mission Statement */}
//         <section className="space-y-6">
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 text-indigo-400">
//             <Target size={18} />
//             <span className="font-semibold">Our Mission</span>
//           </div>

//           <div className="prose prose-invert max-w-none">
//             <p className="text-xl text-gray-300 leading-relaxed">
//               VERITAS is an intellectual society dedicated to fostering critical thinking, 
//               rigorous debate, and the pursuit of truth through structured discourse. We believe 
//               that the best ideas emerge when challenged by diverse perspectives in an environment 
//               of mutual respect and intellectual honesty.
//             </p>
//           </div>
//         </section>

//         {/* Core Values */}
//         <section className="space-y-8">
//           <h2 className="text-3xl md:text-4xl font-bold">Core Values</h2>

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
//             {/* Value 1 */}
//             <div className="group p-6 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-indigo-500/50 transition-all">
//               <div className="w-12 h-12 bg-indigo-500/10 border border-indigo-500/20 rounded-lg flex items-center justify-center mb-4">
//                 <Lightbulb className="w-6 h-6 text-indigo-400" />
//               </div>
//               <h3 className="text-xl font-bold mb-3 text-white group-hover:text-indigo-400 transition-colors">
//                 Intellectual Honesty
//               </h3>
//               <p className="text-gray-400 leading-relaxed">
//                 We prioritize truth over comfort, encouraging members to question assumptions 
//                 and engage with ideas that challenge their worldview.
//               </p>
//             </div>

//             {/* Value 2 */}
//             <div className="group p-6 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-purple-500/50 transition-all">
//               <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/20 rounded-lg flex items-center justify-center mb-4">
//                 <Users className="w-6 h-6 text-purple-400" />
//               </div>
//               <h3 className="text-xl font-bold mb-3 text-white group-hover:text-purple-400 transition-colors">
//                 Diverse Perspectives
//               </h3>
//               <p className="text-gray-400 leading-relaxed">
//                 We bring together individuals from varied backgrounds, disciplines, and ideologies 
//                 to create a rich tapestry of thought and discussion.
//               </p>
//             </div>

//             {/* Value 3 */}
//             <div className="group p-6 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-emerald-500/50 transition-all">
//               <div className="w-12 h-12 bg-emerald-500/10 border border-emerald-500/20 rounded-lg flex items-center justify-center mb-4">
//                 <Target className="w-6 h-6 text-emerald-400" />
//               </div>
//               <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors">
//                 Evidence-Based Reasoning
//               </h3>
//               <p className="text-gray-400 leading-relaxed">
//                 Our discussions are grounded in facts, logic, and rigorous analysis, 
//                 ensuring that conclusions are well-supported and defensible.
//               </p>
//             </div>

//             {/* Value 4 */}
//             <div className="group p-6 bg-gray-900/50 border border-gray-800 rounded-xl hover:border-blue-500/50 transition-all">
//               <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center mb-4">
//                 <Award className="w-6 h-6 text-blue-400" />
//               </div>
//               <h3 className="text-xl font-bold mb-3 text-white group-hover:text-blue-400 transition-colors">
//                 Respectful Discourse
//               </h3>
//               <p className="text-gray-400 leading-relaxed">
//                 While we debate ideas vigorously, we maintain respect for individuals and 
//                 create a safe space for intellectual exploration.
//               </p>
//             </div>
//           </div>
//         </section>

//         {/* What We Do */}
//         <section className="space-y-8">
//           <h2 className="text-3xl md:text-4xl font-bold">What We Do</h2>

//           <div className="space-y-6">
//             <div className="p-6 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 border border-gray-800 rounded-xl">
//               <h3 className="text-xl font-semibold text-white mb-3">Structured Debates</h3>
//               <p className="text-gray-400 leading-relaxed">
//                 We organize formal debates on contemporary issues, providing a platform for 
//                 well-researched arguments and counter-arguments to be presented and examined.
//               </p>
//             </div>

//             <div className="p-6 bg-gradient-to-r from-purple-500/5 to-pink-500/5 border border-gray-800 rounded-xl">
//               <h3 className="text-xl font-semibold text-white mb-3">Discussion Forums</h3>
//               <p className="text-gray-400 leading-relaxed">
//                 Regular discussion sessions where members explore complex topics, share insights, 
//                 and engage in collaborative learning through guided conversations.
//               </p>
//             </div>

//                         <div className="p-6 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 border border-gray-800 rounded-xl">
//                           <h3 className="text-xl font-semibold text-white mb-3">Publishing & Research</h3>
//                           <p className="text-gray-400 leading-relaxed">
//                             Through our Veritas Speaking Digest and content platform, we publish essays
//                             and research that contribute to meaningful intellectual discourse.
//                           </p>
//                         </div>
//                       </div>
//                     </section>
//                   </div>
//                 </main>
//               );
//             }

// app/(public)/about/page.tsx
import MagneticCursor from "@/components/effects/MagneticCursor";
import ParchmentBackground from "@/components/effects/ParchmentBackground";
import Navbar from "@/components/navbar/Navbar";
import AboutUI from "@/components/veritas/about-ui"; // Import the client UI

export const metadata = {
  title: "About Us | VERITAS",
  description: "Learn about VERITAS - Truth Seeker Protocol and our mission",
};

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#fdfcf8] selection:bg-[#bc6c25] selection:text-white relative">
      
      <div className="hidden md:block">
        <MagneticCursor />
      </div>

      <ParchmentBackground />
      <Navbar />

      {/* Delegate rendering to Client Component for animations */}
      <AboutUI />

      {/* Footer */}
      <div className="border-t border-amber-900/10 bg-[#f4f1ea] relative z-10">
        <div className="max-w-7xl mx-auto px-6 py-12 text-center">
           <p className="font-mono text-xs text-amber-900/40 uppercase tracking-[0.2em]">
             © 2025 VERITAS • Truth Seeker Protocol
           </p>
        </div>
      </div>
    </main>
  );
}