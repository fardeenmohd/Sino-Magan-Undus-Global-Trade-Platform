# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Added
- **⚡ Real-Time Server-Sent Events (SSE) AI Lead Streaming**:
  - Python FastAPI Compute Engine endpoint `/api/compute/stream-leads` emitting step-by-step pipeline execution events (`text/event-stream`).
  - Next.js Web App integration in `app/lib/api.ts` (`streamLeadsCompute()`) and animated streaming progress modal in [`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx) with dynamic progress bar (0% -> 100%), stage status badges, and live execution messages.

- **🔗 Unified Backend Coupling (Spring Boot 3 + Python FastAPI)**:
  - Spring Boot `FastApiIntegrationService` (`src/main/java/com/antigravity/leadtracker/service/FastApiIntegrationService.java`) enabling inter-backend REST communication between Java Spring Boot 3 (`http://localhost:8080`) and Python FastAPI Compute Engine (`http://localhost:8000`).
  - Spring Boot Controller endpoint `/api/leads/discover/{productId}` in `LeadController.java`.

- **Back Navigation Buttons on Authentication Portals ([`app/login/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/login/page.tsx) & [`app/register/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/register/page.tsx))**:
  - Interactive `← Back to Landing Page` button links above sign-in and registration forms.

- **Cross-Device Responsive Layout Optimization Across Mobile, Tablet, Laptop, PC & Ultrawide Screens**:
  - Ultrawide monitor expansion (`2xl:max-w-[1600px]`), 5-column product catalog grid, 8-column destination corridor bar, mobile swipe tabs, and modal viewport limits.

- **Complete Platform Rebrand to "Sino Magan Undus Global Trade"**:
  - Rebranded application header, document titles, layout metadata, landing page hero section, user dashboard, login/register authentication portals, and package metadata.

- Initialized workspace with `AGENCY_CONSTITUTION.md` standing instruction set.
