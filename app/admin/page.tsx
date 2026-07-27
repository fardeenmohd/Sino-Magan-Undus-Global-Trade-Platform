"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { streamLeadsCompute, TradeLeadProspect } from "../lib/api";

export interface AdminProduct {
  id: number;
  title: string;
  category: string;
  hsCode: string;
  destinationCountry: string;
  portHub: string;
  price: number;
  unit: string;
  leadCount: number;
  status: "ACTIVE" | "INACTIVE";
  supplier: string;
}

export default function AdminDashboardPage() {
  // Admin Auth Guard State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPasscode, setAdminPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // Tab State
  const [activeTab, setActiveTab] = useState<"CATALOG" | "LEADS" | "COMPUTE">("COMPUTE");

  // Admin Data State
  const [products, setProducts] = useState<AdminProduct[]>([
    {
      id: 1,
      title: "Bihar Premium Organic Foxnuts / Makhana",
      category: "Makhana & Superfoods",
      hsCode: "HS-1904",
      destinationCountry: "United States 🇺🇸",
      portHub: "Port of Los Angeles",
      price: 14.5,
      unit: "kg",
      leadCount: 42,
      status: "ACTIVE",
      supplier: "Rajesh Kumar (Mithila Exim)",
    },
    {
      id: 2,
      title: "Nashik Export Grade Red Onions",
      category: "Fresh Produce",
      hsCode: "HS-0703",
      destinationCountry: "Poland 🇵🇱",
      portHub: "Port of Gdańsk",
      price: 0.85,
      unit: "kg",
      leadCount: 38,
      status: "ACTIVE",
      supplier: "Suresh Patil (Agri Exports India)",
    },
    {
      id: 3,
      title: "Fresh White Table Eggs (30 Tray Pack)",
      category: "Poultry & Eggs",
      hsCode: "HS-0407",
      destinationCountry: "Netherlands 🇳🇱",
      portHub: "Port of Rotterdam",
      price: 2.1,
      unit: "pack",
      leadCount: 29,
      status: "ACTIVE",
      supplier: "Anil Sharma (Namakkal Poultry)",
    },
    {
      id: 4,
      title: "High-Precision CNC Milling Machine Spare Components",
      category: "Machinery & Engineering",
      hsCode: "HS-8466",
      destinationCountry: "Australia 🇦🇺",
      portHub: "Port of Sydney",
      price: 18500.0,
      unit: "unit",
      leadCount: 22,
      status: "ACTIVE",
      supplier: "Vikram Malhotra (Pune Precision Engineering)",
    },
  ]);

  const [leads, setLeads] = useState<TradeLeadProspect[]>([
    {
      user_id: 401,
      name: "David Miller",
      email: "dmiller@superfoodsimporters.us",
      company: "Organics & Superfoods USA Inc",
      role: "LEAD_PROSPECT",
      destination_country: "United States 🇺🇸",
      port_hub: "Port of Los Angeles",
      tariff_estimate_pct: 3.5,
      match_score: 97.5,
      confidence_reason: "FDA Registered Importer ready for HS-1904 ($250k annual budget)",
    },
    {
      user_id: 402,
      name: "Piotr Wisniewski",
      email: "p.wisniewski@polandtrade.pl",
      company: "Warsaw Fresh Produce Import Sp. z o.o.",
      role: "LEAD_PROSPECT",
      destination_country: "Poland 🇵🇱",
      port_hub: "Port of Gdańsk",
      tariff_estimate_pct: 4.0,
      match_score: 95.8,
      confidence_reason: "EU Phytosanitary & Eurofins Cleared ($210k annual budget)",
    },
    {
      user_id: 403,
      name: "Sophie van der Meer",
      email: "sophie@amsterdamtrade.nl",
      company: "Amsterdam Bakery Ingredients BV",
      role: "LEAD_PROSPECT",
      destination_country: "Netherlands 🇳🇱",
      port_hub: "Port of Rotterdam",
      tariff_estimate_pct: 2.8,
      match_score: 94.2,
      confidence_reason: "EU GlobalGAP & NVWA Customs Approved ($190k annual budget)",
    },
    {
      user_id: 404,
      name: "Harrison Forde",
      email: "hforde@sydneytrade.com.au",
      company: "Sydney Industrial Equipment Supplies Pty Ltd",
      role: "LEAD_PROSPECT",
      destination_country: "Australia 🇦🇺",
      port_hub: "Port of Sydney",
      tariff_estimate_pct: 4.0,
      match_score: 96.1,
      confidence_reason: "Biosecurity Australia & BICON Import Cleared ($450k annual budget)",
    },
  ]);

  // Python Compute Engine Super-Trigger Form State
  const [computeForm, setComputeForm] = useState({
    title: "Salem Premium Nizamabad Turmeric Powder",
    category: "Makhana & Superfoods",
    hsCode: "HS-0910",
    destinationCountry: "Germany 🇩🇪",
    portHub: "Port of Hamburg",
    price: 4.8,
    unit: "kg",
    supplier: "Antigravity Global Trade Admin",
  });

  const [isComputing, setIsComputing] = useState(false);
  const [streamProgress, setStreamProgress] = useState(0);
  const [streamMessage, setStreamMessage] = useState("");
  const [lastExtensionToast, setLastExtensionToast] = useState("");

  // Load session or localStorage
  useEffect(() => {
    const session = localStorage.getItem("antigravity_admin_session");
    if (session) {
      setIsAdminAuthenticated(true);
    }
  }, []);

  const handleAdminLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (adminEmail === "admin@sinomaganundus.global" && adminPasscode === "AdminSecret2026!") {
      setIsAdminAuthenticated(true);
      localStorage.setItem("antigravity_admin_session", "true");
      setAuthError("");
    } else {
      setAuthError("Invalid Admin credentials. Access denied.");
    }
  };

  const handleAdminLogout = () => {
    setIsAdminAuthenticated(false);
    localStorage.removeItem("antigravity_admin_session");
  };

  // Run Python Compute Engine Super-Trigger
  const handleRunComputeEngineSuperTrigger = () => {
    setIsComputing(true);
    setStreamProgress(10);
    setStreamMessage("⚡ Initializing Python FastAPI Compute Engine Super-Trigger...");

    streamLeadsCompute(
      Date.now(),
      computeForm.title,
      computeForm.category,
      computeForm.hsCode,
      computeForm.destinationCountry,
      (event) => {
        setStreamProgress(event.progress);
        setStreamMessage(event.message);

        if (event.stage === "COMPLETE" && event.leads) {
          const newLeads = event.leads as any;
          setIsComputing(false);

          // 1. Add new commodity product to Master Catalog
          const newProduct: AdminProduct = {
            id: Date.now(),
            title: computeForm.title,
            category: computeForm.category,
            hsCode: computeForm.hsCode,
            destinationCountry: computeForm.destinationCountry,
            portHub: computeForm.portHub,
            price: computeForm.price,
            unit: computeForm.unit,
            leadCount: newLeads.length,
            status: "ACTIVE",
            supplier: computeForm.supplier,
          };

          setProducts((prev) => [newProduct, ...prev]);

          // 2. Prepend newly scraped prospects to Master Leads Table
          setLeads((prev) => [...newLeads, ...prev]);

          // 3. Trigger Toast Notification
          setLastExtensionToast(
            `✨ Success! Extended Master Catalog with "${computeForm.title}" and added ${newLeads.length} new Importer Leads for ${computeForm.destinationCountry}!`
          );
        }
      }
    );
  };

  const setPresetCorridor = (preset: {
    title: string;
    category: string;
    hsCode: string;
    destinationCountry: string;
    portHub: string;
    price: number;
    unit: string;
  }) => {
    setComputeForm((prev) => ({
      ...prev,
      ...preset,
    }));
  };

  // --- RENDER ADMIN LOGIN GATEWAY IF UNAUTHENTICATED ---
  if (!isAdminAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-4 selection:bg-cyan-500/30">
        <div className="max-w-md w-full space-y-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold text-slate-400 hover:text-cyan-400 transition-colors duration-200 group px-1"
          >
            <span className="group-hover:-translate-x-1 transition-transform duration-200">←</span>
            <span>Back to Public Landing Page</span>
          </Link>

          <div className="bg-slate-900/80 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-xl space-y-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 text-2xl font-black mx-auto shadow-lg shadow-cyan-500/20">
                🛡️
              </div>
              <h2 className="text-2xl font-bold text-white tracking-tight">Admin Gateway Portal</h2>
              <p className="text-xs text-slate-400">
                Sino Magan Undus Global Trade • Administrative Command Center
              </p>
            </div>

            {authError && (
              <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-xs text-red-400 text-center font-mono">
                {authError}
              </div>
            )}

            <form onSubmit={handleAdminLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Admin Email Address
                </label>
                <input
                  type="email"
                  required
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="admin@sinomaganundus.global"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Admin Master Passcode
                </label>
                <input
                  type="password"
                  required
                  value={adminPasscode}
                  onChange={(e) => setAdminPasscode(e.target.value)}
                  placeholder="••••••••••••"
                  className="w-full px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="p-3 bg-cyan-950/40 border border-cyan-500/30 rounded-xl text-xs text-cyan-300 space-y-1">
                <p className="font-bold flex items-center gap-1.5">
                  <span>🔑 Demo Credentials:</span>
                </p>
                <p className="font-mono text-[11px]">Email: admin@sinomaganundus.global</p>
                <p className="font-mono text-[11px]">Passcode: AdminSecret2026!</p>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-200 cursor-pointer"
              >
                Authenticate & Unlock Admin Dashboard →
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER ADMIN DASHBOARD ---
  const totalCatalogValue = products.reduce((acc, p) => acc + p.price * 5000, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500/30">
      {/* Top Header Bar */}
      <header className="border-b border-slate-800/80 bg-slate-900/60 backdrop-blur-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-md">
                🌏
              </div>
              <div>
                <span className="font-bold text-white text-base tracking-tight block leading-none">
                  Sino Magan Undus
                </span>
                <span className="text-[10px] font-mono text-cyan-400">ADMIN CONTROL CENTER</span>
              </div>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              FastAPI v4.0 Live
            </span>
            <button
              onClick={handleAdminLogout}
              className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-semibold rounded-lg transition-colors duration-200 cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        {/* Executive Summary KPI Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase">Exporting Goods Catalog</span>
            <div className="text-2xl font-black text-white">{products.length} Items</div>
            <p className="text-xs text-emerald-400 font-mono">100% Verified Active Lines</p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase">Import Prospects Network</span>
            <div className="text-2xl font-black text-cyan-400">{leads.length} Buyers</div>
            <p className="text-xs text-slate-400 font-mono">Scraped & Verified Global Prospects</p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase">Est. Catalog Trade Value</span>
            <div className="text-2xl font-black text-white">${totalCatalogValue.toLocaleString()}</div>
            <p className="text-xs text-slate-400 font-mono">FOB Container Valuations</p>
          </div>

          <div className="bg-slate-900/70 border border-slate-800 p-5 rounded-2xl space-y-2">
            <span className="text-xs font-mono text-slate-400 uppercase">Python Agent Status</span>
            <div className="text-2xl font-black text-emerald-400">SSE ACTIVE</div>
            <p className="text-xs text-slate-400 font-mono">Auto-Extension Engine Ready</p>
          </div>
        </div>

        {/* Extension Toast Message */}
        {lastExtensionToast && (
          <div className="p-4 bg-cyan-950/80 border border-cyan-500/50 rounded-2xl text-xs font-mono text-cyan-200 flex items-center justify-between shadow-lg">
            <span>{lastExtensionToast}</span>
            <button onClick={() => setLastExtensionToast("")} className="text-slate-400 hover:text-white">
              ✕
            </button>
          </div>
        )}

        {/* Tab Navigation */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-2 overflow-x-auto">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setActiveTab("COMPUTE")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                activeTab === "COMPUTE"
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              ⚡ Python Engine Super-Trigger
            </button>
            <button
              onClick={() => setActiveTab("CATALOG")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                activeTab === "CATALOG"
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              📦 Master Exporting Goods ({products.length})
            </button>
            <button
              onClick={() => setActiveTab("LEADS")}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer ${
                activeTab === "LEADS"
                  ? "bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20"
                  : "bg-slate-900 text-slate-400 hover:text-white"
              }`}
            >
              🎯 Master Import Leads ({leads.length})
            </button>
          </div>
        </div>

        {/* TAB 1: PYTHON COMPUTE ENGINE SUPER-TRIGGER */}
        {activeTab === "COMPUTE" && (
          <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-bold text-white">
                  ⚡ Python Compute Engine Super-Trigger Control Center
                </h3>
                <p className="text-xs text-slate-400">
                  Run the Python AI Scraper Engine to extend both the **Exporting Goods Master Catalog** AND the **Import Leads Network** simultaneously.
                </p>
              </div>
            </div>

            {/* Quick Preset Corridor Buttons */}
            <div className="space-y-2">
              <span className="text-xs font-mono text-slate-400">Popular Quick-Fill Trade Presets:</span>
              <div className="flex flex-wrap gap-2">
                <button
                  onClick={() =>
                    setPresetCorridor({
                      title: "Salem Nizamabad Organic Turmeric Powder (HS 0910)",
                      category: "Makhana & Superfoods",
                      hsCode: "HS-0910",
                      destinationCountry: "Germany 🇩🇪",
                      portHub: "Port of Hamburg",
                      price: 4.8,
                      unit: "kg",
                    })
                  }
                  className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-mono text-cyan-400 cursor-pointer"
                >
                  🇩🇪 German Organic Spices
                </button>

                <button
                  onClick={() =>
                    setPresetCorridor({
                      title: "Nashik Dehydrated White Garlic Flakes (HS 0712)",
                      category: "Fresh Produce",
                      hsCode: "HS-0712",
                      destinationCountry: "Poland 🇵🇱",
                      portHub: "Port of Gdańsk",
                      price: 3.2,
                      unit: "kg",
                    })
                  }
                  className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-mono text-cyan-400 cursor-pointer"
                >
                  🇵🇱 Polish Vegetables
                </button>

                <button
                  onClick={() =>
                    setPresetCorridor({
                      title: "Frozen Premium Halal Mutton Carcasses (HS 0204)",
                      category: "Meat Exports",
                      hsCode: "HS-0204",
                      destinationCountry: "UAE 🇦🇪",
                      portHub: "Jebel Ali Port",
                      price: 8.5,
                      unit: "kg",
                    })
                  }
                  className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-mono text-cyan-400 cursor-pointer"
                >
                  🇦🇪 UAE Halal Meat
                </button>

                <button
                  onClick={() =>
                    setPresetCorridor({
                      title: "High-Capacity Hydraulic Press Machinery (HS 8462)",
                      category: "Machinery & Engineering",
                      hsCode: "HS-8462",
                      destinationCountry: "Australia 🇦🇺",
                      portHub: "Port of Sydney",
                      price: 24500.0,
                      unit: "unit",
                    })
                  }
                  className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-mono text-cyan-400 cursor-pointer"
                >
                  🇦🇺 Australian Machinery
                </button>
              </div>
            </div>

            {/* Compute Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-950 border border-slate-800 p-4 rounded-xl">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Commodity Title</label>
                <input
                  type="text"
                  value={computeForm.title}
                  onChange={(e) => setComputeForm({ ...computeForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <input
                  type="text"
                  value={computeForm.category}
                  onChange={(e) => setComputeForm({ ...computeForm, category: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">HS Code</label>
                <input
                  type="text"
                  value={computeForm.hsCode}
                  onChange={(e) => setComputeForm({ ...computeForm, hsCode: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target Destination</label>
                <input
                  type="text"
                  value={computeForm.destinationCountry}
                  onChange={(e) => setComputeForm({ ...computeForm, destinationCountry: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Sea Port Hub</label>
                <input
                  type="text"
                  value={computeForm.portHub}
                  onChange={(e) => setComputeForm({ ...computeForm, portHub: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Target FOB Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  value={computeForm.price}
                  onChange={(e) => setComputeForm({ ...computeForm, price: parseFloat(e.target.value) || 0 })}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                />
              </div>
            </div>

            {/* Execution Stream Box */}
            {isComputing ? (
              <div className="py-8 px-4 space-y-4 bg-slate-950 border border-slate-800 rounded-xl">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-bold flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping"></span>
                    PYTHON FASTAPI SSE SUPER-TRIGGER RUNNING
                  </span>
                  <span className="text-slate-400">{streamProgress}%</span>
                </div>

                <div className="w-full bg-slate-900 h-2.5 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${streamProgress}%` }}
                  ></div>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-200">
                  {streamMessage || "⚡ Running Scraper Engine..."}
                </div>
              </div>
            ) : (
              <button
                onClick={handleRunComputeEngineSuperTrigger}
                className="w-full py-4 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-200 cursor-pointer"
              >
                🚀 Execute Python Agent & Extend Catalog + Leads Network →
              </button>
            )}
          </div>
        )}

        {/* TAB 2: MASTER EXPORTING GOODS TABLE */}
        {activeTab === "CATALOG" && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Exporting Goods Master Catalog</h3>
                <p className="text-xs text-slate-400">All registered and AI-extended Indian commodity products</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">ID</th>
                    <th className="p-3.5">Commodity Title</th>
                    <th className="p-3.5">Category</th>
                    <th className="p-3.5">HS Code</th>
                    <th className="p-3.5">Target Destination</th>
                    <th className="p-3.5">Price</th>
                    <th className="p-3.5">Leads Count</th>
                    <th className="p-3.5">Status</th>
                    <th className="p-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {products.map((p) => (
                    <tr key={p.id} className="hover:bg-slate-900/80 transition-colors">
                      <td className="p-3.5 font-mono text-slate-400">#{p.id}</td>
                      <td className="p-3.5 font-bold text-white">{p.title}</td>
                      <td className="p-3.5 text-slate-300">{p.category}</td>
                      <td className="p-3.5 font-mono text-cyan-400">{p.hsCode}</td>
                      <td className="p-3.5 text-slate-200">{p.destinationCountry}</td>
                      <td className="p-3.5 font-bold text-slate-100">${p.price} / {p.unit}</td>
                      <td className="p-3.5 font-mono text-emerald-400">{p.leadCount} Verified</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[11px]">
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <button
                          onClick={() => setProducts((prev) => prev.filter((item) => item.id !== p.id))}
                          className="px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-md text-xs cursor-pointer"
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 3: MASTER IMPORT LEADS TABLE */}
        {activeTab === "LEADS" && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Master Import Buyer Prospects Network</h3>
                <p className="text-xs text-slate-400">Scraped and verified international buyer leads</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Buyer Prospect</th>
                    <th className="p-3.5">Company & Email</th>
                    <th className="p-3.5">Target Destination</th>
                    <th className="p-3.5">Port Hub</th>
                    <th className="p-3.5">Match Score</th>
                    <th className="p-3.5">Tariff Rate</th>
                    <th className="p-3.5">Compliance Rationale</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {leads.map((l, idx) => (
                    <tr key={idx} className="hover:bg-slate-900/80 transition-colors">
                      <td className="p-3.5 font-bold text-white">{l.name}</td>
                      <td className="p-3.5">
                        <div className="text-slate-200 font-semibold">{l.company}</div>
                        <div className="text-slate-400 text-[11px] font-mono">{l.email}</div>
                      </td>
                      <td className="p-3.5 text-slate-200">{l.destination_country}</td>
                      <td className="p-3.5 font-mono text-cyan-400">{l.port_hub}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold">
                          {l.match_score}%
                        </span>
                      </td>
                      <td className="p-3.5 font-mono text-slate-300">{l.tariff_estimate_pct}%</td>
                      <td className="p-3.5 text-slate-400 italic">{l.confidence_reason}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
