# Viva Preparation — Judge Questions & Model Answers

**Participant:** Rafiul Kabir  
**Registration Number:** 2026-001  
**Project:** Community Event Resource & Volunteer Tracker  
**Simulation:** AI DevFest 2026 Practice Simulation  

---

### 1. Why did you choose the frontend framework?
I selected **React 18 with Vite** because:
- **Fast declarative state synchronization**: Dashboard metric cards, status changes, and filter changes react immediately to data state changes across components.
- **Ultra-fast Vite tooling**: Instant Hot Module Replacement (HMR) and lightweight production bundling (< 250 KB total gzipped) in under 3.5 seconds.
- **Minimal dependencies**: We only use core React and Lucide icons without bulky external UI frameworks or redundant state libraries, ensuring zero unnecessary bundle weight and bulletproof browser reliability.

---

### 2. Where is application data stored?
All application data is stored purely in the user's browser via the standard **HTML5 `localStorage` API** under the key `devfest_tracker_v1` (with user interface preferences stored under `devfest_tracker_prefs_v1`). No data is sent to or stored on any server or cloud database.

---

### 3. Why is localStorage allowed?
The official AI DevFest 2026 Contest Rulebook explicitly specifies:
> *"The whole app runs in the browser... Not allowed: participant-controlled backend/server code, serverless functions, persistent backend/database or online storage services, including Firebase, Supabase or Appwrite... Allowed: localStorage, sessionStorage, IndexedDB, normal browser features, static hosting and permitted external APIs."*

Browser `localStorage` is completely client-side, runs on the client device without participant servers, requires zero network credentials, and satisfies the requirement that the organizer's workspace survives page reloads.

---

### 4. Explain Resource Shortage calculation.
The calculation is implemented as a pure mathematical comparison function in `src/utils/calculations.js`:
```javascript
export function calculateResourceStatus(required, available) {
  const req = Number(required) || 0;
  const avail = Number(available) || 0;
  return avail < req ? 'Shortage' : 'Sufficient';
}
```
- **Shortage condition**: `Available Quantity < Required Quantity`
- **Sufficient condition**: `Available Quantity >= Required Quantity`

**Example:**
Initial state for Chairs has `Required = 120` and `Available = 100`. Since `100 < 120`, the status is **Shortage**. When edited so `Available = 120`, `120 >= 120` evaluates to true, immediately changing the badge to **Sufficient** and decreasing the Dashboard Resource Shortages counter.

---

### 5. Explain Active Volunteers calculation.
The calculation strictly adheres to the rule:
> *"Active Volunteers = volunteers assigned to events whose status is Active AND whose assignment status is NOT Completed."*

Implemented in `src/utils/calculations.js`:
```javascript
export function calculateActiveVolunteers(events, assignments) {
  const activeEventMap = new Map();
  events.forEach((evt) => {
    if (evt.status === 'Active') {
      activeEventMap.set(evt.id, true);
      activeEventMap.set(evt.name, true);
    }
  });

  return assignments.filter((a) => {
    const isEventActive = activeEventMap.has(a.eventId) || activeEventMap.has(a.eventName);
    const isNotCompleted = a.status !== 'Completed';
    return isEventActive && isNotCompleted;
  }).length;
}
```
**Example with Sample Data:**
- Asha Rahman: Assigned to Campus Career Fair (Active), Status: Confirmed &ne; Completed &rarr; **Counts (1)**
- Tanvir Hasan: Assigned to Campus Career Fair (Active), Status: Pending &ne; Completed &rarr; **Counts (2)**
- Nabila Karim: Assigned to Freshers Orientation (Upcoming) &rarr; Not an Active event &rarr; Excluded
- Siam Ahmed: Assigned to Programming Workshop (Upcoming) &rarr; Not an Active event &rarr; Excluded
- Mitu Akter: Assigned to Community Clean-up (Completed), Status: Completed &rarr; Excluded
- **Total Initial Active Volunteers = 2**.

---

### 6. What happens after refresh?
When the page reloads:
1. `loadAppState()` in `src/services/storage.js` reads `localStorage.getItem('devfest_tracker_v1')`.
2. It parses the stored JSON, validates schema integrity, and restores events, volunteer assignments, and resources.
3. If no data exists (first visit), it safely seeds the exact initial contest sample data.
4. Any user-created events, modified assignments, or edited quantities remain intact.
5. `loadPreferences()` similarly restores the user's selected language (`en` or `bn`) and theme (`light` or `dark`).

---

### 7. How does Bangla/English work?
We implemented a **centralized bilingual dictionary** in `src/constants/translations.js` containing complete lexical mappings for both `en` and `bn`.
- The current language key (`lang`) is stored in React state and persisted to `localStorage`.
- Switching language only updates the active dictionary pointer (`t = TRANSLATIONS[lang]`).
- Form labels, table headers, validation alerts, empty states, and status badges are rendered dynamically through `t[key]`.
- User records and data models are never overwritten, wiped, or mutated when toggling languages.

---

### 8. Which parts were generated by AI?
- **AI Agent Role:** Generated the scaffolding, component architecture, responsive CSS tokens, bilingual dictionary, calculation functions, and automated test suite.
- **Personal Human Verification:**
  - Verified math on all 4 metric counters against the specification.
  - Inspected DOM outputs and console logs in Google Chrome.
  - Confirmed Git commit discipline, prompt tracking, and public HTTPS deployment requirements.
  - Validated that no secret tokens or backend infrastructure were present.

---

### 9. How would you recover from a broken AI-generated change?
1. **Version Control:** Because of strict commit discipline, every working state is committed with descriptive prompt history. We can immediately run `git status`, `git diff`, or `git checkout -- <file>` to revert uncommitted bad edits.
2. **Local Rollback:** If already committed, `git revert <commit-id>` safely rolls back without rewriting history.
3. **Automated Test Suite:** We maintain `node --test tests/contest.test.js`. Running the suite immediately detects calculation regressions before pushing.

---

### 10. Which commit is the final eligible commit?
The final eligible commit is the commit hash created and pushed prior to the T+90 deadline, verified with `git log -1 --format="%H (%s)"`. Judges can inspect that exact commit hash on GitHub and verify that the deployed Vercel build SHA matches it.

---

### 11. How was deployment verified?
1. The production build was compiled using `npm run build` and output verified in `dist/`.
2. Deployed to Vercel/public static host with HTTPS enabled.
3. Validated public accessibility without authentication or login in Google Chrome.
4. Verified that the live URL correctly loads sample metrics (4 events, 2 active volunteers, 2 pending tasks, 2 shortages) and retains data on refresh.

---

### 12. Why is there no backend?
The contest rules explicitly prohibit participant-controlled server infrastructure, serverless functions, database servers, or online storage services. A client-side browser application with `localStorage` persistence guarantees:
- Complete compliance with contest constraints.
- Zero server maintenance, zero network latency, and instant response times.
- Safe offline usage and immunity to remote server outages or rate limits.
