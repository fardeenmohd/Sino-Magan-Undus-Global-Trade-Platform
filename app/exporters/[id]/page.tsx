"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  getExporterProfileDetails,
  getSharedProductsFromDb,
  TradeProduct,
} from "../../lib/api";

const INITIAL_FALLBACK_PRODUCTS: TradeProduct[] = [
  {
    id: 299,
    title: "Organic Indian KSM-66 Ashwagandha Root Extract & Powder (HS 1211)",
    description: "HPLC standardized 5% Withanolides full-spectrum Ashwagandha root extract. USDA Organic, cGMP & ISO 22000 certified.",
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

export default function ExporterProfilePage() {
  const params = useParams();
  const router = useRouter();
  const exporterId = Number(params?.id) || 10;

  const [exporter, setExporter] = useState<any>(null);
  const [exporterProducts, setExporterProducts] = useState<TradeProduct[]>([]);
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [quoteSentToast, setQuoteSentToast] = useState("");

  useEffect(() => {
    const details = getExporterProfileDetails(exporterId);
    setExporter(details);

    const sharedProducts = getSharedProductsFromDb(INITIAL_FALLBACK_PRODUCTS);
    const matchedProducts = sharedProducts.filter(
      (p) =>
        p.listedBy?.id === idMatches(p.listedBy?.id, exporterId) ||
        (p.listedBy?.company && details.company && p.listedBy.company.toLowerCase().includes(details.company.toLowerCase()))
    );
    setExporterProducts(matchedProducts.length > 0 ? matchedProducts : sharedProducts.slice(0, 2));
  }, [exporterId]);

  function idMatches(pId: any, targetId: any): boolean {
    if (!pId) return false;
    return String(pId) === String(targetId);
  }

  if (!exporter) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-mono text-cyan-400">Loading Exporter Profile & Credentials...</p>
        </div>
      </div>
    );
  }

  const handleSendQuote = (e: React.FormEvent) => {
    e.preventDefault();
    setQuoteSentToast(`✅ Formal FOB Quotation request sent to ${exporter.company}!`);
    setIsQuoteModalOpen(false);
    setTimeout(() => setQuoteSentToast(""), 4000);
  };

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
                🇮🇳
              </span>
              <span className="font-bold text-sm text-white tracking-wide">
                Verified Indian Exporter <span className="text-cyan-400">Profile</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 cursor-pointer"
            >
              📞 Request Formal FOB Quote
            </button>
          </div>
        </div>
      </header>

      {/* TOAST */}
      {quoteSentToast && (
        <div className="fixed top-20 right-6 z-50 px-4 py-3 bg-emerald-500 text-slate-950 font-bold text-xs rounded-xl shadow-2xl border border-emerald-300 animate-bounce">
          {quoteSentToast}
        </div>
      )}

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-slate-900/70 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <img
                src={exporter.avatarUrl}
                alt={exporter.name}
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border-2 border-cyan-500/40 shadow-xl"
              />
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs font-bold">
                    ✅ IEC REGISTERED & AUDITED
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono text-xs font-bold">
                    ⭐ {exporter.rating} / 5.0 Rating
                  </span>
                </div>

                <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                  {exporter.company}
                </h1>

                <p className="text-xs text-slate-400 font-mono">
                  Representative: <span className="text-slate-200 font-semibold">{exporter.name}</span> • 📍 {exporter.location} • Est. {exporter.establishedYear}
                </p>
              </div>
            </div>

            <div className="p-4 bg-slate-950/80 border border-slate-800 rounded-2xl min-w-[260px] space-y-2">
              <div className="text-xs font-bold text-cyan-400 font-mono uppercase">Official Export Registration</div>
              <div className="text-xs font-mono text-white font-bold">{exporter.iecNumber}</div>
              <div className="text-[11px] font-mono text-slate-400">{exporter.apedaRegistration}</div>
              <div className="text-[11px] font-mono text-slate-400">{exporter.fssaiLicense}</div>
            </div>
          </div>

          {/* ACTIVE DESTINATION CORRIDORS */}
          <div className="pt-4 border-t border-slate-800/80 space-y-2">
            <div className="text-xs font-bold text-slate-400 font-mono uppercase">Active Export Corridors Serviced</div>
            <div className="flex flex-wrap gap-2">
              {exporter.activeCorridors.map((country: string, idx: number) => (
                <span key={idx} className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-xs font-bold text-slate-200 flex items-center gap-1">
                  {country}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* MAIN SECTIONS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* EXPORT PROCESSING & QUALITY FACILITIES */}
        <section className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>🏭 Export Processing Facilities & Capacity</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {exporter.exportFacilities.map((facility: string, idx: number) => (
              <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
                <div className="text-[10px] font-mono text-cyan-400 font-bold">FACILITY UNIT #{idx + 1}</div>
                <div className="text-xs font-bold text-white">{facility}</div>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-950/80 border border-cyan-500/30 rounded-xl flex items-center justify-between">
            <div className="text-xs text-slate-300 font-mono">
              Annual Export Capacity: <span className="text-cyan-400 font-bold">{exporter.annualCapacity}</span>
            </div>
            <button
              onClick={() => setIsQuoteModalOpen(true)}
              className="px-3.5 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-all cursor-pointer"
            >
              ✉️ Contact Export Director
            </button>
          </div>
        </section>

        {/* CONNECTED EXPORT PRODUCT PORTFOLIO */}
        <section className="space-y-4">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-xl font-bold text-white">
                📦 Export Product Portfolio by {exporter.company}
              </h2>
              <p className="text-xs text-slate-400">Certified export goods listed directly by this supplier</p>
            </div>
            <span className="px-3 py-1 bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-mono font-bold rounded-lg">
              {exporterProducts.length} PRODUCTS LISTED
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {exporterProducts.map((product) => (
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
                      <span className="text-slate-400">Export Price:</span>
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
      </main>

      {/* QUOTE MODAL */}
      {isQuoteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white">Request Formal FOB Quote</h3>
              <button onClick={() => setIsQuoteModalOpen(false)} className="text-slate-400 hover:text-slate-200 text-sm cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleSendQuote} className="space-y-3 text-xs">
              <div>
                <label className="block font-medium text-slate-400 mb-1">Company / Importer Name *</label>
                <input type="text" required placeholder="e.g. Tokyo Foods & Superfood Import Corp" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white" />
              </div>

              <div>
                <label className="block font-medium text-slate-400 mb-1">Business Email *</label>
                <input type="email" required placeholder="e.g. k.takahashi@tokyofoods.co.jp" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white" />
              </div>

              <div>
                <label className="block font-medium text-slate-400 mb-1">Target Quantity & Destination *</label>
                <input type="text" required placeholder="e.g. 50 Metric Tons to Port of Yokohama" className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-white" />
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button type="button" onClick={() => setIsQuoteModalOpen(false)} className="px-3.5 py-2 bg-slate-800 text-slate-300 rounded-xl">Cancel</button>
                <button type="submit" className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl shadow-md">Send RFQ →</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
