// // app/(public)/vsd/VSDList.tsx
//Not using this component currentlybecause new theme is using server file from component folder
// "use client";

// import { useState, useMemo } from "react";
// import { Search, ExternalLink } from "lucide-react";

// type Digest = {
//   id: string;
//   title: string;
//   description: string | null;
//   volume: number;
//   issue: number;
//   month: string;
//   link: string;
// };

// type SortOption = "latest" | "oldest" | "title";

// export default function VSDList({ digests }: { digests: Digest[] }) {
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState<SortOption>("latest");

//   // Filter and sort
//   const filteredAndSortedDigests = useMemo(() => {
//     let filtered = digests;

//     // Search filter
//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase();
//       filtered = digests.filter(
//         (d) =>
//           d.title.toLowerCase().includes(query) ||
//           d.month.toLowerCase().includes(query) ||
//           d.description?.toLowerCase().includes(query) ||
//           `vol ${d.volume}`.includes(query) ||
//           `issue ${d.issue}`.includes(query)
//       );
//     }

//     // Sorting
//     const sorted = [...filtered];
//     if (sortBy === "latest") {
//       sorted.sort((a, b) => {
//         if (b.volume !== a.volume) return b.volume - a.volume;
//         return b.issue - a.issue;
//       });
//     } else if (sortBy === "oldest") {
//       sorted.sort((a, b) => {
//         if (a.volume !== b.volume) return a.volume - b.volume;
//         return a.issue - b.issue;
//       });
//     } else if (sortBy === "title") {
//       sorted.sort((a, b) => a.title.localeCompare(b.title));
//     }

//     return sorted;
//   }, [digests, searchQuery, sortBy]);

//   return (
//     <div className="space-y-6">
//       {/* Search and Sort Controls */}
//       <div className="flex flex-col sm:flex-row gap-4">
//         {/* Search Bar */}
//         <div className="relative flex-1">
//           <Search
//             className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
//             size={20}
//           />
//           <input
//             type="text"
//             placeholder="Search by title, description, or date..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="w-full pl-12 pr-4 py-3 bg-gray-900/50 border border-gray-800 rounded-xl focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 focus:outline-none transition-all placeholder:text-gray-500"
//           />
//           {searchQuery && (
//             <button
//               onClick={() => setSearchQuery("")}
//               className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
//             >
//               ✕
//             </button>
//           )}
//         </div>

//         {/* Sort Options */}
//         <div className="flex items-center gap-2 flex-shrink-0">
//           <span className="text-sm text-gray-400 hidden sm:inline">Sort:</span>
//           <div className="flex gap-1 bg-gray-900/50 border border-gray-800 rounded-xl p-1">
//             <button
//               onClick={() => setSortBy("latest")}
//               className={`px-4 py-2 text-sm rounded-lg transition-all font-medium ${
//                 sortBy === "latest"
//                   ? "bg-emerald-500 text-white"
//                   : "text-gray-400 hover:text-white hover:bg-gray-800"
//               }`}
//             >
//               Latest
//             </button>
//             <button
//               onClick={() => setSortBy("oldest")}
//               className={`px-4 py-2 text-sm rounded-lg transition-all font-medium ${
//                 sortBy === "oldest"
//                   ? "bg-emerald-500 text-white"
//                   : "text-gray-400 hover:text-white hover:bg-gray-800"
//               }`}
//             >
//               Oldest
//             </button>
//             <button
//               onClick={() => setSortBy("title")}
//               className={`px-4 py-2 text-sm rounded-lg transition-all font-medium ${
//                 sortBy === "title"
//                   ? "bg-emerald-500 text-white"
//                   : "text-gray-400 hover:text-white hover:bg-gray-800"
//               }`}
//             >
//               A-Z
//             </button>
//           </div>
//         </div>
//       </div>

//       {/* Results Info */}
//       <div className="flex items-center justify-between text-sm text-gray-400">
//         <span>
//           {filteredAndSortedDigests.length} edition{filteredAndSortedDigests.length !== 1 ? "s" : ""} found
//         </span>
//         {searchQuery && (
//           <button
//             onClick={() => setSearchQuery("")}
//             className="text-emerald-400 hover:text-emerald-300 transition-colors"
//           >
//             Clear search
//           </button>
//         )}
//       </div>

//       {/* Digests Grid */}
//       {filteredAndSortedDigests.length === 0 ? (
//         <div className="text-center py-16">
//           <div className="inline-block p-4 bg-gray-900/50 border border-gray-800 rounded-full mb-4">
//             <Search size={32} className="text-gray-600" />
//           </div>
//           <p className="text-gray-400 mb-2">
//             {searchQuery ? "No digests found matching your search" : "No digests available"}
//           </p>
//           {searchQuery && (
//             <button
//               onClick={() => setSearchQuery("")}
//               className="text-emerald-400 hover:text-emerald-300 transition-colors text-sm"
//             >
//               Clear search to see all digests
//             </button>
//           )}
//         </div>
//       ) : (
//         <div className="space-y-4">
//           {filteredAndSortedDigests.map((digest) => (
//             <DigestCard key={digest.id} digest={digest} />
//           ))}
//         </div>
//       )}
//     </div>
//   );
// }

// // Individual Digest Card Component
// function DigestCard({ digest }: { digest: Digest }) {
//   const [isHovered, setIsHovered] = useState(false);

//   return (
//     <div
//       className="group relative bg-gray-900/50 border border-gray-300 rounded-xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-emerald-500/10"
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//     >
//       {/* Hover Glow Effect */}
//       <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>

//       <div className="relative p-6 space-y-4">
//         {/* Title */}
//         <h3 className="text-2xl font-bold text-white group-hover:text-emerald-400 transition-colors">
//           {digest.title}
//         </h3>

//         {/* Description */}
//         {digest.description && (
//           <p className="text-gray-300 leading-relaxed">
//             {digest.description}
//           </p>
//         )}

//         {/* Bottom Section: Metadata + Button */}
//         <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-2">
//           {/* Left: Volume, Issue & Month */}
//           <div className="flex items-center gap-3">
//             <div className="px-4 py-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
//               <span className="text-emerald-400 font-semibold">
//                 Vol {digest.volume}, Issue {digest.issue}
//               </span>
//             </div>
//             <div className="px-4 py-2 bg-teal-500/20 border border-teal-500/30 rounded-lg">
//               <span className="text-teal-400 font-medium">
//                 {digest.month}
//               </span>
//             </div>
//           </div>

//           {/* Right: Open Button */}
//           <a
//             href={digest.link}
//             target="_blank"
//             rel="noopener noreferrer"
//             className={`inline-flex items-center justify-center gap-2 px-6 py-2.5 bg-emerald-600 text-white rounded-lg font-medium hover:bg-emerald-700 transition-all duration-300 ${
//               isHovered ? "opacity-100 translate-x-0" : "opacity-0 sm:translate-x-4"
//             }`}
//           >
//             <span>Open Digest</span>
//             <ExternalLink size={18} />
//           </a>
//         </div>
//       </div>
//     </div>
//   );
// }
