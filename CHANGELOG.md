# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Refactored & Streamlined
- **✨ Removal of Manual Sea Port Hub & Export Price Inputs ([`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx), [`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx), [`app/admin/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/admin/page.tsx))**:
  - Removed manual `Sea Port Hub` and `Export Price ($)` / `FOB Price` input fields from the Public Post Import Requirement (RFQ) form (`app/page.tsx`), Exporter Add Listing form (`app/dashboard/page.tsx`), and Python Super-Trigger form (`app/admin/page.tsx`).
  - Sea port hubs are auto-filled behind the scenes from the selected country database (e.g. `Port of Hamburg` for Germany, `Port of Gothenburg` for Sweden), and benchmark prices are computed autonomously by the system.

- **🌍 Platform-Wide Smart Country Autocomplete Engine across All User Forms**.

- **✨ Clean Initial Form States & Scraper Price Field Removal**.

- **🌐 Real-Time Database Synchronization across Scraper & Python Super-Trigger**.

- **🏬 Robust & Explorative Web Scraper Engine (Local In-Country Vendors & 8-16 Result Volume)**.

- **💡 Smart Product & Commodity Title Autocomplete Engine**.

- **📚 Official Project Documentation & README (`README.md`)**.

- **🌱 Organic Indian KSM-66 Ashwagandha Root Extract (`HS-1211`) Initial Commodity Line & Seeded Leads**.

- **🌿 Tobacco-Free White Nicotine Pouches & Swedish Style Snus (`HS-2404`) Initial Commodity Line & Seeded Leads**.
