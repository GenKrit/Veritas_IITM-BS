// // app/(public)/content/page.tsx
// import Link from "next/link";
// import { ArrowLeft, FileText, Sparkles } from "lucide-react";

// export const metadata = {
//   title: "Content | VERITAS",
//   description: "Explore articles, essays, and thought pieces from VERITAS",
// };

// export default function PublicContentPage() {
//   return (
//     <main className="min-h-screen bg-black text-white">
//       {/* Background */}
//       <div className="fixed inset-0 -z-10">
//         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
//         <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-500/20 rounded-full blur-[120px]"></div>
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
//             <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
//               <FileText className="w-8 h-8 text-blue-400" />
//             </div>
//             <div>
//               <h1 className="text-4xl md:text-6xl font-extrabold tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white via-white to-gray-600">
//                 Content
//               </h1>
//               <p className="text-gray-400 text-lg mt-2">
//                 Articles, essays, and thought-provoking content
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Coming Soon Content */}
//       <div className="max-w-4xl mx-auto px-4 py-24">
//         <div className="text-center space-y-8">
//           {/* Animated Icon */}
//           <div className="relative inline-block">
//             <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full animate-pulse"></div>
//             <div className="relative bg-gradient-to-br from-blue-500/10 to-indigo-500/10 border border-blue-500/20 rounded-3xl p-12">
//               <FileText size={80} className="text-blue-400 mx-auto" strokeWidth={1.5} />
//             </div>
//           </div>

//           {/* Badge */}
//           <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/10 text-yellow-400">
//             <Sparkles size={18} />
//             <span className="font-semibold">Coming Soon</span>
//           </div>

//           {/* Title & Description */}
//           <div className="space-y-4">
//             <h2 className="text-4xl md:text-5xl font-bold text-white">
//               Content Library Under Construction
//             </h2>
            
//             <p className="text-gray-300 text-lg max-w-2xl mx-auto leading-relaxed">
//               We're curating an extensive collection of articles, essays, research papers, 
//               and thought-provoking content. This section will feature intellectual pieces 
//               from our community and beyond.
//             </p>
//           </div>

//           {/* Features List */}
//           <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-8">
//             <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
//               <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
//                 <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-white mb-2">Articles & Essays</h3>
//               <p className="text-gray-400 text-sm">In-depth analysis and perspectives on various topics</p>
//             </div>

//             <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
//               <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
//                 <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-white mb-2">Research Papers</h3>
//               <p className="text-gray-400 text-sm">Academic and scholarly work from our members</p>
//             </div>

//             <div className="p-6 bg-gray-900/50 border border-gray-800 rounded-xl">
//               <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/20 rounded-lg flex items-center justify-center mb-4 mx-auto">
//                 <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" />
//                 </svg>
//               </div>
//               <h3 className="text-lg font-semibold text-white mb-2">Multimedia Content</h3>
//               <p className="text-gray-400 text-sm">Videos, podcasts, and interactive content</p>
//             </div>
//           </div>

//           {/* Status */}
//           <div className="pt-8 border-t border-gray-800/50">
//             <p className="text-sm text-gray-500 font-medium">
//               Stay tuned for updates • Coming Q1 2026
//             </p>
//           </div>
//         </div>
//       </div>

//       {/* Footer */}
//       <div className="border-t border-gray-800">
//         <div className="max-w-7xl mx-auto px-4 py-8 text-center text-gray-500 text-sm">
//           © 2025 VERITAS • Truth Seeker Protocol
//         </div>
//       </div>
//     </main>
//   );
// }

// app/(public)/content/page.tsx
import Link from "next/link";
import { ArrowLeft, FileText, Sparkles, BookOpen, PenTool, Video } from "lucide-react";
import MagneticCursor from "@/components/effects/MagneticCursor";
import ParchmentBackground from "@/components/effects/ParchmentBackground";
import Navbar from "@/components/navbar/Navbar";

export const metadata = {
  title: "Content | VERITAS",
  description: "Explore articles, essays, and thought pieces from VERITAS",
};

