# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Added
- **Dedicated Importer Dashboard Experience & Import RFQ Publisher ([`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx))**:
  - **Overview KPI Analytics for Importers**: Active Import Inquiries, Verified Exporter Network (48 Exporters in India 🇮🇳), Port Clearance ETAs (Gdańsk, Rotterdam, Sydney, Salalah, Shanghai, LA/Newark), and Importer Trust Rating (⭐ 4.9).
  - **Importer Quick Action Banner**: Replaced exporter-centric banner with *"Source Premium Goods from India 🇮🇳"* and button **`+ Post Import Requirement (RFQ)`**.
  - **Import RFQ Publisher Modal**: Interactive modal allowing Importers to submit custom import requirements specifying commodity lines, target destination ports, price targets, and trade specifications.

- **Optional HS Code Support Across Form Modals**:
  - Made the HS Code field optional in both the Dashboard Exporter Inventory Publisher ([`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx)) and Landing Page Catalog Publisher ([`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx)).
  - Updated field labels to `HS Code (Optional)` and removed strict HTML form validation `required` constraints.

- **Dashboard "+ Add New Listing" Button & Custom Product Option**:
  - Added **"+ Add New Listing"** button directly inside the **My Export Listings** tab header on [`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx).

- Initialized workspace with `AGENCY_CONSTITUTION.md` standing instruction set.
