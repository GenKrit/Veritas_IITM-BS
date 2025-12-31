// // components/admin/AdminNavbar.tsx
// import Link from "next/link";
// import Image from "next/image";
// import { AdminUser } from "@prisma/client";
// import { LogoutButton } from "@/components/admin/LogoutButton";
// import { LayoutDashboard, Calendar, FileText, Users, BookOpen, ShieldUser } from "lucide-react";

// export default function AdminNavbar({ admin }: { admin: AdminUser }) {
//   const navItems = [
//     { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
//     { href: "/admin/events", label: "Events", icon: Calendar },
//     { href: "/admin/content", label: "Content", icon: FileText },
//     { href: "/admin/team", label: "Team", icon: Users },
//     { href: "/admin/vsd", label: "VSD", icon: BookOpen },
//     { href: "/admin/admins", label: "Admins", icon: ShieldUser },
//   ];

//   return (
//     <header className="sticky top-0 z-50 bg-linear-to-r from-gray-200 via-gray-400 to-gray-200 border-b border-neutral-200 shadow-sm">
//       {/* Main Navbar */}
//       <div className="px-6 lg:px-8 py-4">
//         <div className="flex items-center justify-between gap-4">
//           {/* Left: Logo + Brand */}
//           <Link href="/admin" className="flex items-center gap-3 shrink-0">
//             <Image
//               src="https://raw.githubusercontent.com/GenKrit/Content/refs/heads/main/EmailTemplate/Images/veritas-logo.png"
//               alt="Veritas"
//               width={50}
//               height={50}
//               className="object-contain"
//             />
//             <div>
//               <h1 className="text-base font-bold text-neutral-900 leading-tight">Veritas Admin</h1>
//               <p className="text-xs text-neutral-500">Management Panel</p>
//             </div>
//           </Link>

//           {/* Center: Navigation */}
//           <nav className="hidden lg:flex items-center gap-1 flex-1 justify-center">
//             {navItems.map((item) => {
//               const Icon = item.icon;
//               return (
//                 <Link
//                   key={item.href}
//                   href={item.href}
//                   className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-neutral-600 rounded-lg transition-all hover:bg-neutral-100 hover:text-neutral-900"
//                 >
//                   <Icon className="h-4 w-4" />
//                   <span>{item.label}</span>
//                 </Link>
//               );
//             })}
//           </nav>

//           {/* Right: User Info + Logout */}
//           <div className="flex items-center gap-3 shrink-0">
//             <div className="hidden md:flex items-center gap-3 px-4 py-2 bg-neutral-50 rounded-lg border border-neutral-200">
//               <div className="text-right">
//                 <p className="text-sm font-semibold text-neutral-900">{admin.name}</p>
//                 <p className="text-xs text-neutral-500 uppercase">
//                   {admin.role.replace(/_/g, " ")}
//                 </p>
//               </div>
//               <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-neutral-700 to-neutral-900 text-sm font-bold text-white">
//                 {admin.name.charAt(0).toUpperCase()}
//               </div>
//             </div>
//             <LogoutButton />
//           </div>
//         </div>
//       </div>

//       {/* Mobile Navigation */}
//       <nav className="lg:hidden border-t border-neutral-200 bg-white">
//         <div className="grid grid-cols-6 gap-1 py-2 px-2">
//           {navItems.map((item) => {
//             const Icon = item.icon;
//             return (
//               <Link
//                 key={item.href}
//                 href={item.href}
//                 className="flex flex-col items-center gap-1 px-2 py-2 text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50 rounded-lg transition-colors"
//               >
//                 <Icon className="h-5 w-5" />
//                 <span className="text-xs font-medium">{item.label}</span>
//               </Link>
//             );
//           })}
//         </div>
//       </nav>
//     </header>
//   );
// }

// veritas-website\components\admin\AdminNavbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { AdminUser } from "@prisma/client";
import { LogoutButton } from "@/components/admin/LogoutButton";
import { LayoutDashboard, Calendar, FileText, Users, BookOpen, ShieldUser } from "lucide-react";

export default function AdminNavbar({ admin }: { admin: AdminUser }) {
  const pathname = usePathname();

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
    { href: "/admin/events", label: "Events", icon: Calendar },
    { href: "/admin/content", label: "Content", icon: FileText },
    { href: "/admin/team", label: "Team", icon: Users },
    { href: "/admin/vsd", label: "VSD", icon: BookOpen },
    { href: "/admin/admins", label: "Admins", icon: ShieldUser },
  ];

  const isActive = (href: string) => {
    if (href === "/admin") {
      return pathname === "/admin";
    }
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-linear-to-r from-gray-200 via-gray-400 to-gray-200 border-b border-neutral-200 shadow-sm">
      {/* Main Navbar */}
      <div className="px-6 lg:px-8 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Left: Logo + Brand */}
          <Link href="/admin" className="flex items-center gap-3 shrink-0">
            <Image
              src="https://raw.githubusercontent.com/GenKrit/Content/refs/heads/main/EmailTemplate/Images/veritas-logo.png"
              alt="Veritas"
              width={50}
              height={50}
              className="object-contain"
            />
            <div>
              <h1 className="text-base font-bold text-neutral-900 leading-tight">Veritas Admin</h1>
              <p className="text-xs text-neutral-500">Management Panel</p>
            </div>
          </Link>

          {/* Center: Navigation */}
          <nav className="hidden lg:flex items-center gap-2 flex-1 justify-center">
            {navItems.map((item) => {
              const Icon = item.icon;
              const active = isActive(item.href);
              
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`
                    flex items-center gap-2 px-5 py-2.5 rounded-lg transition-all font-semibold
                    ${
                      active
                        ? "bg-neutral-200 text-neutral-900 shadow-md scale-105"
                        : "text-neutral-700 hover:bg-neutral-100 hover:text-neutral-900"
                    }
                  `}
                >
                  <Icon className={active ? "h-5 w-5" : "h-4 w-4"} />
                  <span className={active ? "text-sm" : "text-sm"}>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* Right: User Info + Logout */}
         <div className="flex items-center gap-3 shrink-0">
            <Link
              href="/admin/profile"
              className="hidden md:flex items-center gap-3 px-4 py-2 bg-neutral-50 rounded-lg border border-neutral-200 
              transition-all duration-300 ease-out hover:scale-105 hover:border-orange-400 
              hover:bg-orange-50 hover:shadow-[0_0_20px_rgba(251,146,60,0.3)] active:scale-95"
            >
              <div className="text-right">
                <p className="text-sm font-semibold text-neutral-900">{admin.name}</p>
                <p className="text-xs text-neutral-500 uppercase">
                  {admin.role.replace(/_/g, " ")}
                </p>
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-linear-to-br from-neutral-700 to-neutral-900 text-sm font-bold text-white">
                {admin.name.charAt(0).toUpperCase()}
              </div>
            </Link>
            <LogoutButton />
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <nav className="lg:hidden border-t border-neutral-200 bg-white">
        <div className="grid grid-cols-6 gap-1 py-2 px-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`
                  flex flex-col items-center gap-1 px-2 py-2.5 rounded-lg transition-all font-medium
                  ${
                    active
                      ? "bg-blue-600 text-white"
                      : "text-neutral-600 hover:text-neutral-900 hover:bg-neutral-50"
                  }
                `}
              >
                <Icon className={active ? "h-5 w-5" : "h-5 w-5"} />
                <span className="text-xs">{item.label}</span>
              </Link>
            );
          })}
        </div>
      </nav>
    </header>
  );
}
