// // veritas-website\app\admin\(protected)\admins\CreateAdminButton.tsx
// "use client";

// import { useState } from "react";
// import { AdminRole } from "@prisma/client";
// import { useRouter } from "next/navigation";
// import { 
//   Eye, 
//   EyeOff, 
//   X, 
//   AlertCircle, 
//   CheckCircle2, 
//   UserPlus, 
//   Mail, 
//   User, 
//   Shield, 
//   Lock,
//   Check
// } from "lucide-react";

// export default function CreateAdminButton() {
//   const [open, setOpen] = useState(false);
//   const [showPassword, setShowPassword] = useState(false);
//   const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState(false);
//   const router = useRouter();

//   const [form, setForm] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: "",
//     role: "DEPARTMENT_ADMIN" as AdminRole,
//   });

//   // Password strength calculation
//   function getPasswordStrength(password: string): {
//     score: number;
//     label: string;
//     color: string;
//     bgClass: string;
//     textClass: string;
//   } {
//     let score = 0;
//     if (password.length >= 8) score++;
//     if (password.length >= 12) score++;
//     if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
//     if (/\d/.test(password)) score++;
//     if (/[^a-zA-Z0-9]/.test(password)) score++;

//     if (score <= 1) return { score, label: "Weak", color: "red", bgClass: "bg-red-500", textClass: "text-red-400" };
//     if (score <= 3) return { score, label: "Medium", color: "yellow", bgClass: "bg-yellow-500", textClass: "text-yellow-400" };
//     return { score, label: "Strong", color: "green", bgClass: "bg-emerald-500", textClass: "text-emerald-400" };
//   }

//   const strength = getPasswordStrength(form.password);

//   // Validation
//   function validateForm(): string | null {
//     if (!form.name.trim()) return "Name is required";
//     if (!form.email.trim()) return "Email is required";
//     if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
//       return "Invalid email format";
//     }
//     if (form.password.length < 8) {
//       return "Password must be at least 8 characters";
//     }
//     if (!/[A-Z]/.test(form.password)) {
//       return "Password must contain at least one uppercase letter";
//     }
//     if (!/[a-z]/.test(form.password)) {
//       return "Password must contain at least one lowercase letter";
//     }
//     if (!/\d/.test(form.password)) {
//       return "Password must contain at least one number";
//     }
//     if (form.password !== form.confirmPassword) {
//       return "Passwords do not match";
//     }
//     return null;
//   }

//   async function submit() {
//     setError("");
    
//     const validationError = validateForm();
//     if (validationError) {
//       setError(validationError);
//       return;
//     }

//     // Confirmation dialog
//     if (!confirm(`Create admin account for ${form.email}?\n\nThey will need approval before they can log in.`)) {
//       return;
//     }

//     setLoading(true);

//     try {
//       const res = await fetch("/api/admin/admins/create", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           name: form.name,
//           email: form.email,
//           password: form.password,
//           role: form.role,
//         }),
//       });

//       const data = await res.json();

//       if (!res.ok) {
//         setError(data.error || "Failed to create admin");
//         setLoading(false);
//         return;
//       }

//       // Success state
//       setSuccess(true);
//       setTimeout(() => {
//         resetAndClose();
//         router.refresh();
//       }, 2000);
//     } catch (err) {
//       setError("Network error. Please try again.");
//       setLoading(false);
//     }
//   }

//   function resetAndClose() {
//     setForm({
//       name: "",
//       email: "",
//       password: "",
//       confirmPassword: "",
//       role: "DEPARTMENT_ADMIN",
//     });
//     setError("");
//     setSuccess(false);
//     setLoading(false);
//     setOpen(false);
//   }

//   return (
//     <>
//       <button
//         type="button"
//         onClick={() => setOpen(true)}
//         className="flex items-center gap-2 px-5 py-2.5 bg-zinc-100 hover:bg-white text-zinc-900 rounded-lg font-medium transition-all shadow-sm hover:shadow-md text-base"
//       >
//         <UserPlus size={20} className="text-zinc-600" />
//         <span>Add New Admin</span>
//       </button>

//       {open && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
//           {/* Simple Dark Overlay */}
//           <div 
//             className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
//             onClick={loading ? undefined : resetAndClose}
//           />

//           {/* Modal Content */}
//           <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl flex flex-col max-h-[95vh]">
            
