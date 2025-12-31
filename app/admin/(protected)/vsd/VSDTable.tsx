// // app/admin/(protected)/vsd/VSDTable.tsx
// "use client";

// import { useRouter } from "next/navigation";
// import { useState, useMemo } from "react";
// import { ExternalLink, Edit, Trash2, Eye, Search } from "lucide-react";
// import DeleteConfirmModal from "./DeleteConfirmModal";

// type Digest = {
//   id: string;
//   title: string;
//   volume: number;
//   issue: number;
//   month: string;
//   link: string;
// };

// type SortOption = "latest" | "oldest" | "title";

// export default function VSDTable({
//   digests,
//   canEdit,
// }: {
//   digests: Digest[];
//   canEdit: boolean;
// }) {
//   const router = useRouter();
//   const [deleting, setDeleting] = useState(false);
//   const [deleteTarget, setDeleteTarget] = useState<Digest | null>(null);
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortBy, setSortBy] = useState<SortOption>("latest");

//   function openDeleteModal(digest: Digest) {
//     setDeleteTarget(digest);
//   }

//   function closeDeleteModal() {
//     if (!deleting) {
//       setDeleteTarget(null);
//     }
//   }

//   async function confirmDelete() {
//     if (!deleteTarget) return;

//     setDeleting(true);

//     try {
//       const res = await fetch(`/api/admin/vsd/${deleteTarget.id}`, {
//         method: "DELETE",
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         alert(data.error || "Failed to delete");
//         return;
//       }

//       closeDeleteModal();
//       router.refresh();
//     } catch (error) {
//       alert("Failed to delete digest");
//     } finally {
//       setDeleting(false);
//     }
//   }

//   // Filter and sort digests
//   const filteredAndSortedDigests = useMemo(() => {
//     let filtered = digests;

//     // Apply search filter
//     if (searchQuery.trim()) {
//       const query = searchQuery.toLowerCase();
//       filtered = digests.filter(
//         (d) =>
//           d.title.toLowerCase().includes(query) ||
//           d.month.toLowerCase().includes(query) ||
//           `vol ${d.volume}`.includes(query) ||
//           `issue ${d.issue}`.includes(query)
//       );
//     }

//     // Apply sorting
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
//     <>
//       <div className="space-y-4">
//         {/* Search and Sort Controls */}
//         <div className="flex flex-col sm:flex-row gap-3">
//           {/* Search Bar */}
//           <div className="relative flex-1">
//             <Search
//               className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
//               size={18}
//             />
//             <input
//               type="text"
//               placeholder="Search by title, month, volume, or issue..."
//               value={searchQuery}
//               onChange={(e) => setSearchQuery(e.target.value)}
//               className="w-full pl-10 pr-4 py-2.5 bg-black border border-gray-700 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all placeholder:text-gray-500"
//             />
//             {searchQuery && (
//               <button
//                 onClick={() => setSearchQuery("")}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
//               >
//                 ✕
//               </button>
//             )}
//           </div>

//           {/* Sort Options */}
//           <div className="flex items-center gap-2 shrink-0">
//             <span className="text-sm text-gray-400 hidden sm:inline">Sort:</span>
//             <div className="flex gap-1 bg-gray-900 border border-gray-800 rounded-lg p-1">
//               <button
//                 onClick={() => setSortBy("latest")}
//                 className={`px-3 py-1.5 text-sm rounded-md transition-all ${
//                   sortBy === "latest"
//                     ? "bg-indigo-500 text-white font-medium"
//                     : "text-gray-400 hover:text-white hover:bg-gray-800"
//                 }`}
//               >
//                 Latest
//               </button>
//               <button
//                 onClick={() => setSortBy("oldest")}
//                 className={`px-3 py-1.5 text-sm rounded-md transition-all ${
//                   sortBy === "oldest"
//                     ? "bg-indigo-500 text-white font-medium"
//                     : "text-gray-400 hover:text-white hover:bg-gray-800"
//                 }`}
//               >
//                 Oldest
//               </button>
//               <button
//                 onClick={() => setSortBy("title")}
//                 className={`px-3 py-1.5 text-sm rounded-md transition-all ${
//                   sortBy === "title"
//                     ? "bg-indigo-500 text-white font-medium"
//                     : "text-gray-400 hover:text-white hover:bg-gray-800"
//                 }`}
//               >
//                 A-Z
//               </button>
//             </div>
//           </div>
//         </div>

//         {/* Results Info */}
//         <div className="flex items-center justify-between text-sm text-gray-400">
//           <span>
//             Showing {filteredAndSortedDigests.length} of {digests.length} digest
//             {digests.length !== 1 ? "s" : ""}
//           </span>
//           {searchQuery && (
//             <button
//               onClick={() => setSearchQuery("")}
//               className="text-indigo-400 hover:text-indigo-300 transition-colors"
//             >
//               Clear search
//             </button>
//           )}
//         </div>

