# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Added
- **🌐 Universal Shared Database Persistence for Products & Leads**:
  - Engineered centralized shared database storage layer (`app/lib/api.ts`) connecting Next.js with Spring Boot REST Controllers (`/api/products` & `/api/leads`).
  - Added `getSharedProductsFromDb()`, `saveProductsToSharedDb()`, `getSharedLeadsFromDb()`, and `saveLeadsToSharedDb()`.
  - Any product listed or buyer lead discovered by the **Python AI Compute Agent** on the Landing Page (`/`), Dashboard (`/dashboard`), or Admin Portal (`/admin`) is stored in a **shared platform database** that immediately synchronizes across all users and admin roles!

- **💾 Cross-Session LocalStorage Persistence for Extended Products & Buyer Leads**.

- **🛡️ Strict Deduplication Guard Across Products & Buyer Leads**.

- **🔒 Protected Admin Portal & Python Engine Control Center ([`app/admin/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/admin/page.tsx))**.

- **Complete Platform Rebrand to "Sino Magan Undus Global Trade"**.

- Initialized workspace with `AGENCY_CONSTITUTION.md` standing instruction set.
