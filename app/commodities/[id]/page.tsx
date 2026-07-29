"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getSharedProductsFromDb, getSharedLeadsFromDb, TradeLeadProspect } from "../../lib/api";

const INITIAL_TRADE_PRODUCTS = [
  {
    id: 299,
    title: "Organic Indian KSM-66 Ashwagandha Root Extract & Powder (HS 1211)",
    description: "HPLC standardized 5% Withanolides full-spectrum Ashwagandha root extract (Withania somnifera). USDA Organic, cGMP & ISO 22000 certified for US & EU nutraceutical brand manufacturing.",
    category: "Ayurvedic & Herbal Extracts",
    hsCode: "HS-1211",
    originCountry: "India 🇮🇳",
    destinationCountry: "Germany 🇩🇪",
    portHub: "Port of Hamburg",
    tariffRatePct: 2.8,
    price: 18.50,
    unit: "kg",
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80",
    leadCount: 44,
  },
  {
    id: 300,
    title: "Tobacco-Free White Nicotine Pouches & Swedish Style Snus (HS 2404)",
    description: "Premium pharma-grade oral nicotine pouches (6mg, 12mg, 20mg mint & fruit flavors). TPD2 compliant, foil sealed in 20-pouch cans for EU & US distribution.",
    category: "Tobacco & Nicotine Pouches",
    hsCode: "HS-2404",
    originCountry: "India 🇮🇳",
    destinationCountry: "Sweden 🇸🇪",
    portHub: "Port of Gothenburg",
    tariffRatePct: 2.5,
    price: 2.45,
    unit: "can",
    imageUrl: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&auto=format&fit=crop&q=80",
    leadCount: 36,
  },
  {
    id: 301,
    title: "Bihar Premium Organic Foxnuts / Makhana (HS 1904)",
    description: "Hand-popped grade-A gorgon nuts (makhana), 5-6 sieve size, vacuum packed in 10kg cartons for Japanese & European superfood distributors.",
    category: "Makhana & Superfoods",
    hsCode: "HS-1904",
    originCountry: "India 🇮🇳",
    destinationCountry: "Japan 🇯🇵",
    portHub: "Port of Yokohama",
    tariffRatePct: 3.5,
    price: 14.50,
    unit: "kg",
    imageUrl: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80",
    leadCount: 28,
  },
  {
    id: 302,
    title: "Nashik Red Onions & Dehydrated Flakes (HS 0703)",
    description: "45mm+ export grade red Nashik onions with phytosanitary clearance, plus dehydrated onion powder for GCC food processing.",
    category: "Fresh Produce",
    hsCode: "HS-0703",
    originCountry: "India 🇮🇳",
    destinationCountry: "Oman 🇴🇲",
    portHub: "Port of Salalah",
    tariffRatePct: 5.0,
    price: 380,
    unit: "metric ton",
    imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
    leadCount: 34,
  },
];

