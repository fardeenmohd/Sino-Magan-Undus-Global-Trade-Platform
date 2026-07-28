# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Upgraded & Clean Slate Enforced
- **🧹 Complete Hardcoded Seed Removal for a 100% Clean Slate ([`app/lib/api.ts`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/lib/api.ts), [`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx), [`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx), [`app/admin/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/admin/page.tsx), [`app/countries/[slug]/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/countries/[slug]/page.tsx), [`app/exporters/[id]/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/exporters/[id]/page.tsx))**:
  - Removed all hardcoded fallback seed arrays (`INITIAL_PRODUCTS`, `INITIAL_FALLBACK_PRODUCTS`, `INITIAL_LEADS`).
  - Updated `getSharedProductsFromDb()` and `getSharedLeadsFromDb()` to default to `[]` (empty array) so that after clearing or starting, all views across the platform remain 100% empty until new authentic products are published or discovered.
  - Added clean Empty State UI cards (`📭 No Export Products Listed Yet`).
  - `clearSharedProductsFromDb()` and `clearSharedLeadsFromDb()` write `[]` into localStorage and dispatch cross-tab update events.

- **🌐 Multi-Source Web Scraper Engine Beyond Government Portals**.

- **🏬 Authentic Small & Medium Enterprise (SME) Discovery**.

- **🌍 Country Corridor Pages (`/countries/[slug]`) & Exporter Profiles (`/exporters/[id]`)**.

- **🛡️ Lead Verification & Authenticity System**.
