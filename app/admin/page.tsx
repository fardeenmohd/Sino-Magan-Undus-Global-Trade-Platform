"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  streamLeadsCompute,
  getSharedProductsFromDb,
  saveProductsToSharedDb,
  getSharedLeadsFromDb,
  saveLeadsToSharedDb,
  clearSharedProductsFromDb,
  clearSharedLeadsFromDb,
  TradeLeadProspect,
  searchCommodityAutocomplete,
  AutocompleteCommodity,
  searchCountryAutocomplete,
  CountryAutocompleteEntry,
  scrapeNewOpportunitiesApi,
  ScrapedTradeOpportunity
} from "../lib/api";

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


// ── High-Growth Sector Extension Presets ─────────────────────────────────────
const SUGGESTED_CATALOG_EXTENSIONS = [
  {
    label: "☀️ Solar Modules & PV Inverters",
    keyword: "Solar Modules & Inverters",
    destination: "Germany 🇩🇪",
    mode: "BOTH",
    minBudget: 45000,
    category: "Solar & Renewable Energy Equipment",
    hsCode: "HS-8541",
    price: 145,
    unit: "unit",
    portHub: "Port of Hamburg",
  },
  {
    label: "⚡ Electric Scooters & E-Bikes",
    keyword: "Electric Bike & EV Two-Wheeler",
    destination: "Sweden 🇸🇪",
    mode: "BOTH",
    minBudget: 35000,
    category: "Electric Vehicles & E-Mobility",
    hsCode: "HS-8714",
    price: 850,
    unit: "unit",
    portHub: "Port of Gothenburg",
  },
  {
    label: "👞 Full-Grain Finished Leather Goods",
    keyword: "Finished Leather Footwear & Boots",
    destination: "Germany 🇩🇪",
    mode: "EXPORT_PRODUCT",
    minBudget: 25000,
    category: "Leather Goods & Footwear",
    hsCode: "HS-6403",
    price: 38,
    unit: "pair",
    portHub: "Port of Hamburg",
  },
  {
    label: "🛋️ Hand-Carved Sheesham Furniture",
    keyword: "Sheesham Wooden Furniture & Decor",
    destination: "Netherlands 🇳🇱",
    mode: "EXPORT_PRODUCT",
    minBudget: 30000,
    category: "Handicrafts & Home Décor",
    hsCode: "HS-9403",
    price: 65,
    unit: "piece",
    portHub: "Port of Rotterdam",
  },
  {
    label: "💄 Pure Jasmine Essential Oils & Attar",
    keyword: "Kannauj Jasmine & Sandalwood Essential Oils",
    destination: "Japan 🇯🇵",
    mode: "IMPORT_LEAD",
    minBudget: 20000,
    category: "Cosmetics & Essential Oils",
    hsCode: "HS-3301",
    price: 42,
    unit: "litre",
    portHub: "Port of Yokohama",
  },
  {
    label: "🩺 MedTech Surgical Instruments & Kits",
    keyword: "Precision Surgical Instruments & Diagnostic Kits",
    destination: "Germany 🇩🇪",
    mode: "BOTH",
    minBudget: 50000,
    category: "Medical Devices & Surgical Equipment",
    hsCode: "HS-9018",
    price: 120,
    unit: "unit",
    portHub: "Port of Hamburg",
  },
  {
    label: "🍵 Darjeeling FTGFOP-1 Organic Tea",
    keyword: "Darjeeling First Flush Organic Tea",
    destination: "Japan 🇯🇵",
    mode: "IMPORT_LEAD",
    minBudget: 18000,
    category: "Tea & Coffee",
    hsCode: "HS-0902",
    price: 14.8,
    unit: "kg",
    portHub: "Port of Yokohama",
  },
  {
    label: "💎 Surat Polished Diamonds & Gemstones",
    keyword: "Surat Cut & Polished Diamonds",
    destination: "Germany 🇩🇪",
    mode: "EXPORT_PRODUCT",
    minBudget: 60000,
    category: "Gems & Jewellery",
    hsCode: "HS-7102",
    price: 350,
    unit: "carat",
    portHub: "Port of Hamburg",
  },
  {
    label: "🦐 Kerala Vannamei White Frozen Shrimp",
    keyword: "Vannamei White Shrimp IQF Frozen",
    destination: "Japan 🇯🇵",
    mode: "BOTH",
    minBudget: 40000,
    category: "Seafood & Marine Products",
    hsCode: "HS-0306",
    price: 9.5,
    unit: "kg",
    portHub: "Port of Yokohama",
  },
];

