# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Fixed
- **JSX Syntax Fix in [`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx)**:
  - Fixed missing closing `</div>` tag for the main container layout (`max-w-7xl`), resolving SWC JSX compilation error.

### Added
- **Dashboard "+ Add New Listing" Button & Custom Product Option**:
  - Added **"+ Add New Listing"** button directly inside the **My Export Listings** tab header on [`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx).
  - Built interactive **Exporter Inventory Publisher Modal** with fields for Product Title, Category, HS Code, Target Country, Export Price ($), Unit, and Specifications.
  - Added **`✨ Custom Product / Other`** option in the Category dropdown.
  - Selecting `✨ Custom Product / Other` unlocks a custom commodity text input (e.g. *Spices & Essential Oils*, *Textiles & Garments*, *Handicrafts & Leather*) and custom HS Codes (e.g. `HS-0910`).
  - Prepends newly created commodity listings dynamically into the exporter's inventory table and updates total KPI counts.

- **Auth Navigation Guard & Role-Based Access Control (RBAC)**:
  - Top Navigation Bar Guard on [`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx) strictly hiding "My Dashboard" when unauthenticated.
  - Dashboard Route Protection on [`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx) auto-redirecting to `/login` when unauthenticated.

- **Frontend & Dual Backend Engine Integration (`app/lib/api.ts`)**:
  - Centralized TypeScript HTTP client managing communication with Spring Boot 3 API (`http://localhost:8080`) and Python FastAPI Compute Engine (`http://localhost:8000`).

- Initialized workspace with `AGENCY_CONSTITUTION.md` standing instruction set.
