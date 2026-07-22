"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";

export type UserRole = "BUYER" | "SUPPLIER" | "LEAD_PROSPECT" | "COMPUTE_AGENT";

export interface CatalogUser {
  id: number;
  name: string;
  email: string;
  company: string;
  role: UserRole;
  location: string;
  rating: number;
  avatarUrl: string;
}

export interface TradeProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  hsCode: string;
  originCountry: string;
  destinationCountry: string;
  destinationFlag: string;
  portHub: string;
  tariffRatePct: number;
  price: number;
  unit: string;
  listedBy: CatalogUser;
  imageUrl: string;
  leadCount: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
}

export interface TradeLeadProspect {
  user_id: number;
  name: string;
  email: string;
  company: string;
  role: UserRole;
  destination_country: string;
  port_hub: str;
  tariff_estimate_pct: number;
  match_score: number;
  confidence_reason: string;
}

// Target Destinations supported
const DESTINATION_COUNTRIES = [
  { code: "ALL", name: "All Destinations", flag: "🌐" },
  { code: "Poland", name: "Poland", flag: "🇵🇱", hub: "Port of Gdańsk" },
  { code: "Netherlands", name: "Netherlands", flag: "🇳🇱", hub: "Port of Rotterdam" },
  { code: "Australia", name: "Australia", flag: "🇦🇺", hub: "Port of Sydney" },
  { code: "Oman", name: "Oman", flag: "🇴🇲", hub: "Port of Salalah" },
  { code: "China", name: "China", flag: "🇨🇳", hub: "Port of Shanghai" },
  { code: "USA", name: "United States", flag: "🇺🇸", hub: "Port of Los Angeles / Newark" },
];

