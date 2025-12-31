"use client";

import { useState } from "react";
import { ShieldCheck, Loader2, Lock, ArrowLeft } from "lucide-react"; // Import ArrowLeft
import Link from "next/link"; // Import Link for navigation

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/admin/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        // Try to get the actual error message from API, fallback to generic
        const data = await res.json().catch(() => ({}));
        setError(data.error || "Invalid credentials. Please try again.");
        setIsLoading(false);
        return;
      }

      // Successful login
      window.location.href = "/admin";
    } catch (err) {
      setError("Connection error. Please check your network.");
      setIsLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-100 relative overflow-hidden">
      {/* Background Decoration */}
      <div className="absolute inset-0 z-0">
        <div className="absolute top-0 left-0 w-full h-1/2 bg-neutral-900" />
        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-neutral-100" />
      </div>

      {/* NEW: Back to Home Button (Top Left) */}
      <Link 
        href="/" 
        className="absolute top-6 left-6 z-20 flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-sm font-medium hover:bg-white/20 transition-all group"
      >
        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
        Back to Home
      </Link>

      <div className="relative z-10 w-full max-w-md px-4">
        {/* Card Container */}
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden border border-neutral-200">
          
          {/* Header Section */}
          <div className="bg-neutral-900 p-8 text-center border-b border-neutral-800">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-600 mb-4 shadow-lg ring-4 ring-neutral-800">
              <ShieldCheck className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight">Veritas Admin</h1>
            <p className="text-neutral-400 text-sm mt-2">Secure Management Portal</p>
          </div>

          {/* Form Section */}
          <div className="p-8 pt-10">
            <form onSubmit={handleLogin} className="space-y-5">
              
              {/* Error Message */}
              {error && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-600 flex items-center gap-2 animate-in fade-in slide-in-from-top-2">
                   <Lock className="w-4 h-4 shrink-0" />
                   {error}
                </div>
              )}

              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5 ml-1">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="admin@veritas.com"
                    className="w-full px-4 py-3 rounded-lg bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>

                <div>
                   <label className="block text-xs font-bold text-neutral-500 uppercase tracking-wider mb-1.5 ml-1">
                    Password
                  </label>
                  <input
                    type="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-lg bg-neutral-50 border border-neutral-300 text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    disabled={isLoading}
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-3.5 rounded-lg bg-neutral-900 text-white font-semibold shadow-md hover:bg-neutral-800 focus:ring-4 focus:ring-neutral-200 transition-all disabled:opacity-70 disabled:cursor-not-allowed flex items-center justify-center gap-2 mt-2"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Authenticating...
                  </>
                ) : (
                  "Sign In to Dashboard"
                )}
              </button>
            </form>
            
            <div className="mt-8 text-center space-y-4">
              <p className="text-xs text-neutral-400">
                Authorized personnel only. <br/> Access is monitored and logged.
              </p>

              {/* NEW: Secondary Link inside the card */}
              <Link 
                href="/"
                className="inline-flex items-center text-xs font-medium text-neutral-500 hover:text-neutral-900 transition-colors"
              >
                ← Return to main site
              </Link>
            </div>
          </div>
        </div>
        
        {/* Footer Credit */}
        <p className="text-center text-neutral-500 text-xs mt-8">
          © {new Date().getFullYear()} Veritas Oratory Society. All rights reserved.
        </p>
        <p className="text-center text-neutral-400 text-xs mt-1">
          Developed by Shashwat Pandey 
        </p>
      </div>
    </div>
  );
}