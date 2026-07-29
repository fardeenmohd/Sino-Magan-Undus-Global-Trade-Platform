"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { getSharedProductsFromDb, TradeProduct } from "../lib/api";

const INITIAL_TRADE_PRODUCTS = [
  {
    id: 299,
    title: "Organic Indian KSM-66 Ashwagandha Root Extract & Powder (HS 1211)",
    description: "HPLC standardized 5% Withanolides full-spectrum Ashwagandha root extract (Withania somnifera). USDA Organic, cGMP & ISO 22000 certified for US & EU nutraceutical brand manufacturing.",
    category: "Ayurvedic & Herbal Extracts",
    hsCode: "HS-1211",
    originCountry: "India 🇮🇳",
    destinationCountry: "Germany",
    destinationFlag: "🇩🇪",
    portHub: "Port of Hamburg",
    tariffRatePct: 2.8,
    price: 18.50,
    unit: "kg",
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80",
    leadCount: 44,
    status: "ACTIVE",
  },
  {
    id: 300,
    title: "Tobacco-Free White Nicotine Pouches & Swedish Style Snus (HS 2404)",
    description: "Premium pharma-grade oral nicotine pouches (6mg, 12mg, 20mg mint & fruit flavors). TPD2 compliant, foil sealed in 20-pouch cans for EU & US distribution.",
    category: "Tobacco & Nicotine Pouches",
    hsCode: "HS-2404",
    originCountry: "India 🇮🇳",
    destinationCountry: "Sweden",
    destinationFlag: "🇸🇪",
    portHub: "Port of Gothenburg / Gdańsk",
    tariffRatePct: 2.5,
    price: 2.45,
    unit: "can",
    imageUrl: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&auto=format&fit=crop&q=80",
    leadCount: 36,
    status: "ACTIVE",
  },
  {
    id: 301,
    title: "Bihar Premium Organic Foxnuts / Makhana (HS 1904)",
    description: "Hand-popped grade-A gorgon nuts (makhana), 5-6 sieve size, vacuum packed in 10kg cartons for Japanese & European superfood distributors.",
    category: "Makhana & Superfoods",
    hsCode: "HS-1904",
    originCountry: "India 🇮🇳",
    destinationCountry: "Japan",
    destinationFlag: "🇯🇵",
    portHub: "Port of Yokohama",
    tariffRatePct: 3.5,
    price: 14.50,
    unit: "kg",
    imageUrl: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80",
    leadCount: 28,
    status: "ACTIVE",
  },
  {
    id: 302,
    title: "Nashik Red Onions & Dehydrated Flakes (HS 0703)",
    description: "45mm+ export grade red Nashik onions with phytosanitary clearance, plus dehydrated onion powder for GCC food processing.",
    category: "Fresh Produce",
    hsCode: "HS-0703",
    originCountry: "India 🇮🇳",
    destinationCountry: "Oman",
    destinationFlag: "🇴🇲",
    portHub: "Port of Salalah",
    tariffRatePct: 5.0,
    price: 380,
    unit: "metric ton",
    imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
    leadCount: 34,
    status: "ACTIVE",
  },
  {
    id: 303,
    title: "Fresh Table Eggs & Whole Egg Powder (HS 0407)",
    description: "Phytosanitary certified fresh white table eggs (30 dozen crates) & spray-dried egg powder for European bakeries.",
    category: "Poultry & Eggs",
    hsCode: "HS-0407",
    originCountry: "India 🇮🇳",
    destinationCountry: "Netherlands",
    destinationFlag: "🇳🇱",
    portHub: "Port of Rotterdam",
    tariffRatePct: 2.8,
    price: 24,
    unit: "crate (360 eggs)",
    imageUrl: "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?w=600&auto=format&fit=crop&q=80",
    leadCount: 19,
    status: "ACTIVE",
  },
  {
    id: 304,
    title: "Cold Storage Table & Processing Potatoes (HS 0701)",
    description: "Kufri Pukhraj cold storage potatoes with high dry matter content, suitable for French fries & processing plants.",
    category: "Fresh Produce",
    hsCode: "HS-0701",
    originCountry: "India 🇮🇳",
    destinationCountry: "Poland",
    destinationFlag: "🇵🇱",
    portHub: "Port of Gdańsk",
    tariffRatePct: 4.0,
    price: 290,
    unit: "metric ton",
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
    leadCount: 22,
    status: "ACTIVE",
  },
  {
    id: 305,
    title: "APEDA Halal Certified Frozen Buffalo Meat (HS 0202)",
    description: "APEDA approved boneless frozen buffalo meat (Bobby veal & forequarter cuts) in 20kg master cartons.",
    category: "Meat Exports",
    hsCode: "HS-0202",
    originCountry: "India 🇮🇳",
    destinationCountry: "China",
    destinationFlag: "🇨🇳",
    portHub: "Port of Shanghai",
    tariffRatePct: 6.5,
    price: 3450,
    unit: "metric ton",
    imageUrl: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&auto=format&fit=crop&q=80",
    leadCount: 41,
    status: "ACTIVE",
  },
  {
    id: 306,
    title: "Industrial CNC Lathe & Hydraulic Machinery (HS 8479)",
    description: "Heavy duty CNC machinery, agricultural water pumps, and industrial gearboxes manufactured in Rajkot.",
    category: "Machinery & Engineering",
    hsCode: "HS-8479",
    originCountry: "India 🇮🇳",
    destinationCountry: "Australia",
    destinationFlag: "🇦🇺",
    portHub: "Port of Sydney",
    tariffRatePct: 4.0,
    price: 12500,
    unit: "machine unit",
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
    leadCount: 17,
    status: "ACTIVE",
  },
];

