import { INITIAL_EVENTS, INITIAL_ASSIGNMENTS, INITIAL_RESOURCES } from '../constants/initialData';

const STORAGE_KEY = 'devfest_tracker_v1';
const PREFS_KEY = 'devfest_tracker_prefs_v1';

/**
 * Loads application state from localStorage or initializes with sample data
 */
export function loadAppState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = {
        version: 1,
        events: INITIAL_EVENTS,
        assignments: INITIAL_ASSIGNMENTS,
        resources: INITIAL_RESOURCES,
      };
      saveAppState(initial);
      return initial;
    }

    const parsed = JSON.parse(raw);
    if (parsed && Array.isArray(parsed.events) && Array.isArray(parsed.assignments) && Array.isArray(parsed.resources)) {
      return parsed;
    }

    // Fallback if data structure is corrupted
    return {
      version: 1,
      events: INITIAL_EVENTS,
      assignments: INITIAL_ASSIGNMENTS,
      resources: INITIAL_RESOURCES,
    };
  } catch (err) {
    console.error('Failed to load state from localStorage:', err);
    return {
      version: 1,
      events: INITIAL_EVENTS,
      assignments: INITIAL_ASSIGNMENTS,
      resources: INITIAL_RESOURCES,
    };
  }
}

/**
 * Saves entire state to localStorage
 */
export function saveAppState(state) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch (err) {
    console.error('Failed to save state to localStorage:', err);
  }
}

/**
 * Loads user preferences (language and theme)
 */
export function loadPreferences() {
  try {
    const raw = localStorage.getItem(PREFS_KEY);
    if (!raw) {
      return { lang: 'en', theme: 'light' };
    }
    const parsed = JSON.parse(raw);
    return {
      lang: parsed.lang === 'bn' ? 'bn' : 'en',
      theme: parsed.theme === 'dark' ? 'dark' : 'light',
    };
  } catch (err) {
    return { lang: 'en', theme: 'light' };
  }
}

/**
 * Saves user preferences
 */
export function savePreferences(prefs) {
  try {
    localStorage.setItem(PREFS_KEY, JSON.stringify(prefs));
  } catch (err) {
    console.error('Failed to save preferences:', err);
  }
}

/**
 * Resets application data back to the exact synthetic initial state
 */
export function resetToInitialState() {
  const fresh = {
    version: 1,
    events: JSON.parse(JSON.stringify(INITIAL_EVENTS)),
    assignments: JSON.parse(JSON.stringify(INITIAL_ASSIGNMENTS)),
    resources: JSON.parse(JSON.stringify(INITIAL_RESOURCES)),
  };
  saveAppState(fresh);
  return fresh;
}

/**
 * Exports data to JSON string for backup
 */
export function exportToJSON(data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `devfest_tracker_backup_${new Date().toISOString().slice(0, 10)}.json`;
  a.click();
  URL.revokeObjectURL(url);
}

/**
 * Helper to export current view as CSV
 */
export function exportToCSV(type, items) {
  if (!items || !items.length) return;
  const headers = Object.keys(items[0]);
  const rows = items.map((obj) =>
    headers
      .map((header) => {
        let val = obj[header] !== undefined ? String(obj[header]) : '';
        val = val.replace(/"/g, '""');
        return `"${val}"`;
      })
      .join(',')
  );

  const csvContent = [headers.join(','), ...rows].join('\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${type}_export_${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
