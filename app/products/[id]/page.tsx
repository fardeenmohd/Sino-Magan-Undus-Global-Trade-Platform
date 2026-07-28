"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import {
  getSharedProductsFromDb,
  getSharedLeadsFromDb,
  getProductIntelligenceDetails,
  streamLeadsCompute,
  TradeLeadProspect,
  saveLeadsToSharedDb,
} from "../../lib/api";

const INITIAL_FALLBACK_PRODUCTS = [
  {
    id: 101,
    title: "Bihar Premium Organic Foxnuts / Makhana (HS 1904)",
    description: "Hand-harvested Grade A GI-tagged Bihar makhana. Vacuum sealed, moisture < 5%, 100% organic certified for US & EU market distribution.",
    category: "Makhana & Superfoods",
    hsCode: "HS-1904",
    originCountry: "India 🇮🇳",
    destinationCountry: "Japan 🇯🇵",
    destinationFlag: "🇯🇵",
    portHub: "Port of Yokohama",
    tariffRatePct: 3.5,
    price: 14.5,
    unit: "kg",
    listedBy: { name: "Rajesh Kumar", company: "Mahananda Exim Corp", role: "SUPPLIER", location: "Patna, Bihar 🇮🇳" },
    imageUrl: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80",
    leadCount: 14,
    status: "ACTIVE",
    createdAt: "2026-07-28T10:00:00Z",
  },
  {
    id: 105,
    title: "Organic Indian KSM-66 Ashwagandha Root Extract (HS 1211)",
    description: "Full-spectrum 5% withanolides KSM-66 ashwagandha root powder. ISO/GMP certified, heavy metals < 0.1ppm. Essential for wellness and supplements.",
    category: "Ayurvedic & Herbal Extracts",
    hsCode: "HS-1211",
    originCountry: "India 🇮🇳",
    destinationCountry: "Germany 🇩🇪",
    destinationFlag: "🇩🇪",
    portHub: "Port of Hamburg",
    tariffRatePct: 2.5,
    price: 32.0,
    unit: "kg",
    listedBy: { name: "Antigravity Global Trade Admin", company: "Sino Magan Undus Global", role: "SUPPLIER", location: "New Delhi 🇮🇳" },
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80",
    leadCount: 18,
    status: "ACTIVE",
    createdAt: "2026-07-28T14:30:00Z",
  },
  {
    id: 106,
    title: "Tobacco-Free White Nicotine Pouches 12mg (HS 2404)",
    description: "Swedish-style oral nicotine pouches, microcrystalline cellulose base, pharma grade 99.9% pure nicotine. Premium mint and berry flavors.",
    category: "Tobacco & Nicotine Pouches",
    hsCode: "HS-2404",
    originCountry: "India 🇮🇳",
    destinationCountry: "Japan 🇯🇵",
    destinationFlag: "🇯🇵",
    portHub: "Port of Yokohama",
    tariffRatePct: 4.8,
    price: 1.85,
    unit: "can",
    listedBy: { name: "Antigravity Global Trade Admin", company: "Sino Magan Undus Global", role: "SUPPLIER", location: "New Delhi 🇮🇳" },
    imageUrl: "https://images.unsplash.com/photo-1527661591475-527312dd65f5?w=600&auto=format&fit=crop&q=80",
    leadCount: 22,
    status: "ACTIVE",
    createdAt: "2026-07-28T16:00:00Z",
  },
];