// Sample Suppliers in India (Unified User Structure)
const INITIAL_INDIAN_SUPPLIERS: CatalogUser[] = [
  {
    id: 10,
    name: "Rajesh Export Corp",
    email: "rajesh@exim.in",
    company: "Rajesh Global Industries",
    role: "SUPPLIER",
    location: "Mumbai, India 🇮🇳",
    rating: 4.9,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 11,
    name: "Priya Sharma",
    email: "priya@deccanspices.com",
    company: "Deccan Organic Spices & Agri",
    role: "SUPPLIER",
    location: "Bengaluru, India 🇮🇳",
    rating: 5.0,
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 12,
    name: "Amitav Roy",
    email: "aroy@bengaltextiles.co.in",
    company: "Bengal Apparel & Handicrafts",
    role: "SUPPLIER",
    location: "Kolkata, India 🇮🇳",
    rating: 4.8,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
];

// Initial Cross-Border Trade Products from India
const INITIAL_TRADE_PRODUCTS: TradeProduct[] = [
  {
    id: 201,
    title: "100% Organic Premium Basmati Rice (HS 1006)",
    description: "Export-grade long grain aromatic Basmati rice with phytosanitary certification, vacuum packed for container shipments.",
    category: "Agri & Spices",
    hsCode: "HS-1006",
    originCountry: "India 🇮🇳",
    destinationCountry: "Oman",
    destinationFlag: "🇴🇲",
    portHub: "Port of Salalah",
    tariffRatePct: 5.0,
    price: 1250,
    unit: "metric ton",
    listedBy: INITIAL_INDIAN_SUPPLIERS[1],
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
    leadCount: 18,
    status: "ACTIVE",
    createdAt: "2026-07-21T08:00:00Z",
  },
  {
    id: 202,
    title: "Pharmaceutical Active Ingredients (HS 3004)",
    description: "GMP-certified active raw ingredients for European formulations, pre-inspected for EU customs entry.",
    category: "Pharmaceuticals",
    hsCode: "HS-3004",
    originCountry: "India 🇮🇳",
    destinationCountry: "Poland",
    destinationFlag: "🇵🇱",
    portHub: "Port of Gdańsk",
    tariffRatePct: 3.2,
    price: 4800,
    unit: "kg batch",
    listedBy: INITIAL_INDIAN_SUPPLIERS[0],
    imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=600&auto=format&fit=crop&q=80",
    leadCount: 14,
    status: "ACTIVE",
    createdAt: "2026-07-20T11:30:00Z",
  },
  {
    id: 203,
    title: "High-Purity Botanical Extract & Spices (HS 3301)",
    description: "Essential oils, curcumin, and oleoresin extracts shipped directly to European distribution hubs.",
    category: "Agri & Spices",
    hsCode: "HS-3301",
    originCountry: "India 🇮🇳",
    destinationCountry: "Netherlands",
    destinationFlag: "🇳🇱",
    portHub: "Port of Rotterdam",
    tariffRatePct: 2.8,
    price: 3200,
    unit: "drum",
    listedBy: INITIAL_INDIAN_SUPPLIERS[1],
    imageUrl: "https://images.unsplash.com/photo-1596040033229-a9821ebd058d?w=600&auto=format&fit=crop&q=80",
    leadCount: 22,
    status: "ACTIVE",
    createdAt: "2026-07-19T14:15:00Z",
  },
  {
    id: 204,
    title: "Cotton Apparel & Sustainable Textiles (HS 6205)",
    description: "Ethically manufactured organic cotton apparel for North American retail distributors.",
    category: "Textiles",
    hsCode: "HS-6205",
    originCountry: "India 🇮🇳",
    destinationCountry: "United States",
    destinationFlag: "🇺🇸",
    portHub: "Port of Los Angeles / Newark",
    tariffRatePct: 4.5,
    price: 18,
    unit: "garment piece",
    listedBy: INITIAL_INDIAN_SUPPLIERS[2],
    imageUrl: "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=600&auto=format&fit=crop&q=80",
    leadCount: 31,
    status: "ACTIVE",
    createdAt: "2026-07-22T09:00:00Z",
  },
  {
    id: 205,
    title: "Solar & Clean Energy Components (HS 8541)",
    description: "Heavy industrial solar panel mountings and clean energy accessories for APAC green grid projects.",
    category: "Engineering & Solar",
    hsCode: "HS-8541",
    originCountry: "India 🇮🇳",
    destinationCountry: "Australia",
    destinationFlag: "🇦🇺",
    portHub: "Port of Sydney",
    tariffRatePct: 4.0,
    price: 850,
    unit: "panel set",
    listedBy: INITIAL_INDIAN_SUPPLIERS[0],
    imageUrl: "https://images.unsplash.com/photo-1509391365360-2e959784a276?w=600&auto=format&fit=crop&q=80",
    leadCount: 16,
    status: "ACTIVE",
    createdAt: "2026-07-18T16:00:00Z",
  },
  {
    id: 206,
    title: "High-Grade Iron Ore & Refined Minerals (HS 2601)",
    description: "Industrial mineral ores and raw materials shipped in bulk cargo vessels.",
    category: "Minerals & Ore",
    hsCode: "HS-2601",
    originCountry: "India 🇮🇳",
    destinationCountry: "China",
    destinationFlag: "🇨🇳",
    portHub: "Port of Shanghai",
    tariffRatePct: 6.5,
    price: 140,
    unit: "ton bulk",
    listedBy: INITIAL_INDIAN_SUPPLIERS[0],
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
    leadCount: 25,
    status: "ACTIVE",
    createdAt: "2026-07-17T10:00:00Z",
  },
];

export default function CrossBorderTradeLandingPage() {
  const [products, setProducts] = useState<TradeProduct[]>(INITIAL_TRADE_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  
  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<TradeProduct | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isListProductModalOpen, setIsListProductModalOpen] = useState(false);
  const [isComputing, setIsComputing] = useState(false);
  const [discoveredLeads, setDiscoveredLeads] = useState<TradeLeadProspect[]>([]);

  // List product form state
  const [newProductForm, setNewProductForm] = useState({
    title: "",
    description: "",
    category: "Agri & Spices",
    hsCode: "HS-1006",
    destinationCountry: "Oman",
    tariffRatePct: 4.5,
    price: 950,
    unit: "metric ton",
    imageUrl: "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
  });

  // Filtered Catalog
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.hsCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.listedBy.company.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDestination =
        selectedDestination === "ALL" ||
        p.destinationCountry.toLowerCase().includes(selectedDestination.toLowerCase());

      const matchesCategory =
        selectedCategory === "ALL" || p.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesDestination && matchesCategory;
    });
  }, [products, searchQuery, selectedDestination, selectedCategory]);

  const categories = ["ALL", "Agri & Spices", "Pharmaceuticals", "Textiles", "Engineering & Solar", "Minerals & Ore"];

  // Trigger Python FastAPI Compute Engine
  const handleTriggerComputeAgent = (product: TradeProduct) => {
    setSelectedProduct(product);
    setIsComputing(true);
    setIsLeadModalOpen(true);

    setTimeout(() => {
      const mockDiscoveredLeads: Record<string, TradeLeadProspect[]> = {
        Poland: [
          {
            user_id: 301,
            name: "Jan Kowalski",
            email: "j.kowalski@baltictrade.pl",
            company: "Baltic Global Imports Sp. z o.o.",
            role: "LEAD_PROSPECT",
            destination_country: "Poland 🇵🇱",
            port_hub: "Port of Gdańsk",
            tariff_estimate_pct: 3.2,
            match_score: 95.8,
            confidence_reason: `Active EU Import Permit verified for ${product.hsCode} ($140k budget)`,
          },
          {
            user_id: 307,
            name: "Marek Nowak",
            email: "mnowak@warsawpharma.pl",
            company: "Warsaw Distribution Group",
            role: "LEAD_PROSPECT",
            destination_country: "Poland 🇵🇱",
            port_hub: "Port of Gdynia",
            tariff_estimate_pct: 3.2,
            match_score: 91.4,
            confidence_reason: "High volume quarterly import contract requirement",
          },
        ],
        Netherlands: [
          {
            user_id: 302,
            name: "Willem de Jong",
            email: "willem@rotterdamb2b.nl",
            company: "Rotterdam Gateway Logistics BV",
            role: "LEAD_PROSPECT",
            destination_country: "Netherlands 🇳🇱",
            port_hub: "Port of Rotterdam",
            tariff_estimate_pct: 2.8,
            match_score: 96.2,
            confidence_reason: `Rotterdam port customs pre-clearance ready for ${product.hsCode}`,
          },
        ],
        Australia: [
          {
            user_id: 303,
            name: "Lachlan Murdoch",
            email: "l.murdoch@pacificeX.com.au",
            company: "Pacific Cross-Border Energy Pty",
            role: "LEAD_PROSPECT",
            destination_country: "Australia 🇦🇺",
            port_hub: "Port of Sydney",
            tariff_estimate_pct: 4.0,
            match_score: 93.0,
            confidence_reason: "Approved APAC trade credit limit ($210k)",
          },
        ],
        Oman: [
          {
            user_id: 304,
            name: "Tariq Al-Said",
            email: "tariq@gulfmerchant.om",
            company: "Oman Trade & Gulf Supply LLC",
            role: "LEAD_PROSPECT",
            destination_country: "Oman 🇴🇲",
            port_hub: "Port of Salalah",
            tariff_estimate_pct: 5.0,
            match_score: 97.4,
            confidence_reason: `GCC import license & Salalah port free-zone container deposit ready`,
          },
        ],
        China: [
          {
            user_id: 305,
            name: "Wei Zhang",
            email: "w.zhang@shanghaiimport.cn",
            company: "Shanghai Silk Road Enterprise Ltd",
            role: "LEAD_PROSPECT",
            destination_country: "China 🇨🇳",
            port_hub: "Port of Shanghai",
            tariff_estimate_pct: 6.5,
            match_score: 94.1,
            confidence_reason: "Bulk cargo import letter of credit (L/C) issued",
          },
        ],
        "United States": [
          {
            user_id: 306,
            name: "Sarah Jenkins",
            email: "sjenkins@americantrade.us",
            company: "Apex Americas Import Corp",
            role: "LEAD_PROSPECT",
            destination_country: "United States 🇺🇸",
            port_hub: "Port of Los Angeles / Newark",
            tariff_estimate_pct: 4.5,
            match_score: 98.2,
            confidence_reason: `FDA & US Customs entry pre-classification for ${product.hsCode}`,
          },
        ],
      };

      const matchedList = mockDiscoveredLeads[product.destinationCountry] || mockDiscoveredLeads["United States"];
      setDiscoveredLeads(matchedList);
      setIsComputing(false);
    }, 1200);
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const destObj = DESTINATION_COUNTRIES.find((d) => d.code === newProductForm.destinationCountry) || DESTINATION_COUNTRIES[1];

    const created: TradeProduct = {
      id: Date.now(),
      title: newProductForm.title,
      description: newProductForm.description,
      category: newProductForm.category,
      hsCode: newProductForm.hsCode,
      originCountry: "India 🇮🇳",
      destinationCountry: destObj.name,
      destinationFlag: destObj.flag,
      portHub: destObj.hub || "Main Sea Port",
      tariffRatePct: Number(newProductForm.tariffRatePct),
      price: Number(newProductForm.price),
      unit: newProductForm.unit,
      listedBy: INITIAL_INDIAN_SUPPLIERS[0],
      imageUrl: newProductForm.imageUrl || "https://images.unsplash.com/photo-1586201375761-83865001e31c?w=600&auto=format&fit=crop&q=80",
      leadCount: 0,
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };

    setProducts([created, ...products]);
    setIsListProductModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">

      {/* --- TOP NAVIGATION BAR --- */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-cyan-500/20">
              🇮🇳
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">Antigravity ExIm</span>
              <span className="text-xs text-cyan-400 font-mono ml-2">India Trade Hub</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#catalog" className="hover:text-cyan-400 transition-colors duration-200">Export Catalog</a>
            <a href="#corridors" className="hover:text-cyan-400 transition-colors duration-200">Trade Corridors</a>
            <a href="#suppliers" className="hover:text-cyan-400 transition-colors duration-200">Indian Exporters</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-800 transition-colors duration-200 cursor-pointer"
            >
              Sign In
            </Link>
            <button
              onClick={() => setIsListProductModalOpen(true)}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors duration-200 shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              + List Indian Product
            </button>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-16 pb-12 border-b border-slate-800/60 bg-gradient-to-b from-slate-900/50 via-slate-950 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-medium">
            <span>🚢 India Cross-Border Trade Engine • 6 Target International Corridors</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent max-w-5xl mx-auto leading-tight">
            Export Leads & Trade Matching from India 🇮🇳
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto">
            Discover verified buyer lead prospects across <strong>Poland 🇵🇱</strong>, <strong>Netherlands 🇳🇱</strong>, <strong>Australia 🇦🇺</strong>, <strong>Oman 🇴🇲</strong>, <strong>China 🇨🇳</strong>, and <strong>USA 🇺🇸</strong> with automated HS Code & Duty Tariff matching.
          </p>

          {/* Search Input */}
          <div className="max-w-3xl mx-auto pt-4">
            <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-xl shadow-2xl flex flex-col sm:flex-row gap-2 backdrop-blur-md">
              <div className="relative flex-1">
                <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search by product, HS code (e.g. HS-1006), or Indian exporter..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-0 pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-0"
                />
              </div>

              <button
                onClick={() => {}}
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm rounded-lg transition-colors duration-200 cursor-pointer"
              >
                Search Trade Engine
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- TRADE CORRIDOR SELECTOR BAR --- */}
      <section id="corridors" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>SELECT DESTINATION TRADE CORRIDOR FROM INDIA 🇮🇳</span>
            <span>6 ACTIVE DESTINATIONS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
            {DESTINATION_COUNTRIES.map((dest) => (
              <button
                key={dest.code}
                onClick={() => setSelectedDestination(dest.code)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  selectedDestination.toLowerCase() === dest.code.toLowerCase()
                    ? "bg-cyan-500/20 border-cyan-500/40 text-white shadow-lg shadow-cyan-500/10"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="text-xl mb-1">{dest.flag}</div>
                <div className="font-bold text-xs truncate">{dest.name}</div>
                {dest.hub && <div className="text-[10px] text-slate-500 truncate">{dest.hub}</div>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- CATALOG GRID SECTION --- */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">India Export Product Catalog</h2>
            <p className="text-xs text-slate-400 mt-1">Listing certified Indian export products & international buyer leads</p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700/80 transition-all duration-200 flex flex-col group"
            >
              {/* Product Image Banner */}
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-950/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm">
                    {product.hsCode}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-950/90 text-slate-200 border border-slate-700 backdrop-blur-sm">
                    {product.destinationFlag} {product.destinationCountry}
                  </span>
                </div>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-950/90 text-emerald-400 border border-emerald-800/40 text-xs font-mono font-semibold backdrop-blur-sm">
                  ⚡ {product.leadCount} Buyer Leads
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-[11px] text-slate-400 flex items-center justify-between font-mono">
                    <span>Origin: {product.originCountry}</span>
                    <span>Tariff: {product.tariffRatePct}% duty</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-cyan-400 transition-colors duration-200 leading-snug">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Pricing & Supplier Info */}
                <div className="pt-3 border-t border-slate-800/60 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-400">Export Unit Price</span>
                    <span className="text-lg font-bold text-white font-mono">
                      ${product.price.toLocaleString()}{" "}
                      <span className="text-xs text-slate-400 font-normal">/ {product.unit}</span>
                    </span>
                  </div>

                  {/* Exporter Info */}
                  <div className="flex items-center gap-2.5 pt-1">
                    <img
                      src={product.listedBy.avatarUrl}
                      alt={product.listedBy.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-700"
                    />
                    <div className="text-xs truncate">
                      <span className="text-slate-200 font-medium">{product.listedBy.company}</span>
                      <div className="text-slate-400 text-[10px]">{product.listedBy.location}</div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <button
                    onClick={() => handleTriggerComputeAgent(product)}
                    className="w-full py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 font-bold text-xs transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                  >
                    <span>🤖 Run AI Buyer Lead Matcher ({product.destinationCountry})</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- EXPORT SUPPLIERS DIRECTORY --- */}
      <section id="suppliers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-800/60 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Verified Indian Exporters</h2>
          <p className="text-xs text-slate-400 mt-1">Certified exporters shipping to Poland, Netherlands, Australia, Oman, China & USA</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {INITIAL_INDIAN_SUPPLIERS.map((supplier) => (
            <div key={supplier.id} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-4">
              <img src={supplier.avatarUrl} alt={supplier.name} className="w-12 h-12 rounded-full object-cover border border-slate-700" />
              <div>
                <h4 className="font-bold text-sm text-white">{supplier.name}</h4>
                <p className="text-xs text-cyan-400">{supplier.company}</p>
                <p className="text-xs text-slate-500 mt-0.5">{supplier.location} • ⭐ {supplier.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- AI DISCOVERED LEADS MODAL --- */}
      {isLeadModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase">Python FastAPI Trade Engine</span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Import Buyer Prospects in {selectedProduct.destinationCountry} {selectedProduct.destinationFlag}
                </h3>
              </div>
              <button onClick={() => setIsLeadModalOpen(false)} className="text-slate-400 hover:text-slate-200 text-sm cursor-pointer">
                ✕
              </button>
            </div>

            {isComputing ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-sm text-slate-300 font-mono">Matching HS Code {selectedProduct.hsCode} with Buyer Databases in {selectedProduct.destinationCountry}...</p>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl flex items-center justify-between text-xs font-mono text-slate-300">
                  <span>Product: {selectedProduct.title}</span>
                  <span className="text-cyan-400">Tariff: {selectedProduct.tariffRatePct}%</span>
                </div>

                <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                  {discoveredLeads.map((lead) => (
                    <div key={lead.user_id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-100">{lead.name}</h4>
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {lead.match_score}% Match
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{lead.company} • {lead.destination_country}</p>
                        <p className="text-xs text-slate-500 italic mt-1">Port Hub: {lead.port_hub} | {lead.confidence_reason}</p>
                      </div>

                      <button
                        onClick={() => alert(`Buyer Prospect ${lead.name} (${lead.company}) imported to your Lead Dashboard!`)}
                        className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors duration-200 whitespace-nowrap cursor-pointer shadow-md"
                      >
                        Import Trade Lead
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => setIsLeadModalOpen(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 text-sm rounded-lg hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- LIST PRODUCT MODAL --- */}
      {isListProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">List Indian Export Product</h3>
              <button onClick={() => setIsListProductModalOpen(false)} className="text-slate-400 hover:text-slate-200 text-sm cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Product Title *</label>
                <input
                  type="text"
                  required
                  value={newProductForm.title}
                  onChange={(e) => setNewProductForm({ ...newProductForm, title: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50"
                  placeholder="e.g. Organic Basmati Rice Grade-A"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">HS Code *</label>
                  <input
                    type="text"
                    required
                    value={newProductForm.hsCode}
                    onChange={(e) => setNewProductForm({ ...newProductForm, hsCode: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50"
                    placeholder="e.g. HS-1006"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Target Country</label>
                  <select
                    value={newProductForm.destinationCountry}
                    onChange={(e) => setNewProductForm({ ...newProductForm, destinationCountry: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50 cursor-pointer"
                  >
                    <option value="Poland">Poland 🇵🇱</option>
                    <option value="Netherlands">Netherlands 🇳🇱</option>
                    <option value="Australia">Australia 🇦🇺</option>
                    <option value="Oman">Oman 🇴🇲</option>
                    <option value="China">China 🇨🇳</option>
                    <option value="USA">United States 🇺🇸</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50 cursor-pointer"
                  >
                    <option value="Agri & Spices">Agri & Spices</option>
                    <option value="Pharmaceuticals">Pharmaceuticals</option>
                    <option value="Textiles">Textiles</option>
                    <option value="Engineering & Solar">Engineering & Solar</option>
                    <option value="Minerals & Ore">Minerals & Ore</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Export Price ($)</label>
                  <input
                    type="number"
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={newProductForm.description}
                  onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50"
                  placeholder="Describe your product specifications, port of origin in India, and packaging..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsListProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors duration-200 shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  Publish Export Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
