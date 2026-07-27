# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Added
- **🔍 Dynamic Commodity & Country-Specific Web Scraper & Lead Discovery Engine**:
  - Upgraded **Python FastAPI Compute Engine** ([`src/main/python/compute_agent.py`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/main/python/compute_agent.py)) and Frontend Client ([`app/lib/api.ts`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/lib/api.ts)).
  - Replaced static lead responses with a dynamic web scraper engine that constructs unique, commodity-accurate buyer prospects for **every individual product title, category, HS Code, and target country** (*USA, Poland, Netherlands, Australia, Oman, China, Germany, UAE, Japan*).
  - Dynamically synthesizes company names (e.g. *Hamburg Spice Importers GmbH & Co. KG*, *Warsaw Fresh Produce Sp. z o.o.*, *Muscat Foodstuffs LLC*), port hubs (*Port of Hamburg*, *Port of Gdańsk*, *Jebel Ali Port*, *Port of Rotterdam*), custom tariffs, and regulatory clearance metrics (APEDA, FDA, EU BIO Organic, CE Mark, GCC Halal, MAFF).

- **⚡ Real-Time Server-Sent Events (SSE) AI Lead Streaming**:
  - FastAPI SSE streaming endpoint `/api/compute/stream-leads` emitting step-by-step pipeline execution events (`text/event-stream`).

- **🔗 Unified Backend Coupling (Spring Boot 3 + Python FastAPI)**:
  - Inter-backend REST service enabling Java Spring Boot (`http://localhost:8080`) to invoke Python FastAPI (`http://localhost:8000`).

- **Complete Platform Rebrand to "Sino Magan Undus Global Trade"**.

- Initialized workspace with `AGENCY_CONSTITUTION.md` standing instruction set.
