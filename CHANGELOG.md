# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Fixed & Enhanced
- **🌐 Real-Time Database Synchronization across Scraper & Python Super-Trigger**:
  - Fixed persistence pipeline in [`app/admin/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/admin/page.tsx) so that publishing a scraped opportunity (`handlePublishScrapedOpportunity`) or running the Python Compute Engine Super-Trigger (`handleRunComputeEngineSuperTrigger`) immediately writes full `TradeProduct` and `TradeLeadProspect` objects to the shared database.
  - Added live custom event dispatching (`antigravity_db_updated`) in [`app/lib/api.ts`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/lib/api.ts).
  - Wired live event listeners across the public landing page ([`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx)), User Dashboard ([`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx)), and Admin Portal ([`app/admin/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/admin/page.tsx)) so newly saved products and buyer/vendor leads instantly extend all catalogs and tables platform-wide without requiring page reloads!

- **🏬 Robust & Explorative Web Scraper Engine (Local In-Country Vendors & 8-16 Result Volume)**.

- **🌍 Target Country & Sourcing Mode Dropdown Controls in Web Scraper Explorer**.

- **🕷️ Admin Web Scraper Intelligence & Opportunity Explorer Tab**.

- **💡 Smart Product & Commodity Title Autocomplete Engine**.

- **📚 Official Project Documentation & README (`README.md`)**.

- **🌱 Organic Indian KSM-66 Ashwagandha Root Extract (`HS-1211`) Initial Commodity Line & Seeded Leads**.

- **🌿 Tobacco-Free White Nicotine Pouches & Swedish Style Snus (`HS-2404`) Initial Commodity Line & Seeded Leads**.