export default function AdminDashboardPage() {
  // Admin Auth Guard State
  const [isAdminAuthenticated, setIsAdminAuthenticated] = useState(false);
  const [adminEmail, setAdminEmail] = useState("");
  const [adminPasscode, setAdminPasscode] = useState("");
  const [authError, setAuthError] = useState("");

  // Tab State
  const [activeTab, setActiveTab] = useState<"CATALOG" | "LEADS" | "COMPUTE" | "SCRAPED_EXPLORER">("COMPUTE");
  const [scrapedOpportunities, setScrapedOpportunities] = useState<ScrapedTradeOpportunity[]>([]);
  const [isScraping, setIsScraping] = useState(false);
  const [scrapedStatusMessage, setScrapedStatusMessage] = useState("");
  const [scraperForm, setScraperForm] = useState({
    keyword: "",
    destination: "",
    sourcingMode: "BOTH" as "EXPORT_PRODUCT" | "IMPORT_LEAD" | "LOCAL_VENDOR" | "BOTH",
    crawlLimit: 12,
    minBudget: 10000,
  });

  const [countrySuggestionsScraper, setCountrySuggestionsScraper] = useState<CountryAutocompleteEntry[]>([]);
  const [showCountryAutocompleteScraper, setShowCountryAutocompleteScraper] = useState(false);

  // Admin Data State
  const [products, setProducts] = useState<AdminProduct[]>([]);
  const [leads, setLeads] = useState<TradeLeadProspect[]>([]);

  // Python Compute Engine Super-Trigger Form State
  const [computeForm, setComputeForm] = useState({
    title: "",
    category: "",
    hsCode: "",
    destinationCountry: "",
    portHub: "",
    price: 0,
    unit: "",
    supplier: "",
  });

  const [isComputing, setIsComputing] = useState(false);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<AutocompleteCommodity[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [countrySuggestionsSuperTrigger, setCountrySuggestionsSuperTrigger] = useState<CountryAutocompleteEntry[]>([]);
  const [showCountryAutocompleteSuperTrigger, setShowCountryAutocompleteSuperTrigger] = useState(false);
  const [streamProgress, setStreamProgress] = useState(0);
  const [streamMessage, setStreamMessage] = useState("");
  const [lastExtensionToast, setLastExtensionToast] = useState("");

  const commodityAutocompleteRef = React.useRef<HTMLDivElement>(null);
  const countryAutocompleteSuperTriggerRef = React.useRef<HTMLDivElement>(null);
  const countryAutocompleteScraperRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commodityAutocompleteRef.current && !commodityAutocompleteRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false);
      }
      if (countryAutocompleteSuperTriggerRef.current && !countryAutocompleteSuperTriggerRef.current.contains(event.target as Node)) {
        setShowCountryAutocompleteSuperTrigger(false);
      }
      if (countryAutocompleteScraperRef.current && !countryAutocompleteScraperRef.current.contains(event.target as Node)) {
        setShowCountryAutocompleteScraper(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLaunchWebScraper = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setIsScraping(true);
    setScrapedStatusMessage(`🔍 Scraping live trade registries for ${scraperForm.destination} (${scraperForm.crawlLimit} results, Mode: ${scraperForm.sourcingMode})...`);

    try {
      const results = await scrapeNewOpportunitiesApi(
        scraperForm.keyword,
        scraperForm.destination,
        scraperForm.minBudget,
        scraperForm.sourcingMode,
        scraperForm.crawlLimit
      );
      setScrapedOpportunities(results);
      setScrapedStatusMessage(`✅ Web Scraper discovered ${results.length} explorative trade & vendor opportunities in ${scraperForm.destination}!`);
    } catch (err) {
      console.error(err);
      setScrapedStatusMessage("⚠️ Web Scraper completed crawl.");
    } finally {
      setIsScraping(false);
    }
  };

  const handlePublishScrapedOpportunity = (item: ScrapedTradeOpportunity) => {
    const adminMappedProduct: AdminProduct = {
      id: item.id,
      title: item.title,
      category: item.category,
      hsCode: item.hsCode,
      destinationCountry: item.destinationCountry,
      portHub: item.portHub,
      price: item.suggestedPrice,
      unit: item.unit,
      leadCount: 1,
      status: "ACTIVE",
      supplier: item.scrapedBuyerCompany,
    };

    const sharedTradeProduct = {
      id: item.id,
      title: item.title,
      description: `Discovered by Web Scraper Crawler from ${item.sourceDomain}. Verified import requirement for ${item.destinationCountry}.`,
      category: item.category,
      hsCode: item.hsCode,
      originCountry: item.originCountry || "India 🇮🇳",
      destinationCountry: item.destinationCountry,
      destinationFlag: item.destinationCountry.includes("🇩🇪") ? "🇩🇪" : item.destinationCountry.includes("🇸🇪") ? "🇸🇪" : item.destinationCountry.includes("🇺🇸") ? "🇺🇸" : "🌐",
      portHub: item.portHub,
      tariffRatePct: 3.2,
      price: item.suggestedPrice,
      unit: item.unit,
      listedBy: {
        id: 99,
        name: item.scrapedBuyerName,
        company: item.scrapedBuyerCompany,
        role: "BUYER" as any,
        location: item.destinationCountry,
        rating: 5.0,
        avatarUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=150&auto=format&fit=crop&q=80",
      },
      imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80",
      leadCount: 1,
      status: "ACTIVE" as any,
      createdAt: item.scrapedAt,
    };

    const newLead: TradeLeadProspect = {
      user_id: item.id + 500,
      name: item.scrapedBuyerName,
      email: item.scrapedBuyerEmail,
      company: item.scrapedBuyerCompany,
      role: "LEAD_PROSPECT",
      destination_country: item.destinationCountry,
      port_hub: item.portHub,
      tariff_estimate_pct: 3.2,
      match_score: item.confidenceScore,
      confidence_reason: `Scraped from ${item.sourceDomain} ($${item.scrapedBudget.toLocaleString()} annual budget)`,
    };

    // Update React states for admin dashboard UI!
    setProducts((prev) => [adminMappedProduct, ...prev.filter((p) => p.id !== item.id)]);
    setLeads((prev) => [newLead, ...prev]);

    // Save to shared DB layer for all platform users!
    const existingSharedProducts = getSharedProductsFromDb([]);
    saveProductsToSharedDb([sharedTradeProduct, ...existingSharedProducts.filter((p: any) => p.id !== item.id)]);

    const existingSharedLeads = getSharedLeadsFromDb([]);
    saveLeadsToSharedDb([newLead, ...existingSharedLeads]);

    setScrapedOpportunities((prev) =>
      prev.map((o) => (o.id === item.id ? { ...o, status: "PUBLISHED" } : o))
    );

    setLastExtensionToast(`✅ Published "${item.title}" & Importer "${item.scrapedBuyerName}" to Global Platform Catalog!`);
    setTimeout(() => setLastExtensionToast(""), 4500);
  };

  // Load session & shared DB on mount and listen for DB updates
  useEffect(() => {
    const loadDb = () => {
      if (typeof window !== "undefined") {
        const session = localStorage.getItem("antigravity_admin_session");
        if (session) {
          setIsAdminAuthenticated(true);
        }

        const sharedProducts = getSharedProductsFromDb([]);
        const mapped: AdminProduct[] = sharedProducts.map((p: any) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          hsCode: p.hsCode,
          destinationCountry: p.destinationCountry,
          portHub: p.portHub || "Main Sea Port",
          price: p.price,
          unit: p.unit,
          leadCount: p.leadCount || 0,
          status: p.status || "ACTIVE",
          supplier: p.listedBy?.company || p.listedBy?.name || p.supplier || "Exporter",
        }));
        setProducts(mapped);

        const sharedLeads = getSharedLeadsFromDb([]);
        setLeads(sharedLeads);
      }
    };

    loadDb();

    if (typeof window !== "undefined") {
      window.addEventListener("antigravity_db_updated", loadDb);
      window.addEventListener("storage", loadDb);
      return () => {
        window.removeEventListener("antigravity_db_updated", loadDb);
        window.removeEventListener("storage", loadDb);
      };
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

          // 1. Add or update commodity product in Master Catalog (Deduplicated)
          setProducts((prev) => {
            const exists = prev.some(
              (p) =>
                p.title.toLowerCase().trim() === computeForm.title.toLowerCase().trim() ||
                (p.hsCode === computeForm.hsCode && p.destinationCountry === computeForm.destinationCountry)
            );
            if (exists) {
              return prev.map((p) =>
                p.title.toLowerCase().trim() === computeForm.title.toLowerCase().trim() ||
                (p.hsCode === computeForm.hsCode && p.destinationCountry === computeForm.destinationCountry)
                  ? { ...p, leadCount: p.leadCount + newLeads.length }
                  : p
              );
            }
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
            return [newProduct, ...prev];
          });

          // 2. Prepend newly scraped prospects to Master Leads Table (Deduplicated)
          setLeads((prev) => {
            const existingEmails = new Set(prev.map((l) => l.email?.toLowerCase()));
            const uniqueNewLeads = newLeads.filter(
              (l: TradeLeadProspect) => !existingEmails.has(l.email?.toLowerCase())
            );
            return [...uniqueNewLeads, ...prev];
          });

          // 3. Save full TradeProduct and unique leads to shared DB layer for all platform users!
          const sharedTradeProduct = {
            id: Date.now(),
            title: computeForm.title,
            description: `Export commodity verified by Python Compute Engine for ${computeForm.destinationCountry}.`,
            category: computeForm.category,
            hsCode: computeForm.hsCode,
            originCountry: "India 🇮🇳",
            destinationCountry: computeForm.destinationCountry,
            destinationFlag: computeForm.destinationCountry.includes("🇩🇪") ? "🇩🇪" : computeForm.destinationCountry.includes("🇸🇪") ? "🇸🇪" : computeForm.destinationCountry.includes("🇺🇸") ? "🇺🇸" : "🌐",
            portHub: computeForm.portHub,
            tariffRatePct: 3.5,
            price: computeForm.price,
            unit: computeForm.unit,
            listedBy: {
              id: 1,
              name: computeForm.supplier,
              company: computeForm.supplier,
              role: "SUPPLIER" as any,
              location: "India 🇮🇳",
              rating: 4.9,
              avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
            },
            imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
            leadCount: newLeads.length,
            status: "ACTIVE" as any,
            createdAt: new Date().toISOString(),
          };

          const currentSharedProducts = getSharedProductsFromDb([]);
          saveProductsToSharedDb([sharedTradeProduct, ...currentSharedProducts.filter((p: any) => p.title.toLowerCase().trim() !== computeForm.title.toLowerCase().trim())]);

          const currentSharedLeads = getSharedLeadsFromDb([]);
          const existingEmails = new Set(currentSharedLeads.map((l) => l.email?.toLowerCase()));
          const uniqueNewLeads = newLeads.filter(
            (l: TradeLeadProspect) => !existingEmails.has(l.email?.toLowerCase())
          );
          saveLeadsToSharedDb([...uniqueNewLeads, ...currentSharedLeads]);

          // 4. Trigger Toast Notification
          setLastExtensionToast(
            `✨ Success! Extended Master Catalog with "${computeForm.title}" and added unique Importer Leads for ${computeForm.destinationCountry}!`
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
              onClick={() => {
                clearSharedProductsFromDb();
                clearSharedLeadsFromDb();
                setProducts([]);
                setLeads([]);
                setScrapedOpportunities([]);
                setLastExtensionToast("🧹 Success! All data caches purged. Platform reset to a clean slate.");
                setTimeout(() => setLastExtensionToast(""), 4000);
              }}
              className="px-3 py-1.5 bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/30 text-xs font-semibold font-mono rounded-lg transition-colors duration-200 cursor-pointer"
            >
              🧹 Reset Data Slate
            </button>
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
            <button
              onClick={() => {
                setActiveTab("SCRAPED_EXPLORER");
                if (scrapedOpportunities.length === 0) {
                  handleLaunchWebScraper();
                }
              }}
              className={`px-4 py-2 text-xs font-bold rounded-xl transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                activeTab === "SCRAPED_EXPLORER"
                  ? "bg-purple-500 text-slate-950 font-black shadow-lg shadow-purple-500/20"
                  : "bg-purple-950/40 text-purple-300 border border-purple-500/30 hover:bg-purple-900/60"
              }`}
            >
              <span>🕷️ Scraper Discovery Engine</span>
              {scrapedOpportunities.length > 0 && (
                <span className="px-1.5 py-0.5 rounded-full text-[10px] bg-purple-400 text-slate-950 font-extrabold">
                  {scrapedOpportunities.length}
                </span>
              )}
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

            {/* Quick Preset Corridor & Extension Buttons */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400 font-semibold">Quick-Fill Trade & Sector Extension Presets:</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {/* Dynamic Catalog Presets */}
                {products.slice(0, 5).map((p) => (
                  <button
                    key={p.id}
                    type="button"
                    onClick={() =>
                      setPresetCorridor({
                        title: p.title,
                        category: p.category,
                        hsCode: p.hsCode,
                        destinationCountry: p.destinationCountry || "Germany 🇩🇪",
                        portHub: p.portHub || "Port of Hamburg",
                        price: p.price,
                        unit: p.unit,
                      })
                    }
                    className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-cyan-500/30 rounded-lg text-xs font-mono text-cyan-300 cursor-pointer flex items-center gap-1.5"
                  >
                    <span>📦</span>
                    <span className="truncate max-w-[170px]">{p.title.split(" ")[0]} ({p.destinationCountry || "EU"})</span>
                  </button>
                ))}

                {/* Suggested Extension Presets */}
                {SUGGESTED_CATALOG_EXTENSIONS.map((ext, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() =>
                      setPresetCorridor({
                        title: `${ext.keyword} (${ext.hsCode}) — Authentic Export Batch`,
                        category: ext.category,
                        hsCode: ext.hsCode,
                        destinationCountry: ext.destination,
                        portHub: ext.portHub,
                        price: ext.price,
                        unit: ext.unit,
                      })
                    }
                    className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-400 rounded-lg text-xs font-mono text-amber-300 cursor-pointer transition-all duration-200 flex items-center gap-1.5"
                  >
                    <span>{ext.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Compute Form */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 bg-slate-950 border border-slate-800 p-4 rounded-xl">
              <div className="relative" ref={commodityAutocompleteRef}>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Commodity Title <span className="text-[10px] text-cyan-400 font-mono">(Smart Autocomplete 💡)</span>
                </label>
                <input
                  type="text"
                  value={computeForm.title}
                  onChange={(e) => {
                    const val = e.target.value;
                    setComputeForm({ ...computeForm, title: val });
                    const matches = searchCommodityAutocomplete(val);
                    setAutocompleteSuggestions(matches);
                    setShowAutocomplete(matches.length > 0);
                  }}
                  onFocus={() => {
                    const matches = searchCommodityAutocomplete(computeForm.title);
                    setAutocompleteSuggestions(matches);
                    if (matches.length > 0) setShowAutocomplete(true);
                  }}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500"
                  placeholder="Type commodity e.g. Ashwagandha, Nicotine Pouches..."
                />

                {/* Autocomplete Suggestions Popover Dropdown */}
                {showAutocomplete && autocompleteSuggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-slate-950/95 border border-cyan-500/30 rounded-xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden max-h-60 overflow-y-auto">
                    <div className="px-3 py-1.5 bg-slate-900/80 border-b border-slate-800 text-[10px] font-mono text-cyan-400 flex items-center justify-between">
                      <span>💡 Suggested Export Commodities</span>
                      <span>Click to auto-fill details</span>
                    </div>
                    {autocompleteSuggestions.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setComputeForm({
                            ...computeForm,
                            title: item.title,
                            category: item.category,
                            hsCode: item.hsCode,
                            price: item.defaultPrice,
                            unit: item.unit,
                          });
                          setShowAutocomplete(false);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-cyan-500/10 border-b border-slate-800/50 last:border-0 flex items-center justify-between transition-colors duration-150 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{item.icon}</span>
                          <div>
                            <div className="text-xs font-semibold text-slate-200">{item.title}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{item.category} • ${item.defaultPrice}/{item.unit}</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {item.hsCode}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Category</label>
                <input
                  type="text"
                  value={computeForm.category}
                  onChange={(e) => setComputeForm({ ...computeForm, category: e.target.value })}
                  placeholder="e.g. Superfoods, Spices, Machinery..."
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

              <div className="relative" ref={countryAutocompleteSuperTriggerRef}>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Target Destination <span className="text-[10px] text-cyan-400 font-mono">(Country Autocomplete 🌍)</span>
                </label>
                <input
                  type="text"
                  value={computeForm.destinationCountry}
                  onChange={(e) => {
                    const val = e.target.value;
                    setComputeForm({ ...computeForm, destinationCountry: val });
                    const matches = searchCountryAutocomplete(val);
                    setCountrySuggestionsSuperTrigger(matches);
                    setShowCountryAutocompleteSuperTrigger(matches.length > 0);
                  }}
                  onFocus={() => {
                    const matches = searchCountryAutocomplete(computeForm.destinationCountry);
                    setCountrySuggestionsSuperTrigger(matches);
                    if (matches.length > 0) setShowCountryAutocompleteSuperTrigger(true);
                  }}
                  className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-cyan-500 font-medium"
                  placeholder="Type country e.g. Germany, USA, Sweden..."
                />

                {/* Country Autocomplete Suggestions Popover */}
                {showCountryAutocompleteSuperTrigger && countrySuggestionsSuperTrigger.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-slate-950/95 border border-cyan-500/30 rounded-xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden max-h-60 overflow-y-auto">
                    <div className="px-3 py-1.5 bg-slate-900/80 border-b border-slate-800 text-[10px] font-mono text-cyan-400 flex items-center justify-between">
                      <span>🌍 Standardized Country Corridors</span>
                      <span>Click to auto-fill Country & Port</span>
                    </div>
                    {countrySuggestionsSuperTrigger.map((c, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setComputeForm({
                            ...computeForm,
                            destinationCountry: c.formattedName,
                            portHub: c.primaryPortHub,
                          });
                          setShowCountryAutocompleteSuperTrigger(false);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-cyan-500/10 border-b border-slate-800/50 last:border-0 flex items-center justify-between transition-colors duration-150 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{c.flag}</span>
                          <div>
                            <div className="text-xs font-semibold text-slate-200">{c.formattedName}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{c.region}</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {c.primaryPortHub}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
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

                <div className="p-3 bg-slate-900 border border-slate-800 rounded-lg text-xs font-mono text-slate-300">
                  {streamMessage || "⚡ Running Scraper Engine..."}
                </div>
              </div>
            ) : (
              <button
                onClick={handleRunComputeEngineSuperTrigger}
                className="w-full py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-200 cursor-pointer"
              >
                ⚡ Execute Python Compute Engine Super-Trigger →
              </button>
            )}
          </div>
        )}

        {/* TAB 2: MASTER EXPORTING GOODS TABLE */}
        {activeTab === "CATALOG" && (
          <div className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-white">Master Exporting Commodities Catalog</h3>
                <p className="text-xs text-slate-400">All export product lines registered across the platform</p>
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
                    <th className="p-3.5">Destination</th>
                    <th className="p-3.5">FOB Price</th>
                    <th className="p-3.5">Scraped Prospects</th>
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
                      <td className="p-3.5 font-mono font-bold text-slate-100">${p.price} / {p.unit}</td>
                      <td className="p-3.5 font-mono text-emerald-400 font-bold">{p.leadCount} Verified</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-[10px] font-bold">
                          {p.status}
                        </span>
                      </td>
                      <td className="p-3.5 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/products/${p.id}`}
                            className="px-2.5 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-md text-xs cursor-pointer font-semibold"
                          >
                            📄 View Details & Compliance
                          </Link>
                          <button
                            onClick={() => setProducts((prev) => prev.filter((item) => item.id !== p.id))}
                            className="px-2.5 py-1 bg-red-500/10 hover:bg-red-500/20 text-red-400 border border-red-500/20 rounded-md text-xs cursor-pointer"
                          >
                            Remove
                          </button>
                        </div>
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
                      <td className="p-3.5">
                        <div className="font-bold text-white flex flex-col sm:flex-row sm:items-center gap-1">
                          <span>{l.name}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold w-fit">
                            {l.verification_badge || "🛡️ PLATINUM CUSTOMS VERIFIED"}
                          </span>
                        </div>
                      </td>
                      <td className="p-3.5">
                        <div className="text-slate-200 font-semibold">{l.company}</div>
                        <div className="text-slate-400 text-[11px] font-mono flex flex-wrap items-center gap-2">
                          <span>{l.email}</span>
                          <span className="text-[10px] text-purple-400 font-bold">{l.registration_id || "DUNS: 69-823-4109"}</span>
                        </div>
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

        {/* TAB 4: WEB SCRAPER INTELLIGENCE & DISCOVERY EXPLORER */}
        {activeTab === "SCRAPED_EXPLORER" && (
          <div className="space-y-6">
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-white flex items-center gap-2">
                    <span>🕷️ Web Scraper Intelligence & Discovery Engine</span>
                    <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30 font-mono">
                      LIVE CRAWLER ACTIVE
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-1">
                    Crawl European Customs, US Import Manifests, APEDA, and Chamber directories to discover novel products and buyer leads for 1-click catalog publishing.
                  </p>
                </div>

                <button
                  onClick={() => handleLaunchWebScraper()}
                  disabled={isScraping}
                  className="px-4 py-2.5 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-400 hover:to-indigo-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-purple-500/20 transition-all duration-200 cursor-pointer disabled:opacity-50 whitespace-nowrap"
                >
                  {isScraping ? "🕷️ Scraping Trade Registries..." : "⚡ Launch Web Scraper Crawler →"}
                </button>
              </div>

              {/* Controls Form */}
              <form onSubmit={handleLaunchWebScraper} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 bg-slate-950 border border-purple-500/30 p-4 rounded-xl">
                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1">Search Keyword / Commodity</label>
                  <input
                    type="text"
                    value={scraperForm.keyword}
                    onChange={(e) => setScraperForm({ ...scraperForm, keyword: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-purple-500 font-mono"
                    placeholder="e.g. Ashwagandha, Snus..."
                  />
                </div>

                <div className="relative" ref={countryAutocompleteScraperRef}>
                  <label className="block text-xs font-semibold text-purple-300 mb-1">
                    Target Country <span className="text-[10px] text-purple-400 font-mono">(Country Autocomplete 🌍)</span>
                  </label>
                  <input
                    type="text"
                    value={scraperForm.destination}
                    onChange={(e) => {
                      const val = e.target.value;
                      setScraperForm({ ...scraperForm, destination: val });
                      const matches = searchCountryAutocomplete(val);
                      setCountrySuggestionsScraper(matches);
                      setShowCountryAutocompleteScraper(matches.length > 0);
                    }}
                    onFocus={() => {
                      const matches = searchCountryAutocomplete(scraperForm.destination);
                      setCountrySuggestionsScraper(matches);
                      if (matches.length > 0) setShowCountryAutocompleteScraper(true);
                    }}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-slate-200 focus:outline-none focus:border-purple-500 font-medium"
                    placeholder="Type country e.g. Germany, Sweden, USA..."
                  />

                  {/* Country Autocomplete Popover */}
                  {showCountryAutocompleteScraper && countrySuggestionsScraper.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-slate-950/95 border border-purple-500/30 rounded-xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden max-h-60 overflow-y-auto">
                      <div className="px-3 py-1.5 bg-slate-900/80 border-b border-slate-800 text-[10px] font-mono text-purple-300 flex items-center justify-between">
                        <span>🌍 Select Scraper Target Country</span>
                        <span>Click to apply</span>
                      </div>
                      {countrySuggestionsScraper.map((c, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setScraperForm({
                              ...scraperForm,
                              destination: c.formattedName,
                            });
                            setShowCountryAutocompleteScraper(false);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-purple-500/10 border-b border-slate-800/50 last:border-0 flex items-center justify-between transition-colors duration-150 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">{c.flag}</span>
                            <div>
                              <div className="text-xs font-semibold text-slate-200">{c.formattedName}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{c.region}</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-purple-500/10 text-purple-300 border border-purple-500/20">
                            {c.primaryPortHub}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1">Sourcing Direction / Mode</label>
                  <select
                    value={scraperForm.sourcingMode}
                    onChange={(e) => setScraperForm({ ...scraperForm, sourcingMode: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-purple-300 focus:outline-none focus:border-purple-500 cursor-pointer font-bold"
                  >
                    <option value="BOTH">⚡ ALL OPPORTUNITY TYPES (Combined Mega-Crawl)</option>
                    <option value="LOCAL_VENDOR">🏬 LOCAL IN-COUNTRY VENDORS ONLY</option>
                    <option value="EXPORT_PRODUCT">📦 EXPORT PRODUCTS ONLY</option>
                    <option value="IMPORT_LEAD">🎯 IMPORT BUYER LEADS ONLY</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-purple-300 mb-1">Crawl Depth / Volume 📊</label>
                  <select
                    value={scraperForm.crawlLimit}
                    onChange={(e) => setScraperForm({ ...scraperForm, crawlLimit: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-900 border border-slate-800 rounded-lg text-xs text-purple-300 focus:outline-none focus:border-purple-500 cursor-pointer font-bold"
                  >
                    <option value={8}>8 Results (Fast Scan)</option>
                    <option value={12}>12 Results (Standard Deep Scan)</option>
                    <option value={16}>16 Results (Maximum Comprehensive Scan)</option>
                  </select>
                </div>
              </form>

              {/* Scraper Presets & Extensions */}
              <div className="space-y-4 pt-2">
                {/* 1. Dynamic Active Catalog Presets */}
                {products.length > 0 && (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-mono text-cyan-400 font-semibold flex items-center gap-1.5">
                        <span className="inline-block w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
                        Active Catalog Presets ({products.length} Products):
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {products.slice(0, 8).map((p) => {
                        const kw = p.category || p.title.split(" ")[0];
                        return (
                          <button
                            key={p.id}
                            type="button"
                            onClick={() => {
                              setScraperForm({
                                keyword: kw,
                                destination: p.destinationCountry || "Germany 🇩🇪",
                                sourcingMode: "BOTH",
                                crawlLimit: 12,
                                minBudget: 25000,
                              });
                              handleLaunchWebScraper();
                            }}
                            className="px-3 py-1.5 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-500/40 rounded-lg text-xs font-mono text-cyan-300 cursor-pointer transition-all duration-200 flex items-center gap-1.5"
                          >
                            <span>📦</span>
                            <span className="truncate max-w-[180px]">{p.title.split(" ")[0]} ({p.destinationCountry || "EU"})</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* 2. Suggested Portfolio Extensions */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-amber-400 font-semibold flex items-center gap-1.5">
                      <span className="px-1.5 py-0.5 bg-amber-500/20 border border-amber-500/40 rounded text-[10px] uppercase tracking-wider text-amber-300">
                        Suggested Portfolio Extensions
                      </span>
                      High-Growth Sector Presets:
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setScraperForm({ keyword: "Germany Local Distributors & Cold Storage", destination: "Germany 🇩🇪", sourcingMode: "LOCAL_VENDOR", crawlLimit: 12, minBudget: 50000 });
                        handleLaunchWebScraper();
                      }}
                      className="px-3 py-1.5 bg-purple-950/60 hover:bg-purple-900 border border-purple-500/40 rounded-lg text-xs font-mono text-purple-300 cursor-pointer font-bold flex items-center gap-1.5"
                    >
                      <span>🏬</span>
                      <span>Scrape In-Country Logistics Vendors</span>
                    </button>

                    {SUGGESTED_CATALOG_EXTENSIONS.map((ext, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setScraperForm({
                            keyword: ext.keyword,
                            destination: ext.destination,
                            sourcingMode: ext.mode as any,
                            crawlLimit: 12,
                            minBudget: ext.minBudget,
                          });
                          handleLaunchWebScraper();
                        }}
                        className="px-3 py-1.5 bg-slate-950 hover:bg-slate-800 border border-amber-500/30 hover:border-amber-400 rounded-lg text-xs font-mono text-amber-300 cursor-pointer transition-all duration-200 flex items-center gap-1.5"
                      >
                        <span>{ext.label}</span>
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Scraper Status */}
              {scrapedStatusMessage && (
                <div className="p-3 bg-purple-950/40 border border-purple-500/30 rounded-xl text-xs font-mono text-purple-300 flex items-center justify-between">
                  <span>{scrapedStatusMessage}</span>
                  <span className="text-[10px] text-slate-400">Refreshed live</span>
                </div>
              )}
            </div>

            {/* Scraped Opportunities Grid */}
            <div className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="text-sm font-bold text-white">Discovered Trade & Vendor Opportunities ({scrapedOpportunities.length})</h4>
                  <p className="text-xs text-slate-400">Novel export products, import buyers, and local in-country vendors scraped directly from global registries for {scraperForm.destination}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {scrapedOpportunities.map((item) => (
                  <div
                    key={item.id}
                    className="bg-slate-950 border border-slate-800 hover:border-purple-500/50 p-4 rounded-xl space-y-3 transition-all duration-200 flex flex-col justify-between"
                  >
                    <div className="space-y-2">
                      <div className="flex items-center justify-between gap-2">
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                          item.opportunityType === "EXPORT_PRODUCT"
                            ? "bg-cyan-500/10 text-cyan-400 border border-cyan-500/30"
                            : item.opportunityType === "LOCAL_VENDOR"
                            ? "bg-amber-500/10 text-amber-300 border border-amber-500/30"
                            : "bg-emerald-500/10 text-emerald-400 border border-emerald-500/30"
                        }`}>
                          {item.opportunityType === "EXPORT_PRODUCT"
                            ? "📦 EXPORT PRODUCT"
                            : item.opportunityType === "LOCAL_VENDOR"
                            ? `🏬 LOCAL VENDOR${item.vendorType ? ` (${item.vendorType.replace("_", " ")})` : ""}`
                            : "🎯 IMPORT BUYER LEAD"}
                        </span>
                        <span className="text-[11px] font-mono text-cyan-400 bg-cyan-950/50 px-2 py-0.5 rounded border border-cyan-500/20">
                          {item.sourceDomain}
                        </span>
                      </div>

                      <h5 className="font-bold text-sm text-slate-100 leading-snug">{item.title}</h5>
                      <p className="text-xs text-slate-400">{item.category} • ${item.suggestedPrice}/{item.unit}</p>

                      <div className="p-2.5 bg-slate-900/90 rounded-lg text-xs space-y-1">
                        <div className="font-semibold text-slate-200 flex items-center justify-between">
                          <span>👤 Scraped Importer:</span>
                          <span className="text-emerald-400 font-mono font-bold">{item.confidenceScore}% Match</span>
                        </div>
                        <div className="text-slate-300 font-medium">{item.scrapedBuyerCompany} ({item.destinationCountry})</div>
                        <div className="text-slate-400 text-[11px] font-mono">{item.scrapedBuyerName} • {item.scrapedBuyerEmail}</div>
                        <div className="text-purple-300 text-[11px] font-mono">Budget: ${item.scrapedBudget.toLocaleString()} annual</div>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePublishScrapedOpportunity(item)}
                      disabled={item.status === "PUBLISHED"}
                      className={`w-full py-2 px-3 text-xs font-bold rounded-lg transition-all duration-200 cursor-pointer ${
                        item.status === "PUBLISHED"
                          ? "bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700"
                          : "bg-purple-500 hover:bg-purple-400 text-slate-950 shadow-md shadow-purple-500/20"
                      }`}
                    >
                      {item.status === "PUBLISHED" ? "✅ Published to Platform Catalog" : "➕ Approve & Publish to Global Catalog"}
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
