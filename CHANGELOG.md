# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Added
- **India Cross-Border Import/Export Trade Lead Engine (`app/page.tsx`)**:
  - Specialized Trade Landing Page connecting **India 🇮🇳** exporters with 6 global destination corridors: 🇵🇱 **Poland**, 🇳🇱 **Netherlands**, 🇦🇺 **Australia**, 🇴🇲 **Oman**, 🇨🇳 **China**, and 🇺🇸 **USA**.
  - Interactive Trade Corridor Selector Bar with destination port hub information (Port of Gdańsk, Port of Rotterdam, Port of Sydney, Port of Salalah, Port of Shanghai, Port of Los Angeles).
  - Integrated **Harmonized System (HS) Codes** (e.g. `HS-1006`, `HS-3004`, `HS-3301`, `HS-6205`, `HS-8541`, `HS-2601`) and duty tariff estimates (%).
  - AI International Buyer Lead Finder modal tailored to destination country buyer prospects.
  - "List Indian Export Product" modal for exporters.

- **Python FastAPI Cross-Border Trade Engine**:
  - Upgraded [`src/main/python/compute_agent.py`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/main/python/compute_agent.py) with `/api/compute/find-leads` for India cross-border trade matching.
  - Updated [`src/main/python/test_compute_agent.py`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/main/python/test_compute_agent.py) with `fastapi.testclient.TestClient` test runner.

- **Enterprise Spring Boot 3 Backend**:
  - Updated [`Product.java`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/main/java/com/antigravity/leadtracker/model/Product.java) with `hsCode`, `originCountry`, `destinationCountry`, and `tariffRate`.
  - Updated `ProductDTO` & `ProductRequestDTO`.
  - Updated `ProductRepository` with parameterized JPQL destination search.
  - Updated `ProductService` & `ProductCatalogController`.

- **DBA (Data Architect) Persona**:
  - Flyway migration script [`V4__Add_CrossBorder_Trade_Routes.sql`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/main/resources/db/migration/V4__Add_CrossBorder_Trade_Routes.sql).

- **QA Gatekeeper Persona**:
  - JUnit 5 / Mockito unit tests [`ProductServiceTest.java`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/test/java/com/antigravity/leadtracker/service/ProductServiceTest.java) and [`ProductCatalogControllerTest.java`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/test/java/com/antigravity/leadtracker/controller/ProductCatalogControllerTest.java).

- **User Authentication System (`/login` & `/register`)**:
  - Login & Register pages with password strength meter, role toggles, and token authentication.

- Initialized workspace with `AGENCY_CONSTITUTION.md` standing instruction set.
