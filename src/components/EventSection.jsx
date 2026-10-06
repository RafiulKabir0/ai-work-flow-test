import React, { useState, useMemo } from 'react';
import { Plus, Search, Edit2, Calendar, MapPin, Users, CheckCircle, Clock, CheckCircle2, Download } from 'lucide-react';
import { Modal } from './Modal';
import { getAssignedVolunteerCount } from '../utils/calculations';

export function EventSection({
  events,
  assignments,
  onSaveEvent,
  t,
  onExportCSV,
  searchFilter,
  setSearchFilter,
  statusFilter,
  setStatusFilter,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formDate, setFormDate] = useState('');
  const [formLocation, setFormLocation] = useState('');
  const [formStatus, setFormStatus] = useState('Upcoming');
  const [errorMessage, setErrorMessage] = useState('');

  const openAddModal = () => {
    setEditingEvent(null);
    setFormName('');
    setFormDate('');
    setFormLocation('');
    setFormStatus('Upcoming');
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const openEditModal = (event) => {
    setEditingEvent(event);
    setFormName(event.name);
    setFormDate(event.date);
    setFormLocation(event.location);
    setFormStatus(event.status);
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim()) {
      setErrorMessage(t.nameCannotBeBlank);
      return;
    }

    const eventData = {
      id: editingEvent ? editingEvent.id : `evt-${Date.now()}`,
      name: formName.trim(),
      date: formDate.trim() || 'TBD',
      location: formLocation.trim() || 'TBD',
      status: formStatus,
    };

    onSaveEvent(eventData, !!editingEvent);
    setIsModalOpen(false);
  };

  // Filtered & searched events
  const filteredEvents = useMemo(() => {
    return events.filter((evt) => {
      const matchesSearch =
        evt.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
        evt.location.toLowerCase().includes(searchFilter.toLowerCase());
      const matchesStatus = statusFilter === 'ALL' || evt.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [events, searchFilter, statusFilter]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Active':
        return 'badge-active';
      case 'Upcoming':
        return 'badge-upcoming';
      case 'Completed':
        return 'badge-completed';
      default:
        return 'badge-neutral';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'Active':
        return t.statusActive;
      case 'Upcoming':
        return t.statusUpcoming;
      case 'Completed':
        return t.statusCompleted;
      default:
        return status;
    }
  };

  return (
    <section className="section-container" aria-label="Event Management">
      <div className="section-header-row">
        <div>
          <h2 className="section-title">{t.eventsTitle}</h2>
          <p className="section-subtitle">{t.eventsSubtitle}</p>
        </div>
        <div className="section-header-actions">
          <button
            type="button"
            className="secondary-btn"
            onClick={() => onExportCSV('events', events)}
            title={t.exportCSV}
            id="export-events-csv-btn"
          >
            <Download size={16} />
            <span>{t.exportCSV}</span>
          </button>
          <button
            type="button"
            className="primary-btn"
            onClick={openAddModal}
            id="add-event-btn"
          >
            <Plus size={16} />
            <span>{t.addEvent}</span>
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="filter-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder={t.searchEventsPlaceholder}
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            id="event-search-input"
          />
          {searchFilter && (
            <button
              type="button"
              className="clear-search-btn"
              onClick={() => setSearchFilter('')}
            >
              ×
            </button>
          )}
        </div>

        <div className="filter-group">
          <label htmlFor="event-status-filter" className="filter-label">
            {t.filterByStatus}:
          </label>
          <select
            id="event-status-filter"
            className="select-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">{t.allStatuses}</option>
            <option value="Active">{t.statusActive}</option>
            <option value="Upcoming">{t.statusUpcoming}</option>
            <option value="Completed">{t.statusCompleted}</option>
          </select>
        </div>
      </div>

      {/* Events Table / Card Grid */}
      {filteredEvents.length === 0 ? (
        <div className="empty-state-box" id="events-empty-state">
          <Calendar size={48} className="empty-state-icon" />
          <h4 className="empty-state-title">{t.noEventsFound}</h4>
          <p className="empty-state-text">{t.noEventsPrompt}</p>
          <button
            type="button"
            className="primary-btn"
            onClick={openAddModal}
          >
            <Plus size={16} />
            <span>{t.addEvent}</span>
          </button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table" id="events-data-table">
            <thead>
              <tr>
                <th>{t.eventName}</th>
                <th>{t.eventDate}</th>
                <th>{t.eventLocation}</th>
                <th>{t.eventStatus}</th>
                <th>{t.assignedVolunteersCount}</th>
                <th className="text-right">{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map((evt) => {
                const assignedCount = getAssignedVolunteerCount(evt, assignments);
                return (
                  <tr key={evt.id} id={`event-row-${evt.id}`}>
                    <td className="font-semibold text-primary">
                      {evt.name}
                    </td>
                    <td>
                      <span className="inline-flex-center gap-1 text-muted">
                        <Calendar size={14} />
                        <span>{evt.date}</span>
                      </span>
                    </td>
                    <td>
                      <span className="inline-flex-center gap-1 text-muted">
                        <MapPin size={14} />
                        <span>{evt.location}</span>
                      </span>
                    </td>
                    <td>
                      <span className={`status-badge ${getStatusBadgeClass(evt.status)}`}>
                        <span className="badge-dot" aria-hidden="true"></span>
                        <span>{getStatusLabel(evt.status)}</span>
                      </span>
                    </td>
                    <td>
                      <span className="volunteer-count-badge">
                        <Users size={13} />
                        <span>{assignedCount}</span>
                      </span>
                    </td>
                    <td className="text-right">
                      <button
                        type="button"
                        className="action-icon-btn"
                        onClick={() => openEditModal(evt)}
                        title={t.edit}
                        id={`edit-event-btn-${evt.id}`}
                      >
                        <Edit2 size={16} />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingEvent ? t.editEvent : t.addEvent}
      >
        <form onSubmit={handleFormSubmit} className="modal-form" id="event-form">
          {errorMessage && (
            <div className="form-error-alert" id="event-form-error">
              {errorMessage}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="event-name-input" className="form-label">
              {t.eventName} <span className="text-required">*</span>
            </label>
            <input
              type="text"
              id="event-name-input"
              className="form-input"
              value={formName}
              onChange={(e) => {
                setFormName(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="e.g. Annual Tech Symposium"
              autoFocus
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="event-date-input" className="form-label">
                {t.eventDate}
              </label>
              <input
                type="text"
                id="event-date-input"
                className="form-input"
                value={formDate}
                onChange={(e) => setFormDate(e.target.value)}
                placeholder="e.g. 15 Nov 2026"
              />
            </div>

            <div className="form-group">
              <label htmlFor="event-location-input" className="form-label">
                {t.eventLocation}
              </label>
              <input
                type="text"
                id="event-location-input"
                className="form-input"
                value={formLocation}
                onChange={(e) => setFormLocation(e.target.value)}
                placeholder="e.g. Auditorium Hall A"
              />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="event-status-select" className="form-label">
              {t.eventStatus}
            </label>
            <select
              id="event-status-select"
              className="form-input"
              value={formStatus}
              onChange={(e) => setFormStatus(e.target.value)}
            >
              <option value="Active">{t.statusActive}</option>
              <option value="Upcoming">{t.statusUpcoming}</option>
              <option value="Completed">{t.statusCompleted}</option>
            </select>
          </div>

          <div className="modal-footer">
            <button
              type="button"
              className="secondary-btn"
              onClick={() => setIsModalOpen(false)}
            >
              {t.cancel}
            </button>
            <button
              type="submit"
              className="primary-btn"
              id="save-event-submit-btn"
            >
              {editingEvent ? t.update : t.save}
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