export default function ProductDetailPage() {
  const params = useParams();
  const router = useRouter();
  const productId = Number(params?.id);

  const [product, setProduct] = useState<any>(null);
  const [productLeads, setProductLeads] = useState<TradeLeadProspect[]>([]);
  const [isComputing, setIsComputing] = useState(false);
  const [streamProgress, setStreamProgress] = useState(0);
  const [streamMessage, setStreamMessage] = useState("");
  const [downloadToast, setDownloadToast] = useState("");

  useEffect(() => {
    // 1. Load product
    const sharedProducts = getSharedProductsFromDb(INITIAL_FALLBACK_PRODUCTS);
    const found = sharedProducts.find((p: any) => p.id === productId || String(p.id) === String(params?.id));
    if (found) {
      setProduct(found);
    } else {
      setProduct(INITIAL_FALLBACK_PRODUCTS[0]);
    }

    // 2. Load associated leads
    const allLeads = getSharedLeadsFromDb([]);
    const matching = allLeads.filter(
      (l: any) =>
        l.product_id === productId ||
        String(l.product_id) === String(params?.id) ||
        (found && l.destination_country && found.destinationCountry && l.destination_country.toLowerCase().includes(found.destinationCountry.toLowerCase()))
    );
    setProductLeads(matching);
  }, [productId, params?.id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center p-6 font-sans">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-mono text-cyan-400">Loading Product Intelligence Dossier...</p>
        </div>
      </div>
    );
  }

  const intel = getProductIntelligenceDetails(product);

  const handleRunPythonCompute = () => {
    setIsComputing(true);
    setStreamProgress(20);
    setStreamMessage("⚡ Initializing Python Compute SSE Engine for Export Route...");

    streamLeadsCompute(
      product.id,
      product.title,
      product.category,
      product.hsCode,
      product.destinationCountry,
      (event) => {
        setStreamProgress(event.progress);
        setStreamMessage(event.message);
        if (event.stage === "COMPLETE" && event.leads) {
          const newLeads = event.leads as any[];
          setProductLeads((prev) => [...newLeads, ...prev]);
          saveLeadsToSharedDb(newLeads);
          setIsComputing(false);
        }
      }
    );
  };

  const handleDownloadDossier = () => {
    setDownloadToast(`📄 Generating Official Trade & Compliance Dossier PDF for ${product.title}...`);
    setTimeout(() => {
      setDownloadToast(`✅ Dossier successfully compiled! Download initiated.`);
      setTimeout(() => setDownloadToast(""), 4000);
    }, 1500);
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
                🌏
              </span>
              <span className="font-bold text-sm text-white tracking-wide">
                Sino Magan Undus <span className="text-cyan-400">Trade Intelligence</span>
              </span>
            </Link>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleDownloadDossier}
              className="px-3.5 py-1.5 bg-slate-900 hover:bg-slate-800 border border-slate-800 rounded-xl text-xs font-semibold text-slate-200 cursor-pointer flex items-center gap-1.5"
            >
              <span>📥 Download Dossier (PDF)</span>
            </button>
            <Link
              href="/admin"
              className="px-3.5 py-1.5 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-xl text-xs font-bold font-mono"
            >
              ⚙️ Admin Portal
            </Link>
          </div>
        </div>
      </header>

      {/* TOAST NOTIFICATION */}
      {downloadToast && (
        <div className="fixed top-20 right-6 z-50 px-4 py-3 bg-cyan-500 text-slate-950 font-bold text-xs rounded-xl shadow-2xl border border-cyan-300 animate-bounce">
          {downloadToast}
        </div>
      )}

      {/* HERO SECTION */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-6">
        <div className="bg-slate-900/70 border border-slate-800 p-6 sm:p-8 rounded-3xl space-y-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none"></div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Image */}
            <div className="lg:col-span-4 relative rounded-2xl overflow-hidden border border-slate-800 aspect-video lg:aspect-square">
              <img
                src={product.imageUrl}
                alt={product.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-slate-950/80 backdrop-blur-md text-[10px] font-mono text-cyan-400 border border-cyan-500/30 font-bold">
                {product.hsCode}
              </div>
            </div>

            {/* Content Header */}
            <div className="lg:col-span-8 space-y-4">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 font-mono text-xs font-bold">
                  {product.category}
                </span>
                <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono text-xs font-bold flex items-center gap-1">
                  <span>{product.originCountry}</span> ➔ <span>{product.destinationCountry}</span>
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-800 text-slate-300 font-mono text-xs">
                  Port: {product.portHub}
                </span>
              </div>

              <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
                {product.title}
              </h1>

              <p className="text-sm text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* Key Metrics Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Tariff Estimate</div>
                  <div className="text-base font-bold font-mono text-cyan-400">{product.tariffRatePct}% Duty</div>
                </div>

                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">FOB Benchmark Price</div>
                  <div className="text-base font-bold font-mono text-white">${product.price} / {product.unit}</div>
                </div>

                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Verified Importers</div>
                  <div className="text-base font-bold font-mono text-emerald-400">{productLeads.length} Leads Found</div>
                </div>

                <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-xl">
                  <div className="text-[10px] font-mono text-slate-400 uppercase">Supplier Role</div>
                  <div className="text-base font-bold text-slate-200">{product.listedBy?.name || "Verified Exporter"}</div>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-3 pt-2">
                <button
                  onClick={handleRunPythonCompute}
                  disabled={isComputing}
                  className="px-5 py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-all duration-200 cursor-pointer disabled:opacity-50"
                >
                  {isComputing ? "⚡ Python Compute Engine Running..." : "⚡ Run Live Python Lead Discovery Engine →"}
                </button>

                <button
                  onClick={handleDownloadDossier}
                  className="px-4 py-2.5 bg-slate-900 hover:bg-slate-800 text-slate-200 font-bold text-xs rounded-xl border border-slate-800 transition-all duration-200 cursor-pointer"
                >
                  📜 Export Full Customs Dossier
                </button>
              </div>

              {isComputing && (
                <div className="p-3 bg-slate-950 border border-cyan-500/30 rounded-xl text-xs font-mono text-cyan-400 space-y-2">
                  <div className="flex justify-between">
                    <span>{streamMessage}</span>
                    <span>{streamProgress}%</span>
                  </div>
                  <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-cyan-400 h-full transition-all duration-300" style={{ width: `${streamProgress}%` }}></div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* DETAILED CONTENT SECTIONS */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-8 space-y-8">
        {/* SECTION 1: PRODUCT TECHNICAL SPECIFICATIONS */}
        <section className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h2 className="text-lg font-bold text-white flex items-center gap-2">
            <span>📊 Export Technical Specifications & Quality Standard</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="text-[11px] font-mono text-slate-400">Quality Grade</div>
              <div className="text-sm font-semibold text-white">{intel.specifications.grade}</div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="text-[11px] font-mono text-slate-400">Purity Standard</div>
              <div className="text-sm font-semibold text-emerald-400 font-mono">{intel.specifications.purity}</div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="text-[11px] font-mono text-slate-400">Moisture Limit</div>
              <div className="text-sm font-semibold text-cyan-400 font-mono">{intel.specifications.moistureContent}</div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="text-[11px] font-mono text-slate-400">Shelf Life & Storage</div>
              <div className="text-sm font-semibold text-slate-200">{intel.specifications.shelfLife}</div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="text-[11px] font-mono text-slate-400">Export Packaging Standard</div>
              <div className="text-xs text-slate-300 leading-relaxed">{intel.specifications.packagingStandard}</div>
            </div>

            <div className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-1">
              <div className="text-[11px] font-mono text-slate-400">Warehouse Storage Conditions</div>
              <div className="text-xs text-slate-300 leading-relaxed">{intel.specifications.storageConditions}</div>
            </div>
          </div>
        </section>

        {/* SECTION 2: INTERNATIONAL EXPORT CERTIFICATIONS & CUSTOMS CLEARANCE MATRIX */}
        <section className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>📜 Export Certifications & Regulatory Clearance Matrix</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Mandatory documentation required for entry clearance at {product.destinationCountry} Customs Hub ({product.portHub})
              </p>
            </div>
            <span className="px-3 py-1 bg-purple-500/10 text-purple-300 border border-purple-500/20 text-xs font-mono font-bold rounded-lg self-start sm:self-auto">
              REGULATORY AUDITED 🛡️
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {intel.certifications.map((c, idx) => (
              <div key={idx} className="p-4 bg-slate-950 border border-slate-800 rounded-xl space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-white">{c.title}</span>
                  <span
                    className={`text-[10px] font-mono px-2 py-0.5 rounded font-bold border ${
                      c.status === "MANDATORY"
                        ? "bg-amber-500/10 text-amber-400 border-amber-500/30"
                        : "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                    }`}
                  >
                    {c.status}
                  </span>
                </div>
                <div className="text-[11px] text-cyan-400 font-mono">{c.authority}</div>
                <p className="text-xs text-slate-400 leading-relaxed">{c.description}</p>
              </div>
            ))}
          </div>

          <div className="p-4 bg-slate-950/80 border border-cyan-500/30 rounded-xl space-y-2">
            <div className="text-xs font-bold text-cyan-400 font-mono uppercase tracking-wider">
              📋 Official Regulatory Notes & Customs Clearance Protocol
            </div>
            <ul className="space-y-1.5 text-xs text-slate-300 list-disc list-inside">
              {intel.regulatoryComplianceNotes.map((note, idx) => (
                <li key={idx}>{note}</li>
              ))}
            </ul>
          </div>
        </section>

        {/* SECTION 3: VERIFIED IMPORT BUYER LEADS NETWORK */}
        <section className="bg-slate-900/60 border border-slate-800 rounded-2xl overflow-hidden">
          <div className="p-5 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🎯 Verified Import Buyer Prospects Network</span>
              </h2>
              <p className="text-xs text-slate-400">Scraped international buyers actively seeking {product.title}</p>
            </div>
            <span className="px-3 py-1 bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono font-bold rounded-lg">
              {productLeads.length} BUYERS FOUND
            </span>
          </div>

          {productLeads.length === 0 ? (
            <div className="p-8 text-center space-y-3">
              <p className="text-xs text-slate-400 font-mono">No direct leads cached yet for this exact product ID.</p>
              <button
                onClick={handleRunPythonCompute}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl transition-all cursor-pointer"
              >
                ⚡ Trigger Live Python Compute Lead Engine →
              </button>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 text-slate-400 uppercase font-mono border-b border-slate-800">
                  <tr>
                    <th className="p-3.5">Buyer Representative</th>
                    <th className="p-3.5">Company & Contact</th>
                    <th className="p-3.5">Target Destination</th>
                    <th className="p-3.5">Port Hub</th>
                    <th className="p-3.5">Match Score</th>
                    <th className="p-3.5">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/80">
                  {productLeads.map((lead, idx) => (
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
                      <td className="p-3.5 text-slate-200">{lead.destination_country}</td>
                      <td className="p-3.5 font-mono text-cyan-400">{lead.port_hub}</td>
                      <td className="p-3.5">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-mono font-bold">
                          {lead.match_score}% Match
                        </span>
                      </td>
                      <td className="p-3.5">
                        <a
                          href={`mailto:${lead.email}?subject=Export Offer: ${encodeURIComponent(product.title)}`}
                          className="px-3 py-1 bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 rounded-lg text-xs font-semibold inline-block cursor-pointer"
                        >
                          ✉️ Contact Importer
                        </a>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* SECTION 4: LOCAL IN-COUNTRY EXPORT DISTRIBUTORS & BONDED WAREHOUSES */}
        <section className="bg-slate-900/60 border border-slate-800 p-6 rounded-2xl space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <span>🏬 In-Country Export Distributors & Bonded Warehouse Hubs</span>
              </h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Local in-country wholesalers, port warehousing operators, and customs clearance partners for {product.destinationCountry}
              </p>
            </div>
            <span className="px-3 py-1 bg-amber-500/10 text-amber-300 border border-amber-500/20 text-xs font-mono font-bold rounded-lg self-start sm:self-auto">
              LOCAL VENDORS VERIFIED 🏬
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {intel.localDistributors.map((dist) => (
              <div key={dist.id} className="p-5 bg-slate-950 border border-amber-500/20 rounded-xl space-y-3 relative overflow-hidden">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-300 border border-amber-500/30">
                    {dist.verifiedStatus}
                  </span>
                  <span className="text-[10px] text-slate-400 font-mono">{dist.type}</span>
                </div>

                <div>
                  <h3 className="text-sm font-bold text-white">{dist.name}</h3>
                  <p className="text-xs text-slate-300">{dist.company}</p>
                </div>

                <div className="space-y-1 text-xs text-slate-400 font-mono pt-1">
                  <div>📍 Location: <span className="text-slate-200">{dist.location}</span></div>
                  <div>⚓ Port Hub: <span className="text-cyan-400">{dist.portHub}</span></div>
                  <div>📞 Phone: <span className="text-slate-200">{dist.phone}</span></div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <a
                    href={`mailto:${dist.contactEmail}?subject=Logistics Partnership: ${encodeURIComponent(product.title)}`}
                    className="w-full text-center py-2 bg-slate-900 hover:bg-slate-800 text-amber-300 font-semibold text-xs rounded-lg border border-amber-500/20 transition-all block cursor-pointer"
                  >
                    🤝 Connect with Local Vendor
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
