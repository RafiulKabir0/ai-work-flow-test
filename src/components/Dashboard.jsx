import React from 'react';
import { Calendar, Users, Clock, AlertTriangle, ArrowRight, CheckCircle2, AlertCircle } from 'lucide-react';

export function Dashboard({
  metrics,
  t,
  onNavigateTab,
  onFilterResourcesShortage,
  onFilterVolunteersPending,
  onFilterEventsActive,
  events,
  assignments,
  resources
}) {
  const activeEventsCount = events.filter((e) => e.status === 'Active').length;
  const upcomingEventsCount = events.filter((e) => e.status === 'Upcoming').length;
  const completedEventsCount = events.filter((e) => e.status === 'Completed').length;

  const confirmedAssignmentsCount = assignments.filter((a) => a.status === 'Confirmed').length;
  const completedAssignmentsCount = assignments.filter((a) => a.status === 'Completed').length;

  const sufficientResourcesCount = resources.filter(
    (r) => Number(r.availableQuantity) >= Number(r.requiredQuantity)
  ).length;

  return (
    <section className="dashboard-section" aria-label="Dashboard Overview">
      <div className="section-header">
        <div>
          <h2 className="section-title">{t.navDashboard}</h2>
          <p className="section-subtitle">{t.appSubtitle}</p>
        </div>
      </div>

      <div className="metrics-grid">
        {/* Metric 1: Total Events */}
        <div
          className="metric-card metric-events"
          id="metric-total-events-card"
          tabIndex={0}
          role="region"
          aria-label={t.metricTotalEvents}
        >
          <div className="metric-header">
            <span className="metric-title">{t.metricTotalEvents}</span>
            <div className="metric-icon-box icon-events">
              <Calendar size={22} />
            </div>
          </div>
          <div className="metric-value" id="metric-total-events-val">
            {metrics.totalEvents}
          </div>
          <p className="metric-desc">{t.metricTotalEventsDesc}</p>
          <div className="metric-pills">
            <span className="pill pill-active">{activeEventsCount} {t.statusActive}</span>
            <span className="pill pill-upcoming">{upcomingEventsCount} {t.statusUpcoming}</span>
            <span className="pill pill-completed">{completedEventsCount} {t.statusCompleted}</span>
          </div>
          <button
            type="button"
            className="metric-action-btn"
            onClick={() => onNavigateTab('events')}
            id="view-all-events-btn"
          >
            <span>{t.navEvents}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Metric 2: Active Volunteers */}
        <div
          className="metric-card metric-volunteers"
          id="metric-active-volunteers-card"
          tabIndex={0}
          role="region"
          aria-label={t.metricActiveVolunteers}
        >
          <div className="metric-header">
            <span className="metric-title">{t.metricActiveVolunteers}</span>
            <div className="metric-icon-box icon-volunteers">
              <Users size={22} />
            </div>
          </div>
          <div className="metric-value" id="metric-active-volunteers-val">
            {metrics.activeVolunteers}
          </div>
          <p className="metric-desc">{t.metricActiveVolunteersDesc}</p>
          <div className="metric-pills">
            <span className="pill pill-confirmed">{confirmedAssignmentsCount} {t.statusConfirmed}</span>
            <span className="pill pill-completed">{completedAssignmentsCount} {t.statusCompleted}</span>
          </div>
          <button
            type="button"
            className="metric-action-btn"
            onClick={() => onNavigateTab('volunteers')}
            id="view-all-volunteers-btn"
          >
            <span>{t.navVolunteers}</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Metric 3: Pending Tasks */}
        <div
          className={`metric-card metric-tasks ${metrics.pendingTasks > 0 ? 'card-highlight-warning' : ''}`}
          id="metric-pending-tasks-card"
          tabIndex={0}
          role="region"
          aria-label={t.metricPendingTasks}
        >
          <div className="metric-header">
            <span className="metric-title">{t.metricPendingTasks}</span>
            <div className="metric-icon-box icon-tasks">
              <Clock size={22} />
            </div>
          </div>
          <div className="metric-value" id="metric-pending-tasks-val">
            {metrics.pendingTasks}
          </div>
          <p className="metric-desc">{t.metricPendingTasksDesc}</p>
          <div className="metric-pills">
            <span className="pill pill-pending">{metrics.pendingTasks} {t.statusPending}</span>
          </div>
          <button
            type="button"
            className="metric-action-btn"
            onClick={() => {
              onFilterVolunteersPending();
              onNavigateTab('volunteers');
            }}
            id="filter-pending-assignments-btn"
          >
            <span>{t.quickFilter} ({t.statusPending})</span>
            <ArrowRight size={14} />
          </button>
        </div>

        {/* Metric 4: Resource Shortages */}
        <div
          className={`metric-card metric-shortages ${metrics.resourceShortages > 0 ? 'card-highlight-danger' : ''}`}
          id="metric-resource-shortages-card"
          tabIndex={0}
          role="region"
          aria-label={t.metricResourceShortages}
        >
          <div className="metric-header">
            <span className="metric-title">{t.metricResourceShortages}</span>
            <div className="metric-icon-box icon-shortages">
              <AlertTriangle size={22} />
            </div>
          </div>
          <div className="metric-value" id="metric-resource-shortages-val">
            {metrics.resourceShortages}
          </div>
          <p className="metric-desc">{t.metricResourceShortagesDesc}</p>
          <div className="metric-pills">
            <span className="pill pill-shortage">{metrics.resourceShortages} {t.statusShortage}</span>
            <span className="pill pill-sufficient">{sufficientResourcesCount} {t.statusSufficient}</span>
          </div>
          <button
            type="button"
            className="metric-action-btn"
            onClick={() => {
              onFilterResourcesShortage();
              onNavigateTab('resources');
            }}
            id="filter-shortages-resources-btn"
          >
            <span>{t.showShortagesOnly}</span>
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Quick Summary Highlights Banner */}
      <div className="dashboard-summary-banner">
        <div className="summary-col">
          <div className="summary-title">
            <CheckCircle2 size={16} className="text-success" />
            <span>{t.businessRulesTitle}</span>
          </div>
          <ul className="summary-list">
            <li><strong>{t.statusShortage}:</strong> {t.ruleShortage}</li>
            <li><strong>{t.metricPendingTasks}:</strong> {t.rulePending}</li>
            <li><strong>{t.metricActiveVolunteers}:</strong> {t.ruleActiveVolunteers}</li>
          </ul>
        </div>
      </div>
    </section>
  );
}
