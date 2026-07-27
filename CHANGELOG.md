# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Added
- **🛡️ Strict Deduplication Guard Across Products & Buyer Leads**:
  - Implemented automatic deduplication across the **Python Compute Engine**, **Landing Page**, and **Admin Portal**:
    1. **Catalog Items**: Checks normalized commodity titles and `HS Code + Destination Country`. If an item already exists, the AI Agent increments the existing card's `leadCount` without creating duplicate product cards.
    2. **Buyer Leads**: Deduplicates prospect leads by `Email Address` and `Company Name + Destination Country` across `localStorage` saved leads and Admin master lead tables.

- **🔒 Protected Admin Portal & Python Engine Control Center ([`app/admin/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/admin/page.tsx))**:
  - Secure **Admin Authentication Gateway** requiring verified Admin credentials (`admin@sinomaganundus.global` / `AdminSecret2026!`).
  - Executive KPI Cards, Master Exporting Goods Table, Master Importer Prospects Network Table, and Python Engine Super-Trigger Control Center.

- **✨ Auto-Extending Product Catalog & Active Leads Engine**:
  - Automatically updates `leadCount` and prepends newly discovered trade commodities to the catalog.

- **🔍 Dynamic Commodity & Country-Specific Web Scraper & Lead Discovery Engine**.

- **Complete Platform Rebrand to "Sino Magan Undus Global Trade"**.

- Initialized workspace with `AGENCY_CONSTITUTION.md` standing instruction set.
