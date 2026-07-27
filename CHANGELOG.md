# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Added
- **💾 Cross-Session LocalStorage Persistence for Extended Products & Buyer Leads**:
  - Implemented persistent storage keys `antigravity_global_products` and `antigravity_global_leads` across both the **Landing Page (`/`)** and **Admin Portal (`/admin`)**.
  - All products and scraped buyer prospects created or extended by the **Python AI Compute Agent** remain **100% persistent across page reloads and browser sessions**.

- **🛡️ Strict Deduplication Guard Across Products & Buyer Leads**:
  - Deduplicates products by title and `HS Code + Destination Country`, and buyer leads by email address.

- **🔒 Protected Admin Portal & Python Engine Control Center ([`app/admin/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/admin/page.tsx))**:
  - Secure **Admin Authentication Gateway** (`admin@sinomaganundus.global` / `AdminSecret2026!`).

- **✨ Auto-Extending Product Catalog & Active Leads Engine**.

- **Complete Platform Rebrand to "Sino Magan Undus Global Trade"**.

- Initialized workspace with `AGENCY_CONSTITUTION.md` standing instruction set.
