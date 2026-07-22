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

export interface CatalogProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  unit: string;
  listedBy: CatalogUser;
  imageUrl: string;
  leadCount: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
}

export interface DiscoveredLead {
  user_id: number;
  name: string;
  email: string;
  company: string;
  role: UserRole;
  location: string;
  match_score: number;
  confidence_reason: string;
}

// Sample Catalog Users / Suppliers (Unified User Structure)
const INITIAL_USERS: CatalogUser[] = [
  {
    id: 10,
    name: "Dr. Aris Thorne",
    email: "athorne@nexuscloud.io",
    company: "Nexus Cloud Infrastructure",
    role: "SUPPLIER",
    location: "San Francisco, USA",
    rating: 4.9,
    avatarUrl: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 11,
    name: "Elena Vance",
    email: "elena@synapseai.tech",
    company: "Synapse AI Labs",
    role: "SUPPLIER",
    location: "Berlin, Germany",
    rating: 4.8,
    avatarUrl: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 12,
    name: "Rajesh Patel",
    email: "r.patel@quantumsys.in",
    company: "Quantum Systems Ltd",
    role: "SUPPLIER",
    location: "Bengaluru, India",
    rating: 5.0,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
];

// Initial Product Catalog
const INITIAL_PRODUCTS: CatalogProduct[] = [
  {
    id: 101,
    title: "Autonomous Python AI Agent Nodes",
    description: "Distributed FastAPI compute agent nodes configured for automated web lead mining, data cleaning, and Pandas lead scoring.",
    category: "AI & Compute",
    price: 299,
    unit: "node / mo",
    listedBy: INITIAL_USERS[0],
    imageUrl: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&auto=format&fit=crop&q=80",
    leadCount: 14,
    status: "ACTIVE",
    createdAt: "2026-07-20T10:00:00Z",
  },
  {
    id: 102,
    title: "Enterprise Healthcare Data Engine",
    description: "HIPAA-compliant analytics pipeline with pre-built connector modules for hospital networks and medical device suppliers.",
    category: "Healthcare IT",
    price: 1450,
    unit: "license / mo",
    listedBy: INITIAL_USERS[1],
    imageUrl: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&auto=format&fit=crop&q=80",
    leadCount: 8,
    status: "ACTIVE",
    createdAt: "2026-07-18T14:30:00Z",
  },
  {
    id: 103,
    title: "High-Frequency FinTech Settlement API",
    description: "Sub-millisecond payment routing engine built on Spring Boot 3 with automated PostgreSQL transaction ledgers.",
    category: "FinTech",
    price: 890,
    unit: "endpoint / mo",
    listedBy: INITIAL_USERS[2],
    imageUrl: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&auto=format&fit=crop&q=80",
    leadCount: 22,
    status: "ACTIVE",
    createdAt: "2026-07-21T09:15:00Z",
  },
  {
    id: 104,
    title: "Global Supply Chain IoT Tracker",
    description: "Real-time telemetry and cargo condition monitoring with direct lead discovery for logistics providers.",
    category: "Logistics",
    price: 520,
    unit: "fleet / mo",
    listedBy: INITIAL_USERS[0],
    imageUrl: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=600&auto=format&fit=crop&q=80",
    leadCount: 11,
    status: "ACTIVE",
    createdAt: "2026-07-15T16:00:00Z",
  },
];

export default function ProductCatalogLandingPage() {
  const [products, setProducts] = useState<CatalogProduct[]>(INITIAL_PRODUCTS);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  
  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<CatalogProduct | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isListProductModalOpen, setIsListProductModalOpen] = useState(false);
  const [isComputing, setIsComputing] = useState(false);
  const [discoveredLeads, setDiscoveredLeads] = useState<DiscoveredLead[]>([]);

  // List product form state
  const [newProductForm, setNewProductForm] = useState({
    title: "",
    description: "",
    category: "AI & Compute",
    price: 499,
    unit: "month",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
  });

  // Filtered Catalog
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.listedBy.company.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === "ALL" || p.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  // Categories list
  const categories = ["ALL", "AI & Compute", "Healthcare IT", "FinTech", "Logistics"];

  // Handle Compute Agent Lead Finder Trigger
  const handleTriggerComputeAgent = (product: CatalogProduct) => {
    setSelectedProduct(product);
    setIsComputing(true);
    setIsLeadModalOpen(true);

    // Simulate Python FastAPI + Pandas Compute Engine response
    setTimeout(() => {
      const mockDiscovered: DiscoveredLead[] = [
        {
          user_id: 201,
          name: "Marcus Vance",
          email: "m.vance@vanguardfin.com",
          company: "Vanguard Financial Services",
          role: "LEAD_PROSPECT",
          location: "New York, USA",
          match_score: 94.5,
          confidence_reason: `Targeting ${product.category} for Q3 digital transformation ($180k budget)`,
        },
        {
          user_id: 202,
          name: "Clara Oswald",
          email: "coswald@chronosmedia.co",
          company: "Chronos Media Group",
          role: "LEAD_PROSPECT",
          location: "London, UK",
          match_score: 89.2,
          confidence_reason: "High tech stack match with current supplier infrastructure",
        },
        {
          user_id: 203,
          name: "Siddharth Rao",
          email: "s.rao@apexventures.io",
          company: "Apex Tech Ventures",
          role: "LEAD_PROSPECT",
          location: "Singapore",
          match_score: 86.0,
          confidence_reason: `Active RFP published matching ${product.title}`,
        },
      ];
      setDiscoveredLeads(mockDiscovered);
      setIsComputing(false);
    }, 1200);
  };

  // Add Product to Catalog
  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const created: CatalogProduct = {
      id: Date.now(),
      title: newProductForm.title,
      description: newProductForm.description,
      category: newProductForm.category,
      price: Number(newProductForm.price),
      unit: newProductForm.unit,
      listedBy: INITIAL_USERS[0],
      imageUrl: newProductForm.imageUrl || "https://images.unsplash.com/photo-1518770660439-4636190af475?w=600&auto=format&fit=crop&q=80",
      leadCount: 0,
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };

    setProducts([created, ...products]);
    setIsListProductModalOpen(false);
    setNewProductForm({
      title: "",
      description: "",
      category: "AI & Compute",
      price: 499,
      unit: "month",
      imageUrl: "",
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">

      {/* --- TOP NAVIGATION BAR --- */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-cyan-500/20">
              ⚡
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">Project Antigravity</span>
              <span className="text-xs text-cyan-400 font-mono ml-2">Marketplace</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#catalog" className="hover:text-cyan-400 transition-colors duration-200">Product Catalog</a>
            <a href="#suppliers" className="hover:text-cyan-400 transition-colors duration-200">Verified Suppliers</a>
            <a href="#compute" className="hover:text-cyan-400 transition-colors duration-200">AI Lead Compute Engine</a>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/login"
              className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-800 transition-colors duration-200 cursor-pointer"
            >
              Sign In
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors duration-200 shadow-md shadow-cyan-500/20 cursor-pointer"
            >
              Get Started
            </Link>
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-16 pb-12 border-b border-slate-800/60 bg-gradient-to-b from-slate-900/50 via-slate-950 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-medium">
            <span>🤖 Powered by Python FastAPI Compute Engine & Spring Boot 3</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent max-w-4xl mx-auto leading-tight">
            Discover B2B Products & AI-Matched Leads in Real-Time
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-2xl mx-auto">
            A unified catalog connecting listed products with verified suppliers and active buyer lead prospects generated by autonomous compute agents.
          </p>

          {/* Hero Search Box */}
          <div className="max-w-3xl mx-auto pt-4">
            <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-xl shadow-2xl flex flex-col sm:flex-row gap-2 backdrop-blur-md">
              <div className="relative flex-1">
                <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search products, capabilities, or supplier companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-0 pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-0"
                />
              </div>

              <button
                onClick={() => {}}
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm rounded-lg transition-colors duration-200 cursor-pointer"
              >
                Search Catalog
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- PRODUCT CATALOG SECTION --- */}
      <section id="catalog" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        
        {/* Section Title & Category Filter Tabs */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">Product Catalog</h2>
            <p className="text-xs text-slate-400 mt-1">Browse products listed by verified users and suppliers</p>
          </div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-slate-900/60 border border-slate-800/80 rounded-xl overflow-hidden shadow-xl hover:border-slate-700/80 transition-all duration-200 flex flex-col group"
            >
              {/* Product Image Banner */}
              <div className="relative h-44 overflow-hidden bg-slate-950">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <span className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-950/80 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm">
                  {product.category}
                </span>
                <span className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800/40 text-xs font-mono font-semibold">
                  ⚡ {product.leadCount} Active Leads
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
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
                    <span className="text-xs text-slate-400">Starting Price</span>
                    <span className="text-lg font-bold text-white font-mono">
                      ${product.price}{" "}
                      <span className="text-xs text-slate-400 font-normal">/ {product.unit}</span>
                    </span>
                  </div>

                  {/* Supplier User Badge */}
                  <div className="flex items-center gap-2.5 pt-1">
                    <img
                      src={product.listedBy.avatarUrl}
                      alt={product.listedBy.name}
                      className="w-6 h-6 rounded-full object-cover border border-slate-700"
                    />
                    <div className="text-xs truncate">
                      <span className="text-slate-300 font-medium">{product.listedBy.company}</span>
                      <span className="text-amber-400 ml-1.5">⭐ {product.listedBy.rating}</span>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <button
                    onClick={() => handleTriggerComputeAgent(product)}
                    className="w-full py-2 px-3 rounded-lg bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-cyan-400 font-semibold text-xs transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <span>🤖 Run AI Lead Finder Agent</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- VERIFIED SUPPLIERS DIRECTORY --- */}
      <section id="suppliers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-800/60 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Verified Users & Suppliers</h2>
          <p className="text-xs text-slate-400 mt-1">Platform members listing products and purchasing lead prospects</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {INITIAL_USERS.map((user) => (
            <div key={user.id} className="bg-slate-900/40 border border-slate-800/80 rounded-xl p-4 flex items-center gap-4">
              <img src={user.avatarUrl} alt={user.name} className="w-12 h-12 rounded-full object-cover border border-slate-700" />
              <div>
                <h4 className="font-bold text-sm text-white">{user.name}</h4>
                <p className="text-xs text-cyan-400">{user.company}</p>
                <p className="text-xs text-slate-500 mt-0.5">{user.location} • ⭐ {user.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- COMPUTE AGENT DISCOVERED LEADS MODAL --- */}
      {isLeadModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase">Python FastAPI Compute Agent</span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  AI Matched Leads for: {selectedProduct.title}
                </h3>
              </div>
              <button onClick={() => setIsLeadModalOpen(false)} className="text-slate-400 hover:text-slate-200 text-sm cursor-pointer">
                ✕
              </button>
            </div>

            {isComputing ? (
              <div className="py-12 text-center space-y-3">
                <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
                <p className="text-sm text-slate-300 font-mono">Running Pandas Lead Matching Algorithm on Compute Node...</p>
              </div>
            ) : (
              <div className="space-y-3">
                <p className="text-xs text-slate-400">
                  Found <strong className="text-cyan-400">{discoveredLeads.length} high-confidence buyer lead prospects</strong> sharing our unified User identity structure.
                </p>

                <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                  {discoveredLeads.map((lead) => (
                    <div key={lead.user_id} className="bg-slate-950 border border-slate-800 p-4 rounded-lg flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-100">{lead.name}</h4>
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {lead.match_score}% Match
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{lead.company} • {lead.location}</p>
                        <p className="text-xs text-slate-500 italic mt-1">{lead.confidence_reason}</p>
                      </div>

                      <button
                        onClick={() => alert(`Lead ${lead.name} imported to Lead Tracking Dashboard!`)}
                        className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded transition-colors duration-200 whitespace-nowrap cursor-pointer"
                      >
                        Import Lead
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => setIsLeadModalOpen(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 text-sm rounded hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
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
          <div className="bg-slate-900 border border-slate-800 rounded-xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">List Your Product in Catalog</h3>
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50"
                  placeholder="e.g. Distributed Compute Nodes"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Category</label>
                  <select
                    value={newProductForm.category}
                    onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50 cursor-pointer"
                  >
                    <option value="AI & Compute">AI & Compute</option>
                    <option value="Healthcare IT">Healthcare IT</option>
                    <option value="FinTech">FinTech</option>
                    <option value="Logistics">Logistics</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Price ($)</label>
                  <input
                    type="number"
                    value={newProductForm.price}
                    onChange={(e) => setNewProductForm({ ...newProductForm, price: Number(e.target.value) })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50"
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
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg p-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50"
                  placeholder="Describe your product capabilities and lead discovery specifications..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsListProductModalOpen(false)}
                  className="px-4 py-2 rounded-lg bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors duration-200 shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  Publish to Catalog
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
