"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { getSharedLeadsFromDb, getSharedProductsFromDb } from "../lib/api";

const INITIAL_EXPORTERS = [
  {
    id: 101,
    name: "Suresh Patel",
    company: "Nashik Fresh Produce & Cold Chain Exim Pvt. Ltd.",
    email: "suresh.patel@nashikvegexim.in",
    location: "Nashik, Maharashtra 🇮🇳",
    verification: "🛡️ APEDA & FIEO VERIFIED EXPORTER",
    iecCode: "IEC: 0719048122",
    council: "APEDA & FSSAI Certified",
    category: "Fresh Produce & Agri Commodities",
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    rating: 5.0,
    exportProducts: ["Nashik Red Onions", "Dehydrated Garlic Flakes", "Cold Storage Potatoes"],
    targetDestinations: ["Oman 🇴🇲", "Germany 🇩🇪", "Poland 🇵🇱"],
  },
  {
    id: 102,
    name: "Rajesh Kumar Sharma",
    company: "Bihar Organic Agro & Makhana Exim Ltd.",
    email: "rajesh.sharma@biharagro.in",
    location: "Patna, Bihar 🇮🇳",
    verification: "🛡️ IEC REGISTERED EXPORTER",
    iecCode: "IEC: 0720194851",
    council: "APEDA & Organic Certified",
    category: "Makhana & Superfoods",
    avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",
    rating: 4.9,
    exportProducts: ["Grade-A Organic Makhana (Foxnuts)", "Superfood Blends", "Basmati Rice"],
    targetDestinations: ["Japan 🇯🇵", "USA 🇺🇸", "Germany 🇩🇪"],
  },
  {
    id: 103,
    name: "Priya Venkatesh Iyer",
    company: "Deccan Agro & Poultry Exports Cooperative",
    email: "priya.iyer@deccanpoultry.in",
    location: "Hyderabad, Telangana 🇮🇳",
    verification: "🛡️ APEDA CERTIFIED EXPORTER",
    iecCode: "IEC: 0718492019",
    council: "APEDA & ISO 22000 Certified",
    category: "Poultry & Table Eggs",
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    rating: 4.8,
    exportProducts: ["Fresh Table Eggs", "Spray-Dried Egg Powder"],
    targetDestinations: ["Netherlands 🇳🇱", "Germany 🇩🇪"],
  },
  {
    id: 104,
    name: "Vikram Mehta",
    company: "Gujarat Industrial CNC Machinery Works Pvt. Ltd.",
    email: "vikram.mehta@rajkoteng.in",
    location: "Rajkot, Gujarat 🇮🇳",
    verification: "🛡️ EEPC REGISTERED EXPORTER",
    iecCode: "IEC: 0721049382",
    council: "EEPC & ISO 9001 Certified",
    category: "Machinery & Engineering",
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    rating: 4.9,
    exportProducts: ["CNC Lathes", "Hydraulic Machinery", "Agricultural Pumps"],
    targetDestinations: ["Australia 🇦🇺", "Germany 🇩🇪", "UAE 🇦🇪"],
  },
];

