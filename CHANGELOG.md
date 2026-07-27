# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Added
- **Frontend & Dual Backend Engine Integration (`app/lib/api.ts`)**:
  - Centralized TypeScript HTTP client managing communication with:
    - **Spring Boot 3 Enterprise API** (`http://localhost:8080`): Products (`/api/products`), Authentication (`/api/auth/login`, `/api/auth/register`), User Profiles (`/api/users/*`).
    - **Python FastAPI Compute Engine** (`http://localhost:8000`): Algorithmic buyer lead matching (`/api/compute/find-leads`).
  - Added environment variable configuration in [`.env.local`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/.env.local) (`NEXT_PUBLIC_SPRING_BOOT_URL` & `NEXT_PUBLIC_COMPUTE_ENGINE_URL`).
  - Implemented automatic fallback data mockers to guarantee uninterrupted local UI development when backend services are offline.
  - Updated [`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx) to execute Python FastAPI lead matching API requests.
  - Updated [`app/login/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/login/page.tsx) and [`app/register/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/register/page.tsx) to perform Spring Boot authentication.

- **Multi-Role User & Supplier Dashboard (`/dashboard`)**:
  - Dedicated Dashboard page with Overview KPI Analytics, My Listed Export Products (Makhana, Onions, Eggs, Potatoes, Meat, Machinery), and Account & Profile Settings.

- **Expanded Commodity Export Catalog**:
  - Added Makhana, Onions, Eggs, Potatoes, Meat, and Machinery Goods to export catalog & buyer lead matcher.

- Initialized workspace with `AGENCY_CONSTITUTION.md` standing instruction set.
