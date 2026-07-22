# Changelog

All notable changes to Project Antigravity will be documented in this file.

## [Unreleased]

### Added
- **Multi-Role User & Supplier Dashboard (`/dashboard`)**:
  - Dedicated Dashboard page [`app/dashboard/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/dashboard/page.tsx) with Overview KPI Analytics, My Listed Export Products (Makhana, Onions, Eggs, Potatoes, Meat, Machinery), and Account & Profile Settings.
  - Interactive status activation toggle for listed export commodities.
  - Profile settings editor with company name, IEC trade registration code (`IEC-IN09887766`), phone number, location, and bio.
  - Updated landing page header [`app/page.tsx`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/app/page.tsx) with a direct link to **📊 My Dashboard**.

- **Enterprise Spring Boot 3 Backend**:
  - Updated [`User.java`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/main/java/com/antigravity/leadtracker/model/User.java) with `phone`, `bio`, and `iecCode`.
  - Created `UserProfileDTO`.
  - Created [`UserService.java`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/main/java/com/antigravity/leadtracker/service/UserService.java) & `UserServiceImpl.java` for profile management and user-specific listings.
  - Created [`UserController.java`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/main/java/com/antigravity/leadtracker/controller/UserController.java) with `/api/users/me` and `/api/users/me/listings` endpoints.

- **DBA (Data Architect) Persona**:
  - Flyway migration script [`V6__Add_User_Profile_Settings.sql`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/main/resources/db/migration/V6__Add_User_Profile_Settings.sql).

- **QA Gatekeeper Persona**:
  - JUnit 5 / Mockito unit tests [`UserServiceTest.java`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/test/java/com/antigravity/leadtracker/service/UserServiceTest.java) and [`UserControllerTest.java`](file:///C:/Users/fardi/Documents/antigravity/joyful-raman/src/test/java/com/antigravity/leadtracker/controller/UserControllerTest.java).

- **Expanded Commodity Export Catalog**:
  - Added Makhana, Onions, Eggs, Potatoes, Meat, and Machinery Goods to export catalog & buyer lead matcher.

- Initialized workspace with `AGENCY_CONSTITUTION.md` standing instruction set.
