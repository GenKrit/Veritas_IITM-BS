// // app/admin/(protected)/vsd/new/page.tsx
// "use client";

// import { useRouter } from "next/navigation";
// import { useState } from "react";
// import { ArrowLeft } from "lucide-react";
// import Link from "next/link";

// export default function NewVSDPage() {
//   const router = useRouter();
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     volume: "",
//     issue: "",
//     month: "",
//     link: "",
//   });
//   const [loading, setLoading] = useState(false);

//   async function submit() {
//     if (!form.title || !form.volume || !form.issue || !form.month || !form.link) {
//       alert("Please fill all required fields");
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("/api/admin/vsd", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           ...form,
//           volume: Number(form.volume),
//           issue: Number(form.issue),
//         }),
//       });

//       if (!res.ok) {
//         const data = await res.json();
//         alert(data.error || "Failed to create digest");
//         return;
//       }

//       router.push("/admin/vsd");
//       router.refresh();
//     } catch (error) {
//       alert("Failed to create digest");
//     } finally {
//       setLoading(false);
//     }
//   }

//   return (
//     <div className="min-h-[80vh] flex items-center justify-center px-4 py-8">
//       <div className="w-full max-w-2xl space-y-6">
//         {/* Header */}
//         <div className="text-center space-y-2">
//           <Link
//             href="/admin/vsd"
//             className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-2"
//           >
//             <ArrowLeft size={16} />
//             <span>Back to VSD</span>
//           </Link>
//           <h1 className="text-3xl font-bold">Add New Digest</h1>
//           <p className="text-gray-400">Fill in the details below to publish a new digest</p>
//         </div>

//         {/* Form Card */}
//         <div className="bg-gray-900/50 border border-gray-800 rounded-lg p-6 md:p-8 space-y-5">
//           {/* Title */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Title <span className="text-red-500">*</span>
//             </label>
//             <input
//               placeholder="Enter digest title"
//               value={form.title}
//               onChange={(e) => setForm({ ...form, title: e.target.value })}
//               className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
//             />
//           </div>

//           {/* Description */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Description <span className="text-gray-500">(optional)</span>
//             </label>
//             <textarea
//               placeholder="Brief description of the digest"
//               value={form.description}
//               onChange={(e) => setForm({ ...form, description: e.target.value })}
//               rows={4}
//               className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all resize-none"
//             />
//           </div>

//           {/* Volume & Issue */}
//           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Volume <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 placeholder="e.g., 1"
//                 value={form.volume}
//                 onChange={(e) => setForm({ ...form, volume: e.target.value })}
//                 className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
//               />
//             </div>

//             <div>
//               <label className="block text-sm font-medium text-gray-300 mb-2">
//                 Issue <span className="text-red-500">*</span>
//               </label>
//               <input
//                 type="number"
//                 placeholder="e.g., 1"
//                 value={form.issue}
//                 onChange={(e) => setForm({ ...form, issue: e.target.value })}
//                 className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
//               />
//             </div>
//           </div>

//           {/* Month */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Month <span className="text-red-500">*</span>
//             </label>
//             <input
//               placeholder="e.g., January 2025"
//               value={form.month}
//               onChange={(e) => setForm({ ...form, month: e.target.value })}
//               className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
//             />
//           </div>

//           {/* Link */}
//           <div>
//             <label className="block text-sm font-medium text-gray-300 mb-2">
//               Link <span className="text-red-500">*</span>
//             </label>
//             <input
//               type="url"
//               placeholder="https://..."
//               value={form.link}
//               onChange={(e) => setForm({ ...form, link: e.target.value })}
//               className="w-full p-3 bg-black border border-gray-700 rounded-lg focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 focus:outline-none transition-all"
//             />
//           </div>

//           {/* Submit Button */}
//           <button
//             onClick={submit}
//             disabled={loading}
//             className="w-full bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             {loading ? "Publishing..." : "Publish Digest"}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }


// app/admin/(protected)/vsd/new/page.tsx
"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ArrowLeft, Save, X } from "lucide-react";
import Link from "next/link";

export default function NewVSDPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    title: "",
    description: "",
    volume: "",
    issue: "",
    month: "",
    link: "",
  });
  const [loading, setLoading] = useState(false);

  async function submit() {
    if (!form.title || !form.volume || !form.issue || !form.month || !form.link) {
      alert("Please fill all required fields");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/vsd", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          volume: Number(form.volume),
          issue: Number(form.issue),
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        alert(data.error || "Failed to create digest");
        return;
      }

      router.push("/admin/vsd");
      router.refresh();
    } catch (error) {
      alert("Failed to create digest");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-200">
      <div className="px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-linear-to-br from-neutral-800 to-neutral-900 rounded-xl p-8 mb-8 shadow-lg">
          <Link
            href="/admin/vsd"
            className="inline-flex items-center gap-2 text-sm text-neutral-300 hover:text-white transition-colors mb-4"
          >
            <ArrowLeft size={16} />
            Back to VSD
          </Link>
          <h1 className="text-3xl font-bold text-white mb-2">Add New Digest</h1>
          <p className="text-neutral-300">Fill in the details to publish a new digest</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-white border-2 border-neutral-400 rounded-xl p-8 shadow-md">
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-neutral-900 pb-2 border-b-2 border-neutral-300">Basic Information</h2>
                
                <FormField label="Title" required>
                  <input
                    placeholder="Enter digest title"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full p-3 bg-white border-2 border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-neutral-900 placeholder:text-neutral-400"
                  />
                </FormField>

                <FormField label="Description">
                  <textarea
                    placeholder="Brief description of the digest"
                    value={form.description}
                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                    rows={4}
                    className="w-full p-3 bg-white border-2 border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all resize-y text-neutral-900 placeholder:text-neutral-400"
                  />
                </FormField>
              </div>

              {/* Volume & Issue */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-neutral-900 pb-2 border-b-2 border-neutral-300">Publication Details</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FormField label="Volume" required>
                    <input
                      type="number"
                      placeholder="e.g., 1"
                      value={form.volume}
                      onChange={(e) => setForm({ ...form, volume: e.target.value })}
                      className="w-full p-3 bg-white border-2 border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-neutral-900 placeholder:text-neutral-400"
                    />
                  </FormField>

                  <FormField label="Issue" required>
                    <input
                      type="number"
                      placeholder="e.g., 1"
                      value={form.issue}
                      onChange={(e) => setForm({ ...form, issue: e.target.value })}
                      className="w-full p-3 bg-white border-2 border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-neutral-900 placeholder:text-neutral-400"
                    />
                  </FormField>
                </div>

                <FormField label="Month" required>
                  <input
                    placeholder="e.g., January 2025"
                    value={form.month}
                    onChange={(e) => setForm({ ...form, month: e.target.value })}
                    className="w-full p-3 bg-white border-2 border-neutral-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all text-neutral-900 placeholder:text-neutral-400"
                  />
                </FormField>
              </div>

              {/* Link */}
              <div className="space-y-4">
                <h2 className="text-xl font-bold text-neutral-900 pb-2 border-b-2 border-neutral-300">Document Link</h2>
                
                <FormField label="Link" required>
                  <input
                    type="url"
                    placeholder="https://drive.google.com/..."
                    value={form.link}
                    onChange={(e) => setForm({ ...form, link: e.target.value })}
                    className="w-full p-3 bg-white border-2 border-neutral-300 rounded-lg focus:ring-2 
                    focus:ring-blue-500 focus:border-transparent transition-all text-neutral-900 placeholder:text-neutral-400"
                  />
                </FormField>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-3 pt-4 border-t-2 border-neutral-300">
                <button
                  onClick={submit}
                  disabled={loading}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-green-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                      Publishing...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Publish Digest
                    </>
                  )}
                </button>

                <button
                  onClick={() => router.push("/admin/vsd")}
                  disabled={loading}
                  className="px-6 py-3 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300 font-semibold transition-all duration-200 disabled:opacity-50 flex items-center gap-2"
                >
                  <X className="w-5 h-5" />
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FormField({ 
  label, 
  required = false, 
  children 
}: { 
  label: string; 
  required?: boolean; 
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="block text-sm font-semibold text-neutral-700 mb-2">
        {label}
        {required && <span className="text-red-600 ml-1">*</span>}
      </label>
      {children}
    </div>
  );
}
