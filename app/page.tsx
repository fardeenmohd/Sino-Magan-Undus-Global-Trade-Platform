"use client";

import React, { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { findLeadsCompute, fetchProductsApi, streamLeadsCompute, getSharedProductsFromDb, saveProductsToSharedDb, getSharedLeadsFromDb, saveLeadsToSharedDb, TradeLeadProspect, searchCommodityAutocomplete, AutocompleteCommodity, searchCountryAutocomplete, CountryAutocompleteEntry } from "./lib/api";

export type UserRole = "BUYER" | "SUPPLIER" | "LEAD_PROSPECT" | "COMPUTE_AGENT";

export interface CatalogUser {
  id: number;
  name: string;
  email: string;
  company: string;
  role: UserRole;
  location: string;
  rating: number;
  avatarUrl: string;
}

export interface TradeProduct {
  id: number;
  title: string;
  description: string;
  category: string;
  hsCode: string;
  originCountry: string;
  destinationCountry: string;
  destinationFlag: string;
  portHub: string;
  tariffRatePct: number;
  price: number;
  unit: string;
  listedBy: CatalogUser;
  imageUrl: string;
  leadCount: number;
  status: "ACTIVE" | "INACTIVE";
  createdAt: string;
}



// Target Destinations
const DESTINATION_COUNTRIES = [
  { code: "ALL", name: "All Destinations", flag: "🌐" },
  { code: "Japan", name: "Japan", flag: "🇯🇵", hub: "Port of Yokohama" },
  { code: "Germany", name: "Germany", flag: "🇩🇪", hub: "Port of Hamburg" },
  { code: "Poland", name: "Poland", flag: "🇵🇱", hub: "Port of Gdańsk" },
  { code: "Netherlands", name: "Netherlands", flag: "🇳🇱", hub: "Port of Rotterdam" },
  { code: "Australia", name: "Australia", flag: "🇦🇺", hub: "Port of Sydney" },
  { code: "Oman", name: "Oman", flag: "🇴🇲", hub: "Port of Salalah" },
  { code: "China", name: "China", flag: "🇨🇳", hub: "Port of Shanghai" },
];

// Indian Exporters & Suppliers
const INITIAL_INDIAN_SUPPLIERS: CatalogUser[] = [
  {
    id: 10,
    name: "Bihar Organic Agro & Makhana Exim",
    email: "makhana@biharagro.in",
    company: "Bihar Makhana & Superfoods Ltd",
    role: "SUPPLIER",
    location: "Patna, Bihar 🇮🇳",
    rating: 5.0,
    avatarUrl: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 11,
    name: "Nashik Onion & Agri Producers Co.",
    email: "export@nashikonions.co.in",
    company: "Nashik Fresh Produce & Cold Chain",
    role: "SUPPLIER",
    location: "Nashik, Maharashtra 🇮🇳",
    rating: 4.9,
    avatarUrl: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 12,
    name: "Deccan Poultry & Egg Farms",
    email: "eggs@deccanpoultry.in",
    company: "Deccan Agro & Poultry Exports",
    role: "SUPPLIER",
    location: "Hyderabad, Telangana 🇮🇳",
    rating: 4.8,
    avatarUrl: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
  },
  {
    id: 13,
    name: "Gujarat Engineering & Machinery Works",
    email: "machinery@gujarateng.in",
    company: "Gujarat Industrial Equipment Ltd",
    role: "SUPPLIER",
    location: "Rajkot, Gujarat 🇮🇳",
    rating: 4.9,
    avatarUrl: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
  },
];

// Expanded Product Catalog featuring Ashwagandha, Nicotine Pouches, Makhana, Onions, Eggs, Potatoes, Meat, Machinery
const INITIAL_TRADE_PRODUCTS: TradeProduct[] = [
  {
    id: 299,
    title: "Organic Indian KSM-66 Ashwagandha Root Extract & Powder (HS 1211)",
    description: "HPLC standardized 5% Withanolides full-spectrum Ashwagandha root extract (Withania somnifera). USDA Organic, cGMP & ISO 22000 certified for US & EU nutraceutical brand manufacturing.",
    category: "Ayurvedic & Herbal Extracts",
    hsCode: "HS-1211",
    originCountry: "India 🇮🇳",
    destinationCountry: "Germany",
    destinationFlag: "🇩🇪",
    portHub: "Port of Hamburg",
    tariffRatePct: 2.8,
    price: 18.50,
    unit: "kg",
    listedBy: INITIAL_INDIAN_SUPPLIERS[0],
    imageUrl: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80",
    leadCount: 44,
    status: "ACTIVE",
    createdAt: "2026-07-26T09:00:00Z",
  },
  {
    id: 300,
    title: "Tobacco-Free White Nicotine Pouches & Swedish Style Snus (HS 2404)",
    description: "Premium pharma-grade oral nicotine pouches (6mg, 12mg, 20mg mint & fruit flavors). TPD2 compliant, foil sealed in 20-pouch cans for EU & US distribution.",
    category: "Tobacco & Nicotine Pouches",
    hsCode: "HS-2404",
    originCountry: "India 🇮🇳",
    destinationCountry: "Sweden",
    destinationFlag: "🇸🇪",
    portHub: "Port of Gothenburg / Gdańsk",
    tariffRatePct: 2.5,
    price: 2.45,
    unit: "can",
    listedBy: INITIAL_INDIAN_SUPPLIERS[0],
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
    price: 14.50,
    unit: "kg",
    listedBy: INITIAL_INDIAN_SUPPLIERS[0],
    imageUrl: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80",
    leadCount: 28,
    status: "ACTIVE",
    createdAt: "2026-07-22T08:00:00Z",
  },
  {
    id: 302,
    title: "Nashik Red Onions & Dehydrated Flakes (HS 0703)",
    description: "45mm+ export grade red Nashik onions with phytosanitary clearance, plus dehydrated onion powder for GCC food processing.",
    category: "Fresh Produce",
    hsCode: "HS-0703",
    originCountry: "India 🇮🇳",
    destinationCountry: "Oman",
    destinationFlag: "🇴🇲",
    portHub: "Port of Salalah",
    tariffRatePct: 5.0,
    price: 380,
    unit: "metric ton",
    listedBy: INITIAL_INDIAN_SUPPLIERS[1],
    imageUrl: "https://images.unsplash.com/photo-1618512496248-a07fe83aa8cb?w=600&auto=format&fit=crop&q=80",
    leadCount: 34,
    status: "ACTIVE",
    createdAt: "2026-07-21T10:30:00Z",
  },
  {
    id: 303,
    title: "Fresh Table Eggs & Whole Egg Powder (HS 0407)",
    description: "Phytosanitary certified fresh white table eggs (30 dozen crates) & spray-dried egg powder for European bakeries.",
    category: "Poultry & Eggs",
    hsCode: "HS-0407",
    originCountry: "India 🇮🇳",
    destinationCountry: "Netherlands",
    destinationFlag: "🇳🇱",
    portHub: "Port of Rotterdam",
    tariffRatePct: 2.8,
    price: 24,
    unit: "crate (360 eggs)",
    listedBy: INITIAL_INDIAN_SUPPLIERS[2],
    imageUrl: "https://images.unsplash.com/photo-1516448620398-c5f44bf9f441?w=600&auto=format&fit=crop&q=80",
    leadCount: 19,
    status: "ACTIVE",
    createdAt: "2026-07-20T14:15:00Z",
  },
  {
    id: 304,
    title: "Cold Storage Table & Processing Potatoes (HS 0701)",
    description: "Kufri Pukhraj cold storage potatoes with high dry matter content, suitable for French fries & processing plants.",
    category: "Fresh Produce",
    hsCode: "HS-0701",
    originCountry: "India 🇮🇳",
    destinationCountry: "Poland",
    destinationFlag: "🇵🇱",
    portHub: "Port of Gdańsk",
    tariffRatePct: 4.0,
    price: 290,
    unit: "metric ton",
    listedBy: INITIAL_INDIAN_SUPPLIERS[1],
    imageUrl: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80",
    leadCount: 22,
    status: "ACTIVE",
    createdAt: "2026-07-19T09:00:00Z",
  },
  {
    id: 305,
    title: "APEDA Halal Certified Frozen Buffalo Meat (HS 0202)",
    description: "APEDA approved boneless frozen buffalo meat (Bobby veal & forequarter cuts) in 20kg master cartons.",
    category: "Meat Exports",
    hsCode: "HS-0202",
    originCountry: "India 🇮🇳",
    destinationCountry: "China",
    destinationFlag: "🇨🇳",
    portHub: "Port of Shanghai",
    tariffRatePct: 6.5,
    price: 3450,
    unit: "metric ton",
    listedBy: INITIAL_INDIAN_SUPPLIERS[1],
    imageUrl: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&auto=format&fit=crop&q=80",
    leadCount: 41,
    status: "ACTIVE",
    createdAt: "2026-07-18T16:00:00Z",
  },
  {
    id: 306,
    title: "Industrial CNC Lathe & Hydraulic Machinery (HS 8479)",
    description: "Heavy duty CNC machinery, agricultural water pumps, and industrial gearboxes manufactured in Rajkot.",
    category: "Machinery & Engineering",
    hsCode: "HS-8479",
    originCountry: "India 🇮🇳",
    destinationCountry: "Australia",
    destinationFlag: "🇦🇺",
    portHub: "Port of Sydney",
    tariffRatePct: 4.0,
    price: 12500,
    unit: "machine unit",
    listedBy: INITIAL_INDIAN_SUPPLIERS[3],
    imageUrl: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80",
    leadCount: 17,
    status: "ACTIVE",
    createdAt: "2026-07-17T11:00:00Z",
  },
];

export default function ExpandedTradeCatalogPage() {
  const [products, setProducts] = useState<TradeProduct[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedDestination, setSelectedDestination] = useState("ALL");
  const [selectedCategory, setSelectedCategory] = useState("ALL");
  const [userSession, setUserSession] = useState<any>(null);
  
  // Read session & sync shared DB on mount + live updates
  React.useEffect(() => {
    const loadData = () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("antigravity_user_session");
        if (saved) {
          try {
            setUserSession(JSON.parse(saved));
          } catch (e) {
            console.error(e);
          }
        }

        const sharedProducts = getSharedProductsFromDb(INITIAL_TRADE_PRODUCTS);
        if (sharedProducts && sharedProducts.length > 0) {
          setProducts(sharedProducts);
        }
      }
    };

    loadData();

    if (typeof window !== "undefined") {
      window.addEventListener("antigravity_db_updated", loadData);
      window.addEventListener("storage", loadData);
      return () => {
        window.removeEventListener("antigravity_db_updated", loadData);
        window.removeEventListener("storage", loadData);
      };
    }
  }, []);

  const handleSignOut = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("antigravity_user_session");
    }
    setUserSession(null);
  };
  
  // Modals state
  const [selectedProduct, setSelectedProduct] = useState<TradeProduct | null>(null);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isListProductModalOpen, setIsListProductModalOpen] = useState(false);
  const [isComputing, setIsComputing] = useState(false);
  const [streamProgress, setStreamProgress] = useState(0);
  const [streamMessage, setStreamMessage] = useState("");
  const [discoveredLeads, setDiscoveredLeads] = useState<TradeLeadProspect[]>([]);
  const [autocompleteSuggestions, setAutocompleteSuggestions] = useState<AutocompleteCommodity[]>([]);
  const [showAutocomplete, setShowAutocomplete] = useState(false);
  const [countrySuggestionsRfq, setCountrySuggestionsRfq] = useState<CountryAutocompleteEntry[]>([]);
  const [showCountryAutocompleteRfq, setShowCountryAutocompleteRfq] = useState(false);

  const commodityAutocompleteRef = React.useRef<HTMLDivElement>(null);
  const countryAutocompleteRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (commodityAutocompleteRef.current && !commodityAutocompleteRef.current.contains(event.target as Node)) {
        setShowAutocomplete(false);
      }
      if (countryAutocompleteRef.current && !countryAutocompleteRef.current.contains(event.target as Node)) {
        setShowCountryAutocompleteRfq(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // List product form state
  const [newProductForm, setNewProductForm] = useState({
    title: "",
    description: "",
    category: "",
    customCategory: "",
    hsCode: "",
    destinationCountry: "",
    customCountry: "",
    customPortHub: "",
    tariffRatePct: 3.5,
    price: 0,
    unit: "kg",
    imageUrl: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80",
  });

  // Dynamically extract unique Destination Corridors from product catalog
  const activeCorridors = useMemo(() => {
    const list: { code: string; name: string; flag: string; hub?: string }[] = [
      { code: "ALL", name: "All Destinations", flag: "🌐" },
    ];

    const added = new Set<string>();

    DESTINATION_COUNTRIES.slice(1).forEach((d) => {
      list.push(d);
      added.add(d.name.toLowerCase());
    });

    products.forEach((p) => {
      const key = p.destinationCountry.toLowerCase();
      if (!added.has(key)) {
        added.add(key);
        list.push({
          code: p.destinationCountry,
          name: p.destinationCountry,
          flag: p.destinationFlag || "🌐",
          hub: p.portHub || "Custom Sea Port",
        });
      }
    });

    return list;
  }, [products]);

  // Filtered Catalog
  const filteredProducts = useMemo(() => {
    return products.filter((p) => {
      const matchesSearch =
        searchQuery === "" ||
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.hsCode.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.listedBy.company.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesDestination =
        selectedDestination === "ALL" ||
        p.destinationCountry.toLowerCase().includes(selectedDestination.toLowerCase());

      const matchesCategory =
        selectedCategory === "ALL" || p.category.toLowerCase() === selectedCategory.toLowerCase();

      return matchesSearch && matchesDestination && matchesCategory;
    });
  }, [products, searchQuery, selectedDestination, selectedCategory]);

  const categories = [
    "ALL",
    "Ayurvedic & Herbal Extracts",
    "Tobacco & Nicotine Pouches",
    "Makhana & Superfoods",
    "Fresh Produce",
    "Poultry & Eggs",
    "Meat Exports",
    "Machinery & Engineering",
  ];

  // Trigger Python FastAPI Compute Engine via Server-Sent Events (SSE) Stream
  const handleTriggerComputeAgent = (product: TradeProduct) => {
    setSelectedProduct(product);
    setIsComputing(true);
    setIsLeadModalOpen(true);
    setDiscoveredLeads([]);
    setStreamProgress(15);
    setStreamMessage("⚡ Connecting to Python FastAPI Compute Engine SSE Stream...");

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
          const newLeads = event.leads as any;
          setDiscoveredLeads(newLeads);
          setIsComputing(false);

          // 1. Increment target product leadCount
          setProducts((prev) =>
            prev.map((p) =>
              p.id === product.id ? { ...p, leadCount: p.leadCount + newLeads.length } : p
            )
          );

          // 2. Auto-extend product catalog with companion commodity for target country if not existing
          const COMPANIONS: Record<string, { title: string; category: string; hsCode: string; price: number; unit: string; img: string }> = {
            "United States": {
              title: "Salem Premium Nizamabad Turmeric Powder (HS 0910)",
              category: "Makhana & Superfoods",
              hsCode: "HS-0910",
              price: 4.80,
              unit: "kg",
              img: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=600&auto=format&fit=crop&q=80"
            },
            "Poland": {
              title: "Dehydrated Nashik Garlic Flakes & Granules (HS 0712)",
              category: "Fresh Produce",
              hsCode: "HS-0712",
              price: 3.20,
              unit: "kg",
              img: "https://images.unsplash.com/photo-1540148426945-6cf22a6b2383?w=600&auto=format&fit=crop&q=80"
            },
            "Netherlands": {
              title: "Organic White Sesame Seeds & Oleoresins (HS 1207)",
              category: "Makhana & Superfoods",
              hsCode: "HS-1207",
              price: 2.90,
              unit: "kg",
              img: "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80"
            },
            "Australia": {
              title: "High-Speed CNC Milling Machine Spare Components (HS 8466)",
              category: "Machinery & Engineering",
              hsCode: "HS-8466",
              price: 18500.00,
              unit: "unit",
              img: "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=600&auto=format&fit=crop&q=80"
            },
            "Oman": {
              title: "Frozen Halal Mutton & Goat Meat Carcasses (HS 0204)",
              category: "Meat Exports",
              hsCode: "HS-0204",
              price: 8.50,
              unit: "kg",
              img: "https://images.unsplash.com/photo-1603048588665-791ca8aea617?w=600&auto=format&fit=crop&q=80"
            },
            "China": {
              title: "Fresh Cold Storage Table Potatoes - Kufri Jyoti (HS 0701)",
              category: "Fresh Produce",
              hsCode: "HS-0701",
              price: 0.45,
              unit: "kg",
              img: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?w=600&auto=format&fit=crop&q=80"
            }
          };

          const matchedCountryKey = Object.keys(COMPANIONS).find(k => product.destinationCountry.toLowerCase().includes(k.toLowerCase()));
          if (matchedCountryKey) {
            const companion = COMPANIONS[matchedCountryKey];
            setProducts((prev) => {
              const exists = prev.some(p => p.title.toLowerCase() === companion.title.toLowerCase());
              if (!exists) {
                const newCatalogItem: TradeProduct = {
                  id: Date.now(),
                  title: companion.title,
                  description: `AI-discovered high demand trade commodity for ${product.destinationCountry}. Cleared for cross-border export.`,
                  category: companion.category,
                  hsCode: companion.hsCode,
                  originCountry: "India 🇮🇳",
                  destinationCountry: product.destinationCountry,
                  destinationFlag: product.destinationFlag || "🌐",
                  portHub: product.portHub || "Main Sea Port",
                  tariffRatePct: product.tariffRatePct,
                  price: companion.price,
                  unit: companion.unit,
                  listedBy: INITIAL_INDIAN_SUPPLIERS[0],
                  imageUrl: companion.img,
                  leadCount: newLeads.length,
                  status: "ACTIVE",
                  createdAt: new Date().toISOString(),
                };
                return [newCatalogItem, ...prev];
              }
              return prev;
            });
          }
        }
      }
    );
  };

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    const effectiveCategory = newProductForm.category === "CUSTOM"
      ? (newProductForm.customCategory.trim() || "General Exports")
      : newProductForm.category;

    const created: TradeProduct = {
      id: Date.now(),
      title: newProductForm.title,
      description: newProductForm.description,
      category: effectiveCategory,
      hsCode: newProductForm.hsCode.trim() || "HS-AUTO",
      originCountry: "India 🇮🇳",
      destinationCountry: newProductForm.destinationCountry || "Global Markets 🌐",
      destinationFlag: "🌐",
      portHub: newProductForm.customPortHub || "Primary Maritime Port",
      tariffRatePct: Number(newProductForm.tariffRatePct),
      price: Number(newProductForm.price),
      unit: newProductForm.unit,
      listedBy: INITIAL_INDIAN_SUPPLIERS[0],
      imageUrl: newProductForm.imageUrl || "https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80",
      leadCount: 0,
      status: "ACTIVE",
      createdAt: new Date().toISOString(),
    };

    setProducts([created, ...products]);
    setIsListProductModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-cyan-500/30">

      {/* --- TOP NAVIGATION BAR --- */}
      <header className="sticky top-0 z-40 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-cyan-500 to-blue-600 flex items-center justify-center text-slate-950 font-black text-xl shadow-lg shadow-cyan-500/20">
              🌏
            </div>
            <div>
              <span className="font-extrabold text-lg tracking-tight text-white">Sino Magan Undus</span>
              <span className="text-xs text-cyan-400 font-mono ml-2">Global Trade Engine</span>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-400">
            <a href="#catalog" className="hover:text-cyan-400 transition-colors duration-200">Commodity Catalog</a>
            <a href="#corridors" className="hover:text-cyan-400 transition-colors duration-200">Trade Corridors</a>
            <a href="#suppliers" className="hover:text-cyan-400 transition-colors duration-200">Indian Exporters</a>
          </div>

          <div className="flex items-center gap-3">
            {userSession ? (
              <>
                <span className="hidden lg:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-cyan-500/10 text-cyan-400 border border-cyan-500/20">
                  {userSession.role === "SUPPLIER" ? "🇮🇳 Indian Exporter" : "🌐 Importer"}
                </span>
                <Link
                  href="/dashboard"
                  className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-cyan-400 font-semibold text-xs sm:text-sm border border-slate-800 transition-colors duration-200 cursor-pointer flex items-center gap-1.5"
                >
                  <span>📊 My Dashboard</span>
                </Link>
                {userSession.role === "SUPPLIER" ? (
                  <button
                    onClick={() => setIsListProductModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors duration-200 shadow-md shadow-cyan-500/20 cursor-pointer"
                  >
                    + List Indian Goods
                  </button>
                ) : (
                  <button
                    onClick={() => setIsListProductModalOpen(true)}
                    className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors duration-200 shadow-md shadow-cyan-500/20 cursor-pointer"
                  >
                    + Post Import RFQ
                  </button>
                )}
                <button
                  onClick={handleSignOut}
                  className="px-3 py-2 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 text-rose-400 font-semibold text-xs sm:text-sm border border-rose-500/20 transition-colors duration-200 cursor-pointer"
                >
                  Sign Out
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-3.5 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-slate-200 font-semibold text-xs sm:text-sm border border-slate-800 transition-colors duration-200 cursor-pointer"
                >
                  Sign In
                </Link>
                <Link
                  href="/register"
                  className="px-3.5 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-xs sm:text-sm transition-colors duration-200 shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* --- HERO SECTION --- */}
      <section className="relative overflow-hidden pt-16 pb-12 border-b border-slate-800/60 bg-gradient-to-b from-slate-900/50 via-slate-950 to-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 text-xs font-medium">
            <span>🌏 SINO MAGAN UNDUS GLOBAL TRADE • EXIM NETWORK</span>
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent max-w-5xl mx-auto leading-tight">
            Sino Magan Undus Global Trade
          </h1>

          <p className="text-slate-400 text-base sm:text-lg max-w-3xl mx-auto">
            Premier B2B cross-border trade engine connecting verified Indian exporters of Makhana, Onions, Eggs, Potatoes, Meat & Machinery with global importers across Poland 🇵🇱, Netherlands 🇳🇱, Australia 🇦🇺, Oman 🇴🇲, China 🇨🇳, USA 🇺🇸, and custom corridors.
          </p>

          {/* Search Bar */}
          <div className="max-w-3xl mx-auto pt-4">
            <div className="bg-slate-900/90 border border-slate-800 p-2 rounded-xl shadow-2xl flex flex-col sm:flex-row gap-2 backdrop-blur-md">
              <div className="relative flex-1">
                <svg className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input
                  type="text"
                  placeholder="Search Makhana, Onions, Eggs, Potatoes, Meat, Machinery or HS Code..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent border-0 pl-10 pr-4 py-2.5 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-0"
                />
              </div>

              <button
                onClick={() => {}}
                className="px-6 py-2.5 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm rounded-lg transition-colors duration-200 cursor-pointer"
              >
                Search Commodity Leads
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* --- DESTINATION CORRIDOR SELECTOR --- */}
      <section id="corridors" className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-slate-900/60 border border-slate-800/80 rounded-2xl p-5 backdrop-blur-sm space-y-3">
          <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
            <span>SELECT DESTINATION COUNTRY CORRIDOR FROM INDIA 🇮🇳</span>
            <span>{activeCorridors.length - 1} TARGET TRADE DESTINATIONS</span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 2xl:grid-cols-8 gap-2.5">
            {activeCorridors.map((dest) => (
              <button
                key={dest.code}
                onClick={() => setSelectedDestination(dest.code)}
                className={`p-3 rounded-xl border text-left transition-all duration-200 cursor-pointer ${
                  selectedDestination.toLowerCase() === dest.code.toLowerCase()
                    ? "bg-cyan-500/20 border-cyan-500/40 text-white shadow-lg shadow-cyan-500/10"
                    : "bg-slate-950 border-slate-800 text-slate-400 hover:border-slate-700 hover:text-slate-200"
                }`}
              >
                <div className="text-xl mb-1">{dest.flag}</div>
                <div className="font-bold text-xs truncate">{dest.name}</div>
                {dest.hub && <div className="text-[10px] text-slate-500 truncate">{dest.hub}</div>}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* --- CATALOG GRID SECTION --- */}
      <section id="catalog" className="max-w-7xl 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-800/80 pb-6">
          <div>
            <h2 className="text-2xl font-bold text-white">India Export Commodity Catalog</h2>
            <p className="text-xs text-slate-400 mt-1">Listing certified export goods & active international buyer leads</p>
          </div>

          {/* Category Pills */}
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors duration-200 cursor-pointer ${
                  selectedCategory.toLowerCase() === cat.toLowerCase()
                    ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                    : "bg-slate-900 text-slate-400 border border-slate-800 hover:text-slate-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredProducts.length === 0 ? (
          <div className="p-12 text-center bg-slate-900/40 border border-slate-800 rounded-3xl space-y-4 max-w-xl mx-auto my-8">
            <div className="text-4xl">📭</div>
            <h3 className="text-lg font-bold text-white">No Export Products Listed Yet</h3>
            <p className="text-xs text-slate-400">The platform data slate is clean. Use the Admin Control Center or Exporter Dashboard to publish authentic Indian export products or run the Super-Trigger engine.</p>
            <div className="pt-2 flex justify-center gap-3">
              <Link href="/admin" className="px-4 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-xl shadow-md">
                ⚡ Go to Admin Control Center
              </Link>
              <Link href="/dashboard" className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl border border-slate-700">
                📦 Add Product as Exporter
              </Link>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-6">
            {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-slate-900/60 border border-slate-800/80 rounded-2xl overflow-hidden shadow-xl hover:border-slate-700/80 transition-all duration-200 flex flex-col group"
            >
              {/* Product Image Banner */}
              <div className="relative h-48 overflow-hidden bg-slate-950">
                <img
                  src={product.imageUrl}
                  alt={product.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-3 left-3 flex gap-2">
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-mono font-bold bg-slate-950/90 text-cyan-400 border border-cyan-500/30 backdrop-blur-sm">
                    {product.hsCode}
                  </span>
                  <Link
                    href={`/countries/${product.destinationCountry.toLowerCase()}`}
                    className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-slate-950/90 text-slate-200 border border-slate-700 backdrop-blur-sm hover:border-cyan-400 hover:text-cyan-400 transition-colors"
                  >
                    {product.destinationFlag} {product.destinationCountry}
                  </Link>
                </div>
                <span className="absolute bottom-3 right-3 px-2.5 py-1 rounded-lg bg-emerald-950/90 text-emerald-400 border border-emerald-800/40 text-xs font-mono font-semibold backdrop-blur-sm">
                  ⚡ {product.leadCount} Buyer Leads
                </span>
              </div>

              {/* Card Body */}
              <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="text-[11px] text-slate-400 flex items-center justify-between font-mono">
                    <span>Origin: {product.originCountry}</span>
                    <span>Tariff: {product.tariffRatePct}% duty</span>
                  </div>
                  <h3 className="font-bold text-base text-white group-hover:text-cyan-400 transition-colors duration-200 leading-snug">
                    {product.title}
                  </h3>
                  <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                    {product.description}
                  </p>
                </div>

                {/* Pricing & Exporter Info */}
                <div className="pt-3 border-t border-slate-800/60 space-y-3">
                  <div className="flex items-baseline justify-between">
                    <span className="text-xs text-slate-400">Export Unit Price</span>
                    <span className="text-lg font-bold text-white font-mono">
                      ${product.price.toLocaleString()}{" "}
                      <span className="text-xs text-slate-400 font-normal">/ {product.unit}</span>
                    </span>
                  </div>

                  {/* Exporter Info */}
                  <Link
                    href={`/exporters/${product.listedBy?.id || 10}`}
                    className="flex items-center gap-2.5 pt-1 group/exporter hover:opacity-80 transition-opacity"
                  >
                    <img
                      src={product.listedBy.avatarUrl}
                      alt={product.listedBy.name}
                      className="w-7 h-7 rounded-full object-cover border border-slate-700"
                    />
                    <div className="text-xs truncate">
                      <span className="text-slate-200 font-medium group-hover/exporter:text-cyan-400 transition-colors">{product.listedBy.company}</span>
                      <div className="text-slate-400 text-[10px]">{product.listedBy.location}</div>
                    </div>
                  </Link>

                  {/* Action Button */}
                  <div className="grid grid-cols-1 gap-2 pt-1">
                    <Link
                      href={`/products/${product.id}`}
                      className="w-full py-2 px-3 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold text-xs transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <span>📄 View Product Details & Compliance</span>
                    </Link>
                    <button
                      onClick={() => handleTriggerComputeAgent(product)}
                      className="w-full py-2 px-3 rounded-xl bg-slate-800 hover:bg-cyan-500 hover:text-slate-950 text-slate-200 font-bold text-xs transition-colors duration-200 flex items-center justify-center gap-1.5 cursor-pointer shadow-md"
                    >
                      <span>🤖 Run AI Buyer Lead Matcher ({product.destinationCountry})</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      </section>

      {/* --- EXPORT SUPPLIERS DIRECTORY --- */}
      <section id="suppliers" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 border-t border-slate-800/60 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-white">Verified Indian Exporters</h2>
          <p className="text-xs text-slate-400 mt-1">Exporters shipping Makhana, Onions, Eggs, Potatoes, Meat & Machinery to Poland, Netherlands, Australia, Oman, China & USA</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {INITIAL_INDIAN_SUPPLIERS.map((supplier) => (
            <div key={supplier.id} className="bg-slate-900/40 border border-slate-800/80 rounded-2xl p-4 flex items-center gap-4">
              <img src={supplier.avatarUrl} alt={supplier.name} className="w-12 h-12 rounded-full object-cover border border-slate-700" />
              <div>
                <h4 className="font-bold text-sm text-white">{supplier.name}</h4>
                <p className="text-xs text-cyan-400">{supplier.company}</p>
                <p className="text-xs text-slate-500 mt-0.5">{supplier.location} • ⭐ {supplier.rating}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* --- AI DISCOVERED LEADS MODAL --- */}
      {isLeadModalOpen && selectedProduct && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-2xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <span className="text-xs font-mono text-cyan-400 uppercase">Python FastAPI Trade Engine</span>
                <h3 className="text-lg font-bold text-white mt-0.5">
                  Import Buyer Prospects in {selectedProduct.destinationCountry} {selectedProduct.destinationFlag}
                </h3>
              </div>
              <button onClick={() => setIsLeadModalOpen(false)} className="text-slate-400 hover:text-slate-200 text-sm cursor-pointer">
                ✕
              </button>
            </div>

            {isComputing ? (
              <div className="py-8 px-4 space-y-5 bg-slate-950/80 border border-slate-800 rounded-xl">
                <div className="flex items-center justify-between text-xs font-mono">
                  <span className="text-cyan-400 font-bold flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping"></span>
                    SSE LIVE TRADE PIPELINE STREAM
                  </span>
                  <span className="text-slate-400">{streamProgress}% COMPLETE</span>
                </div>

                <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-800">
                  <div
                    className="bg-gradient-to-r from-cyan-500 to-blue-500 h-full transition-all duration-300 rounded-full"
                    style={{ width: `${streamProgress}%` }}
                  ></div>
                </div>

                <div className="p-3 bg-slate-900 border border-slate-800/80 rounded-lg text-xs font-mono text-slate-200">
                  {streamMessage || "⚡ Initializing FastAPI Compute Agent SSE Stream..."}
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="bg-slate-950 border border-slate-800/80 p-3 rounded-xl flex items-center justify-between text-xs font-mono text-slate-300">
                  <span>Product: {selectedProduct.title}</span>
                  <span className="text-cyan-400">Tariff: {selectedProduct.tariffRatePct}%</span>
                </div>

                <div className="space-y-2.5 max-h-96 overflow-y-auto pr-1">
                  {discoveredLeads.map((lead) => (
                    <div key={lead.user_id} className="bg-slate-950 border border-slate-800 p-4 rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-sm text-slate-100">{lead.name}</h4>
                          <span className="text-xs font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                            {lead.match_score}% Match
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-0.5">{lead.company} • {lead.destination_country}</p>
                        <p className="text-xs text-slate-500 italic mt-1">Port Hub: {lead.port_hub} | {lead.confidence_reason}</p>
                      </div>

                      <button
                        onClick={() => {
                          const existing = getSharedLeadsFromDb([]);
                          const isDup = existing.some((l) => l.email?.toLowerCase() === lead.email?.toLowerCase() || (l.company === lead.company && l.destination_country === lead.destination_country));
                          if (isDup) {
                            alert(`ℹ️ Buyer Prospect ${lead.name} (${lead.company}) is already saved in the platform database!`);
                          } else {
                            saveLeadsToSharedDb([lead, ...existing]);
                            alert(`✅ Buyer Prospect ${lead.name} (${lead.company}) successfully saved & imported into the platform database!`);
                          }
                        }}
                        className="px-3.5 py-2 bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs rounded-lg transition-colors duration-200 whitespace-nowrap cursor-pointer shadow-md"
                      >
                        Import Trade Lead
                      </button>
                    </div>
                  ))}
                </div>

                <div className="pt-3 border-t border-slate-800 flex justify-end">
                  <button
                    onClick={() => setIsLeadModalOpen(false)}
                    className="px-4 py-2 bg-slate-800 text-slate-300 text-sm rounded-lg hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}

      {/* --- LIST PRODUCT MODAL --- */}
      {isListProductModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-lg font-bold text-white">
                {userSession && userSession.role === "BUYER" ? "Post Import Requirement (RFQ)" : "List Indian Export Goods"}
              </h3>
              <button onClick={() => setIsListProductModalOpen(false)} className="text-slate-400 hover:text-slate-200 text-sm cursor-pointer">
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateProduct} className="space-y-4">
              <div className="relative" ref={commodityAutocompleteRef}>
                <label className="block text-xs font-medium text-slate-400 mb-1">
                  Product Title * <span className="text-[10px] text-cyan-400 font-mono">(Smart Autocomplete Active 💡)</span>
                </label>
                <input
                  type="text"
                  required
                  value={newProductForm.title}
                  onChange={(e) => {
                    const val = e.target.value;
                    setNewProductForm({ ...newProductForm, title: val });
                    const matches = searchCommodityAutocomplete(val);
                    setAutocompleteSuggestions(matches);
                    setShowAutocomplete(matches.length > 0);
                  }}
                  onFocus={() => {
                    const matches = searchCommodityAutocomplete(newProductForm.title);
                    setAutocompleteSuggestions(matches);
                    if (matches.length > 0) setShowAutocomplete(true);
                  }}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50"
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
                          setNewProductForm({
                            ...newProductForm,
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
                  <label className="block text-xs font-medium text-slate-400 mb-1">HS Code (Optional)</label>
                  <input
                    type="text"
                    value={newProductForm.hsCode}
                    onChange={(e) => setNewProductForm({ ...newProductForm, hsCode: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50"
                    placeholder="e.g. HS-1904 (Auto-assigned if left blank)"
                  />
                </div>

                <div className="relative" ref={countryAutocompleteRef}>
                  <label className="block text-xs font-medium text-slate-400 mb-1">
                    Target Destination Country <span className="text-[10px] text-cyan-400 font-mono">(Country Autocomplete 🌍)</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={newProductForm.destinationCountry}
                    onChange={(e) => {
                      const val = e.target.value;
                      setNewProductForm({ ...newProductForm, destinationCountry: val });
                      const matches = searchCountryAutocomplete(val);
                      setCountrySuggestionsRfq(matches);
                      setShowCountryAutocompleteRfq(matches.length > 0);
                    }}
                    onFocus={() => {
                      const matches = searchCountryAutocomplete(newProductForm.destinationCountry);
                      setCountrySuggestionsRfq(matches);
                      if (matches.length > 0) setShowCountryAutocompleteRfq(true);
                    }}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50 font-medium"
                    placeholder="Type country e.g. Germany 🇩🇪, Sweden 🇸🇪, USA 🇺🇸..."
                  />

                  {/* Country Autocomplete Popover Dropdown */}
                  {showCountryAutocompleteRfq && countrySuggestionsRfq.length > 0 && (
                    <div className="absolute left-0 right-0 top-full mt-1 bg-slate-950/95 border border-cyan-500/30 rounded-xl shadow-2xl backdrop-blur-xl z-50 overflow-hidden max-h-60 overflow-y-auto">
                      <div className="px-3 py-1.5 bg-slate-900/80 border-b border-slate-800 text-[10px] font-mono text-cyan-400 flex items-center justify-between">
                        <span>🌍 Select Target Destination</span>
                        <span>Click to auto-fill Country & Port</span>
                      </div>
                      {countrySuggestionsRfq.map((c, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => {
                            setNewProductForm({
                              ...newProductForm,
                              destinationCountry: c.formattedName,
                              customPortHub: c.primaryPortHub,
                            });
                            setShowCountryAutocompleteRfq(false);
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
                <label className="block text-xs font-medium text-slate-400 mb-1">Category *</label>
                <select
                  required
                  value={newProductForm.category}
                  onChange={(e) => setNewProductForm({ ...newProductForm, category: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50 cursor-pointer"
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

              {/* Custom Category Input if CUSTOM selected */}
              {newProductForm.category === "CUSTOM" && (
                <div>
                  <label className="block text-xs font-medium text-cyan-400 mb-1">Custom Category Name *</label>
                  <input
                    type="text"
                    required
                    value={newProductForm.customCategory}
                    onChange={(e) => setNewProductForm({ ...newProductForm, customCategory: e.target.value })}
                    className="w-full bg-slate-950 border border-cyan-500/40 rounded-xl px-3 py-1.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-400"
                    placeholder="e.g. Bio-Pharmaceuticals, Renewable Energy, Spices..."
                  />
                </div>
              )}

              <div>
                <label className="block text-xs font-medium text-slate-400 mb-1">Description *</label>
                <textarea
                  rows={3}
                  required
                  value={newProductForm.description}
                  onChange={(e) => setNewProductForm({ ...newProductForm, description: e.target.value })}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl p-2.5 text-sm text-slate-100 focus:outline-none focus:border-cyan-500/50"
                  placeholder="Describe product specifications, APEDA/Phytosanitary clearances, and export packaging..."
                ></textarea>
              </div>

              <div className="flex justify-end gap-3 pt-3 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setIsListProductModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 text-sm hover:bg-slate-700 transition-colors duration-200 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-colors duration-200 shadow-md shadow-cyan-500/20 cursor-pointer"
                >
                  {userSession && userSession.role === "BUYER" ? "Submit Import Requirement (RFQ)" : "Publish Goods"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* --- FOOTER --- */}
      <footer className="border-t border-slate-800/80 bg-slate-950/90 py-8 text-slate-500 text-xs mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <span className="text-base">🌏</span>
            <span className="font-bold text-slate-300">Sino Magan Undus Global Trade</span>
            <span className="text-slate-600">|</span>
            <span>Cross-Border ExIm Lead Engine</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/admin" className="text-slate-500 hover:text-cyan-400 font-mono transition-colors duration-200">
              🛡️ Admin Portal
            </Link>
            <p>© 2026 Sino Magan Undus Global Trade. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
