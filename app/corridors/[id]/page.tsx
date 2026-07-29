"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getSharedLeadsFromDb, TradeLeadProspect } from "../../lib/api";

const CORRIDOR_MAP: Record<string, any> = {
  de: {
    id: "de",
    name: "India 🇮🇳 ➔ Germany 🇩🇪",
    origin: "India 🇮🇳",
    destination: "Germany 🇩🇪",
    originPort: "Nhava Sheva (JNPT), Mumbai / Mundra Port",
    destPort: "Port of Hamburg / Port of Bremerhaven",
    transitDays: "21 Days Direct Sea Freight",
    tariffAdvantage: "EU GSP Preferential Tariff (2.8% Average)",
    keyCommodities: ["Organic Ashwagandha Extract", "CNC Hydraulic Machinery", "Dehydrated Garlic Flakes", "Finished Leather Boots"],
    shippingLines: ["Maersk Line", "Hapag-Lloyd", "MSC Mediterranean Shipping Company"],
    customsNotes: "Requires EU Phytosanitary Certificate, CE Markings for machinery, and EUR.1 Movement Certificate for preferential duty.",
  },
  jp: {
    id: "jp",
    name: "India 🇮🇳 ➔ Japan 🇯🇵",
    origin: "India 🇮🇳",
    destination: "Japan 🇯🇵",
    originPort: "Chennai Port / Visakhapatnam",
    destPort: "Port of Yokohama / Port of Tokyo",
    transitDays: "16 Days Express Maritime Corridor",
    tariffAdvantage: "India-Japan CEPA Agreement (1.5% Preferential)",
    keyCommodities: ["Bihar Organic Foxnuts (Makhana)", "Darjeeling FTGFOP Tea", "Vannamei White Shrimp", "Nicotine Pouches"],
    shippingLines: ["ONE Line", "NYK Line", "Mitsui O.S.K. Lines"],
    customsNotes: "MAFF Quarantine inspection required for fresh produce & food items. Certificate of Origin under IJCEPA for zero/reduced tariff.",
  },
  se: {
    id: "se",
    name: "India 🇮🇳 ➔ Sweden 🇸🇪",
    origin: "India 🇮🇳",
    destination: "Sweden 🇸🇪",
    originPort: "Nhava Sheva (JNPT), Mumbai",
    destPort: "Port of Gothenburg / Stockholm",
    transitDays: "24 Days EU Feeder Corridor",
    tariffAdvantage: "EU Harmonized Tariff Clearance (2.5% MFN)",
    keyCommodities: ["White Nicotine Pouches & Snus", "Electric Scooters & E-Bikes", "Organic Spices", "Textiles & Garments"],
    shippingLines: ["CMA CGM", "Maersk Line", "Wallenius Wilhelmsen"],
    customsNotes: "Requires TPD2 Compliance for Nicotine products and EU Battery Regulation declarations for EV two-wheelers.",
  },
  om: {
    id: "om",
    name: "India 🇮🇳 ➔ Oman 🇴🇲",
    origin: "India 🇮🇳",
    destination: "Oman 🇴🇲",
    originPort: "Mundra Port, Kutch / Nhava Sheva",
    destPort: "Port of Salalah / Port of Sohar",
    transitDays: "4 Days Fast-Track GCC Maritime Route",
    tariffAdvantage: "GCC Comprehensive FTA (0.0% Zero Duty Corridor)",
    keyCommodities: ["Nashik Red Onions", "APEDA Halal Meat", "Basmati Rice", "Building Materials"],
    shippingLines: ["Asyad Line", "MNC Shipping", "Emirates Shipping Line"],
    customsNotes: "APEDA Halal Certificate required for all meat consignments. GSO Customs Declaration for 0% GCC intra-trade tariff.",
  },
};

export default function CorridorDetailPage() {
  const params = useParams();
  const rawId = (params?.id as string) || "de";
  const corridorKey = rawId.toLowerCase();

  const corridor = CORRIDOR_MAP[corridorKey] || CORRIDOR_MAP["de"];
  const [leads, setLeads] = useState<TradeLeadProspect[]>([]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const allLeads = getSharedLeadsFromDb([]);
      const matched = allLeads.filter(
        (l) => l.destination_country?.toLowerCase().includes(corridor.destination.split(" ")[0].toLowerCase())
      );
      setLeads(matched.length > 0 ? matched : allLeads.slice(0, 4));
    }
  }, [corridor]);

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
              <span className="font-extrabold text-lg tracking-tight text-white">Sino Magan Undus</span>
              <span className="text-xs text-cyan-400 font-mono ml-2">Global Trade Engine</span>
            </div>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <Link href="/commodities" className="hover:text-cyan-400">Commodity Datalog</Link>
            <Link href="/corridors" className="text-cyan-400 font-bold">Trade Corridors</Link>
            <Link href="/exporters" className="hover:text-cyan-400">Indian Exporters</Link>
          </div>
        </div>
      </header>

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/corridors" className="hover:text-cyan-400">Trade Corridors</Link>
          <span>/</span>
          <span className="text-cyan-400 font-bold">{corridor.name}</span>
        </div>
      </div>

      {/* HERO SECTION */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <span className="px-3 py-1 bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 rounded-full font-mono text-xs font-bold">
                Bilateral Trade Analytics Corridor
              </span>
              <h1 className="text-3xl font-extrabold text-white mt-2">{corridor.name}</h1>
            </div>
            <Link
              href="/admin"
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs font-mono rounded-xl shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 shrink-0 text-center"
            >
              ⚡ Launch Scraper for Corridor
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 font-mono text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px]">TRANSIT DURATION</span>
              <span className="text-emerald-400 font-bold text-sm block">{corridor.transitDays}</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px]">CUSTOMS DUTY ADVANTAGE</span>
              <span className="text-cyan-400 font-bold text-sm block">{corridor.tariffAdvantage}</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px]">MARITIME ROUTE</span>
              <span className="text-slate-200 font-bold text-xs block truncate">{corridor.originPort} ➔ {corridor.destPort}</span>
            </div>
          </div>

          <div className="p-4 bg-slate-950/80 border border-slate-800/80 rounded-2xl space-y-2 text-xs font-mono">
            <span className="text-cyan-400 font-bold">REGULATORY & CUSTOMS REQUIREMENTS:</span>
            <p className="text-slate-300 leading-relaxed font-sans text-xs">{corridor.customsNotes}</p>
          </div>
        </div>

        {/* ACTIVE BUYER PROSPECTS IN THIS CORRIDOR */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-white">Active Buyer Prospects in {corridor.destination}</h3>
            <span className="text-xs font-mono text-cyan-400">{leads.length} Buyers Found</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {leads.map((lead, idx) => (
              <div key={idx} className="bg-slate-900/40 border border-slate-800/80 p-5 rounded-2xl space-y-3 font-mono text-xs">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-sm font-sans">{lead.name || "Buyer Representative"}</h4>
                  <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 rounded">
                    {lead.match_score || 96}% Match
                  </span>
                </div>
                <p className="text-cyan-400 font-medium">{lead.company}</p>
                <p className="text-slate-400">Port Hub: {lead.port_hub || corridor.destPort}</p>
                <p className="text-slate-500 italic">{lead.confidence_reason}</p>
                <a
                  href={`mailto:${lead.email}?subject=Trade%20Inquiry%20from%20Indian%20Exporter`}
                  className="w-full text-center py-2 bg-slate-950 hover:bg-cyan-950 border border-slate-800 hover:border-cyan-500/40 text-cyan-400 rounded-lg block font-bold transition-all duration-200"
                >
                  ✉️ Contact Buyer
                </a>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
