# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Added
- **User Authentication System (`/login` & `/register`)**:
  - Premium SaaS Login page [`app/login/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/login/page.tsx) with email/password validation, password visibility toggle, and Buyer/Supplier role switcher.
  - User Registration page [`app/register/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/register/page.tsx) with company info, terms validation, and live Password Strength Indicator.
  - Updated landing page [`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx) header with Sign In and Get Started links.

- **Enterprise Spring Boot 3 Authentication Backend**:
  - Updated entity [`User.java`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/main/java/com/antigravity/leadtracker/model/User.java) with `passwordHash` field.
  - DTOs `LoginRequestDTO`, `RegisterRequestDTO`, and `AuthResponseDTO`.
  - Service layer [`AuthService.java`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/main/java/com/antigravity/leadtracker/service/AuthService.java) & `AuthServiceImpl.java` with SHA-256 password hashing and token generation.
  - REST Controller [`AuthController.java`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/main/java/com/antigravity/leadtracker/controller/AuthController.java) with `/api/auth/login` and `/api/auth/register` endpoints.

- **DBA (Data Architect) Persona**:
  - Flyway migration script [`V3__Add_Auth_Fields_To_Users.sql`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/main/resources/db/migration/V3__Add_Auth_Fields_To_Users.sql).

- **QA Gatekeeper Persona**:
  - JUnit 5 / Mockito unit tests [`AuthServiceTest.java`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/test/java/com/antigravity/leadtracker/service/AuthServiceTest.java).
  - JUnit 5 / MockMvc controller tests [`AuthControllerTest.java`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/test/java/com/antigravity/leadtracker/controller/AuthControllerTest.java).

- **Product Catalog Landing Page & Unified Lead Discovery (`app/page.tsx`)**:
  - Full SaaS Product Catalog Landing Page with Next.js App Router and TypeScript (`"use client";`).
  - Integrated AI Lead Finder modal trigger simulating Python FastAPI + Pandas compute engine lead discovery.

- Initialized workspace with `AGENCY_CONSTITUTION.md` standing instruction set.
