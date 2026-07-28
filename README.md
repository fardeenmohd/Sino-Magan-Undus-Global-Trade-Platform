# 🌏 Sino Magan Undus Global Trade Platform

> **Cross-Border India Export/Import Lead Discovery Engine & AI Trade Matchmaker**

[![License](https://img.shields.io/badge/License-MIT-blue.svg)](LICENSE)
[![Next.js](https://img.shields.io/badge/Next.js-14.2-black?logo=next.js)](https://nextjs.org/)
[![Spring Boot](https://img.shields.io/badge/Spring%20Boot-3.2-brightgreen?logo=springboot)](https://spring.io/projects/spring-boot)
[![FastAPI](https://img.shields.io/badge/FastAPI-0.140-teal?logo=fastapi)](https://fastapi.tiangolo.com/)
[![Python](https://img.shields.io/badge/Python-3.14-blue?logo=python)](https://www.python.org/)

---

## 📖 Overview

**Sino Magan Undus Global Trade** is an enterprise-grade cross-border trade matchmaking platform linking Indian exporters with international importers across key global trade corridors (*USA 🇺🇸, Poland 🇵🇱, Netherlands 🇳🇱, Australia 🇦🇺, Oman 🇴🇲, China 🇨🇳, Germany 🇩🇪, UAE 🇦🇪, Sweden 🇸🇪, United Kingdom 🇬🇧, Japan 🇯🇵*).

The platform combines a **Next.js 14** web application, a **Spring Boot 3 Java API backend**, and an asynchronous **Python FastAPI Compute Engine** delivering real-time **Server-Sent Events (SSE)** AI lead discovery streaming.

---

## ✨ Key Features

### 1. 💡 Smart Product & Commodity Title Autocomplete Engine
- Interactive real-time autocomplete popover across **Post Import Requirement (RFQ)** and **Add Export Listing** forms on the Landing Page (`/`), User Dashboard (`/dashboard`), and Admin Portal (`/admin`).
- Selecting any suggestion automatically auto-fills: **Product Title**, **Category**, **HS Code**, and **FOB Unit Price ($)**.

### 2. ⚡ Real-Time Server-Sent Events (SSE) AI Lead Discovery
- Stream live 4-stage pipeline execution directly inside the browser:
  - 🔍 **Stage 1 (25%)**: *Global Trade Registry Scraper*
  - 🚢 **Stage 2 (50%)**: *Ocean Freight & Customs Tariff Calculator*
  - 🛡️ **Stage 3 (75%)**: *FDA / APEDA / TPD2 / MHRA Compliance Clearance*
  - ✅ **Stage 4 (100%)**: *Scraped Importer Match Delivery*

### 2. 🌿 Featured Initial Commodity Lines & Seeded Buyer Prospects
- **🌱 Organic KSM-66 Ashwagandha Root Extract (`HS-1211`)**: 5% Withanolides HPLC grade ($18.50/kg). Seeded buyers in USA 🇺🇸, Germany 🇩🇪, UK 🇬🇧 (*Dr. Marcus Thorne, Dr. Anke Hoffmann, Oliver Bennett*).
- **🌿 Tobacco-Free White Nicotine Pouches & Swedish Style Snus (`HS-2404`)**: 6mg/12mg/20mg foil cans ($2.45/can). Seeded buyers in Sweden 🇸🇪, Poland 🇵🇱, USA 🇺🇸 (*Erik Lindqvist, Marek Dabrowski, Brandon Vance*).
- **🍿 Bihar Organic Foxnuts / Makhana (`HS-1904`)**: Grade-A gorgon nuts ($14.50/kg). Seeded buyers in USA 🇺🇸 (*David Miller, Jennifer Hayes*).
- **🧅 Nashik Red Onions & Dehydrated Flakes (`HS-0703`)**: Fresh produce & flakes ($0.85/kg). Seeded buyers in Poland 🇵🇱 (*Piotr Wisniewski*).
- **🥚 Namakkal Fresh White Table Eggs (`HS-0407`)**: 30-egg tray packs ($2.10/pack). Seeded buyers in Netherlands 🇳🇱 (*Sophie van der Meer*).
- **🥔 Cold Storage Table Potatoes (`HS-0701`)**: Kufri Jyoti potatoes ($0.45/kg). Seeded buyers in China 🇨🇳 (*Li Gang*).
- **🥩 Frozen Halal Meat Exports (`HS-0202` / `HS-0204`)**: Boneless buffalo & goat carcasses ($3.45/kg). Seeded buyers in Oman 🇴🇲 (*Nasser Al-Harthy*).
- **⚙️ CNC Lathe & Hydraulic Engineering Machinery (`HS-8479` / `HS-8466`)**: Industrial gearboxes & CNC components ($12,500/unit). Seeded buyers in Australia 🇦🇺 (*Harrison Forde*).

### 3. 🌐 Universal Shared Database Persistence
- All published products, RFQs, and AI-discovered buyer leads are written to a **shared platform database** that instantly synchronizes across all users (*Exporters, Importers, Visitors*) and the **Admin Command Center (`/admin`)**.

### 4. 🔒 Protected Admin Portal & Compute Control Center (`/admin`)
- **Route**: `http://localhost:3000/admin`
- **Credentials**: `admin@sinomaganundus.global` / `AdminSecret2026!`
- **Executive KPI Cards**: Total Export Goods, Importer Prospects, FOB Valuation, Python Engine Status.
- **Master Exporting Goods & Import Leads Tables**: Complete CRUD and status management.
- **🛡️ Lead Verification & Authenticity System**: High-trust buyer prospect verification displaying official corporate registration IDs (DUNS, VAT, NIP, KVK, ABN, Trade License numbers), corporate email domains, and **`🛡️ PLATINUM CUSTOMS VERIFIED`** audit badges across all discovery tools, Super-Trigger outputs, and product detail pages.
- **🇮🇳 India Exporters Focus & USA Removal**: Platform exclusively showcases export products and suppliers from **India 🇮🇳**. Completely removed USA 🇺🇸 from destination corridors, country autocomplete databases, preset trade routes, sample product catalog, and import lead generators. Supported destination corridors include Japan 🇯🇵, Germany 🇩🇪, Sweden 🇸🇪, Poland 🇵🇱, Netherlands 🇳🇱, Australia 🇦🇺, Oman 🇴🇲, UAE 🇦🇪, China 🇨🇳.
- **🇯🇵 Japan 🇯🇵 Corridor & Product Intelligence Details Page (`/products/[id]`)**: Full support for Japan 🇯🇵 (`Port of Yokohama / Tokyo`) across all forms and filters. Features dedicated **Product Details Page** (`/products/[id]`) displaying export technical specifications, regulatory clearance matrix (Japan MAFF/MHLW, US FDA, EU EFSA, GSO Halal), verified import buyer prospects, and in-country bonded warehouse distributors.
- **🌍 Smart Country & Commodity Autocomplete Engine**: Real-time popover autocompletes for Target Destination country (with flags & primary sea port hubs) and Export Commodities across Public RFQ form (`/`), Exporter Dashboard listing form (`/dashboard`), Python Super-Trigger (`/admin`), and Web Scraper Explorer (`/admin`). Features **Click-Outside Popover Dismissal**, **`✨ Custom Category / New Sector`** option, clean initial form states (no hardcoded pre-filled category or price defaults, no manual price, port hub, or unit fields), and autonomous scraper benchmark pricing.
- **🌐 Universal Shared Database Persistence & Real-Time Sync**: Synchronizes products and buyer/vendor prospects across Landing Page (`/`), User Dashboard (`/dashboard`), and Admin Portal (`/admin`). Whenever an admin publishes a scraped item or executes the Python Super-Trigger, custom `antigravity_db_updated` events instantly extend all catalogs and tables across all open user sessions without requiring page reloads!
- **🕷️ Web Scraper Intelligence & Discovery Tab**: Dedicated tab to launch targeted crawlers across international registries (`trade.ec.europa.eu`, `us.customs.gov`, `apeda.gov.in`, `customs.gov.se`, `chamber.de`, `bolagsverket.se`). Features **Target Country Dropdown** (USA 🇺🇸, Germany 🇩🇪, Sweden 🇸🇪, Poland 🇵🇱, UK 🇬🇧, etc.), **Sourcing Mode Dropdown** (`🏬 LOCAL IN-COUNTRY VENDORS ONLY`, `📦 EXPORT PRODUCTS ONLY`, `🎯 IMPORT BUYER LEADS ONLY`, `⚡ ALL TYPES`), and **Crawl Depth Selector** (8, 12, 16 results) with 1-click **`➕ Approve & Publish to Global Catalog`** button.
- **⚡ Python Compute Engine Super-Trigger Control Center**: Execute on-demand trade route scrapers with 1-click preset corridors (*Swedish Snus 🇸🇪, Organic Ashwagandha 🇺🇸, German Spices 🇩🇪, UAE Halal Meat 🇦🇪, Polish Vegetables 🇵🇱, Australian Machinery 🇦🇺*).

### 5. 🛡️ Strict Deduplication Guard
- Prevents duplicate product cards or lead rows by validating normalized titles, `HS Code + Target Country`, and contact emails.

### 6. 📱 100% Cross-Device Responsive Layout
- Optimized for Mobile Phones (`<640px`), Tablets (`640px-1024px`), Laptops (`1024px-1536px`), Desktop PCs, and Ultrawide displays (`2xl:max-w-[1600px]`).

---

## 🛠️ Technology Stack

| Layer | Technology | Key Modules |
| :--- | :--- | :--- |
| **Frontend** | **Next.js 14 (App Router)** | React 18, TailwindCSS, Lucide Icons, Glassmorphism UI |
| **Backend Java** | **Spring Boot 3.2** | Java 17, Spring Data JPA, Flyway Migrations, PostgreSQL / H2 DB |
| **Compute Engine** | **Python 3.14 + FastAPI** | Pandas, Uvicorn, Asyncio, EventSource SSE Streaming |
| **Repository** | **Git / GitHub** | `https://github.com/fardeenmohd/antigravity-lead-hunter-agency` |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** v18+ & **npm**
- **Python** 3.10+
- **Java** 17+ & **Maven**

### 1. Clone the Repository
```bash
git clone https://github.com/fardeenmohd/antigravity-lead-hunter-agency.git
cd antigravity-lead-hunter-agency
```

### 2. Run Next.js Frontend (`http://localhost:3000`)
```bash
npm install
npm run dev
```

### 3. Run Python FastAPI Compute Engine (`http://localhost:8000`)
```bash
py -m pip install fastapi uvicorn pandas pydantic
py src/main/python/compute_agent.py
```

### 4. Run Spring Boot 3 Java Backend (`http://localhost:8080`)
```bash
mvn spring-boot:run
```

---

## 🔑 Demo Credentials

| Role | Email | Password | Target Portal |
| :--- | :--- | :--- | :--- |
| **Admin Command Center** | `admin@sinomaganundus.global` | `AdminSecret2026!` | [`/admin`](http://localhost:3000/admin) |
| **Indian Exporter (`SUPPLIER`)** | `rajesh@exim.in` | `Password123!` | [`/login`](http://localhost:3000/login) |
| **International Importer (`BUYER`)** | `dmiller@superfoods.us` | `Password123!` | [`/login`](http://localhost:3000/login) |

---

## 📝 Release Documentation Policy

Whenever new features, commodity lines, or architectural components are implemented:
1. Update [`CHANGELOG.md`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/CHANGELOG.md) with chronological release notes.
2. Update [`README.md`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/README.md) feature tables, quick start commands, and commodity coverage.

---

© 2026 **Sino Magan Undus Global Trade**. All rights reserved.
