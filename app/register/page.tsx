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
    role: "BUYER" as "BUYER" | "SUPPLIER",
    location: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
  });

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  // Live Password Strength Calculator
  const passwordStrength = React.useMemo(() => {
    const pass = formData.password;
    if (!pass) return { score: 0, label: "Empty", color: "bg-slate-800" };
    let score = 0;
    if (pass.length >= 8) score++;
    if (/[A-Z]/.test(pass)) score++;
    if (/[0-9]/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    if (score <= 1) return { score: 25, label: "Weak", color: "bg-rose-500" };
    if (score === 2) return { score: 50, label: "Fair", color: "bg-amber-500" };
    if (score === 3) return { score: 75, label: "Good", color: "bg-blue-500" };
    return { score: 100, label: "Strong", color: "bg-emerald-400" };
  }, [formData.password]);

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
    if (!formData.acceptTerms) {
      setErrorMessage("You must accept the Terms of Service.");
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      // Simulate successful registration and redirect to login
      router.push("/login");
    }, 800);
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
          <h2 className="text-2xl font-bold tracking-tight text-white">Create Your Account</h2>
          <p className="text-xs text-slate-400">
            Join the enterprise product marketplace & AI lead network
          </p>
        </div>

        {/* Role Selector Tabs */}
        <div className="flex bg-slate-950 p-1 rounded-xl border border-slate-800">
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: "BUYER" })}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors duration-200 cursor-pointer ${
              formData.role === "BUYER" ? "bg-slate-800 text-cyan-400 shadow" : "text-slate-400 hover:text-slate-200"
            }`}
          >
            Buyer / Lead Prospect
          </button>
          <button
            type="button"
            onClick={() => setFormData({ ...formData, role: "SUPPLIER" })}
            className={`flex-1 py-2 text-xs font-semibold rounded-lg transition-colors duration-200 cursor-pointer ${
              formData.role === "SUPPLIER" ? "bg-slate-800 text-cyan-400 shadow" : "text-slate-400 hover:text-slate-200"
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
                placeholder="Jane Doe"
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
                placeholder="Acme Systems"
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
                placeholder="jane@company.com"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-300 mb-1">Location</label>
              <input
                type="text"
                value={formData.location}
                onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
                placeholder="San Francisco, USA"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Password *</label>
            <input
              type="password"
              required
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              placeholder="At least 6 characters"
            />
            {/* Password Strength Indicator */}
            {formData.password && (
              <div className="mt-2 space-y-1">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span>Password Strength</span>
                  <span className="font-semibold">{passwordStrength.label}</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full transition-all duration-300 ${passwordStrength.color}`}
                    style={{ width: `${passwordStrength.score}%` }}
                  ></div>
                </div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-300 mb-1">Confirm Password *</label>
            <input
              type="password"
              required
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
              placeholder="Re-enter password"
            />
          </div>

          <div className="pt-1">
            <label className="flex items-start gap-2.5 text-xs text-slate-400 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.acceptTerms}
                onChange={(e) => setFormData({ ...formData, acceptTerms: e.target.checked })}
                className="mt-0.5 rounded bg-slate-950 border-slate-800 text-cyan-500 focus:ring-0"
              />
              <span>
                I agree to the <a href="#" className="text-cyan-400 underline">Terms of Service</a> and Privacy Policy.
              </span>
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
                <span>Creating Account...</span>
              </>
            ) : (
              <span>Complete Registration</span>
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
