"use client";

import React, { useState } from "react";
import Link from "next/link";

export type UserRole = "BUYER" | "SUPPLIER" | "LEAD_PROSPECT" | "COMPUTE_AGENT";

export interface UserProfile {
  id: number;
  name: string;
  email: string;
  company: string;
  role: UserRole;
  location: string;
  phone: string;
  bio: string;
  iecCode: string;
  rating: number;
  avatarUrl: string;
}

export interface UserListing {
  id: number;
  title: string;
  category: string;
  hsCode: string;
  originCountry: string;
  destinationCountry: string;
  destinationFlag: string;
  price: number;
  unit: string;
  leadCount: number;
  status: "ACTIVE" | "INACTIVE";
}

// Initial User Profile
const INITIAL_PROFILE: UserProfile = {
  id: 10,
  name: "Rajesh Export Corp",
  email: "rajesh@exim.in",
  company: "Rajesh Global Industries",
  role: "SUPPLIER",
  location: "Mumbai, Maharashtra, India 🇮🇳",
  phone: "+91 (22) 5550-1928",
  bio: "Leading Indian exporter of agricultural commodities, Makhana, fresh produce, frozen meat, and industrial engineering machinery.",
  iecCode: "IEC-IN09887766",
  rating: 4.9,
  avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
};

// Initial User Listings (Supplier Mode)
const INITIAL_MY_LISTINGS: UserListing[] = [
  {
    id: 301,
    title: "Bihar Premium Organic Foxnuts / Makhana (HS 1904)",
    category: "Makhana & Superfoods",
    hsCode: "HS-1904",
    originCountry: "India 🇮🇳",
    destinationCountry: "United States",
    destinationFlag: "🇺🇸",
    price: 14.50,
    unit: "kg",
    leadCount: 28,
    status: "ACTIVE",
  },
  {
    id: 302,
    title: "Nashik Red Onions & Dehydrated Flakes (HS 0703)",
    category: "Fresh Produce",
    hsCode: "HS-0703",
    originCountry: "India 🇮🇳",
    destinationCountry: "Oman",
    destinationFlag: "🇴🇲",
    price: 380,
    unit: "metric ton",
    leadCount: 34,
    status: "ACTIVE",
  },
  {
    id: 305,
    title: "APEDA Halal Certified Frozen Buffalo Meat (HS 0202)",
    category: "Meat Exports",
    hsCode: "HS-0202",
    originCountry: "India 🇮🇳",
    destinationCountry: "China",
    destinationFlag: "🇨🇳",
    price: 3450,
    unit: "metric ton",
    leadCount: 41,
    status: "ACTIVE",
  },
  {
    id: 306,
    title: "Industrial CNC Lathe & Hydraulic Machinery (HS 8479)",
    category: "Machinery & Engineering",
    hsCode: "HS-8479",
    originCountry: "India 🇮🇳",
    destinationCountry: "Australia",
    destinationFlag: "🇦🇺",
    price: 12500,
    unit: "machine unit",
    leadCount: 17,
    status: "ACTIVE",
  },
];