//         {/* Digests Table */}
//         <div className="border border-gray-800 rounded-lg overflow-hidden">
//           {filteredAndSortedDigests.length === 0 && (
//             <div className="p-8 text-center">
//               <p className="text-gray-400 mb-2">
//                 {searchQuery ? "No digests found matching your search" : "No digests found"}
//               </p>
//               {searchQuery && (
//                 <button
//                   onClick={() => setSearchQuery("")}
//                   className="text-indigo-400 hover:text-indigo-300 transition-colors text-sm"
//                 >
//                   Clear search to see all digests
//                 </button>
//               )}
//             </div>
//           )}

//           <div className="overflow-x-auto">
//             {filteredAndSortedDigests.map((d) => (
//               <div
//                 key={d.id}
//                 className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-4 border-b border-gray-800 last:border-b-0 hover:bg-gray-900/50 transition-colors"
//               >
//                 {/* Left: Title & Metadata */}
//                 <div className="flex-1 min-w-0">
//                   <h3 className="font-semibold text-white mb-1 truncate">
//                     {d.title}
//                   </h3>
//                   <p className="text-sm text-gray-400">
//                     Vol {d.volume}, Issue {d.issue} • {d.month}
//                   </p>
//                 </div>

//                 {/* Right: Action Buttons */}
//                 <div className="flex items-center gap-2 shrink-0">
//                   {/* View Button */}
//                   <button
//                     onClick={() => router.push(`/admin/vsd/${d.id}/view`)}
//                     className="inline-flex items-center gap-2 px-3 py-2 text-sm text-blue-400 hover:bg-blue-500/10 rounded transition-colors"
//                   >
//                     <Eye size={16} />
//                     <span>View</span>
//                   </button>

//                   {/* External Link */}
//                   <a
//                     href={d.link}
//                     target="_blank"
//                     rel="noopener noreferrer"
//                     className="inline-flex items-center gap-2 px-3 py-2 text-sm text-gray-400 hover:text-white hover:bg-gray-800 rounded transition-colors"
//                   >
//                     <ExternalLink size={16} />
//                     <span className="hidden sm:inline">Open</span>
//                   </a>

//                   {/* Edit & Delete - Only for authorized users */}
//                   {canEdit && (
//                     <>
//                       <button
//                         onClick={() => router.push(`/admin/vsd/${d.id}/edit`)}
//                         className="inline-flex items-center gap-2 px-3 py-2 text-sm text-yellow-400 hover:bg-yellow-500/10 rounded transition-colors"
//                       >
//                         <Edit size={16} />
//                         <span>Edit</span>
//                       </button>
//                       <button
//                         onClick={() => openDeleteModal(d)}
//                         className="inline-flex items-center gap-2 px-3 py-2 text-sm text-red-500 hover:bg-red-500/10 rounded transition-colors"
//                       >
//                         <Trash2 size={16} />
//                         <span>Delete</span>
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>

//       {/* Delete Confirmation Modal */}
//       <DeleteConfirmModal
//         isOpen={deleteTarget !== null}
//         onClose={closeDeleteModal}
//         onConfirm={confirmDelete}
//         title={deleteTarget?.title || ""}
//         isDeleting={deleting}
//       />
//     </>
//   );
// }


// app/admin/(protected)/vsd/VSDTable.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState, useMemo } from "react";
import { ExternalLink, Edit, Trash2, Eye, Search, BookOpen } from "lucide-react";
import DeleteConfirmModal from "./DeleteConfirmModal";

type Digest = {
  id: string;
  title: string;
  volume: number;
  issue: number;
  month: string;
  link: string;
};

type SortOption = "latest" | "oldest" | "title";

