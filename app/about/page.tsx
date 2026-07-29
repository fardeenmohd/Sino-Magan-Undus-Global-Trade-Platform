"use client";

import React from "react";
import Link from "next/link";

export default function AboutUsPage() {
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
            <Link href="/about" className="text-cyan-400 font-bold">About Us</Link>
            <Link href="/commodities" className="hover:text-cyan-400">Commodity Datalog</Link>
            <Link href="/corridors" className="hover:text-cyan-400">Trade Corridors</Link>
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

      {/* HERO SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-12 space-y-6">
        <div className="max-w-3xl space-y-4">
          <span className="px-3 py-1 bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 rounded-full font-mono text-xs font-bold uppercase tracking-wider">
            Corporate Profile & Mission
          </span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Sino Magan Indus Global Trade
          </h1>
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-sans">
            Sino Magan Indus is an enterprise-grade cross-border trade matchmaking platform linking IEC-registered Indian exporters with commercial importers across key maritime corridors (*Germany 🇩🇪, Japan 🇯🇵, Sweden 🇸🇪, Netherlands 🇳🇱, Oman 🇴🇲, Australia 🇦🇺, USA 🇺🇸, China 🇨🇳*).
          </p>
        </div>

        {/* METRICS COUNTER */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-6 font-mono">
          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-1">
            <span className="text-slate-500 text-xs block">VERIFIED EXPORTERS</span>
            <span className="text-3xl font-extrabold text-cyan-400">1,240+</span>
            <span className="text-[11px] text-slate-400 block">IEC & APEDA Registered</span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-1">
            <span className="text-slate-500 text-xs block">GLOBAL CORRIDORS</span>
            <span className="text-3xl font-extrabold text-emerald-400">12</span>
            <span className="text-[11px] text-slate-400 block">Bilateral Maritime Routes</span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-1">
            <span className="text-slate-500 text-xs block">BUYER PROSPECTS</span>
            <span className="text-3xl font-extrabold text-cyan-300">5,800+</span>
            <span className="text-[11px] text-slate-400 block">Scraped & Verified Leads</span>
          </div>

          <div className="bg-slate-900/60 border border-slate-800 p-5 rounded-2xl space-y-1">
            <span className="text-slate-500 text-xs block">TRADE ENGINE SLA</span>
            <span className="text-3xl font-extrabold text-purple-400">99.9%</span>
            <span className="text-[11px] text-slate-400 block">Real-time SSE Stream</span>
          </div>
        </div>
      </section>

      {/* CORE VALUE PILLARS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-800/80 space-y-8">
        <div>
          <h2 className="text-2xl font-bold text-white">Our Platform Technology Pillars</h2>
          <p className="text-xs text-slate-400 mt-1">Built to digitize and accelerate international trade between India and global markets.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center text-2xl">
              🛡️
            </div>
            <h3 className="font-bold text-lg text-white">IEC & Regulatory Verification</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Every supplier entity listed on Sino Magan Indus undergoes strict IEC (Importer Exporter Code) validation, APEDA, FIEO, Spices Board, and PharmExcil regulatory clearance checks.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-2xl">
              ⚡
            </div>
            <h3 className="font-bold text-lg text-white">AI Scraper & Discovery Engine</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Powered by our Python FastAPI compute cluster, our scraper engine continuously discovers live buyer leads, company emails, and active procurement inquiries matching specific HS codes.
            </p>
          </div>

          <div className="bg-slate-900/40 border border-slate-800/80 p-6 rounded-2xl space-y-3">
            <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center text-2xl">
              🚢
            </div>
            <h3 className="font-bold text-lg text-white">Corridor Customs Analytics</h3>
            <p className="text-xs text-slate-400 leading-relaxed">
              Real-time tariff duty schedules, shipping line schedules, port hub analytics, and preferential trade agreements (CEPA, ECTA, GCC FTA, EU GSP) for seamless customs clearance.
            </p>
          </div>
        </div>
      </section>

      {/* HEADQUARTERS & CONTACT INFO */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-800/80">
        <div className="bg-slate-900/60 border border-slate-800 p-8 rounded-3xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div>
              <span className="text-xs font-mono text-cyan-400 uppercase">Headquarters & Global Trade Ops</span>
              <h2 className="text-2xl font-bold text-white mt-1">Sino Magan Indus Global Headquarters</h2>
              <p className="text-xs text-slate-400 mt-1 font-mono">New Delhi Export Hub • Maharashtra • Gujarat • Hamburg • Rotterdam • Tokyo</p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
              <a
                href="mailto:admin@sinomaganindus.global"
                className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs font-mono rounded-xl shadow-lg transition-all duration-200 text-center"
              >
                ✉️ Corporate Contact
              </a>
              <Link
                href="/admin"
                className="px-4 py-2 bg-slate-950 hover:bg-slate-900 border border-slate-800 text-cyan-400 font-bold text-xs font-mono rounded-xl transition-all duration-200 text-center"
              >
                ⚡ Admin Command Center
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-slate-800/80 py-8 bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-xs font-mono text-slate-500">
          <p>© 2026 Sino Magan Indus Global Trade. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
