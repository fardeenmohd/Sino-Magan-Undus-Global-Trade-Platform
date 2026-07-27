# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Added
- **Custom Target Destination Support & Dynamic Landing Page Corridor Showcase**:
  - Exporters and Importers can now specify **`✨ Custom Destination / New Country`** in both the Landing Page Publisher ([`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx)) and Dashboard Publisher ([`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx)).
  - Unlocks custom input fields for **Country Name** (e.g. *Germany 🇩🇪*, *UAE 🇦🇪*, *Japan 🇯🇵*, *Canada 🇨🇦*) and **Sea Port Hub** (*Port of Hamburg*, *Jebel Ali Port*).
  - **Dynamic Trade Corridor Showcase**: The Landing Page Destination Corridor Selector Bar dynamically extracts all unique target destinations from the active product catalog and automatically renders newly added countries as interactive corridor buttons!

- **Dynamic Role-Based Header Action Button ([`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx))**:
  - Displays `+ List Indian Goods` for Exporters and `+ Post Import RFQ` for Importers.

- **Dedicated Importer Dashboard Experience & Import RFQ Publisher ([`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx))**:
  - Overview KPI Analytics for Importers, Importer Quick Action Banner, and Import RFQ Publisher Modal.

- Initialized workspace with `AGENCY_CONSTITUTION.md` standing instruction set.
