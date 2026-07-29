"use client";

import React, { useState } from "react";
import Link from "next/link";

const TRADE_CORRIDORS = [
  {
    id: "de",
    name: "India 🇮🇳 ➔ Germany 🇩🇪",
    origin: "India 🇮🇳",
    destination: "Germany 🇩🇪",
    originPort: "Nhava Sheva (JNPT), Mumbai / Mundra Port",
    destPort: "Port of Hamburg / Port of Bremerhaven",
    transitDays: "21 Days Direct Sea Freight",
    tariffAdvantage: "EU GSP Preferential Tariff (2.8% Average)",
    keyCommodities: ["Organic Ashwagandha Extract", "CNC Hydraulic Machinery", "Dehydrated Garlic Flakes", "Finished Leather Boots"],
    activeLeadsCount: 54,
    shippingLines: ["Maersk Line", "Hapag-Lloyd", "MSC Mediterranean"],
  },
  {
    id: "jp",
    name: "India 🇮🇳 ➔ Japan 🇯🇵",
    origin: "India 🇮🇳",
    destination: "Japan 🇯🇵",
    originPort: "Chennai Port / Visakhapatnam",
    destPort: "Port of Yokohama / Port of Tokyo",
    transitDays: "16 Days Express Maritime Corridor",
    tariffAdvantage: "India-Japan CEPA Agreement (1.5% Preferential)",
    keyCommodities: ["Bihar Organic Foxnuts (Makhana)", "Darjeeling FTGFOP Tea", "Vannamei White Shrimp", "Nicotine Pouches"],
    activeLeadsCount: 42,
    shippingLines: ["ONE Line", "NYK Line", "Mitsui O.S.K."],
  },
  {
    id: "se",
    name: "India 🇮🇳 ➔ Sweden 🇸🇪",
    origin: "India 🇮🇳",
    destination: "Sweden 🇸🇪",
    originPort: "Nhava Sheva (JNPT), Mumbai",
    destPort: "Port of Gothenburg / Stockholm",
    transitDays: "24 Days EU Feeder Corridor",
    tariffAdvantage: "EU Harmonized Tariff Clearance (2.5% MFN)",
    keyCommodities: ["White Nicotine Pouches & Snus", "Electric Scooters & E-Bikes", "Organic Spices", "Textiles & Garments"],
    activeLeadsCount: 38,
    shippingLines: ["CMA CGM", "Maersk", "Wallenius Wilhelmsen"],
  },
  {
    id: "nl",
    name: "India 🇮🇳 ➔ Netherlands 🇳🇱",
    origin: "India 🇮🇳",
    destination: "Netherlands 🇳🇱",
    originPort: "Nhava Sheva (JNPT), Mumbai",
    destPort: "Port of Rotterdam (Gateway to EU)",
    transitDays: "19 Days Direct Gateway Shipping",
    tariffAdvantage: "Rotterdam Bonded Hub (0% Transit Customs)",
    keyCommodities: ["Fresh Table Eggs & Egg Powder", "Cold Storage Potatoes", "Hand-Carved Furniture", "Agri-Chemicals"],
    activeLeadsCount: 47,
    shippingLines: ["MSC", "Hapag-Lloyd", "Ocean Network Express"],
  },
  {
    id: "om",
    name: "India 🇮🇳 ➔ Oman 🇴🇲",
    origin: "India 🇮🇳",
    destination: "Oman 🇴🇲",
    originPort: "Mundra Port, Kutch / Nhava Sheva",
    destPort: "Port of Salalah / Port of Sohar",
    transitDays: "4 Days Fast-Track GCC Maritime Route",
    tariffAdvantage: "GCC Comprehensive FTA (0.0% Zero Duty Corridor)",
    keyCommodities: ["Nashik Red Onions", "APEDA Halal Meat", "Basmati Rice", "Building Materials"],
    activeLeadsCount: 62,
    shippingLines: ["Asyad Line", "MNC Shipping", "Emirates Shipping"],
  },
  {
    id: "au",
    name: "India 🇮🇳 ➔ Australia 🇦🇺",
    origin: "India 🇮🇳",
    destination: "Australia 🇦🇺",
    originPort: "Chennai Sea Port / Visakhapatnam",
    destPort: "Port of Sydney / Port of Melbourne",
    transitDays: "18 Days Oceanic Corridor",
    tariffAdvantage: "Australia-India ECTA Agreement (0.0% Duty)",
    keyCommodities: ["CNC Lathes & Hydraulic Machinery", "Textiles & Cotton Garments", "Jewellery & Gems", "Spices"],
    activeLeadsCount: 31,
    shippingLines: ["ANL Container Line", "Maersk", "COSCO Shipping"],
  },
  {
    id: "us",
    name: "India 🇮🇳 ➔ United States 🇺🇸",
    origin: "India 🇮🇳",
    destination: "United States 🇺🇸",
    originPort: "Nhava Sheva (JNPT) / Mundra Port",
    destPort: "Port of Los Angeles / Port of Newark",
    transitDays: "26 Days Trans-Pacific Corridor",
    tariffAdvantage: "US Customs Section 321 & MFN Tariff Schedule",
    keyCommodities: ["KSM-66 Ashwagandha Extract", "Foxnuts & Superfoods", "IT Hardware & Electronics", "Home Furnishings"],
    activeLeadsCount: 59,
    shippingLines: ["Evergreen Line", "COSCO", "Yang Ming"],
  },
  {
    id: "cn",
    name: "India 🇮🇳 ➔ China 🇨🇳",
    origin: "India 🇮🇳",
    destination: "China 🇨🇳",
    originPort: "Visakhapatnam / Chennai Sea Port",
    destPort: "Port of Shanghai / Port of Ningbo",
    transitDays: "12 Days Intra-Asia Line",
    tariffAdvantage: "APTA Regional Trade Protocol",
    keyCommodities: ["APEDA Frozen Buffalo Meat", "Seafood & Shrimp", "Iron Ore & Minerals", "Chemical Intermediates"],
    activeLeadsCount: 45,
    shippingLines: ["SITC Container Lines", "Wan Hai", "COSCO"],
  },
];

