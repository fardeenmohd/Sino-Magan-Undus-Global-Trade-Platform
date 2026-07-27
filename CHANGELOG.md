# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Added
- **Auth Navigation Guard & Role-Based Access Control (RBAC)**:
  - **Top Navigation Bar Guard ([`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx))**:
    - "My Dashboard" button is strictly hidden when unauthenticated.
    - Unauthenticated users see only **Sign In** and **Get Started**.
    - Authenticated users see **My Dashboard**, active role badge (`🇮🇳 Indian Exporter` or `🌐 Importer`), user avatar, and **Sign Out** button.
    - Guarded "+ List Indian Goods" modal trigger for `BUYER` role users.
  - **Dashboard Route Protection ([`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx))**:
    - Unauthenticated direct visits to `/dashboard` automatically redirect to `/login`.
    - Dynamic tab titles and section branding tailored to active role (`SUPPLIER` vs `BUYER`).

- **Frontend & Dual Backend Engine Integration (`app/lib/api.ts`)**:
  - Centralized TypeScript HTTP client managing communication with Spring Boot 3 API (`http://localhost:8080`) and Python FastAPI Compute Engine (`http://localhost:8000`).

- **Multi-Role User & Supplier Dashboard (`/dashboard`)**:
  - Dedicated Dashboard page with Overview KPI Analytics, My Listed Export Products (Makhana, Onions, Eggs, Potatoes, Meat, Machinery), and Account & Profile Settings.

- **Expanded Commodity Export Catalog**:
  - Added Makhana, Onions, Eggs, Potatoes, Meat, and Machinery Goods to export catalog & buyer lead matcher.

- Initialized workspace with `AGENCY_CONSTITUTION.md` standing instruction set.
