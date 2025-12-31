// // app/admin/(protected)/team/EditToolbar.tsx
// type Props = {
//   onSave: () => void;
//   onCancel: () => void;
//   saving?: boolean;
// };

// export default function EditToolbar({
//   onSave,
//   onCancel,
//   saving = false,
// }: Props) {
//   return (
//     <div className="flex gap-4 bg-zinc-800/50 rounded p-3 border border-gray-700">
//       <button
//         onClick={onSave}
//         disabled={saving}
//         className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded text-white font-medium disabled:opacity-50 disabled:cursor-not-allowed transition"
//       >
//         {saving ? "Saving..." : "Save & Publish"}
//       </button>
//       <button
//         onClick={onCancel}
//         disabled={saving}
//         className="border border-gray-600 px-4 py-2 rounded hover:bg-gray-800 disabled:opacity-50 disabled:cursor-not-allowed transition"
//       >
//         Cancel
//       </button>
//     </div>
//   );
// }

// app/admin/(protected)/team/EditToolbar.tsx
import { Save, X } from "lucide-react";

type Props = {
  onSave: () => void;
  onCancel: () => void;
  saving?: boolean;
};

export default function EditToolbar({
  onSave,
  onCancel,
  saving = false,
}: Props) {
  return (
    <div className="bg-neutral-100 border-2 border-neutral-400 rounded-lg p-4 flex gap-3">
      <button
        onClick={onSave}
        disabled={saving}
        className="flex-1 bg-green-600 hover:bg-green-700 px-6 py-3 rounded-lg text-white font-bold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 hover:shadow-lg hover:shadow-green-200 flex items-center justify-center gap-2"
      >
        {saving ? (
          <>
            <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
            Saving...
          </>
        ) : (
          <>
            <Save className="w-5 h-5" />
            Save & Publish
          </>
        )}
      </button>
      <button
        onClick={onCancel}
        disabled={saving}
        className="px-6 py-3 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 font-semibold flex items-center gap-2"
      >
        <X className="w-5 h-5" />
        Cancel
      </button>
    </div>
  );
}