export default function CommodityDatalogPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("ALL");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const shared = getSharedProductsFromDb([]);
      setProducts(shared);
    }
  }, []);

  const categories = useMemo(() => {
    const set = new Set<string>();
    products.forEach((p) => {
      if (p.category && p.category.trim() !== "") {
        set.add(p.category.trim());
      }
    });
    return ["ALL", ...Array.from(set)];
  }, [products]);

  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.hsCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "ALL" || p.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [products, searchQuery, selectedCategory]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">
      {/* --- TOP NAVIGATION BAR --- */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-cyan-500/20">
              🌏
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">Sino Magan Indus</span>
              <span className="text-xs text-cyan-400 font-mono ml-2">Global Trade Engine</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <Link href="/about" className="hover:text-cyan-400 transition-colors duration-200">About Us</Link>
            <Link href="/commodities" className="text-cyan-400 font-bold">Commodity Datalog</Link>
            <Link href="/corridors" className="hover:text-cyan-400 transition-colors duration-200">Trade Corridors</Link>
            <Link href="/exporters" className="hover:text-cyan-400 transition-colors duration-200">Indian Exporters</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 font-mono text-xs border border-cyan-500/30 transition-colors duration-200"
            >
              ⚡ Control Panel
            </Link>
          </div>
        </div>
      </header>

      {/* --- HEADER BANNER --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 space-y-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold uppercase">
                Commodity Master Datalog
              </span>
              <span className="text-xs font-mono text-slate-400">{filteredProducts.length} Active Commodities</span>
            </div>
            <h1 className="text-3xl font-extrabold text-white mt-2">
              Indian Export Commodity Specifications & Tariff Index
            </h1>
            <p className="text-sm text-slate-400 max-w-3xl mt-1">
              Explore authentic HS codes, export promotion councils (APEDA, Spices Board, EEPC, PharmExcil), port hubs, and live buyer prospects for Indian export products.
            </p>
          </div>
        </div>

        {/* SEARCH & FLEXBOX CATEGORY SHOWCASE */}
        <div className="space-y-4 pt-2">
          <div>
            <input
              type="text"
              placeholder="Search by commodity name, HS code (e.g. HS-1211, Ashwagandha, Tomatoes)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono shadow-inner"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-xs font-mono text-slate-400 font-semibold uppercase tracking-wider">
                Filter by Sector Category:
              </span>
              {selectedCategory !== "ALL" && (
                <button
                  type="button"
                  onClick={() => setSelectedCategory("ALL")}
                  className="text-xs font-mono text-cyan-400 hover:underline cursor-pointer"
                >
                  Clear Filter (Show All)
                </button>
              )}
            </div>

            <div className="flex flex-wrap gap-2">
              {categories
                .filter((cat) => Boolean(cat && cat.trim().length > 0))
                .map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`px-3.5 py-2 rounded-xl text-xs font-mono transition-all duration-200 cursor-pointer flex items-center gap-1.5 ${
                      selectedCategory === cat
                        ? "bg-cyan-500 text-slate-950 font-extrabold shadow-lg shadow-cyan-500/25 border border-cyan-400"
                        : "bg-slate-900/80 text-slate-300 border border-slate-800 hover:border-slate-700 hover:text-white"
                    }`}
                  >
                    {cat === "ALL" ? (
                      <>
                        <span>🌐</span>
                        <span>All Categories ({products.length})</span>
                      </>
                    ) : (
                      <>
                        <span>📦</span>
                        <span>{cat}</span>
                      </>
                    )}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- COMMODITY CARDS GRID --- */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredProducts.length === 0 ? (
          <div className="p-10 bg-slate-900/40 border border-slate-800/80 rounded-3xl text-center space-y-4 max-w-2xl mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-3xl mx-auto">
              📊
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">No Commodity Specifications Found in Database</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                There are currently no products or commodities matching your query stored in the database. Use the AI Scraper Engine or Dashboard to discover and add new commodities!
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
              <Link
                href="/admin"
                className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono rounded-xl shadow-lg transition-all cursor-pointer"
              >
                ⚡ Launch AI Discovery Engine
              </Link>
              <Link
                href="/dashboard"
                className="px-4 py-2.5 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-cyan-400 font-bold text-xs font-mono rounded-xl transition-all cursor-pointer"
              >
                ➕ Add Commodity in Dashboard
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((p) => (
            <div
              key={p.id}
              className="bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl overflow-hidden flex flex-col justify-between transition-all duration-300 group"
            >
              <div>
                {/* Image Header */}
                <div className="relative h-44 w-full overflow-hidden bg-slate-950">
                  <img
                    src={p.imageUrl}
                    alt={p.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                  <span className="absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-slate-950/80 backdrop-blur-md text-cyan-400 border border-cyan-500/30">
                    {p.hsCode}
                  </span>

                  <span className="absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-mono font-bold bg-emerald-950/80 backdrop-blur-md text-emerald-400 border border-emerald-500/30">
                    {p.leadCount || 12}+ Buyer Prospects
                  </span>
                </div>

                {/* Content */}
                <div className="p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">{p.category}</span>
                    <span className="text-xs text-slate-400 font-mono">Tariff: {p.tariffRatePct}%</span>
                  </div>

                  <h3 className="font-bold text-base text-white group-hover:text-cyan-400 transition-colors duration-200 line-clamp-2">
                    {p.title}
                  </h3>

                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {p.description}
                  </p>

                  <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/60 text-xs font-mono">
                    <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                      <span className="text-slate-500 block text-[10px]">INDICATIVE PRICE</span>
                      <span className="text-cyan-300 font-semibold">${p.price} / {p.unit}</span>
                    </div>
                    <div className="bg-slate-950/60 p-2 rounded-lg border border-slate-800/60">
                      <span className="text-slate-500 block text-[10px]">PRIMARY PORT HUB</span>
                      <span className="text-slate-300 font-semibold truncate block">{p.portHub || "Nhava Sheva (JNPT)"}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-5 pt-0">
                <Link
                  href={`/commodities/${p.id}`}
                  className="w-full text-center py-2.5 bg-slate-950 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 rounded-xl text-xs font-mono font-bold transition-all duration-200 block"
                >
                  View Commodity Specifications ➔
                </Link>
              </div>
            </div>
          ))}
          </div>
        )}
      </section>
    </div>
  );
}
