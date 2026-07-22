"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    role: "SUPPLIER" as "BUYER" | "SUPPLIER",
    location: "Mumbai, India 🇮🇳",
    password: "",
    confirmPassword: "",
    acceptTerms: true,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!formData.name.trim()) {
      setErrorMessage("Full name is required.");
      return;
    }
    if (!formData.email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (formData.password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);

      const userSession = {
        name: formData.name,
        email: formData.email,
        company: formData.company || "Global Trade Enterprise",
        role: formData.role,
        avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
        token: "ag_token_" + Date.now(),
      };

      if (typeof window !== "undefined") {
        localStorage.setItem("antigravity_user_session", JSON.stringify(userSession));
      }

      // Redirect directly to Dashboard
      router.push("/dashboard");
    }, 600);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 selection:bg-cyan-500/30 py-12">
      <div className="max-w-lg w-full space-y-8 bg-slate-900/60 border border-slate-800/80 p-8 rounded-2xl shadow-2xl backdrop-blur-md">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
              ⚡
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">Project Antigravity</span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-white">Create ExIm Account</h2>
          <p className="text-xs text-slate-400">
            Join the Indian export commodity marketplace & AI lead discovery network
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: "SUPPLIER" })}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors duration-200 cursor-pointer ${
              formData.role === "SUPPLIER" ? "bg-slate-800 text-cyan-400 shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Indian Exporter / Supplier
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: "BUYER" })}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors duration-200 cursor-pointer ${
              formData.role === "BUYER" ? "bg-slate-800 text-cyan-400 shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Buyer / Importer
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Registration Form */}
        <form onSubmit={handleRegister} className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Full Name *</label>
              <input
                type="text"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                placeholder="Rajesh Sharma"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Company Name *</label>
              <input
                type="text"
                required
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                placeholder="Rajesh Global Trade"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Work Email *</label>
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                placeholder="rajesh@exim.in"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                placeholder="Mumbai, India 🇮🇳"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Password *</label>
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                placeholder="••••••••••••"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Confirm Password *</label>
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                placeholder="••••••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-colors duration-200 shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Complete Registration & Open Dashboard →</span>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-400 border-t border-slate-800/80 pt-5">
          Already have an account?{" "}
          <Link href="/login" className="text-cyan-400 font-semibold hover:underline">
            Sign In →
          </Link>
        </p>

      </div>
    </div>
  );
}
