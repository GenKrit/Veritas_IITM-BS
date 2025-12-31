// // veritas-website\app\admin\(protected)\events\DeleteEventButton.tsx

// "use client";

// export function DeleteEventButton({ eventId }: { eventId: string }) {
//   async function handleDelete() {
//     const ok = confirm("Are you sure you want to delete this event?");
//     if (!ok) return;

//     const res = await fetch(`/api/admin/events/${eventId}`, {
//       method: "DELETE",
//     });

//     if (!res.ok) {
//       alert("Failed to delete event");
//       return;
//     }

//     // Refresh list after delete
//     window.location.reload();
//   }

//   return (
//     <button
//       onClick={handleDelete}
//       className="text-red-500 hover:underline"
//     >
//       Delete
//     </button>
//   );
// }


// app/admin/(protected)/events/DeleteEventButton.tsx
"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";

export function DeleteEventButton({ eventId }: { eventId: string }) {
  const [showModal, setShowModal] = useState(false);
  const [deleting, setDeleting] = useState(false);

  async function handleDelete() {
    setDeleting(true);

    const res = await fetch(`/api/admin/events/${eventId}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete event");
      setDeleting(false);
      return;
    }

    window.location.reload();
  }

  return (
    <>
      <button
        onClick={() => setShowModal(true)}
        className="flex items-center gap-2 p-2 text-neutral-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-all"
        title="Delete Event"
      >
         Delete<Trash2 className="w-4 h-4" />
      </button>

      {/* Confirmation Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white border-2 border-neutral-400 rounded-xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in duration-200">
            <div className="flex items-start gap-4 mb-4">
              <div className="h-12 w-12 bg-red-100 rounded-full flex items-center justify-center shrink-0">
                <span className="text-2xl">⚠️</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-neutral-900 mb-2">
                  Delete Event?
                </h3>
                <p className="text-sm text-neutral-700">
                  This action cannot be undone. The event will be permanently removed from the database.
                </p>
              </div>
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowModal(false)}
                disabled={deleting}
                className="px-5 py-2.5 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300 transition-all duration-200 font-semibold disabled:opacity-50"
              >
                Cancel
              </button>
              <button
                onClick={handleDelete}
                disabled={deleting}
                className="px-5 py-2.5 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-all duration-200 font-semibold hover:shadow-lg hover:shadow-red-200 disabled:opacity-50 flex items-center gap-2"
              >
                {deleting ? (
                  <>
                    <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                    Deleting...
                  </>
                ) : (
                  <>
                    <Trash2 className="w-4 h-4" />
                    Delete Event
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
