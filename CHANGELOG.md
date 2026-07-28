# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Fixed & Enhanced
- **🎯 Click-Outside Popover Dismissal & Custom Category Support ([`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx), [`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx), [`app/admin/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/admin/page.tsx))**:
  - Added global click-outside listeners (`useRef` + `mousedown`) for all autocomplete containers (Commodity Autocomplete & Country Autocomplete) so clicking anywhere outside automatically closes active popovers.
  - Added **`✨ Custom Category / New Sector`** option to category selectors in both the Public Post Import Requirement (RFQ) modal (`app/page.tsx`) and Exporter Add Listing modal (`app/dashboard/page.tsx`).
  - Selecting custom category reveals a dedicated text input field allowing users to enter custom sector names (e.g. `Bio-Pharmaceuticals`, `Renewable Energy Equipment`, `Organic Oils & Resins`).

- **✨ Removal of Manual Sea Port Hub & Export Price Inputs**.

- **🌍 Platform-Wide Smart Country Autocomplete Engine across All User Forms**.

- **🌐 Real-Time Database Synchronization across Scraper & Python Super-Trigger**.

- **🏬 Robust & Explorative Web Scraper Engine (Local In-Country Vendors & 8-16 Result Volume)**.

- **💡 Smart Product & Commodity Title Autocomplete Engine**.

- **📚 Official Project Documentation & README (`README.md`)**.

- **🌱 Organic Indian KSM-66 Ashwagandha Root Extract (`HS-1211`) Initial Commodity Line & Seeded Leads**.

- **🌿 Tobacco-Free White Nicotine Pouches & Swedish Style Snus (`HS-2404`) Initial Commodity Line & Seeded Leads**.