export default function CommodityDetailPage() {
  const params = useParams();
  const rawId = params?.id;
  const productId = Number(rawId);

  const [product, setProduct] = useState<any>(null);
  const [leads, setLeads] = useState<TradeLeadProspect[]>([]);
  const [rfqSent, setRfqSent] = useState(false);
  const [rfqForm, setRfqForm] = useState({
    quantity: 500,
    company: "",
    email: "",
    notes: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const shared = getSharedProductsFromDb(INITIAL_TRADE_PRODUCTS);
      const found = shared.find((p: any) => p.id === productId) || INITIAL_TRADE_PRODUCTS.find((p: any) => p.id === productId) || INITIAL_TRADE_PRODUCTS[0];
      setProduct(found);

      const allLeads = getSharedLeadsFromDb([]);
      setLeads(allLeads);
    }
  }, [productId]);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center font-mono text-sm">
        Loading commodity specifications...
      </div>
    );
  }

  const handleSendRfq = (e: React.FormEvent) => {
    e.preventDefault();
    setRfqSent(true);
  };

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
            <Link href="/commodities" className="text-cyan-400 font-bold">Commodity Datalog</Link>
            <Link href="/corridors" className="hover:text-cyan-400">Trade Corridors</Link>
            <Link href="/exporters" className="hover:text-cyan-400">Indian Exporters</Link>
          </div>
        </div>
      </header>

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/commodities" className="hover:text-cyan-400">Commodities</Link>
          <span>/</span>
          <span className="text-cyan-400 font-bold">{product.hsCode}</span>
        </div>
      </div>

      {/* MAIN SPECIFICATION HERO */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left: Image & Quick Spec Box */}
          <div className="lg:col-span-5 space-y-4">
            <div className="relative h-72 w-full rounded-2xl overflow-hidden border border-slate-800 bg-slate-900">
              <img src={product.imageUrl} alt={product.title} className="w-full h-full object-cover" />
              <span className="absolute top-4 left-4 px-3 py-1 bg-slate-950/80 backdrop-blur-md rounded-full text-xs font-mono font-bold text-cyan-400 border border-cyan-500/30">
                {product.hsCode}
              </span>
            </div>

            <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-3 font-mono text-xs">
              <h4 className="text-slate-200 font-bold text-sm flex items-center justify-between">
                <span>TRADE SPECIFICATIONS</span>
                <span className="text-emerald-400">IEC CERTIFIED</span>
              </h4>
              <div className="grid grid-cols-2 gap-3 pt-2">
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">CATEGORY</span>
                  <span className="text-slate-200 font-semibold">{product.category}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">TARIFF DUTY RATE</span>
                  <span className="text-cyan-400 font-semibold">{product.tariffRatePct}% Preferential</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">INDICATIVE FOB PRICE</span>
                  <span className="text-cyan-300 font-semibold">${product.price} / {product.unit}</span>
                </div>
                <div className="bg-slate-950 p-2.5 rounded-xl border border-slate-800">
                  <span className="text-slate-500 block text-[10px]">EXPORT PORT HUB</span>
                  <span className="text-slate-200 font-semibold">{product.portHub || "Nhava Sheva (JNPT)"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: Detailed Specification Sheet & RFQ */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase tracking-wider">{product.category}</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-white mt-1 leading-tight">{product.title}</h1>
              <p className="text-sm text-slate-300 mt-3 leading-relaxed">{product.description}</p>
            </div>

            {/* Compliance & Export Promotion Board Badges */}
            <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-2xl space-y-2 font-mono text-xs">
              <span className="text-slate-400 block text-[11px]">GOVERNMENT REGULATORY & EXPORT BOARD COMPLIANCE:</span>
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="px-3 py-1 bg-cyan-950/60 border border-cyan-500/30 text-cyan-300 rounded-lg">
                  🏛️ Export Promotion Council (FIEO / APEDA)
                </span>
                <span className="px-3 py-1 bg-emerald-950/60 border border-emerald-500/30 text-emerald-300 rounded-lg">
                  🛡️ Phytosanitary & ISO 22000 Certified
                </span>
                <span className="px-3 py-1 bg-purple-950/60 border border-purple-500/30 text-purple-300 rounded-lg">
                  🚢 Customs Tariff Clearance ({product.hsCode})
                </span>
              </div>
            </div>

            {/* RFQ FORM */}
            <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
              <h3 className="text-base font-bold text-white flex items-center justify-between">
                <span>📄 Submit Direct RFQ / Bulk Order Inquiry</span>
                <span className="text-xs font-mono text-cyan-400">Direct Exporter Pipeline</span>
              </h3>

              {rfqSent ? (
                <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs font-mono text-emerald-300">
                  ✅ Your RFQ for <strong>{rfqForm.quantity} {product.unit}</strong> of {product.title} has been transmitted directly to verified Indian exporters and logged in the trade engine!
                </div>
              ) : (
                <form onSubmit={handleSendRfq} className="space-y-3 font-mono text-xs">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-slate-400 block mb-1">Target Order Quantity ({product.unit}):</label>
                      <input
                        type="number"
                        value={rfqForm.quantity}
                        onChange={(e) => setRfqForm({ ...rfqForm, quantity: Number(e.target.value) })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-slate-400 block mb-1">Buyer Company Name:</label>
                      <input
                        type="text"
                        placeholder="e.g. Hamburg Trade GmbH"
                        value={rfqForm.company}
                        onChange={(e) => setRfqForm({ ...rfqForm, company: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                        required
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-slate-400 block mb-1">Corporate Contact Email:</label>
                    <input
                      type="email"
                      placeholder="procurement@company.de"
                      value={rfqForm.email}
                      onChange={(e) => setRfqForm({ ...rfqForm, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl shadow-lg transition-all duration-200 cursor-pointer"
                  >
                    Submit Official RFQ Order ➔
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