export default function TradeCorridorsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredCorridors = TRADE_CORRIDORS.filter(
    (c) =>
      c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.originPort.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.destPort.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.keyCommodities.some((item) => item.toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">
      {/* TOP NAVIGATION BAR */}
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
            <Link href="/commodities" className="hover:text-cyan-400">Commodity Datalog</Link>
            <Link href="/corridors" className="text-cyan-400 font-bold">Trade Corridors</Link>
            <Link href="/exporters" className="hover:text-cyan-400">Indian Exporters</Link>
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

      {/* HEADER BANNER */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-6 space-y-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold uppercase">
              Bilateral Maritime Trade Corridors
            </span>
            <span className="text-xs font-mono text-slate-400">{filteredCorridors.length} Active Corridors</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-2">
            Global Trade Route Analytics & Customs Tariff Matrix
          </h1>
          <p className="text-sm text-slate-400 max-w-3xl mt-1">
            Detailed shipping routes, transit durations, port logistics hubs, and tariff duty preferential schedules connecting Indian exporters with global commercial buyers.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="pt-2">
          <input
            type="text"
            placeholder="Search trade corridors by country, port (Hamburg, Salalah, Rotterdam), or commodity (Ashwagandha, Onions)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono"
          />
        </div>
      </section>

      {/* CORRIDOR CARDS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCorridors.map((corridor) => (
            <div
              key={corridor.id}
              className="bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-6 flex flex-col justify-between space-y-5 transition-all duration-300 group"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-400 transition-colors duration-200">
                    {corridor.name}
                  </h3>
                  <span className="px-3 py-1 bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 rounded-full font-mono text-xs font-bold">
                    {corridor.activeLeadsCount} Active Buyer Leads
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs font-mono">
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">ORIGIN PORT HUB</span>
                    <span className="text-slate-200 font-semibold truncate block">{corridor.originPort}</span>
                  </div>
                  <div className="bg-slate-950 p-3 rounded-xl border border-slate-800">
                    <span className="text-slate-500 block text-[10px]">DESTINATION PORT HUB</span>
                    <span className="text-cyan-300 font-semibold truncate block">{corridor.destPort}</span>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/60 border border-slate-800/60 rounded-xl space-y-1 text-xs font-mono">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">TRANSIT TIME:</span>
                    <span className="text-emerald-400 font-bold">{corridor.transitDays}</span>
                  </div>
                  <div className="flex items-center justify-between pt-1 border-t border-slate-800/40">
                    <span className="text-slate-400">DUTY ADVANTAGE:</span>
                    <span className="text-cyan-400">{corridor.tariffAdvantage}</span>
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-xs font-mono text-slate-400">PRIMARY EXPORT COMMODITIES:</span>
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {corridor.keyCommodities.map((item, i) => (
                      <span key={i} className="px-2.5 py-1 bg-slate-950 border border-slate-800 text-slate-300 rounded-lg text-xs font-mono">
                        📦 {item}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link
                  href={`/corridors/${corridor.id}`}
                  className="w-full text-center py-2.5 bg-slate-950 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 rounded-xl text-xs font-mono font-bold transition-all duration-200 block"
                >
                  Explore Corridor Trade Analytics ➔
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
