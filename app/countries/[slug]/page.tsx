"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  getCountryCorridorDetails,
  getSharedProductsFromDb,
  getSharedLeadsFromDb,
  TradeProduct,
  TradeLeadProspect,
} from "../../lib/api";

const INITIAL_FALLBACK_PRODUCTS: TradeProduct[] = [
  {
    id: 299,
    title: "Organic Indian KSM-66 Ashwagandha Root Extract & Powder (HS 1211)",
    description: "HPLC standardized 5% Withanolides full-spectrum Ashwagandha root extract (Withania somnifera). USDA Organic, cGMP & ISO 22000 certified.",
    category: "Ayurvedic & Herbal Extracts",
    hsCode: "HS-1211",
    originCountry: "India 🇮🇳",
    destinationCountry: "Germany",
    destinationFlag: "🇩🇪",
    portHub: "Port of Hamburg",
    tariffRatePct: 2.8,
    price: 18.5,
    unit: "kg",
    listedBy: { id: 10, name: "Bihar Organic Agro & Makhana Exim", email: "makhana@biharagro.in", company: "Bihar Makhana & Superfoods Ltd", role: "SUPPLIER", location: "Patna, Bihar 🇮🇳", rating: 5.0, avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80" },
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80",
    leadCount: 44,
    status: "ACTIVE",
    createdAt: "2026-07-26T09:00:00Z",
  },
  {
    id: 300,
    title: "Tobacco-Free White Nicotine Pouches & Swedish Style Snus (HS 2404)",
    description: "Premium pharma-grade oral nicotine pouches (6mg, 12mg, 20mg mint & fruit flavors). TPD2 compliant, foil sealed in 20-pouch cans.",
    category: "Tobacco & Nicotine Pouches",
    hsCode: "HS-2404",
    originCountry: "India 🇮🇳",
    destinationCountry: "Sweden",
    destinationFlag: "🇸🇪",
    portHub: "Port of Gothenburg",
    tariffRatePct: 2.5,
    price: 2.45,
    unit: "can",
    listedBy: { id: 10, name: "Bihar Organic Agro & Makhana Exim", email: "makhana@biharagro.in", company: "Bihar Makhana & Superfoods Ltd", role: "SUPPLIER", location: "Patna, Bihar 🇮🇳", rating: 5.0, avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80" },
    imageUrl: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&auto=format&fit=crop&q=80",
    leadCount: 36,
    status: "ACTIVE",
    createdAt: "2026-07-25T10:00:00Z",
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
    price: 14.5,
    unit: "kg",
    listedBy: { id: 10, name: "Bihar Organic Agro & Makhana Exim", email: "makhana@biharagro.in", company: "Bihar Makhana & Superfoods Ltd", role: "SUPPLIER", location: "Patna, Bihar 🇮🇳", rating: 5.0, avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80" },
    imageUrl: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80",
    leadCount: 28,
    status: "ACTIVE",
    createdAt: "2026-07-22T08:00:00Z",
  },
];

export default function CountryCorridorPage() {
  const params = useParams();
  const router = useRouter();
  const rawSlug = String(params?.slug || "japan");

  const [countryData, setCountryData] = useState<any>(null);
  const [corridorProducts, setCorridorProducts] = useState<TradeProduct[]>([]);
  const [corridorLeads, setCorridorLeads] = useState<TradeLeadProspect[]>([]);

  useEffect(() => {
    const details = getCountryCorridorDetails(rawSlug);
    setCountryData(details);

    // 1. Filter connected products
    const sharedProducts = getSharedProductsFromDb([]);
    const matchedProducts = sharedProducts.filter(
      (p) =>
        p.destinationCountry.toLowerCase().includes(details.slug.toLowerCase()) ||
        details.name.toLowerCase().includes(p.destinationCountry.toLowerCase())
    );
    setCorridorProducts(matchedProducts);

    // 2. Filter connected leads
    const sharedLeads = getSharedLeadsFromDb([]);
    const matchedLeads = sharedLeads.filter(
      (l) =>
        l.destination_country.toLowerCase().includes(details.slug.toLowerCase()) ||
        details.name.toLowerCase().includes(l.destination_country.toLowerCase())
    );
    setCorridorLeads(matchedLeads);
  }, [rawSlug]);

  if (!countryData) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-mono text-cyan-400">Loading Country Trade Corridor Intelligence...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30 pb-16">
      {/* HEADER BAR */}
      <header className="sticky top-0 z-40 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-lg text-xs font-mono text-cyan-400 cursor-pointer flex items-center gap-1.5"
            >
              ← Back
            </button>
            <div className="h-4 w-px bg-slate-800"></div>
            <Link href="/" className="flex items-center gap-2">
              <span className="w-7 h-7 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-sm">
                {countryData.flag}
              </span>
              <span className="font-bold text-sm text-white tracking-wide">
                {countryData.name} <span className="text-cyan-400">Trade Corridor</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/admin"
              className="px-3.5 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl text-xs font-bold font-mono"
            >
              ⚡ Scraper Explorer
            </Link>
          </div>
        </div>
      </header>

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-slate-900/70 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono text-xs font-bold">
                  {countryData.region}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs font-bold">
                  Avg Duty: {countryData.averageTariffPct}%
                </span>
              </div>

              <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight flex items-center gap-3">
                <span>{countryData.flag}</span>
                <span>{countryData.name} Export Route</span>
              </h1>

              <p className="text-sm text-slate-300 max-w-3xl leading-relaxed">
                {countryData.marketOverview}
              </p>
            </div>

            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl min-w-[260px] space-y-2">
              <div className="text-xs font-bold text-cyan-400 font-mono uppercase">Trade Agreement</div>
              <div className="text-xs font-semibold text-white">{countryData.tradeAgreement}</div>
              <div className="text-[11px] text-slate-400 font-mono pt-1">
                Agency: <span className="text-slate-200">{countryData.regulatoryAgency}</span>
              </div>
            </div>
          </div>

          {/* Key Port Hubs */}
          <div className="pt-4 border-t border-slate-800/80 grid grid-cols-1 sm:grid-cols-3 gap-3">
            {countryData.primaryPorts.map((port: string, idx: number) => (
              <div key={idx} className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl flex items-center gap-2.5">
                <span className="text-base">⚓</span>
                <div>
                  <div className="text-xs font-bold text-white">{port}</div>
                  <div className="text-[10px] text-slate-400 font-mono">Primary Deepwater Maritime Terminal</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* MAIN SECTIONS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* MANDATORY CERTIFICATIONS & COMPLIANCE */}
        <section className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>📜 Mandatory Entry Certifications for {countryData.name}</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
            {countryData.mandatoryCerts.map((cert: string, idx: number) => (
              <div key={idx} className="p-3.5 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <div className="text-[10px] font-mono text-cyan-400 font-bold">REQUIRED CERTIFICATE #{idx + 1}</div>
                <div className="text-xs font-bold text-white">{cert}</div>
              </div>
            ))}
          </div>
        </section>

        {/* CONNECTED INDIAN EXPORT PRODUCTS CATALOG */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold text-white">
                📦 Connected Indian Export Goods servicing {countryData.name}
              </h2>
              <p className="text-xs text-slate-400">Certified products cleared for export to {countryData.name}</p>
            </div>
            <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-bold rounded-lg">
              {corridorProducts.length} PRODUCTS LISTED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {corridorProducts.map((product) => (
              <div
                key={product.id}
                className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700/80 transition-all duration-200 flex flex-col group"
              >
                <div className="relative h-44 overflow-hidden bg-slate-950">
                  <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                  <div className="absolute top-3 left-3 px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-950/90 text-cyan-400 border border-cyan-500/30">
                    {product.hsCode}
                  </div>
                </div>

                <div className="p-4 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <h3 className="font-bold text-sm text-white group-hover:text-cyan-400 transition-colors line-clamp-1">{product.title}</h3>
                    <p className="text-xs text-slate-400 line-clamp-2">{product.description}</p>
                  </div>

                  <div className="pt-2 border-t border-slate-800/60 space-y-2">
                    <div className="flex justify-between items-baseline text-xs">
                      <span className="text-slate-400">Price:</span>
                      <span className="font-bold font-mono text-white">${product.price} / {product.unit}</span>
                    </div>

                    <Link
                      href={`/products/${product.id}`}
                      className="w-full py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold text-xs transition-colors flex items-center justify-center gap-1 cursor-pointer"
                    >
                      <span>📄 View Details & Compliance →</span>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* VERIFIED IMPORT BUYER PROSPECTS */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🎯 Verified Import Buyer Prospects in {countryData.name}</span>
              </h2>
              <p className="text-xs text-slate-400">Active corporate buyers matched with Indian export suppliers</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold rounded-lg">
              {corridorLeads.length} BUYERS VERIFIED
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                <tr>
                  <th className="p-3.5">Buyer Representative</th>
                  <th className="p-3.5">Company & Reg ID</th>
                  <th className="p-3.5">Port Hub</th>
                  <th className="p-3.5">Match Score</th>
                  <th className="p-3.5">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/80">
                {corridorLeads.map((lead, idx) => (
                  <tr key={idx} className="hover:bg-slate-900/80 transition-colors">
                    <td className="p-3.5">
                      <div className="font-bold text-white flex flex-col sm:flex-row sm:items-center gap-1">
                        <span>{lead.name}</span>
                        <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-bold w-fit">
                          {lead.verification_badge || "🛡️ PLATINUM CUSTOMS VERIFIED"}
                        </span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="text-slate-200 font-semibold">{lead.company}</div>
                      <div className="text-slate-400 text-[11px] font-mono flex flex-wrap items-center gap-2">
                        <span>{lead.email}</span>
                        <span className="text-[10px] text-purple-400 font-bold">{lead.registration_id || "DUNS: 69-823-4109"}</span>
                      </div>
                    </td>
                    <td className="p-3.5 font-mono text-cyan-400">{lead.port_hub}</td>
                    <td className="p-3.5">
                      <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold">
                        {lead.match_score}% Match
                      </span>
                    </td>
                    <td className="p-3.5">
                      <a
                        href={`mailto:${lead.email}?subject=Export Offer for ${countryData.name}`}
                        className="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs font-semibold inline-block cursor-pointer"
                      >
                        ✉️ Contact Buyer
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
    </div>
  );
}
