# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Added
- **Seamless Auth State & Direct Dashboard Redirect**:
  - Updated [`app/login/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/login/page.tsx) and [`app/register/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/register/page.tsx) to persist user sessions into `localStorage` (`antigravity_user_session`) and redirect directly to `/dashboard`.
  - Added **1-Click Demo Credentials Box** on the login page for Exporters (`rajesh@exim.in`) and Importers (`dmiller@superfoods.us`).
  - Updated [`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx) and [`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx) headers to show user avatar, active session state, and a **Sign Out** button.

- **Multi-Role User & Supplier Dashboard (`/dashboard`)**:
  - Dedicated Dashboard page with Overview KPI Analytics, My Listed Export Products (Makhana, Onions, Eggs, Potatoes, Meat, Machinery), and Account & Profile Settings.

- **Expanded Commodity Export Catalog**:
  - Added Makhana, Onions, Eggs, Potatoes, Meat, and Machinery Goods to export catalog & buyer lead matcher.

- Initialized workspace with `AGENCY_CONSTITUTION.md` standing instruction set.
