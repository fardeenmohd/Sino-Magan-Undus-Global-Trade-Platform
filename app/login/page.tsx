"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<"BUYER" | "SUPPLIER">("BUYER");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email.includes("@")) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }
    if (password.length < 6) {
      setErrorMessage("Password must be at least 6 characters.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Simulate successful login
      router.push("/");
    }, 800);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 selection:bg-cyan-500/30">
      <div className="max-w-md w-full space-y-8 bg-slate-900/60 border border-slate-800/80 p-8 rounded-2xl shadow-2xl backdrop-blur-md">
        
        {/* Brand Header */}
        <div className="text-center space-y-2">
          <Link href="/" className="inline-flex items-center gap-2 mb-2 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-2xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
              ⚡
            </div>
            <span className="text-xl font-extrabold tracking-tight text-white">Project Antigravity</span>
          </Link>
          <h2 className="text-2xl font-bold tracking-tight text-white">Welcome Back</h2>
          <p className="text-xs text-slate-400">
            Sign in to access your Product Catalog & AI Lead Discovery Dashboard
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setRole("BUYER")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors duration-200 cursor-pointer ${
              role === "BUYER" ? "bg-slate-800 text-cyan-400 shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Buyer / Lead Prospect
          </button>
          <button
            type="button"
            onClick={() => setRole("SUPPLIER")}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors duration-200 cursor-pointer ${
              role === "SUPPLIER" ? "bg-slate-800 text-cyan-400 shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Product Supplier
          </button>
        </div>

        {/* Error Alert */}
        {errorMessage && (
          <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-medium flex items-center gap-2">
            <span>⚠️</span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1.5">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors duration-200"
              placeholder="you@company.com"
            />
          </div>

          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-medium text-slate-300">Password</label>
              <a href="#" className="text-xs text-cyan-400 hover:underline">Forgot password?</a>
            </div>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl pl-4 pr-10 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition-colors duration-200"
                placeholder="••••••••••••"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-500 hover:text-slate-300 cursor-pointer"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-400">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0" />
              <span>Remember this device</span>
            </label>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-colors duration-200 shadow-lg shadow-cyan-500/20 cursor-pointer disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {isLoading ? (
              <>
                <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                <span>Signing In...</span>
              </>
            ) : (
              <span>Sign In to Dashboard</span>
            )}
          </button>
        </form>

        {/* Footer Link */}
        <p className="text-center text-xs text-slate-400 border-t border-slate-800/80 pt-5">
          Don't have an account yet?{" "}
          <Link href="/register" className="text-cyan-400 font-semibold hover:underline">
            Create an Account →
          </Link>
        </p>

      </div>
    </div>
  );
}
