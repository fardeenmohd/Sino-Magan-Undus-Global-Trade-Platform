# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Added
- **✨ Auto-Extending Product Catalog & Active Leads Engine**:
  - Whenever a user triggers the **Python AI Compute Agent** on any product card, the system automatically:
    1. Increments the target item's `leadCount` (e.g. 28 leads ➔ 31 leads) in real time across the landing page and dashboard.
    2. Auto-discovers related trade commodities for that target country (*Turmeric Powder for USA, Dehydrated Garlic Flakes for Poland, CNC Spare Components for Australia, Frozen Meat for Oman*) and dynamically appends them as new catalog items in the landing page grid!
    3. Persists 1-click imported trade leads directly to `localStorage` (`antigravity_imported_leads`) for dashboard access.

- **🔍 Dynamic Commodity & Country-Specific Web Scraper & Lead Discovery Engine**:
  - Upgraded **Python FastAPI Compute Engine** ([`src/main/python/compute_agent.py`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/main/python/compute_agent.py)) and Frontend Client ([`app/lib/api.ts`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/lib/api.ts)).
  - Synthesizes product-specific and country-specific buyer prospects, corporate domains, port hubs, tariffs, and regulatory clearance metrics.

- **⚡ Real-Time Server-Sent Events (SSE) AI Lead Streaming**:
  - FastAPI SSE streaming endpoint `/api/compute/stream-leads` emitting step-by-step pipeline execution events (`text/event-stream`).

- **🔗 Unified Backend Coupling (Spring Boot 3 + Python FastAPI)**:
  - Inter-backend REST service enabling Java Spring Boot (`http://localhost:8080`) to invoke Python FastAPI (`http://localhost:8000`).

- **Complete Platform Rebrand to "Sino Magan Undus Global Trade"**.

- Initialized workspace with `AGENCY_CONSTITUTION.md` standing instruction set.
