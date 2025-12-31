"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AdminUser } from "@prisma/client";
import { 
  Smartphone, Globe, LogOut, ShieldAlert, AlertTriangle, ArrowLeft, RefreshCw, User, Mail 
} from "lucide-react";

// Define the type for our stats data
interface SessionStats {
  mySessions: number;
  totalSessions: number;
  activeUsers: { name: string; email: string }[];
}

export default function SessionsManager({ admin }: { admin: AdminUser }) {
  const router = useRouter();
  const isSuperAdmin = admin.role === "SUPER_ADMIN";

  // State
  const [sessionStats, setSessionStats] = useState<SessionStats>({ 
    mySessions: 0, 
    totalSessions: 0, 
    activeUsers: [] 
  });
  const [loadingStats, setLoadingStats] = useState(true);
  
  // Modals
  const [showLogoutMineModal, setShowLogoutMineModal] = useState(false);
  const [showGlobalConfirm1, setShowGlobalConfirm1] = useState(false);
  const [showGlobalConfirm2, setShowGlobalConfirm2] = useState(false);

  // Fetch Stats
  async function fetchSessionStats() {
    setLoadingStats(true);
    try {
      const res = await fetch("/api/admin/profile/sessions/stats");
      if (res.ok) {
        const data = await res.json();
        setSessionStats(data);
      }
    } catch (e) {
      console.error("Failed to fetch session stats");
    } finally {
      setLoadingStats(false);
    }
  }

  useEffect(() => {
    fetchSessionStats();
  }, []);

  // Handlers
  async function handleLogoutMine() {
    try {
      const res = await fetch("/api/admin/profile/sessions/logout-mine", { method: "POST" });
      if (res.ok) {
        window.location.href = "/admin/login";
      } else {
        alert("Failed to logout sessions");
      }
    } catch (e) {
      alert("Error occurred");
    }
  }

  async function handleGlobalLogout() {
    try {
      const res = await fetch("/api/admin/profile/sessions/logout-global", { method: "POST" });
      if (res.ok) {
        alert("✅ All system sessions destroyed. You are being logged out.");
        window.location.href = "/admin/login";
      } else {
        alert("Failed to perform global logout");
      }
    } catch (e) {
      alert("Error occurred");
    }
  }

  return (
    <div className="px-6 lg:px-8 py-8 max-w-4xl mx-auto">
      
      {/* Back Navigation */}
      <Link 
        href="/admin/profile" 
        className="inline-flex items-center gap-2 text-neutral-600 hover:text-neutral-900 mb-6 font-medium transition-colors"
      >
        <ArrowLeft className="w-4 h-4" /> Back to Profile
      </Link>

      {/* Header */}
      <div className="bg-linear-to-br from-neutral-800 to-neutral-900 rounded-xl p-8 mb-8 shadow-lg flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Session Management</h1>
          <p className="text-neutral-300">Monitor and manage active admin sessions</p>
        </div>
        <Smartphone className="w-12 h-12 text-neutral-600/50" />
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* My Sessions */}
        <div className="bg-white border-2 border-blue-200 p-6 rounded-xl shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-bold text-blue-600 mb-1 uppercase tracking-wide">My Active Sessions</p>
            <p className="text-4xl font-bold text-neutral-900">
              {loadingStats ? "-" : sessionStats.mySessions}
            </p>
            <p className="text-xs text-neutral-500 mt-2">Devices currently logged into your account</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-full">
            <Smartphone className="w-8 h-8 text-blue-500" />
          </div>
        </div>

        {/* Total Sessions (Super Admin Only) */}
        {isSuperAdmin && (
          <div className="bg-white border-2 border-purple-200 p-6 rounded-xl shadow-sm flex items-center justify-between">
            <div>
              <p className="text-sm font-bold text-purple-600 mb-1 uppercase tracking-wide">Total Active Sessions</p>
              <p className="text-4xl font-bold text-neutral-900">
                {loadingStats ? "-" : sessionStats.totalSessions}
              </p>
              <p className="text-xs text-neutral-500 mt-2">Total admins currently online</p>
            </div>
            <div className="bg-purple-50 p-4 rounded-full">
              <Globe className="w-8 h-8 text-purple-500" />
            </div>
          </div>
        )}
      </div>

      {/* Refresh Button */}
      <div className="flex justify-end mb-4">
        <button 
          onClick={fetchSessionStats} 
          disabled={loadingStats}
          className="flex items-center gap-2 text-sm text-neutral-600 hover:text-neutral-900"
        >
          <RefreshCw className={`w-4 h-4 ${loadingStats ? "animate-spin" : ""}`} /> 
          Refresh Stats
        </button>
      </div>

      {/* Actions Section */}
      <div className="bg-white border-2 border-neutral-300 rounded-xl overflow-hidden shadow-md mb-8">
        <div className="p-6 border-b border-neutral-200 bg-neutral-50">
          <h2 className="text-lg font-bold text-neutral-800">Security Actions</h2>
        </div>
        
        <div className="p-6 space-y-6">
          
          {/* Logout Mine */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded-lg bg-neutral-50 border border-neutral-200 hover:border-neutral-300 transition-colors">
            <div className="flex items-start gap-4">
              <div className="bg-neutral-200 p-3 rounded-lg">
                <LogOut className="w-6 h-6 text-neutral-700" />
              </div>
              <div>
                <h3 className="font-bold text-neutral-900 text-lg">Sign out everywhere</h3>
                <p className="text-sm text-neutral-600 max-w-md">
                  This will log you out from all devices including this one.
                </p>
              </div>
            </div>
            <button 
              onClick={() => setShowLogoutMineModal(true)}
              className="w-full sm:w-auto px-6 py-3 bg-neutral-800 text-white rounded-lg hover:bg-black font-bold transition-all shadow-sm"
            >
              Sign Out All
            </button>
          </div>

          {/* Global Kill Switch (Super Admin) */}
          {isSuperAdmin && (
            <div className="flex flex-col sm:flex-row items-center justify-between gap-6 p-4 rounded-lg bg-red-50 border border-red-200 hover:border-red-300 transition-colors">
              <div className="flex items-start gap-4">
                <div className="bg-red-100 p-3 rounded-lg">
                  <ShieldAlert className="w-6 h-6 text-red-600" />
                </div>
                <div>
                  <h3 className="font-bold text-red-900 text-lg">Emergency Force Logout</h3>
                  <p className="text-sm text-red-700 max-w-md">
                    Terminates <strong>every</strong> active session in the database.
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowGlobalConfirm1(true)}
                className="w-full sm:w-auto px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 font-bold transition-all shadow-sm"
              >
                Revoke All
              </button>
            </div>
          )}
        </div>
      </div>

      {/* NEW: Active Users Table (Super Admin Only) */}
      {isSuperAdmin && (
        <div className="bg-white border-2 border-neutral-300 rounded-xl overflow-hidden shadow-md">
           <div className="p-6 border-b border-neutral-200 bg-neutral-50 flex items-center gap-3">
              <User className="w-5 h-5 text-neutral-600" />
              <h2 className="text-lg font-bold text-neutral-800">Active Users List</h2>
           </div>
           
           <div className="overflow-x-auto">
             <table className="w-full">
                <thead className="bg-neutral-100 border-b border-neutral-200">
                  <tr>
                    <th className="text-left py-4 px-6 font-bold text-sm text-neutral-600">User Name</th>
                    <th className="text-left py-4 px-6 font-bold text-sm text-neutral-600">Email Address</th>
                    <th className="text-right py-4 px-6 font-bold text-sm text-neutral-600">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {loadingStats ? (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-neutral-500">Loading active users...</td>
                    </tr>
                  ) : sessionStats.activeUsers.length === 0 ? (
                    <tr>
                      <td colSpan={3} className="py-8 text-center text-neutral-500">No active users found.</td>
                    </tr>
                  ) : (
                    sessionStats.activeUsers.map((user, idx) => (
                      <tr key={idx} className="border-b border-neutral-100 last:border-0 hover:bg-neutral-50 transition-colors">
                        <td className="py-4 px-6 text-neutral-900 font-medium">{user.name}</td>
                        <td className="py-4 px-6 text-neutral-600 font-mono text-sm">{user.email}</td>
                        <td className="py-4 px-6 text-right">
                           <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-100 text-green-700 text-xs font-bold border border-green-200">
                             <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                             Online
                           </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
             </table>
           </div>
        </div>
      )}

      {/* --- MODALS --- */}
      {showLogoutMineModal && (
        <ConfirmationModal
          title="Sign out everywhere?"
          message="This will invalidate your session on all devices. You will be redirected to the login page."
          confirmText="Yes, Sign Out"
          cancelText="Cancel"
          onConfirm={handleLogoutMine}
          onCancel={() => setShowLogoutMineModal(false)}
          type="warning"
        />
      )}

      {showGlobalConfirm1 && (
        <ConfirmationModal
          title="⚠️ Global Force Logout"
          message={`There are ${sessionStats.totalSessions} active sessions. This will disrupt all working admins. Do you want to proceed?`}
          confirmText="Yes, Proceed"
          cancelText="Cancel"
          onConfirm={() => {
            setShowGlobalConfirm1(false);
            setShowGlobalConfirm2(true);
          }}
          onCancel={() => setShowGlobalConfirm1(false)}
          type="warning"
        />
      )}

      {showGlobalConfirm2 && (
        <ConfirmationModal
          title="🚨 FINAL WARNING"
          message="This action is irreversible. All admins will lose any unsaved data and be logged out immediately."
          confirmText="EXECUTE FORCE LOGOUT"
          cancelText="Stop"
          onConfirm={handleGlobalLogout}
          onCancel={() => setShowGlobalConfirm2(false)}
          type="danger"
        />
      )}

    </div>
  );
}

// Reusable Modal (kept same)
function ConfirmationModal({
  title, message, confirmText, cancelText, onConfirm, onCancel, type = "warning",
}: {
  title: string; message: string; confirmText: string; cancelText: string;
  onConfirm: () => void; onCancel: () => void; type?: "warning" | "danger";
}) {
  const colors = {
    warning: {
      bg: "bg-yellow-50", border: "border-yellow-300", icon: "text-yellow-600", iconBg: "bg-yellow-100", button: "bg-yellow-600 hover:bg-yellow-700",
    },
    danger: {
      bg: "bg-red-50", border: "border-red-300", icon: "text-red-600", iconBg: "bg-red-100", button: "bg-red-600 hover:bg-red-700",
    },
  };
  const color = colors[type];
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white rounded-xl p-8 max-w-md w-full border-2 border-neutral-400 shadow-2xl animate-in fade-in zoom-in duration-200">
        <div className="flex items-start gap-4 mb-6">
          <div className={`${color.iconBg} rounded-full p-3 shrink-0`}>
            <AlertTriangle className={`w-8 h-8 ${color.icon}`} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-neutral-900 mb-2">{title}</h3>
            <p className="text-sm text-neutral-700 leading-relaxed">{message}</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button onClick={onConfirm} className={`flex-1 px-6 py-3 ${color.button} text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg`}>
            {confirmText}
          </button>
          <button onClick={onCancel} className="px-6 py-3 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300 font-semibold transition-all">
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}