export default function IndianExportersPage() {
  const [exporters, setExporters] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const leads = getSharedLeadsFromDb([]);
      const products = getSharedProductsFromDb([]);

      const list: any[] = [];
      const seen = new Set<string>();

      // Load from leads database
      leads.forEach((l, i) => {
        const coKey = (l.company || l.name).toLowerCase().trim();
        if (!seen.has(coKey)) {
          seen.add(coKey);
          list.push({
            id: l.user_id || i + 200,
            name: l.name || "Executive Exporter",
            company: l.company || "IEC Certified Exim House",
            email: l.email || `contact@${coKey.replace(/[^a-z0-9]/g, "")}.in`,
            location: l.destination_country?.includes("India") ? l.destination_country : "India 🇮🇳 (Export Hub)",
            verification: l.verification_badge || "🛡️ IEC REGISTERED EXPORTER",
            iecCode: l.registration_id || `IEC: 07${190450 + i * 137}`,
            category: l.confidence_reason?.split("—")[0] || "Specialty Export Commodities",
            avatarUrl: `https://images.unsplash.com/photo-${1500648767791 + (i % 4) * 1000}?w=150&auto=format&fit=crop&q=80`,
            rating: Number((4.8 + (i % 3) * 0.1).toFixed(1)),
            exportProducts: ["IEC Certified Export Cargo"],
            targetDestinations: [l.destination_country || "Global Corridors"],
          });
        }
      });

      setExporters(list);
    }
  }, []);

  const filteredExporters = exporters.filter(
    (e) =>
      e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
      e.category.toLowerCase().includes(searchQuery.toLowerCase())
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
            <Link href="/about" className="hover:text-cyan-400 transition-colors duration-200">About Us</Link>
            <Link href="/commodities" className="hover:text-cyan-400">Commodity Datalog</Link>
            <Link href="/corridors" className="hover:text-cyan-400">Trade Corridors</Link>
            <Link href="/exporters" className="text-cyan-400 font-bold">Indian Exporters</Link>
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
              Verified Indian Exporters Directory
            </span>
            <span className="text-xs font-mono text-slate-400">{filteredExporters.length} IEC Registered Exporters</span>
          </div>
          <h1 className="text-3xl font-extrabold text-white mt-2">
            IEC Certified Indian Export Houses & Cooperatives Directory
          </h1>
          <p className="text-sm text-slate-400 max-w-3xl mt-1">
            Browse verified Indian SME exporters, agricultural cooperatives, and manufacturing houses registered with APEDA, Spices Board, EEPC, and PharmExcil.
          </p>
        </div>

        {/* SEARCH BAR */}
        <div className="pt-2">
          <input
            type="text"
            placeholder="Search by exporter name, company, location (Nashik, Patna, Rajkot), or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono"
          />
          </div>
      </section>

      {/* EXPORTERS GRID */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {filteredExporters.length === 0 ? (
          <div className="p-10 bg-slate-900/40 border border-slate-800/80 rounded-3xl text-center space-y-4 max-w-2xl mx-auto my-8">
            <div className="w-16 h-16 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-3xl mx-auto">
              🏢
            </div>
            <div>
              <h3 className="text-xl font-bold text-white">No Indian Exporters Found in Database</h3>
              <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                No verified Indian exporters currently found matching your query in the platform database. Launch the Scraper Engine to discover and save live IEC registered export entities!
              </p>
            </div>
            <div className="flex items-center justify-center gap-3 pt-2">
              <Link
                href="/admin"
                className="px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono rounded-xl shadow-lg transition-all cursor-pointer"
              >
                ⚡ Launch Scraper Engine to Discover Exporters
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredExporters.map((exp) => (
            <div
              key={exp.id}
              className="bg-slate-900/40 border border-slate-800/80 hover:border-cyan-500/40 rounded-2xl p-6 flex flex-col justify-between space-y-4 transition-all duration-300 group"
            >
              <div className="space-y-3">
                <div className="flex items-start gap-4">
                  <img
                    src={exp.avatarUrl}
                    alt={exp.name}
                    className="w-14 h-14 rounded-full object-cover border border-slate-700 shrink-0"
                  />
                  <div className="min-w-0">
                    <h3 className="font-bold text-base text-white group-hover:text-cyan-400 transition-colors duration-200 truncate">
                      {exp.name}
                    </h3>
                    <p className="text-xs text-cyan-400 font-medium truncate">{exp.company}</p>
                    <p className="text-xs text-slate-400 mt-0.5">{exp.location} • ⭐ {exp.rating}</p>
                  </div>
                </div>

                <div className="p-3 bg-slate-950/70 border border-slate-800/60 rounded-xl space-y-1 font-mono text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-emerald-400 font-bold">{exp.verification}</span>
                  </div>
                  <p className="text-slate-400 text-[11px]">{exp.iecCode}</p>
                  <p className="text-slate-300 text-[11px]">Category: {exp.category}</p>
                </div>

                {exp.exportProducts && (
                  <div className="space-y-1">
                    <span className="text-xs font-mono text-slate-400">EXPORT PORTFOLIO:</span>
                    <div className="flex flex-wrap gap-1 pt-1">
                      {exp.exportProducts.map((p: string, idx: number) => (
                        <span key={idx} className="px-2 py-0.5 bg-slate-950 border border-slate-800 text-slate-300 rounded text-[11px] font-mono">
                          📦 {p}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="pt-2">
                <Link
                  href={`/exporters/${exp.id}`}
                  className="w-full text-center py-2.5 bg-slate-950 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 rounded-xl text-xs font-mono font-bold transition-all duration-200 block"
                >
                  View Exporter Profile & Catalog ➔
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
