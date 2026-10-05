# Community Event Resource & Volunteer Tracker

A fast, responsive, frontend-only single-page workspace for community and university organizations to track upcoming events, volunteer assignments, pending tasks, and resource shortages in real time with bilingual support (English and Bangla) and browser localStorage persistence.

Participant:
Rafiul Kabir

Registration Number:
2026-001

Live Website:
https://ai-work-flow-test.vercel.app

GitHub Repository:
https://github.com/RafiulKabir0/ai-work-flow-test

## Problem

A university or community organization frequently coordinates multiple events simultaneously. Event organizers typically store events, volunteer assignments, and logistics records in fragmented notes, spreadsheets, or messaging channels. This creates confusion around:
- Which events are active, upcoming, or completed
- Who is assigned to which role, and whether their assignments are pending or confirmed
- Critical equipment and supply shortages (e.g., chairs, projectors, registration materials)
- Incomplete organizer action items across the organization

Organizers need a unified, lightweight, and immediately accessible dashboard that works in any browser without requiring user logins, servers, or database installations.

## Solution

The Community Event Resource & Volunteer Tracker delivers an intuitive, fast, zero-backend web application providing:
- **Interactive Overview Dashboard** displaying 4 live metrics: Total Events, Active Volunteers, Pending Tasks, and Resource Shortages.
- **Event Management**: Create, edit, search, and filter events with live counts of assigned volunteers.
- **Volunteer Assignment Tracking**: Assign volunteers to events with specific roles and contact methods, with instant status toggling (Pending, Confirmed, Completed).
- **Resource Inventory & Shortage Detection**: Track required vs. available supplies, with automatic real-time calculation and highlighting of shortages.
- **Bilingual Interface**: One-click switching between English and Bangla across the entire application interface, table headers, forms, status badges, and notifications.
- **Client-Side Persistence**: Complete browser `localStorage` persistence that preserves all changes through page refreshes and language changes.

## Features

- **Dashboard Metrics**: Real-time summary cards for Total Events, Active Volunteers, Pending Tasks, and Resource Shortages.
- **Event Operations**: Full add, edit, search, and status filter (Active, Upcoming, Completed) capabilities with validation.
- **Volunteer Assignment Operations**: Assign volunteers to events, edit assignments, filter by status, and update statuses with instant dashboard metric recalculation.
- **Resource Operations**: Add and edit resource items with required vs. available quantity validation (non-negative numeric), displaying dynamic shortage badges.
- **Bilingual Support**: Centralized translation dictionary covering all navigation, labels, tables, dialogs, validation messages, and empty states in English and Bangla.
- **Robust Client Persistence**: Versioned schema in `localStorage` seeded with synthetic sample data on first run without overwriting subsequent user edits.
- **Responsive Layout**: Optimized for desktop, laptop, tablet, and mobile smartphone screens.

## Bonus Features

- **One-click Shortage Filter**: Instantly isolate only the resources experiencing shortages.
- **Quick Status Filtering**: Filter cards directly from metric summary buttons.
- **CSV Data Export**: Export events, assignments, and resources to CSV files directly in browser.
- **JSON Backup & Restore**: Download complete state backup and restore on demand.
- **Dark Mode**: Sleek theme toggle supporting high-contrast dark and clean light modes.

## Technology

- **React 18** for declarative component-based UI.
- **Vite** for rapid builds and optimized modern assets.
- **Vanilla CSS** with CSS Custom Properties (design tokens), flexbox, and grid layouts for responsive visual polish.
- **HTML5 & Modern JavaScript (ES2022+)**.
- **Browser LocalStorage API** for client-side persistence without external servers.

## Data Storage

Data is stored entirely on the client side using the standard browser `localStorage` API under the key `devfest_tracker_v1`.
This architecture is compliant with contest rules prohibiting participant-controlled server infrastructure, databases, or online storage services. Browser storage ensures zero-latency operations, complete privacy, full offline usability, and persistence across refreshes.

## Bilingual Support

The application features a centralized bilingual dictionary (`translations.js`) that dynamically provides translations in:
- English (en)
- Bangla (bn)

The language switcher in the header toggles between languages instantly without reloading or modifying stored data.

## Business Rules

1. **Resource Shortage Calculation**:
   - `Shortage`: When `Available Quantity < Required Quantity`
   - `Sufficient`: When `Available Quantity >= Required Quantity`
2. **Pending Tasks**:
   - Count of all volunteer assignments where `status === 'Pending'`.
3. **Active Volunteers**:
   - Count of unique or assigned volunteers assigned to an event whose status is `Active` AND whose assignment status is NOT `Completed` (`assignment.status !== 'Completed'`).
4. **Input Validation**:
   - Event name, volunteer name, role, and resource name are required non-blank strings.
   - Resource quantities must be non-negative numbers (`>= 0`).

## Sample Data

The application initializes with the exact synthetic contest specification dataset:
- **Events (4)**: Campus Career Fair (Active), Freshers Orientation (Upcoming), Programming Workshop (Upcoming), Community Clean-up (Completed).
- **Volunteer Assignments (5)**: Asha Rahman (Confirmed), Tanvir Hasan (Pending), Nabila Karim (Confirmed), Siam Ahmed (Pending), Mitu Akter (Completed).
- **Resources (5)**: Chairs (120 req / 100 avail - Shortage), Registration Forms (200 req / 250 avail - Sufficient), Projectors (2 req / 1 avail - Shortage), Name Badges (150 req / 150 avail - Sufficient), Gloves (60 req / 80 avail - Sufficient).
- **Initial Metrics**: Total Events = 4, Active Volunteers = 2, Pending Tasks = 2, Resource Shortages = 2.

## How to Run

1. Clone repository:
   ```bash
   git clone https://github.com/RafiulKabir0/ai-work-flow-test.git
   cd ai-work-flow-test
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start local development server:
   ```bash
   npm run dev
   ```
4. Open the displayed URL (typically `http://localhost:5173`) in Google Chrome.

## Production Build

To create an optimized production build:
```bash
npm run build
```
Preview the production build locally:
```bash
npm run preview
```

## Deployment

The application is deployed on Vercel as a static single-page application:
- Live URL: `https://ai-work-flow-test.vercel.app`
- Deployed from branch `main`, matching the final contest commit.
- Requires no backend server, authentication, or installation.

## Known Problems

No known critical issues. All contest acceptance criteria pass cleanly.

## AI Tools Used

- **Google Antigravity**: Primary IDE and autonomous coding environment.
- **AI Coding Agent**: Autonomous implementation, testing, and verification.

## Most Useful Prompt

"Build a frontend-only Community Event Resource & Volunteer Tracker in React + Vite with responsive CSS, bilingual English/Bangla UI, client-side localStorage persistence, and exact real-time calculations for Total Events, Active Volunteers, Pending Tasks, and Resource Shortages based on the contest business rules."

## Git Commit Discipline

All commits follow the contest-mandated format:
```
<short change description>

Prompt: "<prompt or change intent>"
```

## License

MIT License. See [LICENSE](file:///Users/khalidhassanemon/Desktop/Test1.0/LICENSE) for details. Copyright (c) 2026 Rafiul Kabir.
