"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { getSharedProductsFromDb, saveProductsToSharedDb, getSharedLeadsFromDb, saveLeadsToSharedDb, TradeLeadProspect, searchCommodityAutocomplete, AutocompleteCommodity, searchCountryAutocomplete, CountryAutocompleteEntry } from "../lib/api";

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
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<"overview" | "listings" | "profile">("overview");
  const [profile, setProfile] = useState<UserProfile>(INITIAL_PROFILE);
  const [listings, setListings] = useState<UserListing[]>([]);
  const [savedLeads, setSavedLeads] = useState<TradeLeadProspect[]>([]);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  // Sync Shared DB on Mount & Live Updates
  useEffect(() => {
    const loadSharedDb = () => {
      if (typeof window !== "undefined") {
        const sharedProducts = getSharedProductsFromDb([]);
        setListings(sharedProducts.map((p: any) => ({
          id: p.id,
          title: p.title,
          category: p.category,
          hsCode: p.hsCode,
          originCountry: p.originCountry || "India 🇮🇳",
          destinationCountry: p.destinationCountry,
          destinationFlag: p.destinationFlag || "🌐",
          price: p.price,
          unit: p.unit,
          leadCount: p.leadCount || 0,
          status: p.status || "ACTIVE",
        })));

        const sharedLeads = getSharedLeadsFromDb([]);
        setSavedLeads(sharedLeads);
      }
    };

    loadSharedDb();

    if (typeof window !== "undefined") {
      window.addEventListener("antigravity_db_updated", loadSharedDb);
      window.addEventListener("storage", loadSharedDb);
      return () => {
        window.removeEventListener("antigravity_db_updated", loadSharedDb);
        window.removeEventListener("storage", loadSharedDb);
      };
    }
  }, []);

  // Add Listing Modal State
  const [isAddListingModalOpen, setIsAddListingModalOpen] = useState(false);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<AutocompleteCommodity[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [countrySuggestionsListing, setCountrySuggestionsListing] = useState<CountryAutocompleteEntry[]>([]);
  const [showCountryAutocompleteListing, setShowCountryAutocompleteListing] = useState(false);

  const commodityAutocompleteRef = React.useRef<HTMLDivElement>(null);
  const countryAutocompleteRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commodityAutocompleteRef.current && !commodityAutocompleteRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false);
      }
      if (countryAutocompleteRef.current && !countryAutocompleteRef.current.contains(event.target as Node)) {
        setShowCountryAutocompleteListing(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const [newListingForm, setNewListingForm] = useState({
    title: "",
    category: "",
    customCategory: "",
    hsCode: "",
    destinationCountry: "",
    customCountry: "",
    customPortHub: "",
    price: 0,
    unit: "kg",
    description: "",
  });

  const handleCreateListing = (e: React.FormEvent) => {
    e.preventDefault();

    const targetName = newListingForm.destinationCountry || "Global Markets 🌐";

    const finalCategory = newListingForm.category === "CUSTOM"
      ? (newListingForm.customCategory.trim() || "General Exports")
      : newListingForm.category;

    const created: UserListing = {
      id: Date.now(),
      title: newListingForm.title,
      category: finalCategory,
      hsCode: newListingForm.hsCode.trim() || "HS-AUTO",
      originCountry: "India 🇮🇳",
      destinationCountry: targetName,
      destinationFlag: "🌐",
      price: Number(newListingForm.price),
      unit: newListingForm.unit || "unit",
      leadCount: 0,
      status: "ACTIVE",
    };

    setListings([created, ...listings]);
    setIsAddListingModalOpen(false);
    setSuccessMessage(`Commodity "${created.title}" published successfully!`);
    setTimeout(() => setSuccessMessage(""), 4000);

    // Reset form
    setNewListingForm({
      title: "",
      category: "Makhana & Superfoods",
      customCategory: "",
      hsCode: "",
      destinationCountry: "USA",
      customCountry: "",
      customPortHub: "",
      price: 15.0,
      unit: "kg",
      description: "",
    });
  };

  // Read User Session on Mount & Enforce Route Protection
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const saved = localStorage.getItem("antigravity_user_session");
      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          setProfile((prev) => ({
            ...prev,
            name: parsed.name || prev.name,
            email: parsed.email || prev.email,
            company: parsed.company || prev.company,
            role: parsed.role || prev.role,
            avatarUrl: parsed.avatarUrl || prev.avatarUrl,
          }));
        } catch (e) {
          console.error("Failed to parse user session", e);
        }
      } else {
        // Route protection: redirect to login if unauthenticated
        router.push("/login");
      }
    }
  }, [router]);

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("antigravity_user_session");
    }
    window.location.href = "/login";
  };

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
              🌏
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">Sino Magan Undus</span>
              <span className="text-xs text-cyan-400 font-mono ml-2">Global Trade Dashboard</span>
            </div>
          </Link>

          <div className="flex items-center gap-3">
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
            <button
              onClick={handleSignOut}
              className="px-3 py-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 border border-rose-500/20 text-xs font-semibold transition-colors duration-200 cursor-pointer"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <div className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
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
        <div className="flex border-b border-slate-800 space-x-6 sm:space-x-8 overflow-x-auto whitespace-nowrap scrollbar-none">
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
            {profile.role === "SUPPLIER" ? `📦 My Export Listings (${listings.length})` : `📑 Saved Import Inquiries (${listings.length})`}
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
            {profile.role === "SUPPLIER" ? (
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
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
                  <div className="text-xs font-medium text-slate-400">Active Import Inquiries</div>
                  <div className="text-3xl font-bold text-white mt-2">{listings.filter(l => l.status === "ACTIVE").length}</div>
                  <div className="text-xs text-cyan-400 mt-2 font-medium">Targeted Commodities & RFQs</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
                  <div className="text-xs font-medium text-slate-400">Verified Exporter Network</div>
                  <div className="text-3xl font-bold text-emerald-400 mt-2">48 Exporters</div>
                  <div className="text-xs text-slate-400 mt-2 font-medium">Verified Indian Exporters 🇮🇳</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
                  <div className="text-xs font-medium text-slate-400">Port Clearance ETAs</div>
                  <div className="text-3xl font-bold text-white mt-2">Pre-Cleared</div>
                  <div className="text-xs text-purple-400 mt-2 font-medium">LA, Rotterdam & Salalah Ports</div>
                </div>

                <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm">
                  <div className="text-xs font-medium text-slate-400">Importer Trust Score</div>
                  <div className="text-3xl font-bold text-amber-400 mt-2">⭐ {profile.rating} / 5.0</div>
                  <div className="text-xs text-emerald-400 mt-2 font-medium">FDA / GACC Pre-Approved</div>
                </div>
              </div>
            )}

            {/* Quick Action Banner */}
            <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-lg text-white">
                  {profile.role === "SUPPLIER" ? "Expand Your Export Operations" : "Source Premium Goods from India 🇮🇳"}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  {profile.role === "SUPPLIER"
                    ? "Add new agricultural produce or engineering machinery goods to connect with buyers in Poland, Netherlands, Australia, Oman, China & USA."
                    : "Post an Import Requirement (RFQ) for Makhana, Onions, Eggs, Potatoes, Meat, Machinery, or custom commodities directly to verified Indian exporters."}
                </p>
              </div>
              <button
                onClick={() => {
                  if (profile.role === "SUPPLIER") {
                    setActiveTab("listings");
                  } else {
                    setIsAddListingModalOpen(true);
                  }
                }}
                className="px-5 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-lg shadow-cyan-500/20 transition-colors duration-200 cursor-pointer whitespace-nowrap"
              >
                {profile.role === "SUPPLIER" ? "+ Add Export Listing" : "+ Post Import Requirement (RFQ)"}
              </button>
            </div>
          </div>
        )}

        {/* --- TAB CONTENT: MY LISTINGS --- */}
        {activeTab === "listings" && (
          <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
            <div className="p-5 border-b border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-lg text-white">
                  {profile.role === "SUPPLIER" ? "My Export Products" : "Saved Import Inquiries & Commodities"}
                </h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  {profile.role === "SUPPLIER"
                    ? "Manage listed commodities and track incoming buyer prospects"
                    : "Track target commodities and port clearance status from Indian exporters"}
                </p>
              </div>

              <button
                onClick={() => setIsAddListingModalOpen(true)}
                className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-md shadow-cyan-500/20 transition-colors duration-200 cursor-pointer flex items-center gap-1.5 whitespace-nowrap"
              >
                <span>{profile.role === "SUPPLIER" ? "+ Add New Listing" : "+ Post Import Requirement (RFQ)"}</span>
              </button>
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
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            href={`/products/${item.id}`}
                            className="text-xs px-2.5 py-1 rounded bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-semibold transition-colors duration-200"
                          >
                            📄 View Details & Compliance
                          </Link>
                          <button
                            onClick={() => handleToggleStatus(item.id)}
                            className="text-xs px-3 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 transition-colors duration-200 cursor-pointer"
                          >
                            Toggle {item.status === "ACTIVE" ? "Deactivate" : "Activate"}
                          </button>
                        </div>
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

      {/* --- ADD NEW LISTING MODAL --- */}
      {isAddListingModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-cyan-400">
                  {profile.role === "SUPPLIER" ? "EXPORTER INVENTORY PUBLISHER" : "IMPORTER RFQ PUBLISHER"}
                </span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  {profile.role === "SUPPLIER" ? "Add Export Commodity Listing" : "Post Import Requirement (RFQ)"}
                </h3>
              </div>
              <button
                onClick={() => setIsAddListingModalOpen(false)}
                className="text-slate-400 hover:text-slate-200 text-sm cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateListing} className="space-y-4">
              <div className="relative" ref={commodityAutocompleteRef}>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Commodity Title * <span className="text-[10px] text-cyan-400 font-mono">(Smart Autocomplete Active 💡)</span>
                </label>
                <input
                  type="text"
                  required
                  value={newListingForm.title}
                  onChange={(e) => {
                    const val = e.target.value;
                    setNewListingForm({ ...newListingForm, title: val });
                    const matches = searchCommodityAutocomplete(val);
                    setAutocompleteSuggestions(matches);
                    setShowAutocomplete(matches.length > 0);
                  }}
                  onFocus={() => {
                    const matches = searchCommodityAutocomplete(newListingForm.title);
                    setAutocompleteSuggestions(matches);
                    if (matches.length > 0) setShowAutocomplete(true);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50"
                  placeholder="Type commodity e.g. Ashwagandha, Nicotine Pouches, Makhana, Onions, Eggs..."
                />

                {/* Autocomplete Suggestions Popover Dropdown */}
                {showAutocomplete && autocompleteSuggestions.length > 0 && (
                  <div className="absolute left-0 right-0 top-full mt-1 bg-slate-950/95 border border-cyan-500/30 rounded-xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden max-h-60 overflow-y-auto">
                    <div className="px-3 py-1.5 bg-slate-900/80 border-b border-slate-800 text-[10px] font-mono text-cyan-400 flex items-center justify-between">
                      <span>💡 Suggested Export Commodities</span>
                      <span>Click to auto-fill details</span>
                    </div>
                    {autocompleteSuggestions.map((item, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => {
                          setNewListingForm({
                            ...newListingForm,
                            title: item.title,
                            category: item.category,
                            hsCode: item.hsCode,
                            price: item.defaultPrice,
                            unit: item.unit,
                          });
                          setShowAutocomplete(false);
                        }}
                        className="w-full px-3 py-2 text-left hover:bg-cyan-500/10 border-b border-slate-800/50 last:border-0 flex items-center justify-between transition-colors duration-150 cursor-pointer"
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-base">{item.icon}</span>
                          <div>
                            <div className="text-xs font-semibold text-slate-200">{item.title}</div>
                            <div className="text-[10px] text-slate-400 font-mono">{item.category} • ${item.defaultPrice}/{item.unit}</div>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                          {item.hsCode}
                        </span>
                      </button>
                    ))}
                  </div>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">Category *</label>
                  <select
                    required
                    value={newListingForm.category}
                    onChange={(e) => setNewListingForm({ ...newListingForm, category: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50 cursor-pointer"
                  >
                    <option value="" disabled hidden>Select Category / Sector...</option>
                    <option value="Makhana & Superfoods">Makhana & Superfoods</option>
                    <option value="Fresh Produce">Fresh Produce (Onions/Potatoes)</option>
                    <option value="Poultry & Eggs">Poultry & Eggs</option>
                    <option value="Meat Exports">Meat Exports</option>
                    <option value="Machinery & Engineering">Machinery & Engineering</option>
                    <option value="Ayurvedic & Herbal Extracts">Ayurvedic & Herbal Extracts</option>
                    <option value="Tobacco & Nicotine Pouches">Tobacco & Nicotine Pouches</option>
                    <option value="CUSTOM">✨ Custom Category / New Sector</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-400 mb-1">HS Code (Optional)</label>
                  <input
                    type="text"
                    value={newListingForm.hsCode}
                    onChange={(e) => setNewListingForm({ ...newListingForm, hsCode: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50 font-mono text-cyan-400"
                    placeholder="e.g. HS-0910 (Auto-assigned if left blank)"
                  />
                </div>
              </div>

              {/* Custom Category Input if CUSTOM selected */}
              {newListingForm.category === "CUSTOM" && (
                <div>
                  <label className="block text-xs font-medium text-cyan-400 mb-1">Custom Category Name *</label>
                  <input
                    type="text"
                    required
                    value={newListingForm.customCategory}
                    onChange={(e) => setNewListingForm({ ...newListingForm, customCategory: e.target.value })}
                    className="w-full bg-slate-950 border border-cyan-500/40 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. Bio-Pharmaceuticals, Renewable Energy, Spices..."
                  />
                </div>
              )}

              <div className="grid grid-cols-2 gap-3">
                <div className="relative" ref={countryAutocompleteRef}>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Target Destination Country <span className="text-[10px] text-cyan-400 font-mono">(Country Autocomplete 🌍)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newListingForm.destinationCountry}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNewListingForm({ ...newListingForm, destinationCountry: val });
                      const matches = searchCountryAutocomplete(val);
                      setCountrySuggestionsListing(matches);
                      setShowCountryAutocompleteListing(matches.length > 0);
                    }}
                    onFocus={() => {
                      const matches = searchCountryAutocomplete(newListingForm.destinationCountry);
                      setCountrySuggestionsListing(matches);
                      if (matches.length > 0) setShowCountryAutocompleteListing(true);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50 font-medium"
                    placeholder="Type country e.g. Germany 🇩🇪, Sweden 🇸🇪, USA 🇺🇸..."
                  />

                  {/* Country Autocomplete Popover Dropdown */}
                  {showCountryAutocompleteListing && countrySuggestionsListing.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-slate-950/95 border border-cyan-500/30 rounded-xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden max-h-60 overflow-y-auto">
                      <div className="px-3 py-1.5 bg-slate-900/80 border-b border-slate-800 text-[10px] font-mono text-cyan-400 flex items-center justify-between">
                        <span>🌍 Select Target Destination</span>
                        <span>Click to auto-fill Country & Port</span>
                      </div>
                      {countrySuggestionsListing.map((c, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setNewListingForm({
                              ...newListingForm,
                              destinationCountry: c.formattedName,
                              customPortHub: c.primaryPortHub,
                            });
                            setShowCountryAutocompleteListing(false);
                          }}
                          className="w-full px-3 py-2 text-left hover:bg-cyan-500/10 border-b border-slate-800/50 last:border-0 flex items-center justify-between transition-colors duration-150 cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <span className="text-base">{c.flag}</span>
                            <div>
                              <div className="text-xs font-semibold text-slate-200">{c.formattedName}</div>
                              <div className="text-[10px] text-slate-400 font-mono">{c.region}</div>
                            </div>
                          </div>
                          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                            {c.primaryPortHub}
                          </span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Specifications & Phytosanitary Notes</label>
                <textarea
                  rows={3}
                  value={newListingForm.description}
                  onChange={(e) => setNewListingForm({ ...newListingForm, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50"
                  placeholder="Describe trade packaging, grade, moisture levels, APEDA certificates..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsAddListingModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm transition-colors duration-200 shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  {profile.role === "SUPPLIER" ? "Publish Commodity Listing" : "Submit Import Requirement (RFQ)"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
