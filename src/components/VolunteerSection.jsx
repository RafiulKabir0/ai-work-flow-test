import React, { useState, useMemo } from 'react';
import { Plus, Search, Edit2, Users, Mail, Phone, Clock, CheckCircle2, Check, Download, AlertCircle } from 'lucide-react';
import { Modal } from './Modal';

export function VolunteerSection({
  assignments,
  events,
  onSaveAssignment,
  onUpdateStatus,
  t,
  onExportCSV,
  searchFilter,
  setSearchFilter,
  statusFilter,
  setStatusFilter,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formEventId, setFormEventId] = useState('');
  const [formRole, setFormRole] = useState('');
  const [formContactMethod, setFormContactMethod] = useState('Email');
  const [formStatus, setFormStatus] = useState('Pending');
  const [errorMessage, setErrorMessage] = useState('');

  const openAddModal = () => {
    setEditingAssignment(null);
    setFormName('');
    setFormEventId(events.length > 0 ? events[0].id : '');
    setFormRole('');
    setFormContactMethod('Email');
    setFormStatus('Pending');
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const openEditModal = (assignment) => {
    setEditingAssignment(assignment);
    setFormName(assignment.volunteerName);
    setFormEventId(assignment.eventId || (events.find((e) => e.name === assignment.eventName)?.id || ''));
    setFormRole(assignment.role);
    setFormContactMethod(assignment.contactMethod);
    setFormStatus(assignment.status);
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim()) {
      setErrorMessage(t.nameCannotBeBlank);
      return;
    }
    if (!formRole.trim()) {
      setErrorMessage(t.requiredField);
      return;
    }
    const selectedEvent = events.find((e) => e.id === formEventId);
    if (!selectedEvent) {
      setErrorMessage(t.eventMustBeSelected);
      return;
    }

    const assignmentData = {
      id: editingAssignment ? editingAssignment.id : `asg-${Date.now()}`,
      volunteerName: formName.trim(),
      eventId: selectedEvent.id,
      eventName: selectedEvent.name,
      role: formRole.trim(),
      contactMethod: formContactMethod,
      status: formStatus,
    };

    onSaveAssignment(assignmentData, !!editingAssignment);
    setIsModalOpen(false);
  };

  // Filtered & searched assignments
  const filteredAssignments = useMemo(() => {
    return assignments.filter((asg) => {
      const q = searchFilter.toLowerCase();
      const matchesSearch =
        asg.volunteerName.toLowerCase().includes(q) ||
        asg.role.toLowerCase().includes(q) ||
        asg.eventName.toLowerCase().includes(q);
      const matchesStatus = statusFilter === 'ALL' || asg.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [assignments, searchFilter, statusFilter]);

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Pending':
        return 'badge-pending';
      case 'Confirmed':
        return 'badge-confirmed';
      case 'Completed':
        return 'badge-completed';
      default:
        return 'badge-neutral';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'Pending':
        return t.statusPending;
      case 'Confirmed':
        return t.statusConfirmed;
      case 'Completed':
        return t.statusCompleted;
      default:
        return status;
    }
  };

  const handleQuickStatusCycle = (assignment) => {
    const nextStatus =
      assignment.status === 'Pending'
        ? 'Confirmed'
        : assignment.status === 'Confirmed'
        ? 'Completed'
        : 'Pending';
    onUpdateStatus(assignment.id, nextStatus);
  };

  return (
    <section className="section-container" aria-label="Volunteer Assignment Management">
      <div className="section-header-row">
        <div>
          <h2 className="section-title">{t.volunteersTitle}</h2>
          <p className="section-subtitle">{t.volunteersSubtitle}</p>
        </div>
        <div className="section-header-actions">
          <button
            type="button"
            className="secondary-btn"
            onClick={() => onExportCSV('volunteer_assignments', assignments)}
            title={t.exportCSV}
            id="export-assignments-csv-btn"
          >
            <Download size={16} />
            <span>{t.exportCSV}</span>
          </button>
          <button
            type="button"
            className="primary-btn"
            onClick={openAddModal}
            id="add-assignment-btn"
          >
            <Plus size={16} />
            <span>{t.addAssignment}</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="filter-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder={t.searchVolunteersPlaceholder}
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            id="assignment-search-input"
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
          <label htmlFor="assignment-status-filter" className="filter-label">
            {t.filterByStatus}:
          </label>
          <select
            id="assignment-status-filter"
            className="select-input"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="ALL">{t.allStatuses}</option>
            <option value="Pending">{t.statusPending}</option>
            <option value="Confirmed">{t.statusConfirmed}</option>
            <option value="Completed">{t.statusCompleted}</option>
          </select>
        </div>
      </div>

      {/* Assignments Table */}
      {filteredAssignments.length === 0 ? (
        <div className="empty-state-box" id="assignments-empty-state">
          <Users size={48} className="empty-state-icon" />
          <h4 className="empty-state-title">{t.noAssignmentsFound}</h4>
          <p className="empty-state-text">{t.noAssignmentsPrompt}</p>
          <button
            type="button"
            className="primary-btn"
            onClick={openAddModal}
          >
            <Plus size={16} />
            <span>{t.addAssignment}</span>
          </button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table" id="assignments-data-table">
            <thead>
              <tr>
                <th>{t.volunteerName}</th>
                <th>{t.event}</th>
                <th>{t.volunteerRole}</th>
                <th>{t.contactMethod}</th>
                <th>{t.assignmentStatus}</th>
                <th className="text-right">{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filteredAssignments.map((asg) => (
                <tr key={asg.id} id={`assignment-row-${asg.id}`}>
                  <td className="font-semibold text-primary">
                    {asg.volunteerName}
                  </td>
                  <td>
                    <span className="badge-event-pill">
                      {asg.eventName}
                    </span>
                  </td>
                  <td className="text-secondary font-medium">
                    {asg.role}
                  </td>
                  <td>
                    <span className="inline-flex-center gap-1 text-muted">
                      {asg.contactMethod === 'Email' ? (
                        <Mail size={14} />
                      ) : (
                        <Phone size={14} />
                      )}
                      <span>
                        {asg.contactMethod === 'Email'
                          ? t.contactEmail
                          : asg.contactMethod === 'Phone'
                          ? t.contactPhone
                          : asg.contactMethod}
                      </span>
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className={`status-badge-interactive ${getStatusBadgeClass(asg.status)}`}
                      onClick={() => handleQuickStatusCycle(asg)}
                      title={`${t.quickStatusChange}: ${getStatusLabel(asg.status)} (click to cycle)`}
                      id={`cycle-status-btn-${asg.id}`}
                    >
                      <span>{getStatusLabel(asg.status)}</span>
                    </button>
                  </td>
                  <td className="text-right">
                    <button
                      type="button"
                      className="action-icon-btn"
                      onClick={() => openEditModal(asg)}
                      title={t.edit}
                      id={`edit-assignment-btn-${asg.id}`}
                    >
                      <Edit2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Add / Edit Assignment Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingAssignment ? t.editAssignment : t.addAssignment}
      >
        <form onSubmit={handleFormSubmit} className="modal-form" id="assignment-form">
          {errorMessage && (
            <div className="form-error-alert" id="assignment-form-error">
              {errorMessage}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="volunteer-name-input" className="form-label">
              {t.volunteerName} <span className="text-required">*</span>
            </label>
            <input
              type="text"
              id="volunteer-name-input"
              className="form-input"
              value={formName}
              onChange={(e) => {
                setFormName(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="e.g. Tanvir Hasan"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="assignment-event-select" className="form-label">
              {t.event} <span className="text-required">*</span>
            </label>
            <select
              id="assignment-event-select"
              className="form-input"
              value={formEventId}
              onChange={(e) => setFormEventId(e.target.value)}
            >
              {events.map((evt) => (
                <option key={evt.id} value={evt.id}>
                  {evt.name} ({evt.status})
                </option>
              ))}
            </select>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="volunteer-role-input" className="form-label">
                {t.volunteerRole} <span className="text-required">*</span>
              </label>
              <input
                type="text"
                id="volunteer-role-input"
                className="form-input"
                value={formRole}
                onChange={(e) => {
                  setFormRole(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="e.g. Stage Coordinator"
              />
            </div>

            <div className="form-group">
              <label htmlFor="assignment-contact-select" className="form-label">
                {t.contactMethod}
              </label>
              <select
                id="assignment-contact-select"
                className="form-input"
                value={formContactMethod}
                onChange={(e) => setFormContactMethod(e.target.value)}
              >
                <option value="Email">{t.contactEmail}</option>
                <option value="Phone">{t.contactPhone}</option>
                <option value="Other">{t.contactOther}</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="assignment-status-select" className="form-label">
              {t.assignmentStatus}
            </label>
            <select
              id="assignment-status-select"
              className="form-input"
              value={formStatus}
              onChange={(e) => setFormStatus(e.target.value)}
            >
              <option value="Pending">{t.statusPending}</option>
              <option value="Confirmed">{t.statusConfirmed}</option>
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
              id="save-assignment-submit-btn"
            >
              {editingAssignment ? t.update : t.save}
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
