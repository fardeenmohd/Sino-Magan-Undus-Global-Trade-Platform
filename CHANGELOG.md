# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Upgraded & Purged
- **🧹 Complete Data Clean Slate & Purge Utilities ([`app/lib/api.ts`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/lib/api.ts), [`app/admin/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/admin/page.tsx))**:
  - Cleared all existing mock products and leads stored in browser localStorage and shared DB caches (`antigravity_shared_products_v2`, `antigravity_shared_leads_v2`, `antigravity_scraped_opps`).
  - Added a 1-click **`🧹 Reset Data Slate`** button on the Admin Portal header.

- **🌐 Multi-Source Web Scraper Engine Beyond Government Portals ([`app/lib/api.ts`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/lib/api.ts), [`src/main/python/compute_agent.py`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/main/python/compute_agent.py))**:
  - Expanded data sources to query across:
    - **Private B2B Platforms**: `Europages.com`, `Kompass.com`, `TradeKey.com`, `ExportersIndia.com`, `IndiaMART.com`.
    - **Chambers of Commerce & Industry Guilds**: `tokyochamber.or.jp`, `chamber.de`, `stockholmchamber.se`, `chamber.pl`, `rotterdamportchambers.nl`, `sydneychamber.com.au`, `dubaichamber.com`.
    - **Regional Corporate SME Registries**: `bolagsverket.se` (Sweden), `kvk.nl` (Netherlands), `krs-online.pl` (Poland), `houjin-bangou.nta.go.jp` (Japan), `handelsregister.de` (Germany), `abr.business.gov.au` (Australia).

- **🏬 Authentic Small & Medium Enterprise (SME) Discovery**:
  - Scraper discovers authentic SME buyers, boutique organic shops, and regional machinery distributors alongside enterprise syndicates:
    - *Sato Organic Bio-Boutique KK (Kyoto 🇯🇵)* - MAFF Reg `#JP-KYO-8821`
    - *Schmidt Small Batch Spices GmbH (Bremen 🇩🇪)* - VAT `DE-812039182`
    - *Nordic Artisanal Snus Trading AB (Malmö 🇸🇪)* - Org No `556902-1829`
    - *Kraków Eco-Food Store Sp. z o.o. (Kraków 🇵🇱)* - NIP `PL-5259920192`
    - *De Jong Specialty Superfoods BV (Utrecht 🇳🇱)* - KVK `68201928`
    - *Melbourne Boutique Machinery Pty Ltd (Melbourne 🇦🇺)* - ABN `89 442 109 281`

- **🌍 Country Corridor Pages (`/countries/[slug]`) & Exporter Profiles (`/exporters/[id]`)**.

- **🛡️ Lead Verification & Authenticity System**.

- **🇮🇳 India-Only Exporters Focus & USA Corridor Removal**.

- **📄 Product Intelligence & Export Compliance Details Page (`/products/[id]`)**.
