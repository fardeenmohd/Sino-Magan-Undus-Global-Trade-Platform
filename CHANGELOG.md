# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Added
- **Optional HS Code Support Across Form Modals**:
  - Made the HS Code field optional in both the Dashboard Exporter Inventory Publisher ([`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx)) and Landing Page Catalog Publisher ([`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx)).
  - Updated field labels to `HS Code (Optional)` and removed strict HTML form validation `required` constraints.
  - Implemented automatic fallback identifier (`HS-AUTO`) when an exporter leaves the HS Code field blank.

- **Dashboard "+ Add New Listing" Button & Custom Product Option**:
  - Added **"+ Add New Listing"** button directly inside the **My Export Listings** tab header on [`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx).
  - Built interactive **Exporter Inventory Publisher Modal** with `✨ Custom Product / Other` category option.

- **Auth Navigation Guard & Role-Based Access Control (RBAC)**:
  - Top Navigation Bar Guard on [`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx) strictly hiding "My Dashboard" when unauthenticated.

- Initialized workspace with `AGENCY_CONSTITUTION.md` standing instruction set.
