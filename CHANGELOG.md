# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Aligned & Refactored
- **🇮🇳 India-Only Exporters Focus & USA Corridor Removal ([`app/lib/api.ts`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/lib/api.ts), [`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx), [`app/admin/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/admin/page.tsx), [`app/products/[id]/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/products/[id]/page.tsx))**:
  - Aligned all export product listings, suppliers, and scraper engines strictly to **India 🇮🇳**.
  - Hardcoded `originCountry: "India 🇮🇳"` across product forms and lead generators.
  - Completely removed USA 🇺🇸 / United States 🇺🇸 from `DESTINATION_COUNTRIES`, country autocomplete databases, preset trade corridors, sample catalog data, and import lead generators.
  - Replaced USA lead targets with active international trade corridors (Japan 🇯🇵, Germany 🇩🇪, Sweden 🇸🇪, Poland 🇵🇱, Netherlands 🇳🇱, Australia 🇦🇺, Oman 🇴🇲, UAE 🇦🇪).

- **🇯🇵 Japan Trade Corridor Integration**.

- **📄 Product Intelligence & Export Compliance Details Page (`/products/[id]`)**.

- **✨ Removal of Pre-filled Category Defaults**.

- **✨ Removal of Manual Unit of Measurement Inputs**.

- **🎯 Click-Outside Popover Dismissal & Custom Category Support**.

- **✨ Removal of Manual Sea Port Hub & Export Price Inputs**.

- **🌍 Platform-Wide Smart Country Autocomplete Engine across All User Forms**.

- **🌐 Real-Time Database Synchronization across Scraper & Python Super-Trigger**.

- **🏬 Robust & Explorative Web Scraper Engine (Local In-Country Vendors & 8-16 Result Volume)**.

- **💡 Smart Product & Commodity Title Autocomplete Engine**.

- **📚 Official Project Documentation & README (`README.md`)**.

- **🌱 Organic Indian KSM-66 Ashwagandha Root Extract (`HS-1211`) Initial Commodity Line & Seeded Leads**.

- **🌿 Tobacco-Free White Nicotine Pouches & Swedish Style Snus (`HS-2404`) Initial Commodity Line & Seeded Leads**.