//             {/* Header */}
//             <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-800">
//               <h2 className="text-xl font-semibold text-white">Create Admin Account</h2>
//               <button
//               aria-label="Close"
//                 type="button"
//                 onClick={resetAndClose}
//                 disabled={loading}
//                 className="p-2 text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 rounded-full transition-colors"
//               >
//                 <X size={22} />
//               </button>
//             </div>

//             {/* Scrollable Body */}
//             <div className="overflow-y-auto custom-scrollbar">
//               {success ? (
//                 // Success View
//                 <div className="flex flex-col items-center justify-center p-16 text-center">
//                   <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
//                     <CheckCircle2 size={40} className="text-green-500" />
//                   </div>
//                   <h3 className="text-2xl font-semibold text-white mb-3">Account Created</h3>
//                   <p className="text-zinc-400 text-lg">
//                     <span className="text-white font-medium">{form.email}</span> is now pending approval.
//                   </p>
//                 </div>
//               ) : (
//                 // Form View
//                 <div className="p-8 space-y-6">
//                   {error && (
//                     <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex gap-3 items-center">
//                       <AlertCircle size={20} className="text-red-500 shrink-0" />
//                       <p className="text-base text-red-200">{error}</p>
//                     </div>
//                   )}

//                   <div className="space-y-5">
//                     {/* Name Input */}
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-zinc-300 ml-1">Full Name</label>
//                       <div className="relative">
//                         <User size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
//                         <input
//                           placeholder="Enter new Admin name"
//                           className="w-full pl-11 pr-4 py-3 bg-zinc-950/50 border border-zinc-700 rounded-lg focus:bg-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder:text-zinc-600 text-base transition-all"
//                           value={form.name}
//                           onChange={(e) => setForm({ ...form, name: e.target.value })}
//                           disabled={loading}
//                         />
//                       </div>
//                     </div>

//                     {/* Email Input */}
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-zinc-300 ml-1">Email Address</label>
//                       <div className="relative">
//                         <Mail size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
//                         <input
//                           type="email"
//                           placeholder="admin@veritas.com"
//                           className="w-full pl-11 pr-4 py-3 bg-zinc-950/50 border border-zinc-700 rounded-lg focus:bg-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder:text-zinc-600 text-base transition-all"
//                           value={form.email}
//                           onChange={(e) => setForm({ ...form, email: e.target.value })}
//                           disabled={loading}
//                         />
//                       </div>
//                     </div>

//                     {/* Role Selection */}
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-zinc-300 ml-1">Access Role</label>
//                       <div className="relative">
//                         <Shield size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
//                         <select
//                         aria-label="Role"
//                           className="w-full pl-11 pr-10 py-3 bg-zinc-950/50 border border-zinc-700 rounded-lg focus:bg-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white appearance-none cursor-pointer text-base transition-all"
//                           value={form.role}
//                           onChange={(e) => setForm({ ...form, role: e.target.value as AdminRole })}
//                           disabled={loading}
//                         >
//                           <option value="DEPARTMENT_ADMIN">Department Admin</option>
//                           <option value="CONTENT_ADMIN">Content Admin</option>
//                           <option value="SUPER_ADMIN">Super Admin</option>
//                         </select>
//                         <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
//                           <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
//                         </div>
//                       </div>
//                     </div>

//                     {/* Password Input */}
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-zinc-300 ml-1">Password</label>
//                       <div className="relative">
//                         <Lock size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
//                         <input
//                           type={showPassword ? "text" : "password"}
//                           placeholder="Create password"
//                           className="w-full pl-11 pr-11 py-3 bg-zinc-950/50 border border-zinc-700 rounded-lg focus:bg-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder:text-zinc-600 text-base transition-all"
//                           value={form.password}
//                           onChange={(e) => setForm({ ...form, password: e.target.value })}
//                           disabled={loading}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowPassword(!showPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white transition-colors"
//                         >
//                           {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                         </button>
//                       </div>

//                       {/* Password Strength Meter */}
//                       {form.password && (
//                         <div className="flex items-center gap-3 mt-3 px-1">
//                           <div className="flex-1 flex gap-1.5 h-1.5">
//                             {[...Array(5)].map((_, i) => (
//                               <div
//                                 key={i}
//                                 className={`flex-1 rounded-full transition-colors duration-300 ${
//                                   i < strength.score ? strength.bgClass : "bg-zinc-800"
//                                 }`}
//                               />
//                             ))}
//                           </div>
//                           <span className={`text-sm font-medium ${strength.textClass}`}>
//                             {strength.label}
//                           </span>
//                         </div>
//                       )}
//                     </div>