export default function PublicContentPage() {
  return (
    <main className="min-h-screen bg-[#fdfcf8] selection:bg-[#bc6c25] selection:text-white relative">
      <MagneticCursor />
      <ParchmentBackground />
      <Navbar />

      {/* Header */}
      <div className="relative pt-32 pb-16 px-6 text-center z-10 border-b border-amber-900/10">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-amber-900/40 hover:text-amber-900 transition-colors mb-8 font-mono text-xs uppercase tracking-widest"
          >
            <ArrowLeft size={14} />
            <span>Return Home</span>
          </Link>

          <div className="flex justify-center mb-6">
            <div className="p-4 bg-amber-900/5 rounded-full border border-amber-900/10">
                <FileText className="w-8 h-8 text-[#bc6c25]" />
            </div>
          </div>

          <h1 className="text-6xl md:text-8xl font-serif font-black tracking-tight text-[#2a1c0f] mb-4">
            The Library
          </h1>
          <p className="text-xl md:text-2xl font-serif italic text-amber-900/60 max-w-2xl mx-auto">
            "Words are the voice of the heart."
          </p>
        </div>
      </div>

      {/* Coming Soon Content */}
      <div className="max-w-4xl mx-auto px-6 py-24 relative z-10">
        <div className="text-center space-y-12">
          
          {/* Animated Icon Container */}
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-[#bc6c25]/20 blur-3xl rounded-full animate-pulse group-hover:bg-[#bc6c25]/30 transition-all duration-1000"></div>
            <div className="relative bg-[#f4f1ea] border border-[#d4c5b0] rounded-full p-16 shadow-2xl shadow-amber-900/10">
              <FileText size={64} className="text-[#2a1c0f] mx-auto" strokeWidth={1} />
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-white p-3 rounded-full border border-[#d4c5b0] shadow-lg animate-bounce delay-100">
                <Sparkles className="w-6 h-6 text-[#bc6c25]" />
            </div>
          </div>

          {/* Badge */}
          <div>
            <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full border border-[#bc6c25]/30 bg-[#bc6c25]/10 text-[#bc6c25]">
                <Sparkles size={14} />
                <span className="font-bold text-xs uppercase tracking-widest">Under Construction</span>
            </div>
          </div>

          {/* Description */}
          <div className="space-y-6">
            <h2 className="text-4xl font-serif font-bold text-[#2a1c0f]">
              Curating Intellectual Discourse
            </h2>
            
            <p className="text-amber-900/70 text-lg max-w-2xl mx-auto leading-relaxed font-serif">
              We are currently archiving an extensive collection of articles, essays, and research papers. 
              This digital library will soon serve as a repository for the society's intellectual output.
            </p>
          </div>

          {/* Features Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
            {[
                { icon: BookOpen, title: "Essays", desc: "In-depth analysis and perspectives." },
                { icon: PenTool, title: "Research", desc: "Scholarly work from our members." },
                { icon: Video, title: "Media", desc: "Recorded debates and discussions." }
            ].map((feature, i) => (
                <div key={i} className="p-8 bg-white border border-[#d4c5b0] rounded-xl hover:border-[#bc6c25] hover:shadow-lg transition-all duration-300 group">
                    <div className="w-12 h-12 bg-[#f4f1ea] rounded-full flex items-center justify-center mb-6 mx-auto group-hover:bg-[#bc6c25] transition-colors duration-300">
                        <feature.icon className="w-5 h-5 text-[#2a1c0f] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#2a1c0f] mb-2">{feature.title}</h3>
                    <p className="text-amber-900/50 text-sm font-serif italic">{feature.desc}</p>
                </div>
            ))}
          </div>

          {/* Timeline */}
          <div className="pt-12 border-t border-amber-900/10">
            <p className="font-mono text-xs text-amber-900/40 uppercase tracking-widest">
              Expected Launch • Q1 2026
            </p>
          </div>
        </div>
      </div>

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