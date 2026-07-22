# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Added
- **Expanded Commodity Export Catalog & Buyer Matching**:
  - Added 6 core Indian export commodities to `app/page.tsx`:
    1. 🪷 **Bihar Organic Foxnuts / Makhana** (`HS-1904`)
    2. 🧅 **Nashik Red Onions & Dehydrated Flakes** (`HS-0703`)
    3. 🥚 **Fresh Table Eggs & Egg Powder** (`HS-0407`)
    4. 🥔 **Cold Storage Potatoes** (`HS-0701`)
    5. 🥩 **APEDA Halal Frozen Buffalo Meat & Mutton** (`HS-0202`)
    6. ⚙️ **Industrial CNC Machinery & Hydraulic Pumps** (`HS-8479`)
  - Updated category filter pills: `Makhana & Superfoods`, `Fresh Produce`, `Poultry & Eggs`, `Meat Exports`, `Machinery & Engineering`.
  - Updated AI Buyer Lead Discovery modal with mock buyer profiles in Poland, Netherlands, Australia, Oman, China, and USA.

- **Python FastAPI Compute Engine Update**:
  - Upgraded [`src/main/python/compute_agent.py`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/main/python/compute_agent.py) with buyer datasets for Makhana, Onions, Eggs, Potatoes, Meat, and Machinery.
  - Updated [`src/main/python/test_compute_agent.py`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/main/python/test_compute_agent.py).

- **Database Architect (DBA Persona)**:
  - Flyway migration script [`V5__Add_Agri_Makhana_Meat_Machinery_Products.sql`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/main/resources/db/migration/V5__Add_Agri_Makhana_Meat_Machinery_Products.sql).

- **QA Gatekeeper Persona**:
  - Updated JUnit 5 unit tests [`ProductServiceTest.java`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/test/java/com/antigravity/leadtracker/service/ProductServiceTest.java).

- **India Cross-Border Import/Export Trade Lead Engine (`app/page.tsx`)**:
  - Connected India exporters with 6 global destination corridors (Poland, Netherlands, Australia, Oman, China, USA).

- Initialized workspace with `AGENCY_CONSTITUTION.md` standing instruction set.
