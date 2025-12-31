// // app/admin/(protected)/vsd/DeleteConfirmModal.tsx
// "use client";

// import { X } from "lucide-react";
// import { useEffect } from "react";

// type Props = {
//   isOpen: boolean;
//   onClose: () => void;
//   onConfirm: () => void;
//   title: string;
//   isDeleting: boolean;
// };

// export default function DeleteConfirmModal({
//   isOpen,
//   onClose,
//   onConfirm,
//   title,
//   isDeleting,
// }: Props) {
//   // Close on ESC key
//   useEffect(() => {
//     const handleEsc = (e: KeyboardEvent) => {
//       if (e.key === "Escape") onClose();
//     };
//     if (isOpen) {
//       document.addEventListener("keydown", handleEsc);
//       document.body.style.overflow = "hidden";
//     }
//     return () => {
//       document.removeEventListener("keydown", handleEsc);
//       document.body.style.overflow = "unset";
//     };
//   }, [isOpen, onClose]);

//   if (!isOpen) return null;

//   return (
//     <>
//       {/* Backdrop */}
//       <div
//         className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity"
//         onClick={onClose}
//       />

//       {/* Modal */}
//       <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//         <div className="bg-gray-900 border border-gray-800 rounded-lg shadow-2xl max-w-md w-full overflow-hidden">
//           {/* Header */}
//           <div className="flex items-center justify-between p-6 border-b border-gray-800">
//             <h2 className="text-xl font-bold text-white">Confirm Delete</h2>
//             <button
//               onClick={onClose}
//               className="text-gray-400 hover:text-white transition-colors"
//               disabled={isDeleting}
//               aria-label="Close modal"
//             >
//               <X size={20} />
//             </button>
//           </div>

//           {/* Body */}
//           <div className="p-6 space-y-4">
//             <p className="text-gray-300">
//               Are you sure you want to delete this digest?
//             </p>
//             <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
//               <p className="font-semibold text-red-400 mb-1">"{title}"</p>
//               <p className="text-sm text-red-300">
//                 This action cannot be undone. The digest will be permanently removed.
//               </p>
//             </div>
//           </div>

//           {/* Footer */}
//           <div className="flex items-center justify-end gap-3 p-6 border-t border-gray-800 bg-gray-950/50">
//             <button
//               onClick={onClose}
//               disabled={isDeleting}
//               className="px-4 py-2 border border-gray-700 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50"
//             >
//               Cancel
//             </button>
//             <button
//               onClick={onConfirm}
//               disabled={isDeleting}
//               className="px-4 py-2 bg-red-600 text-white rounded-lg font-medium hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//             >
//               {isDeleting ? "Deleting..." : "Delete Permanently"}
//             </button>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// app/admin/(protected)/vsd/DeleteConfirmModal.tsx
"use client";

import { X } from "lucide-react";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  isDeleting: boolean;
};

export default function DeleteConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  isDeleting,
}: Props) {
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape" && !isDeleting) onClose();
    };
    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    }
    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose, isDeleting]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm z-40 transition-opacity fadeIn"
        onClick={!isDeleting ? onClose : undefined}
      />

      {/* Modal */}
      <div 
        className="fixed inset-0 z-50 flex items-center justify-center p-4 zoomIn"
      >
        <div className="bg-white border-2 border-neutral-400 rounded-xl shadow-2xl max-w-md w-full overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b-2 border-neutral-300 bg-neutral-50">
            <h2 className="text-xl font-bold text-neutral-900">Confirm Delete</h2>
            <button
              onClick={onClose}
              className="text-neutral-600 hover:text-neutral-900 transition-colors"
              disabled={isDeleting}
              aria-label="Close modal"
            >
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 space-y-4">
            <div className="flex items-start gap-4">
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-2xl">⚠️</span>
              </div>
              <div>
                <p className="text-neutral-700 mb-3">
                  Are you sure you want to delete this digest?
                </p>
                <div className="bg-red-50 border-2 border-red-200 rounded-lg p-4">
                  <p className="font-bold text-red-700 mb-1">"{title}"</p>
                  <p className="text-sm text-red-600">
                    This action cannot be undone. The digest will be permanently removed.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 p-6 border-t-2 border-neutral-300 bg-neutral-50">
            <button
              onClick={onClose}
              disabled={isDeleting}
              className="px-5 py-2.5 bg-neutral-200 text-neutral-800 rounded-lg font-semibold hover:bg-neutral-300 transition-all disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              onClick={onConfirm}
              disabled={isDeleting}
              className="px-5 py-2.5 bg-red-600 text-white rounded-lg font-semibold hover:bg-red-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg hover:shadow-red-200 flex items-center gap-2"
            >
              {isDeleting ? (
                <>
                  <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Deleting...
                </>
              ) : (
                "Delete Permanently"
              )}
            </button>
          </div>
        </div>
      </div>

    </>
  );
}