export default function UserDashboardPage() {
  const [activeTab, setActiveTab] = useState<"overview" | "listings" | "profile">("overview");
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [listings, setListings] = useState<UserListing[]>(INITIAL_MY_LISTINGS);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Handle Profile Update
  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    setIsEditingProfile(false);
    setSuccessMessage("Profile settings updated successfully!");
    setTimeout(() => setSuccessMessage(""), 3000);
  };

  // Handle Listing Status Toggle
  const handleToggleStatus = (id: number) => {
    setListings((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: item.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">
      
      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-cyan-500/20 group-hover:scale-105 transition-transform duration-200">
              ⚡
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">Project Antigravity</span>
              <span className="text-xs text-cyan-400 font-mono ml-2">User Dashboard</span>
            </div>
          </Link>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2.5">
              <img src={profile.avatarUrl} alt={profile.name} className="w-8 h-8 rounded-full object-cover border border-slate-700" />
              <span className="text-xs font-semibold text-slate-200 hidden sm:inline">{profile.name}</span>
            </div>
            <Link
              href="/"
              className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-800 text-xs font-semibold text-slate-400 hover:text-slate-200 border border-slate-800 transition-colors duration-200"
            >
              Back to Catalog
            </Link>
          </div>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Banner Card */}
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 backdrop-blur-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={profile.avatarUrl} alt={profile.name} className="w-16 h-16 rounded-2xl object-cover border-2 border-cyan-500/30 shadow-lg shadow-cyan-500/10" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-bold text-white">{profile.company}</h1>
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {profile.role === "SUPPLIER" ? "Verified Indian Exporter 🇮🇳" : "Registered Importer 🌐"}
                </span>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {profile.location} • <span className="font-mono text-slate-300">IEC: {profile.iecCode}</span> • ⭐ {profile.rating} Rating
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setActiveTab("profile")}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-xs rounded-xl border border-slate-700 transition-colors duration-200 cursor-pointer"
            >
              Edit Profile Settings
            </button>
          </div>
        </div>

        {/* Success Alert */}
        {successMessage && (
          <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-sm font-medium flex items-center gap-2">
            <span>✅</span>
            <span>{successMessage}</span>
          </div>
        )}

        {/* Dashboard Navigation Tabs */}
        <div className="flex border-b border-slate-800 space-x-8">
          <button
            onClick={() => setActiveTab("overview")}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors duration-200 cursor-pointer ${
              activeTab === "overview"
                ? "border-cyan-400 text-cyan-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            📊 Analytics & KPIs
          </button>
          <button
            onClick={() => setActiveTab("listings")}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors duration-200 cursor-pointer ${
              activeTab === "listings"
                ? "border-cyan-400 text-cyan-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            📦 My Export Listings ({listings.length})
          </button>
          <button
            onClick={() => setActiveTab("profile")}
            className={`pb-3 text-sm font-bold border-b-2 transition-colors duration-200 cursor-pointer ${
              activeTab === "profile"
                ? "border-cyan-400 text-cyan-400"
                : "border-transparent text-slate-400 hover:text-slate-200"
            }`}
          >
            ⚙️ Account & Profile
          </button>
        </div>

        {/* --- TAB CONTENT: OVERVIEW --- */}
        {activeTab === "overview" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
                <div className="text-xs font-medium text-slate-400">Total Active Listings</div>
                <div className="text-3xl font-bold text-white mt-2">{listings.filter(l => l.status === "ACTIVE").length}</div>
                <div className="text-xs text-emerald-400 mt-2 font-medium">Makhana, Onions, Meat & Machinery</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
                <div className="text-xs font-medium text-slate-400">Matched Buyer Leads</div>
                <div className="text-3xl font-bold text-cyan-400 mt-2">
                  {listings.reduce((sum, l) => sum + l.leadCount, 0)}
                </div>
                <div className="text-xs text-slate-400 mt-2 font-medium">Across 6 Target Destinations</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
                <div className="text-xs font-medium text-slate-400">Top Destination Route</div>
                <div className="text-3xl font-bold text-white mt-2">🇨🇳 China / 🇺🇸 USA</div>
                <div className="text-xs text-purple-400 mt-2 font-medium">Meat & Makhana Superfoods</div>
              </div>

              <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
                <div className="text-xs font-medium text-slate-400">Seller Rating</div>
                <div className="text-3xl font-bold text-amber-400 mt-2">⭐ {profile.rating} / 5.0</div>
                <div className="text-xs text-emerald-400 mt-2 font-medium">APEDA & Customs Cleared</div>
              </div>
            </div>

            {/* Quick Action Banner */}
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg text-white">Expand Your Export Operations</h3>
                <p className="text-xs text-slate-400 mt-1">Add new agricultural produce or engineering machinery goods to connect with buyers in Poland, Netherlands, Australia, Oman, China & USA.</p>
              </div>
              <button
                onClick={() => setActiveTab("listings")}
                className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                + Add Export Listing
              </button>
            </div>
          </div>
        )}

        {/* --- TAB CONTENT: MY LISTINGS --- */}
        {activeTab === "listings" && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-white">My Export Products</h3>
                <p className="text-xs text-slate-400 mt-0.5">Manage listed commodities and track incoming buyer prospects</p>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-slate-800 bg-slate-950/50 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    <th className="py-4 px-6">Product Title & Category</th>
                    <th className="py-4 px-4">HS Code</th>
                    <th className="py-4 px-4">Target Corridor</th>
                    <th className="py-4 px-4">Export Price</th>
                    <th className="py-4 px-4">Matched Leads</th>
                    <th className="py-4 px-4">Status</th>
                    <th className="py-4 px-6 text-right">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 text-sm">
                  {listings.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-800/30 transition-colors duration-200">
                      <td className="py-4 px-6">
                        <div className="font-bold text-white">{item.title}</div>
                        <div className="text-xs text-slate-400 mt-0.5">{item.category}</div>
                      </td>
                      <td className="py-4 px-4 font-mono text-xs text-cyan-400">
                        {item.hsCode}
                      </td>
                      <td className="py-4 px-4 text-xs font-medium">
                        {item.destinationFlag} {item.destinationCountry}
                      </td>
                      <td className="py-4 px-4 font-mono text-sm text-slate-200">
                        ${item.price.toLocaleString()} / {item.unit}
                      </td>
                      <td className="py-4 px-4 font-mono font-bold text-emerald-400">
                        ⚡ {item.leadCount} Leads
                      </td>
                      <td className="py-4 px-4">
                        <span className={`px-2 py-0.5 text-xs rounded font-semibold ${
                          item.status === "ACTIVE" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" : "bg-slate-800 text-slate-400"
                        }`}>
                          {item.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right">
                        <button
                          onClick={() => handleToggleStatus(item.id)}
                          className="text-xs px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors duration-200 cursor-pointer"
                        >
                          Toggle {item.status === "ACTIVE" ? "Deactivate" : "Activate"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* --- TAB CONTENT: PROFILE SETTINGS --- */}
        {activeTab === "profile" && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-6 shadow-2xl backdrop-blur-sm max-w-3xl space-y-6">
            <div>
              <h3 className="font-bold text-lg text-white">Company & Exporter Profile</h3>
              <p className="text-xs text-slate-400 mt-0.5">Manage your business details, IEC registration, and contact information</p>
            </div>

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Company Name *</label>
                  <input
                    type="text"
                    required
                    value={profile.company}
                    onChange={(e) => setProfile({ ...profile, company: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Representative Name *</label>
                  <input
                    type="text"
                    required
                    value={profile.name}
                    onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Work Email Address *</label>
                  <input
                    type="email"
                    required
                    value={profile.email}
                    onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">IEC Trade Registration Code *</label>
                  <input
                    type="text"
                    required
                    value={profile.iecCode}
                    onChange={(e) => setProfile({ ...profile, iecCode: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50 font-mono text-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Location / Port of Origin</label>
                  <input
                    type="text"
                    value={profile.location}
                    onChange={(e) => setProfile({ ...profile, location: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Contact Phone</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Company Bio & Certifications</label>
                <textarea
                  rows={3}
                  value={profile.bio}
                  onChange={(e) => setProfile({ ...profile, bio: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-end">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm rounded-xl transition-colors duration-200 shadow-lg shadow-cyan-500/20 cursor-pointer"
                >
                  Save Profile Settings
                </button>
              </div>
            </form>
          </div>
        )}

      </div>
    </div>
  );
}
