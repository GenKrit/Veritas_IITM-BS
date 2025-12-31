"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { AdminUser } from "@prisma/client";
import Link from "next/link";
import { User, Lock, Mail, Shield, Calendar, Save, X, Eye, EyeOff, AlertTriangle, Smartphone, ChevronRight } from "lucide-react";

export default function ProfileView({ admin }: { admin: AdminUser }) {
  const router = useRouter();
  
  // Name Edit State
  const [isEditingName, setIsEditingName] = useState(false);
  const [newName, setNewName] = useState(admin.name);
  const [nameLoading, setNameLoading] = useState(false);

  // Password Change State
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [showPasswords, setShowPasswords] = useState({
    old: false,
    new: false,
    confirm: false,
  });
  const [passwordLoading, setPasswordLoading] = useState(false);

  // Confirmation Modal States
  const [showFirstConfirmation, setShowFirstConfirmation] = useState(false);
  const [showFinalConfirmation, setShowFinalConfirmation] = useState(false);

  // Update Name
  async function handleUpdateName() {
    if (!newName.trim()) {
      alert("Name cannot be empty");
      return;
    }

    setNameLoading(true);
    try {
      const res = await fetch("/api/admin/profile/update-name", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to update name");
        return;
      }

      alert("Name updated successfully!");
      setIsEditingName(false);
      router.refresh();
    } catch (error) {
      alert("Failed to update name");
    } finally {
      setNameLoading(false);
    }
  }

  // First Step - Validate and show first confirmation
  function handlePasswordSubmit() {
    if (!passwordForm.oldPassword || !passwordForm.newPassword || !passwordForm.confirmPassword) {
      alert("Please fill all password fields");
      return;
    }

    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      alert("New passwords do not match");
      return;
    }

    if (passwordForm.newPassword.length < 8) {
      alert("New password must be at least 8 characters");
      return;
    }

    // Show first confirmation
    setShowFirstConfirmation(true);
  }

  // Second Step - Show final confirmation
  function handleFirstConfirmationAccept() {
    setShowFirstConfirmation(false);
    setShowFinalConfirmation(true);
  }

  // Final Step - Actually change password
  async function handleFinalConfirmationAccept() {
    setPasswordLoading(true);
    setShowFinalConfirmation(false);

    try {
      const res = await fetch("/api/admin/profile/change-password", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          oldPassword: passwordForm.oldPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Failed to change password");
        setPasswordLoading(false);
        return;
      }

      // Success - redirect to login
      alert("✅ Password changed successfully! Logging out from all devices...");
      
      // Small delay to show the message
      setTimeout(() => {
        window.location.href = "/admin/login";
      }, 2000);
    } catch (error) {
      alert("Failed to change password");
      setPasswordLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-neutral-200">
      <div className="px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="bg-linear-to-br from-neutral-800 to-neutral-900 rounded-xl p-8 mb-8 shadow-lg">
          <h1 className="text-3xl font-bold text-white mb-2">Profile Settings</h1>
          <p className="text-neutral-300">Manage your account information</p>
        </div>

        <div className="max-w-3xl mx-auto space-y-6">
          {/* Profile Card */}
          <div className="bg-white border-2 border-neutral-400 rounded-xl overflow-hidden shadow-md">
            
            {/* Avatar Section */}
            <div className="bg-linear-to-br from-blue-50 to-neutral-50 p-8 border-b-2 border-neutral-300">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-6">
                  {/* Avatar Circle */}
                  <div className="h-24 w-24 bg-linear-to-br from-blue-600 to-blue-800 rounded-full flex items-center justify-center text-4xl font-bold text-white shadow-lg shrink-0">
                    {admin.name.charAt(0).toUpperCase()}
                  </div>
                  
                  {/* User Details */}
                  <div>
                    <h2 className="text-2xl font-bold text-neutral-900 mb-1">{admin.name}</h2>
                    <div className="flex items-center gap-2 text-sm text-neutral-600 mb-2">
                      <Shield className="w-4 h-4" />
                      <span className="font-semibold uppercase">{admin.role.replace(/_/g, " ")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-neutral-500">
                      <Calendar className="w-4 h-4" />
                      <span>
                        Member since {new Date(admin.createdAt).toLocaleDateString("en-US", { 
                          month: "long", 
                          year: "numeric" 
                        })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* --- NEW: Role Badge Display --- */}
                <div className="hidden sm:block">
                  <RoleBadge role={admin.role} />
                </div>
              </div>
            </div>

            {/* Profile Details */}
            <div className="p-8 space-y-6">
              {/* Email (Locked) */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-neutral-700 mb-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <div className="flex items-center gap-3">
                  <input
                    type="email"
                    value={admin.email}
                    disabled
                    className="flex-1 p-3 bg-neutral-100 border-2 border-neutral-300 rounded-lg text-neutral-500 cursor-not-allowed"
                    title="Email Address"
                    placeholder="Email address"
                  />
                  <div className="px-4 py-3 bg-neutral-200 border-2 border-neutral-300 rounded-lg">
                    <Lock className="w-5 h-5 text-neutral-500" />
                  </div>
                </div>
                <p className="text-xs text-neutral-500 mt-2">Email cannot be changed</p>
              </div>

              {/* Name (Editable) */}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-neutral-700 mb-2">
                  <User className="w-4 h-4" />
                  Display Name
                </label>
                {isEditingName ? (
                  <div className="space-y-3">
                    <input
                      type="text"
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      className="w-full p-3 bg-white border-2 border-blue-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-neutral-900"
                      placeholder="Enter your name"
                      title="Display Name"
                    />
                    <div className="flex gap-3">
                      <button
                        onClick={handleUpdateName}
                        disabled={nameLoading}
                        className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 font-semibold transition-all disabled:opacity-50"
                      >
                        {nameLoading ? (
                          <div className="animate-spin h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                        ) : (
                          <>
                            <Save className="w-4 h-4" />
                            Save
                          </>
                        )}
                      </button>
                      <button
                        onClick={() => {
                          setIsEditingName(false);
                          setNewName(admin.name);
                        }}
                        disabled={nameLoading}
                        className="px-4 py-2 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300 font-semibold transition-all disabled:opacity-50 flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3">
                    <input
                      type="text"
                      value={admin.name}
                      disabled
                      className="flex-1 p-3 bg-neutral-100 border-2 border-neutral-300 rounded-lg text-neutral-900"
                      title="Display Name"
                      placeholder="Display name"
                    />
                    <button
                      onClick={() => setIsEditingName(true)}
                      className="px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-all"
                    >
                      Edit
                    </button>
                  </div>
                )}
              </div>

              {/* Action Buttons Row */}
              <div className="pt-6 border-t-2 border-neutral-200 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Change Password Button */}
                {!showPasswordForm && (
                  <button
                    onClick={() => setShowPasswordForm(true)}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-all shadow-sm"
                  >
                    <Lock className="w-5 h-5" />
                    Change Password
                  </button>
                )}
                {/* Manage Sessions Button */}
                <Link 
                  href="/admin/profile/sessions"
                  className="flex items-center justify-center gap-2 px-4 py-3 bg-neutral-800 text-white rounded-lg hover:bg-black font-semibold transition-all shadow-sm"
                >
                  <Smartphone className="w-5 h-5" /> Manage Sessions
                  <ChevronRight className="w-4 h-4 ml-1 opacity-60" />
                </Link>
              </div>
            </div>
          </div>

          {/* Password Change Form */}
          {showPasswordForm && (
            <div className="bg-white border-2 border-orange-400 rounded-xl p-8 shadow-md">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
                  <Lock className="w-6 h-6 text-orange-600" />
                  Change Password
                </h3>
                <button
                  type="button"
                  title="Close password form"
                  onClick={() => {
                    setShowPasswordForm(false);
                    setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
                  }}
                  disabled={passwordLoading}
                  className="text-neutral-500 hover:text-neutral-900 disabled:opacity-50"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Warning Alert */}
              <div className="mb-6 p-4 bg-yellow-50 border-2 border-yellow-300 rounded-lg flex items-start gap-3">
                <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0 mt-0.5" />
                <div className="text-sm">
                  <p className="font-bold text-yellow-900 mb-1">⚠️ Security Notice</p>
                  <p className="text-yellow-800">
                    Changing your password will <strong>log you out from ALL devices</strong> including this one. 
                    Make sure you remember your new password before proceeding.
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Old Password */}
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">
                    Current Password <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.old ? "text" : "password"}
                      value={passwordForm.oldPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, oldPassword: e.target.value })}
                      className="w-full p-3 pr-12 bg-white border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-neutral-900"
                      placeholder="Enter current password"
                      title="Current Password"
                      disabled={passwordLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, old: !showPasswords.old })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900"
                      disabled={passwordLoading}
                    >
                      {showPasswords.old ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* New Password */}
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">
                    New Password <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.new ? "text" : "password"}
                      value={passwordForm.newPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                      className="w-full p-3 pr-12 bg-white border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-neutral-900"
                      placeholder="Enter new password"
                      title="New Password"
                      disabled={passwordLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, new: !showPasswords.new })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900"
                      disabled={passwordLoading}
                    >
                      {showPasswords.new ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-neutral-500 mt-1">Must be at least 8 characters</p>
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-sm font-bold text-neutral-700 mb-2">
                    Confirm New Password <span className="text-red-600">*</span>
                  </label>
                  <div className="relative">
                    <input
                      type={showPasswords.confirm ? "text" : "password"}
                      value={passwordForm.confirmPassword}
                      onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                      className="w-full p-3 pr-12 bg-white border-2 border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500 text-neutral-900"
                      placeholder="Confirm new password"
                      title="Confirm New Password"
                      disabled={passwordLoading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPasswords({ ...showPasswords, confirm: !showPasswords.confirm })}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-neutral-900"
                      disabled={passwordLoading}
                    >
                      {showPasswords.confirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                    </button>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3 pt-4 border-t-2 border-neutral-300">
                  <button
                    onClick={handlePasswordSubmit}
                    disabled={passwordLoading}
                    className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-orange-600 text-white rounded-lg hover:bg-orange-700 font-semibold transition-all disabled:opacity-50"
                  >
                    {passwordLoading ? (
                      <>
                        <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                        Updating...
                      </>
                    ) : (
                      <>
                        <Lock className="w-5 h-5" />
                        Update Password
                      </>
                    )}
                  </button>
                  <button
                    onClick={() => {
                      setShowPasswordForm(false);
                      setPasswordForm({ oldPassword: "", newPassword: "", confirmPassword: "" });
                    }}
                    disabled={passwordLoading}
                    className="px-6 py-3 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300 font-semibold transition-all disabled:opacity-50"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* First Confirmation Modal */}
      {showFirstConfirmation && (
        <ConfirmationModal
          title="⚠️ Change Password?"
          message="This will log you out from ALL devices including this one. You'll need to log in again with your new password. Are you sure you want to continue?"
          confirmText="Yes, I Understand"
          cancelText="Cancel"
          onConfirm={handleFirstConfirmationAccept}
          onCancel={() => setShowFirstConfirmation(false)}
          type="warning"
        />
      )}

      {/* Final Confirmation Modal */}
      {showFinalConfirmation && (
        <ConfirmationModal
          title="🔒 Final Confirmation"
          message="This is your last chance to go back. Make sure you have saved your new password securely. Once confirmed, you will be logged out immediately."
          confirmText="Change Password Now"
          cancelText="Go Back"
          onConfirm={handleFinalConfirmationAccept}
          onCancel={() => setShowFinalConfirmation(false)}
          type="danger"
        />
      )}
    </div>
  );
}