//                     {/* Confirm Password */}
//                     <div className="space-y-2">
//                       <label className="text-sm font-medium text-zinc-300 ml-1">Confirm Password</label>
//                       <div className="relative">
//                         <Lock size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
//                         <input
//                           type={showConfirmPassword ? "text" : "password"}
//                           placeholder="Repeat password"
//                           className={`w-full pl-11 pr-11 py-3 bg-zinc-950/50 border rounded-lg focus:bg-zinc-900 focus:ring-1 outline-none text-white placeholder:text-zinc-600 text-base transition-all ${
//                             form.confirmPassword && form.password !== form.confirmPassword 
//                             ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
//                             : "border-zinc-700 focus:border-blue-500 focus:ring-blue-500"
//                           }`}
//                           value={form.confirmPassword}
//                           onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
//                           disabled={loading}
//                         />
//                         <button
//                           type="button"
//                           onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                           className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white transition-colors"
//                         >
//                           {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                         </button>
//                       </div>
                      
//                       {/* Match Status */}
//                       {form.confirmPassword && (
//                         <div className="px-1 flex items-center gap-2 text-sm mt-1">
//                           {form.password === form.confirmPassword ? (
//                             <span className="text-emerald-400 flex items-center gap-1.5">
//                               <CheckCircle2 size={16} /> Matches
//                             </span>
//                           ) : (
//                             <span className="text-red-400 flex items-center gap-1.5">
//                               <AlertCircle size={16} /> Mismatch
//                             </span>
//                           )}
//                         </div>
//                       )}
//                     </div>

//                     {/* Password Requirements Block */}
//                     <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
//                        <p className="text-sm font-medium text-zinc-300 mb-2">Password Requirements</p>
//                        <ul className="text-sm text-zinc-400 space-y-1.5">
//                          <li className={`flex items-center gap-2.5 ${form.password.length >= 8 ? "text-emerald-400" : ""}`}>
//                            {form.password.length >= 8 ? <Check size={16} /> : <div className="w-4 h-4 rounded-full border border-zinc-700" />}
//                            8+ characters
//                          </li>
//                          <li className={`flex items-center gap-2.5 ${/[A-Z]/.test(form.password) ? "text-emerald-400" : ""}`}>
//                            {/[A-Z]/.test(form.password) ? <Check size={16} /> : <div className="w-4 h-4 rounded-full border border-zinc-700" />}
//                            Uppercase letter (A-Z)
//                          </li>
//                          <li className={`flex items-center gap-2.5 ${/[a-z]/.test(form.password) ? "text-emerald-400" : ""}`}>
//                            {/[a-z]/.test(form.password) ? <Check size={16} /> : <div className="w-4 h-4 rounded-full border border-zinc-700" />}
//                            Lowercase letter (a-z)
//                          </li>
//                          <li className={`flex items-center gap-2.5 ${/\d/.test(form.password) ? "text-emerald-400" : ""}`}>
//                            {/\d/.test(form.password) ? <Check size={16} /> : <div className="w-4 h-4 rounded-full border border-zinc-700" />}
//                            Number (0-9)
//                          </li>
//                        </ul>
//                     </div>

//                   </div>
//                 </div>
//               )}
//             </div>

//             {/* Footer */}
//             {!success && (
//               <div className="p-8 pt-4 border-t border-zinc-800 bg-zinc-900">
//                 <div className="flex gap-4">
//                   <button
//                     onClick={resetAndClose}
//                     disabled={loading}
//                     className="flex-1 px-4 py-3 text-base font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 hover:text-white rounded-lg transition-colors disabled:opacity-50"
//                   >
//                     Cancel
//                   </button>
//                   <button
//                     onClick={submit}
//                     disabled={loading || !form.name || !form.email || !form.password || !form.confirmPassword}
//                     className="flex-1 px-4 py-3 text-base font-medium text-black bg-white hover:bg-zinc-200 rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
//                   >
//                     {loading ? (
//                       <>
//                         <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
//                         Creating...
//                       </>
//                     ) : (
//                       "Create Admin"
//                     )}
//                   </button>
//                 </div>
//                 <p className="text-sm font-medium text-zinc-300 mb-2 mt-4 text-center">
//                     Note: New admins will require approval before they can log in.
//                   </p>
//               </div>
//             )}
//           </div>
//         </div>
//       )}
//     </>
//   );
// }

// app/admin/(protected)/admins/CreateAdminButton.tsx
"use client";

