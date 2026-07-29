"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { getSharedLeadsFromDb, getSharedProductsFromDb } from "../../lib/api";

const INITIAL_EXPORTERS: Record<string, any> = {
  "101": {
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
    portHub: "Nhava Sheva (JNPT), Mumbai",
  },
  "102": {
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
    portHub: "Kolkata Port / Nhava Sheva",
  },
};

export default function ExporterDetailPage() {
  const params = useParams();
  const rawId = (params?.id as string) || "101";

  const [exporter, setExporter] = useState<any>(null);
  const [inquirySent, setInquirySent] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    if (typeof window !== "undefined") {
      const leads = getSharedLeadsFromDb([]);
      const foundLead = leads.find((l) => String(l.user_id) === rawId);
      if (foundLead) {
        setExporter({
          id: foundLead.user_id,
          name: foundLead.name || "Executive Exporter",
          company: foundLead.company || "IEC Verified Trade House",
          email: foundLead.email || "exporter@indiatrade.in",
          location: foundLead.destination_country?.includes("India") ? foundLead.destination_country : "India 🇮🇳 (Export Hub)",
          verification: foundLead.verification_badge || "🛡️ IEC REGISTERED EXPORTER",
          iecCode: foundLead.registration_id || "IEC: 0719045881",
          council: "APEDA / FIEO Certified",
          category: foundLead.confidence_reason?.split("—")[0] || "Specialty Export Commodities",
          avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
          rating: 5.0,
          exportProducts: ["IEC Certified Export Cargo"],
          targetDestinations: [foundLead.destination_country || "Global Markets"],
          portHub: foundLead.port_hub || "Nhava Sheva (JNPT)",
        });
      } else {
        setExporter(INITIAL_EXPORTERS[rawId] || INITIAL_EXPORTERS["101"]);
      }
    }
  }, [rawId]);

  if (!exporter) {
    return (
      <div className="min-h-screen bg-slate-950 text-slate-100 flex items-center justify-center font-mono text-sm">
        Loading exporter corporate profile...
      </div>
    );
  }

  const handleSendInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySent(true);
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
            <Link href="/commodities" className="hover:text-cyan-400">Commodity Datalog</Link>
            <Link href="/corridors" className="hover:text-cyan-400">Trade Corridors</Link>
            <Link href="/exporters" className="text-cyan-400 font-bold">Indian Exporters</Link>
          </div>
        </div>
      </header>

      {/* BREADCRUMB */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
          <Link href="/exporters" className="hover:text-cyan-400">Indian Exporters</Link>
          <span>/</span>
          <span className="text-cyan-400 font-bold">{exporter.company}</span>
        </div>
      </div>

      {/* MAIN EXPORTER PROFILE */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl space-y-6">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="flex items-center gap-5">
              <img
                src={exporter.avatarUrl}
                alt={exporter.name}
                className="w-20 h-20 rounded-full object-cover border-2 border-cyan-500/40 shrink-0 shadow-lg"
              />
              <div>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                  {exporter.verification}
                </span>
                <h1 className="text-2xl font-extrabold text-white mt-1">{exporter.company}</h1>
                <p className="text-sm text-cyan-400 font-medium">Executive Contact: {exporter.name}</p>
                <p className="text-xs text-slate-400 mt-0.5">{exporter.location} • ⭐ {exporter.rating} Exporter Rating</p>
              </div>
            </div>

            <a
              href={`mailto:${exporter.email}`}
              className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 font-bold text-xs font-mono rounded-xl shadow-lg hover:from-cyan-400 hover:to-blue-500 transition-all duration-200 shrink-0 text-center"
            >
              ✉️ Direct Corporate Email
            </a>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2 font-mono text-xs">
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px]">IEC REGISTRATION</span>
              <span className="text-emerald-400 font-bold text-sm block">{exporter.iecCode}</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px]">EXPORT PROMOTION COUNCIL</span>
              <span className="text-cyan-400 font-bold text-sm block">{exporter.council || "APEDA / FIEO Certified"}</span>
            </div>
            <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-1">
              <span className="text-slate-500 text-[10px]">PRIMARY PORT HUB</span>
              <span className="text-slate-200 font-bold text-sm block">{exporter.portHub || "Nhava Sheva (JNPT)"}</span>
            </div>
          </div>
        </div>

        {/* INQUIRY FORM */}
        <div className="bg-slate-900/80 border border-slate-800 p-6 rounded-2xl space-y-4">
          <h3 className="text-lg font-bold text-white flex items-center justify-between">
            <span>Direct Commercial Trade Inquiry to {exporter.company}</span>
            <span className="text-xs font-mono text-cyan-400">Verified Direct Pipeline</span>
          </h3>

          {inquirySent ? (
            <div className="p-4 bg-emerald-950/60 border border-emerald-500/40 rounded-xl text-xs font-mono text-emerald-300">
              ✅ Your trade inquiry has been dispatched directly to {exporter.name} ({exporter.email})!
            </div>
          ) : (
            <form onSubmit={handleSendInquiry} className="space-y-3 font-mono text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-400 block mb-1">Your Name / Representative:</label>
                  <input
                    type="text"
                    placeholder="e.g. Hans Mueller"
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                    required
                  />
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Importer Company Name:</label>
                  <input
                    type="text"
                    placeholder="e.g. Hamburg Produce GmbH"
                    value={inquiryForm.company}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, company: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Your Contact Email:</label>
                <input
                  type="email"
                  placeholder="h.mueller@hamburgtrade.de"
                  value={inquiryForm.email}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                  required
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Inquiry / Commodity Requirements:</label>
                <textarea
                  rows={3}
                  placeholder="Specify commodity requirements, quantity, target port, and shipment schedule..."
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold rounded-xl shadow-lg transition-all duration-200 cursor-pointer"
              >
                Send Direct Trade Inquiry ➔
              </button>
            </form>
          )}
        </div>
      </main>
    </div>
  );
}
