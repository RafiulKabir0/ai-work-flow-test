import React, { useState, useEffect, useMemo } from 'react';
import { TRANSLATIONS } from './constants/translations';
import {
  loadAppState,
  saveAppState,
  loadPreferences,
  savePreferences,
  resetToInitialState,
  exportToJSON,
  exportToCSV,
} from './services/storage';
import {
  calculatePendingTasks,
  calculateActiveVolunteers,
  calculateResourceShortages,
} from './utils/calculations';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { EventSection } from './components/EventSection';
import { VolunteerSection } from './components/VolunteerSection';
import { ResourceSection } from './components/ResourceSection';
import { RulesModal } from './components/RulesModal';
import { Toast } from './components/Toast';
import { LayoutDashboard, Calendar, Users, Package } from 'lucide-react';

export function App() {
  // Load preferences from localStorage
  const initialPrefs = useMemo(() => loadPreferences(), []);
  const [lang, setLang] = useState(initialPrefs.lang);
  const [theme, setTheme] = useState(initialPrefs.theme);

  // Load persistent application state from localStorage
  const initialState = useMemo(() => loadAppState(), []);
  const [events, setEvents] = useState(initialState.events);
  const [assignments, setAssignments] = useState(initialState.assignments);
  const [resources, setResources] = useState(initialState.resources);

  // Navigation tab state
  const [activeTab, setActiveTab] = useState('dashboard');

  // Filter states
  const [eventSearch, setEventSearch] = useState('');
  const [eventStatusFilter, setEventStatusFilter] = useState('ALL');

  const [volunteerSearch, setVolunteerSearch] = useState('');
  const [volunteerStatusFilter, setVolunteerStatusFilter] = useState('ALL');

  const [resourceSearch, setResourceSearch] = useState('');
  const [resourceShortageOnly, setResourceShortageOnly] = useState(false);

  // Modals & Toast
  const [isRulesModalOpen, setIsRulesModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Translations shortcut
  const t = TRANSLATIONS[lang] || TRANSLATIONS.en;

  // Apply theme class to document body / root
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  // Persist state to localStorage whenever events, assignments, or resources change
  useEffect(() => {
    saveAppState({
      version: 1,
      events,
      assignments,
      resources,
    });
  }, [events, assignments, resources]);

  // Persist language and theme preferences
  useEffect(() => {
    savePreferences({ lang, theme });
  }, [lang, theme]);

  // Toast auto-dismiss timer
  useEffect(() => {
    if (toast) {
      const timer = setTimeout(() => setToast(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toast]);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
  };

  // Language toggle handler
  const handleToggleLang = () => {
    const nextLang = lang === 'en' ? 'bn' : 'en';
    setLang(nextLang);
  };

  // Theme toggle handler
  const handleToggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
  };

  // Calculate live metrics dynamically
  const metrics = useMemo(() => {
    return {
      totalEvents: events.length,
      activeVolunteers: calculateActiveVolunteers(events, assignments),
      pendingTasks: calculatePendingTasks(assignments),
      resourceShortages: calculateResourceShortages(resources),
    };
  }, [events, assignments, resources]);

  // Event Handlers
  const handleSaveEvent = (eventData, isEdit) => {
    if (isEdit) {
      setEvents((prev) =>
        prev.map((e) => (e.id === eventData.id ? eventData : e))
      );
      // Synchronize event name in assignments and resources if changed
      setAssignments((prev) =>
        prev.map((a) => (a.eventId === eventData.id ? { ...a, eventName: eventData.name } : a))
      );
      setResources((prev) =>
        prev.map((r) => (r.eventId === eventData.id ? { ...r, eventName: eventData.name } : r))
      );
      showToast(t.updatedSuccessfully);
    } else {
      setEvents((prev) => [eventData, ...prev]);
      showToast(t.savedSuccessfully);
    }
  };

  // Volunteer Assignment Handlers
  const handleSaveAssignment = (assignmentData, isEdit) => {
    if (isEdit) {
      setAssignments((prev) =>
        prev.map((a) => (a.id === assignmentData.id ? assignmentData : a))
      );
      showToast(t.updatedSuccessfully);
    } else {
      setAssignments((prev) => [assignmentData, ...prev]);
      showToast(t.savedSuccessfully);
    }
  };

  const handleUpdateAssignmentStatus = (id, newStatus) => {
    setAssignments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
    showToast(`${t.statusUpdated} ${newStatus}`);
  };

  // Resource Handlers
  const handleSaveResource = (resourceData, isEdit) => {
    if (isEdit) {
      setResources((prev) =>
        prev.map((r) => (r.id === resourceData.id ? resourceData : r))
      );
      showToast(t.updatedSuccessfully);
    } else {
      setResources((prev) => [resourceData, ...prev]);
      showToast(t.savedSuccessfully);
    }
  };

  // Reset to initial sample data
  const handleResetData = () => {
    if (window.confirm('Reset all events, assignments, and resources to the contest sample dataset?')) {
      const fresh = resetToInitialState();
      setEvents(fresh.events);
      setAssignments(fresh.assignments);
      setResources(fresh.resources);
      showToast(t.resetSuccess, 'info');
    }
  };

  // Backup JSON download
  const handleExportJSON = () => {
    exportToJSON({
      version: 1,
      exportedAt: new Date().toISOString(),
      appName: 'ai-work-flow-test',
      events,
      assignments,
      resources,
    });
    showToast(t.backupDownloaded, 'info');
  };

  // CSV export
  const handleExportCSV = (type, items) => {
    exportToCSV(type, items);
  };

  return (
    <div className="app-layout">
      {/* Header */}
      <Header
        lang={lang}
        onToggleLang={handleToggleLang}
        theme={theme}
        onToggleTheme={handleToggleTheme}
        t={t}
        onResetData={handleResetData}
        onExportJSON={handleExportJSON}
        onOpenRules={() => setIsRulesModalOpen(true)}
      />

      {/* Navigation Tabs Bar */}
      <nav className="main-nav-tabs" aria-label="Main Navigation">
        <div className="nav-tabs-container">
          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'dashboard' ? 'active' : ''}`}
            onClick={() => setActiveTab('dashboard')}
            id="tab-btn-dashboard"
          >
            <LayoutDashboard size={18} />
            <span>{t.navDashboard}</span>
          </button>

          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'events' ? 'active' : ''}`}
            onClick={() => setActiveTab('events')}
            id="tab-btn-events"
          >
            <Calendar size={18} />
            <span>{t.navEvents}</span>
            <span className="tab-badge">{events.length}</span>
          </button>

          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'volunteers' ? 'active' : ''}`}
            onClick={() => setActiveTab('volunteers')}
            id="tab-btn-volunteers"
          >
            <Users size={18} />
            <span>{t.navVolunteers}</span>
            <span className="tab-badge">{assignments.length}</span>
          </button>

          <button
            type="button"
            className={`nav-tab-btn ${activeTab === 'resources' ? 'active' : ''}`}
            onClick={() => setActiveTab('resources')}
            id="tab-btn-resources"
          >
            <Package size={18} />
            <span>{t.navResources}</span>
            <span className="tab-badge">{resources.length}</span>
          </button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="main-content">
        {activeTab === 'dashboard' && (
          <Dashboard
            metrics={metrics}
            t={t}
            onNavigateTab={setActiveTab}
            onFilterResourcesShortage={() => {
              setResourceShortageOnly(true);
            }}
            onFilterVolunteersPending={() => {
              setVolunteerStatusFilter('Pending');
            }}
            onFilterEventsActive={() => {
              setEventStatusFilter('Active');
            }}
            events={events}
            assignments={assignments}
            resources={resources}
          />
        )}

        {activeTab === 'events' && (
          <EventSection
            events={events}
            assignments={assignments}
            onSaveEvent={handleSaveEvent}
            t={t}
            onExportCSV={handleExportCSV}
            searchFilter={eventSearch}
            setSearchFilter={setEventSearch}
            statusFilter={eventStatusFilter}
            setStatusFilter={setEventStatusFilter}
          />
        )}

        {activeTab === 'volunteers' && (
          <VolunteerSection
            assignments={assignments}
            events={events}
            onSaveAssignment={handleSaveAssignment}
            onUpdateStatus={handleUpdateAssignmentStatus}
            t={t}
            onExportCSV={handleExportCSV}
            searchFilter={volunteerSearch}
            setSearchFilter={setVolunteerSearch}
            statusFilter={volunteerStatusFilter}
            setStatusFilter={setVolunteerStatusFilter}
          />
        )}

        {activeTab === 'resources' && (
          <ResourceSection
            resources={resources}
            events={events}
            onSaveResource={handleSaveResource}
            t={t}
            onExportCSV={handleExportCSV}
            searchFilter={resourceSearch}
            setSearchFilter={setResourceSearch}
            shortageOnlyFilter={resourceShortageOnly}
            setShortageOnlyFilter={setResourceShortageOnly}
          />
        )}
      </main>

      {/* Rules Modal */}
      <RulesModal
        isOpen={isRulesModalOpen}
        onClose={() => setIsRulesModalOpen(false)}
        t={t}
      />

      {/* Toast Notification */}
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Footer */}
      <footer className="app-footer">
        <div className="footer-content">
          <p className="footer-title">{t.footerText}</p>
          <p className="footer-arch">{t.cleanArchitecture}</p>
          <div className="footer-meta">
            <span>Repository: <strong>ai-work-flow-test</strong></span>
            <span>•</span>
            <span>License: <strong>MIT</strong></span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