export default function VSDTable({
  digests,
  canEdit,
}: {
  digests: Digest[];
  canEdit: boolean;
}) {
  const router = useRouter();
  const [deleting, setDeleting] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState<Digest | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<SortOption>("latest");

  function openDeleteModal(digest: Digest) {
    setDeleteTarget(digest);
  }

  function closeDeleteModal() {
    if (!deleting) {
      setDeleteTarget(null);
    }
  }

  async function confirmDelete() {
    if (!deleteTarget) return;

    setDeleting(true);

    try {
      const res = await fetch(`/api/admin/vsd/${deleteTarget.id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to delete");
        return;
      }

      closeDeleteModal();
      router.refresh();
    } catch (error) {
      alert("Failed to delete digest");
    } finally {
      setDeleting(false);
    }
  }

  // Filter and sort digests
  const filteredAndSortedDigests = useMemo(() => {
    let filtered = digests;

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = digests.filter(
        (d) =>
          d.title.toLowerCase().includes(query) ||
          d.month.toLowerCase().includes(query) ||
          `vol ${d.volume}`.includes(query) ||
          `issue ${d.issue}`.includes(query)
      );
    }

    const sorted = [...filtered];
    if (sortBy === "latest") {
      sorted.sort((a, b) => {
        if (b.volume !== a.volume) return b.volume - a.volume;
        return b.issue - a.issue;
      });
    } else if (sortBy === "oldest") {
      sorted.sort((a, b) => {
        if (a.volume !== b.volume) return a.volume - b.volume;
        return a.issue - b.issue;
      });
    } else if (sortBy === "title") {
      sorted.sort((a, b) => a.title.localeCompare(b.title));
    }

    return sorted;
  }, [digests, searchQuery, sortBy]);

  return (
    <>
      <div className="space-y-4">
        {/* Search and Sort Controls */}
        <div className="bg-white border-2 border-neutral-400 rounded-xl p-4 shadow-md">
          <div className="flex flex-col sm:flex-row gap-3">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-400"
                size={18}
              />
              <input
                type="text"
                placeholder="Search by title, month, volume, or issue..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-10 py-2.5 bg-white border-2 border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:outline-none transition-all placeholder:text-neutral-400 text-neutral-900"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-900 transition-colors font-bold text-lg"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Options */}
            <div className="flex items-center gap-2 shrink-0">
              <span className="text-sm font-semibold text-neutral-600 hidden sm:inline">Sort:</span>
              <div className="flex gap-1 bg-neutral-100 border-2 border-neutral-300 rounded-lg p-1">
                <button
                  onClick={() => setSortBy("latest")}
                  className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${
                    sortBy === "latest"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200"
                  }`}
                >
                  Latest
                </button>
                <button
                  onClick={() => setSortBy("oldest")}
                  className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${
                    sortBy === "oldest"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200"
                  }`}
                >
                  Oldest
                </button>
                <button
                  onClick={() => setSortBy("title")}
                  className={`px-4 py-2 text-sm rounded-lg font-medium transition-all ${
                    sortBy === "title"
                      ? "bg-blue-600 text-white shadow-sm"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-200"
                  }`}
                >
                  A-Z
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Results Info */}
        <div className="flex items-center justify-between text-sm">
          <span className="text-neutral-600 font-medium">
            Showing {filteredAndSortedDigests.length} of {digests.length} digest
            {digests.length !== 1 ? "s" : ""}
          </span>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              className="text-blue-600 hover:text-blue-700 transition-colors font-medium"
            >
              Clear search
            </button>
          )}
        </div>

        {/* Digests List */}
        <div className="bg-white border-2 border-neutral-400 rounded-xl shadow-md overflow-hidden">
          {filteredAndSortedDigests.length === 0 && (
            <div className="p-12 text-center">
              <div className="h-20 w-20 bg-neutral-200 rounded-full flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-10 h-10 text-neutral-500" />
              </div>
              <p className="text-neutral-600 font-medium mb-2">
                {searchQuery ? "No digests found matching your search" : "No digests found"}
              </p>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-blue-600 hover:text-blue-700 transition-colors text-sm font-medium"
                >
                  Clear search to see all digests
                </button>
              )}
            </div>
          )}

          <div>
            {filteredAndSortedDigests.map((d, index) => (
              <div
                key={d.id}
                className={`
                  flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 p-5
                  border-b-2 border-neutral-300 last:border-b-0
                  hover:bg-neutral-50 transition-colors duration-150
                  ${index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/50'}
                `}
              >
                {/* Left: Title & Metadata */}
                <div className="flex items-start gap-4 flex-1 min-w-0">
                  <div className="h-12 w-12 bg-blue-100 rounded-lg flex items-center justify-center shrink-0">
                    <BookOpen className="w-6 h-6 text-blue-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-bold text-neutral-900 mb-1 truncate">
                      {d.title}
                    </h3>
                    <div className="flex flex-wrap gap-2 text-sm">
                      <span className="bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded-md font-medium">
                        Vol {d.volume}
                      </span>
                      <span className="bg-neutral-200 text-neutral-700 px-2 py-0.5 rounded-md font-medium">
                        Issue {d.issue}
                      </span>
                      <span className="text-neutral-600">• {d.month}</span>
                    </div>
                  </div>
                </div>

                {/* Right: Action Buttons */}
                <div className="flex items-center gap-2 shrink-0 flex-wrap">
                  {/* View Button */}
                  <button
                    onClick={() => router.push(`/admin/vsd/${d.id}/view`)}
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                  >
                    <Eye size={16} />
                    <span>View</span>
                  </button>

                  {/* External Link */}
                  <a
                    href={d.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 rounded-lg transition-all"
                  >
                    <ExternalLink size={16} />
                    <span className="hidden sm:inline">Open</span>
                  </a>

                  {/* Edit & Delete */}
                  {canEdit && (
                    <>
                      <button
                        onClick={() => router.push(`/admin/vsd/${d.id}/edit`)}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-orange-600 hover:bg-orange-50 rounded-lg transition-all"
                      >
                        <Edit size={16} />
                        <span>Edit</span>
                      </button>
                      <button
                        onClick={() => openDeleteModal(d)}
                        className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-red-600 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <Trash2 size={16} />
                        <span>Delete</span>
                      </button>
                    </>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={deleteTarget !== null}
        onClose={closeDeleteModal}
        onConfirm={confirmDelete}
        title={deleteTarget?.title || ""}
        isDeleting={deleting}
      />
    </>
  );
}
