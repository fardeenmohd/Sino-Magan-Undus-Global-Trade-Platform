# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Fixed
- **Logged Out Top Navigation Header Guard ([`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx))**:
  - Encapsulated the publisher action buttons inside `userSession` conditional check.
  - When unauthenticated (logged out), the top header strictly renders clean **`Sign In`** and **`Get Started`** CTA buttons, hiding the exporter/importer publisher buttons until an authenticated session is established.

### Added
- **Custom Target Destination Support & Dynamic Landing Page Corridor Showcase**:
  - Exporters and Importers can now specify **`✨ Custom Destination / New Country`** in both the Landing Page Publisher ([`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx)) and Dashboard Publisher ([`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx)).
  - **Dynamic Trade Corridor Showcase**: The Landing Page Destination Corridor Selector Bar dynamically extracts all unique target destinations from the active product catalog and automatically renders newly added countries as interactive corridor buttons!

- **Dedicated Importer Dashboard Experience & Import RFQ Publisher ([`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx))**:
  - Overview KPI Analytics for Importers, Importer Quick Action Banner, and Import RFQ Publisher Modal.

- Initialized workspace with `AGENCY_CONSTITUTION.md` standing instruction set.