import { useState } from "react";
import { AdminRole, Department } from "@prisma/client";
import { useRouter } from "next/navigation";
import { 
  Eye, 
  EyeOff, 
  X, 
  AlertCircle, 
  CheckCircle2, 
  UserPlus, 
  Mail, 
  User, 
  Shield, 
  Lock,
  Check,
  Building2
} from "lucide-react";

export default function CreateAdminButton() {
  const [open, setOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "DEPARTMENT_ADMIN" as AdminRole,
    department: null as Department | null,
  });

  // Password strength calculation
  function getPasswordStrength(password: string): {
    score: number;
    label: string;
    color: string;
    bgClass: string;
    textClass: string;
  } {
    let score = 0;
    if (password.length >= 8) score++;
    if (password.length >= 12) score++;
    if (/[a-z]/.test(password) && /[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^a-zA-Z0-9]/.test(password)) score++;

    if (score <= 1) return { score, label: "Weak", color: "red", bgClass: "bg-red-500", textClass: "text-red-400" };
    if (score <= 3) return { score, label: "Medium", color: "yellow", bgClass: "bg-yellow-500", textClass: "text-yellow-400" };
    return { score, label: "Strong", color: "green", bgClass: "bg-emerald-500", textClass: "text-emerald-400" };
  }

  const strength = getPasswordStrength(form.password);

  // Show department field only if role is DEPARTMENT_ADMIN
  const showDepartmentField = form.role === "DEPARTMENT_ADMIN";

  // Validation
  function validateForm(): string | null {
    if (!form.name.trim()) return "Name is required";
    if (!form.email.trim()) return "Email is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) {
      return "Invalid email format";
    }
    if (form.password.length < 8) {
      return "Password must be at least 8 characters";
    }
    if (!/[A-Z]/.test(form.password)) {
      return "Password must contain at least one uppercase letter";
    }
    if (!/[a-z]/.test(form.password)) {
      return "Password must contain at least one lowercase letter";
    }
    if (!/\d/.test(form.password)) {
      return "Password must contain at least one number";
    }
    if (form.password !== form.confirmPassword) {
      return "Passwords do not match";
    }
    return null;
  }

  async function submit() {
    setError("");
    
    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    // Confirmation dialog
    const deptInfo = showDepartmentField 
      ? form.department 
        ? ` (${form.department} Department)`
        : " (All Departments)"
      : "";
    
    if (!confirm(`Create admin account for ${form.email}${deptInfo}?\n\nThey will need approval before they can log in.`)) {
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/admin/admins/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          password: form.password,
          role: form.role,
          department: showDepartmentField ? form.department : null,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to create admin");
        setLoading(false);
        return;
      }

      // Success state
      setSuccess(true);
      setTimeout(() => {
        resetAndClose();
        router.refresh();
      }, 2000);
    } catch (err) {
      setError("Network error. Please try again.");
      setLoading(false);
    }
  }

  function resetAndClose() {
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "DEPARTMENT_ADMIN",
      department: null,
    });
    setError("");
    setSuccess(false);
    setLoading(false);
    setOpen(false);
  }

  // When role changes, reset department if not DEPARTMENT_ADMIN
  function handleRoleChange(newRole: AdminRole) {
    setForm({ 
      ...form, 
      role: newRole,
      department: newRole === "DEPARTMENT_ADMIN" ? form.department : null
    });
  }

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="flex items-center gap-2 px-5 py-2.5 bg-zinc-100 hover:bg-white text-zinc-900 rounded-lg font-medium transition-all shadow-sm hover:shadow-md text-base"
      >
        <UserPlus size={20} className="text-zinc-600" />
        <span>Add New Admin</span>
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Simple Dark Overlay */}
          <div 
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity" 
            onClick={loading ? undefined : resetAndClose}
          />

          {/* Modal Content */}
          <div className="relative w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-xl shadow-2xl flex flex-col max-h-[95vh]">
            
            {/* Header */}
            <div className="flex items-center justify-between px-8 py-6 border-b border-zinc-800">
              <h2 className="text-xl font-semibold text-white">Create Admin Account</h2>
              <button
                aria-label="Close"
                type="button"
                onClick={resetAndClose}
                disabled={loading}
                className="p-2 text-zinc-400 hover:text-white bg-zinc-800/50 hover:bg-zinc-800 rounded-full transition-colors"
              >
                <X size={22} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="overflow-y-auto custom-scrollbar">
              {success ? (
                // Success View
                <div className="flex flex-col items-center justify-center p-16 text-center">
                  <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle2 size={40} className="text-green-500" />
                  </div>
                  <h3 className="text-2xl font-semibold text-white mb-3">Account Created</h3>
                  <p className="text-zinc-400 text-lg">
                    <span className="text-white font-medium">{form.email}</span> is now pending approval.
                  </p>
                </div>
              ) : (
                // Form View
                <div className="p-8 space-y-6">
                  {error && (
                    <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-4 flex gap-3 items-center">
                      <AlertCircle size={20} className="text-red-500 shrink-0" />
                      <p className="text-base text-red-200">{error}</p>
                    </div>
                  )}

                  <div className="space-y-5">
                    {/* Name Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300 ml-1">Full Name</label>
                      <div className="relative">
                        <User size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input
                          placeholder="Enter new Admin name"
                          className="w-full pl-11 pr-4 py-3 bg-zinc-950/50 border border-zinc-700 rounded-lg focus:bg-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder:text-zinc-600 text-base transition-all"
                          value={form.name}
                          onChange={(e) => setForm({ ...form, name: e.target.value })}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {/* Email Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300 ml-1">Email Address</label>
                      <div className="relative">
                        <Mail size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input
                          type="email"
                          placeholder="admin@veritas.com"
                          className="w-full pl-11 pr-4 py-3 bg-zinc-950/50 border border-zinc-700 rounded-lg focus:bg-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder:text-zinc-600 text-base transition-all"
                          value={form.email}
                          onChange={(e) => setForm({ ...form, email: e.target.value })}
                          disabled={loading}
                        />
                      </div>
                    </div>

                    {/* Role Selection */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300 ml-1">Access Role</label>
                      <div className="relative">
                        <Shield size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <select
                          aria-label="Role"
                          className="w-full pl-11 pr-10 py-3 bg-zinc-950/50 border border-zinc-700 rounded-lg focus:bg-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white appearance-none cursor-pointer text-base transition-all"
                          value={form.role}
                          onChange={(e) => handleRoleChange(e.target.value as AdminRole)}
                          disabled={loading}
                        >
                          <option value="DEPARTMENT_ADMIN">Department Admin</option>
                          <option value="CONTENT_ADMIN">Content Admin</option>
                          <option value="SUPER_ADMIN">Super Admin</option>
                        </select>
                        <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                        </div>
                      </div>
                    </div>

                    {/* Department Selection - Only shown for DEPARTMENT_ADMIN */}
                    {showDepartmentField && (
                      <div className="space-y-2">
                        <label className="text-sm font-medium text-zinc-300 ml-1">
                          Assigned Department
                        </label>
                        <div className="relative">
                          <Building2 size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                          <select
                            aria-label="Department"
                            className="w-full pl-11 pr-10 py-3 bg-zinc-950/50 border border-zinc-700 rounded-lg focus:bg-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white appearance-none cursor-pointer text-base transition-all"
                            value={form.department || ""}
                            onChange={(e) => setForm({ 
                              ...form, 
                              department: e.target.value ? (e.target.value as Department) : null 
                            })}
                            disabled={loading}
                          >
                            <option value="">All Departments (null)</option>
                            {Object.values(Department).map((dept) => (
                              <option key={dept} value={dept}>
                                {dept}
                              </option>
                            ))}
                          </select>
                          <div className="absolute right-3.5 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" /></svg>
                          </div>
                        </div>
                        <p className="text-xs text-zinc-500 ml-1">
                          {form.department 
                            ? `Can only manage ${form.department} department` 
                            : "Can manage all departments (but not society leadership)"}
                        </p>
                      </div>
                    )}

                    {/* Password Input */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300 ml-1">Password</label>
                      <div className="relative">
                        <Lock size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input
                          type={showPassword ? "text" : "password"}
                          placeholder="Create password"
                          className="w-full pl-11 pr-11 py-3 bg-zinc-950/50 border border-zinc-700 rounded-lg focus:bg-zinc-900 focus:border-blue-500 focus:ring-1 focus:ring-blue-500 outline-none text-white placeholder:text-zinc-600 text-base transition-all"
                          value={form.password}
                          onChange={(e) => setForm({ ...form, password: e.target.value })}
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white transition-colors"
                        >
                          {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>

                      {/* Password Strength Meter */}
                      {form.password && (
                        <div className="flex items-center gap-3 mt-3 px-1">
                          <div className="flex-1 flex gap-1.5 h-1.5">
                            {[...Array(5)].map((_, i) => (
                              <div
                                key={i}
                                className={`flex-1 rounded-full transition-colors duration-300 ${
                                  i < strength.score ? strength.bgClass : "bg-zinc-800"
                                }`}
                              />
                            ))}
                          </div>
                          <span className={`text-sm font-medium ${strength.textClass}`}>
                            {strength.label}
                          </span>
                        </div>
                      )}
                    </div>

                    {/* Confirm Password */}
                    <div className="space-y-2">
                      <label className="text-sm font-medium text-zinc-300 ml-1">Confirm Password</label>
                      <div className="relative">
                        <Lock size={20} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input
                          type={showConfirmPassword ? "text" : "password"}
                          placeholder="Repeat password"
                          className={`w-full pl-11 pr-11 py-3 bg-zinc-950/50 border rounded-lg focus:bg-zinc-900 focus:ring-1 outline-none text-white placeholder:text-zinc-600 text-base transition-all ${
                            form.confirmPassword && form.password !== form.confirmPassword 
                            ? "border-red-500/50 focus:border-red-500 focus:ring-red-500"
                            : "border-zinc-700 focus:border-blue-500 focus:ring-blue-500"
                          }`}
                          value={form.confirmPassword}
                          onChange={(e) => setForm({ ...form, confirmPassword: e.target.value })}
                          disabled={loading}
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-zinc-500 hover:text-white transition-colors"
                        >
                          {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                        </button>
                      </div>
                      
                      {/* Match Status */}
                      {form.confirmPassword && (
                        <div className="px-1 flex items-center gap-2 text-sm mt-1">
                          {form.password === form.confirmPassword ? (
                            <span className="text-emerald-400 flex items-center gap-1.5">
                              <CheckCircle2 size={16} /> Matches
                            </span>
                          ) : (
                            <span className="text-red-400 flex items-center gap-1.5">
                              <AlertCircle size={16} /> Mismatch
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Password Requirements Block */}
                    <div className="bg-zinc-950 border border-zinc-800 rounded-lg p-4">
                       <p className="text-sm font-medium text-zinc-300 mb-2">Password Requirements</p>
                       <ul className="text-sm text-zinc-400 space-y-1.5">
                         <li className={`flex items-center gap-2.5 ${form.password.length >= 8 ? "text-emerald-400" : ""}`}>
                           {form.password.length >= 8 ? <Check size={16} /> : <div className="w-4 h-4 rounded-full border border-zinc-700" />}
                           8+ characters
                         </li>
                         <li className={`flex items-center gap-2.5 ${/[A-Z]/.test(form.password) ? "text-emerald-400" : ""}`}>
                           {/[A-Z]/.test(form.password) ? <Check size={16} /> : <div className="w-4 h-4 rounded-full border border-zinc-700" />}
                           Uppercase letter (A-Z)
                         </li>
                         <li className={`flex items-center gap-2.5 ${/[a-z]/.test(form.password) ? "text-emerald-400" : ""}`}>
                           {/[a-z]/.test(form.password) ? <Check size={16} /> : <div className="w-4 h-4 rounded-full border border-zinc-700" />}
                           Lowercase letter (a-z)
                         </li>
                         <li className={`flex items-center gap-2.5 ${/\d/.test(form.password) ? "text-emerald-400" : ""}`}>
                           {/\d/.test(form.password) ? <Check size={16} /> : <div className="w-4 h-4 rounded-full border border-zinc-700" />}
                           Number (0-9)
                         </li>
                       </ul>
                    </div>

                  </div>
                </div>
              )}
            </div>

            {/* Footer */}
            {!success && (
              <div className="p-8 pt-4 border-t border-zinc-800 bg-zinc-900">
                <div className="flex gap-4">
                  <button
                    onClick={resetAndClose}
                    disabled={loading}
                    className="flex-1 px-4 py-3 text-base font-medium text-zinc-300 bg-zinc-800 hover:bg-zinc-700 hover:text-white rounded-lg transition-colors disabled:opacity-50"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={submit}
                    disabled={loading || !form.name || !form.email || !form.password || !form.confirmPassword}
                    className="flex-1 px-4 py-3 text-base font-medium text-black bg-white hover:bg-zinc-200 rounded-lg shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex justify-center items-center gap-2"
                  >
                    {loading ? (
                      <>
                        <div className="w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin" />
                        Creating...
                      </>
                    ) : (
                      "Create Admin"
                    )}
                  </button>
                </div>
                <p className="text-sm font-medium text-zinc-300 mb-2 mt-4 text-center">
                    Note: New admins will require approval before they can log in.
                  </p>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
