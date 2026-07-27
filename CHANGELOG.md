# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Added
- **Dynamic Role-Based Header Action Button ([`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx))**:
  - Top header action button dynamically switches based on active user role:
    - **Exporter / Unauthenticated**: Displays **`+ List Indian Goods`** (opens Exporter inventory publisher modal).
    - **Importer (`BUYER`)**: Displays **`+ Post Import RFQ`** (opens Importer requirement publisher modal).
  - Modal title and submit button dynamically switch (`"Post Import Requirement (RFQ)"` vs `"List Indian Export Goods"`).

- **Dedicated Importer Dashboard Experience & Import RFQ Publisher ([`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx))**:
  - Overview KPI Analytics for Importers, Importer Quick Action Banner, and Import RFQ Publisher Modal.

- **Optional HS Code Support Across Form Modals**:
  - Made the HS Code field optional across product listing forms with auto-fallback (`HS-AUTO`).

- Initialized workspace with `AGENCY_CONSTITUTION.md` standing instruction set.