// Helper Component: Role Badge Image
function RoleBadge({ role }: { role: string }) {
  const badgeMap: Record<string, string> = {
    SUPER_ADMIN: "/Super_Admin.png",
    DEPARTMENT_ADMIN: "/Department_Admin.png",
    CONTENT_ADMIN: "/Content_Admin.png",
  };

  const src = badgeMap[role];
  if (!src) return null;

  return (
    <img
      src={src}
      alt={role}
      className="h-24 w-24 object-contain drop-shadow-lg hover:scale-105 transition-transform duration-300"
      title={role.replace(/_/g, " ")}
    />
  );
}

// Confirmation Modal Component
function ConfirmationModal({
  title,
  message,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
  type = "warning",
}: {
  title: string;
  message: string;
  confirmText: string;
  cancelText: string;
  onConfirm: () => void;
  onCancel: () => void;
  type?: "warning" | "danger";
}) {
  const colors = {
    warning: {
      bg: "bg-yellow-50",
      border: "border-yellow-300",
      icon: "text-yellow-600",
      iconBg: "bg-yellow-100",
      button: "bg-yellow-600 hover:bg-yellow-700",
    },
    danger: {
      bg: "bg-red-50",
      border: "border-red-300",
      icon: "text-red-600",
      iconBg: "bg-red-100",
      button: "bg-red-600 hover:bg-red-700",
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
          <button
            onClick={onConfirm}
            className={`flex-1 px-6 py-3 ${color.button} text-white rounded-lg font-semibold transition-all shadow-md hover:shadow-lg`}
          >
            {confirmText}
          </button>
          <button
            onClick={onCancel}
            className="px-6 py-3 bg-neutral-200 text-neutral-800 rounded-lg hover:bg-neutral-300 font-semibold transition-all"
          >
            {cancelText}
          </button>
        </div>
      </div>
    </div>
  );
}