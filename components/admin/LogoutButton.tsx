// // veritas-website/components/admin/LogoutButton.tsx
// "use client";

// import { LogOut } from "lucide-react";

// export function LogoutButton() {
//   async function handleLogout() {
//     const res = await fetch("/api/admin/auth/logout", {
//       method: "POST",
//     });

//     if (res.ok) {
//       window.location.href = "/admin/login";
//     }
//   }

//   return (
//     <button
//       onClick={handleLogout}
//       className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-grey-800 rounded-md border border-red-900/50 bg-red-950/30 transition-colors hover:bg-red-900/40 hover:border-red-700"
//     >
//       <LogOut className="h-3.5 w-3.5" />
//       <span className="hidden sm:inline">Logout</span>
//     </button>
//   );
// }

// components/admin/LogoutButton.tsx
"use client";

import { LogOut } from "lucide-react";
import { useState } from "react";

export function LogoutButton() {
  const [loading, setLoading] = useState(false);

  async function handleLogout() {
    setLoading(true);

    try {
      const res = await fetch("/api/admin/auth/logout", {
        method: "POST",
      });

      if (res.ok) {
        window.location.href = "/admin/login";
      } else {
        setLoading(false);
        alert("Failed to logout");
      }
    } catch (error) {
      setLoading(false);
      alert("Failed to logout");
    }
  }

  return (
    <button
      onClick={handleLogout}
      disabled={loading}
      className="
        flex items-center gap-2 
        px-4 py-2 
        bg-red-100 text-red-700 
        border-2 border-red-300 
        rounded-lg 
        font-semibold text-sm
        hover:bg-red-600 hover:text-white hover:border-red-600
        transition-all duration-200 
        hover:shadow-lg hover:shadow-red-200
        disabled:opacity-50 disabled:cursor-not-allowed
        active:scale-95
      "
      aria-label="Logout"
    >
      {loading ? (
        <>
          <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
          <span className="hidden sm:inline">Logging out...</span>
        </>
      ) : (
        <>
          <LogOut className="h-4 w-4" />
          <span className="hidden sm:inline">Logout</span>
        </>
      )}
    </button>
  );
}

