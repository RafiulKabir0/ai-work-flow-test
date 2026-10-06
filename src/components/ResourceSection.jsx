import React, { useState, useMemo } from 'react';
import { Plus, Search, Edit2, Package, AlertTriangle, CheckCircle2, Download, Filter } from 'lucide-react';
import { Modal } from './Modal';
import { calculateResourceStatus } from '../utils/calculations';

export function ResourceSection({
  resources,
  events,
  onSaveResource,
  t,
  onExportCSV,
  searchFilter,
  setSearchFilter,
  shortageOnlyFilter,
  setShortageOnlyFilter,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingResource, setEditingResource] = useState(null);

  // Form State
  const [formName, setFormName] = useState('');
  const [formEventId, setFormEventId] = useState('');
  const [formRequired, setFormRequired] = useState('');
  const [formAvailable, setFormAvailable] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const openAddModal = () => {
    setEditingResource(null);
    setFormName('');
    setFormEventId(events.length > 0 ? events[0].id : '');
    setFormRequired('');
    setFormAvailable('');
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const openEditModal = (resource) => {
    setEditingResource(resource);
    setFormName(resource.resourceName);
    setFormEventId(resource.eventId || (events.find((e) => e.name === resource.eventName)?.id || ''));
    setFormRequired(String(resource.requiredQuantity));
    setFormAvailable(String(resource.availableQuantity));
    setErrorMessage('');
    setIsModalOpen(true);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!formName.trim()) {
      setErrorMessage(t.nameCannotBeBlank);
      return;
    }

    const reqNum = Number(formRequired);
    const availNum = Number(formAvailable);

    if (isNaN(reqNum) || isNaN(availNum) || formRequired.trim() === '' || formAvailable.trim() === '') {
      setErrorMessage(t.quantityMustBeNumber);
      return;
    }

    if (reqNum < 0 || availNum < 0) {
      setErrorMessage(t.quantityNonNegative);
      return;
    }

    const selectedEvent = events.find((e) => e.id === formEventId);
    if (!selectedEvent) {
      setErrorMessage(t.eventMustBeSelected);
      return;
    }

    const resourceData = {
      id: editingResource ? editingResource.id : `res-${Date.now()}`,
      resourceName: formName.trim(),
      eventId: selectedEvent.id,
      eventName: selectedEvent.name,
      requiredQuantity: reqNum,
      availableQuantity: availNum,
    };

    onSaveResource(resourceData, !!editingResource);
    setIsModalOpen(false);
  };

  // Filtered resources
  const filteredResources = useMemo(() => {
    return resources.filter((res) => {
      const q = searchFilter.toLowerCase();
      const matchesSearch =
        res.resourceName.toLowerCase().includes(q) ||
        res.eventName.toLowerCase().includes(q);
      const status = calculateResourceStatus(res.requiredQuantity, res.availableQuantity);
      const matchesShortageOnly = !shortageOnlyFilter || status === 'Shortage';
      return matchesSearch && matchesShortageOnly;
    });
  }, [resources, searchFilter, shortageOnlyFilter]);

  return (
    <section className="section-container" aria-label="Resource Management">
      <div className="section-header-row">
        <div>
          <h2 className="section-title">{t.resourcesTitle}</h2>
          <p className="section-subtitle">{t.resourcesSubtitle}</p>
        </div>
        <div className="section-header-actions">
          <button
            type="button"
            className="secondary-btn"
            onClick={() => onExportCSV('resources', resources)}
            title={t.exportCSV}
            id="export-resources-csv-btn"
          >
            <Download size={16} />
            <span>{t.exportCSV}</span>
          </button>
          <button
            type="button"
            className="primary-btn"
            onClick={openAddModal}
            id="add-resource-btn"
          >
            <Plus size={16} />
            <span>{t.addResource}</span>
          </button>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="filter-bar">
        <div className="search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder={t.searchResourcesPlaceholder}
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
            id="resource-search-input"
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

        {/* Bonus Feature 1: One-Click Shortage Filter */}
        <button
          type="button"
          className={`toggle-filter-btn ${shortageOnlyFilter ? 'active-filter' : ''}`}
          onClick={() => setShortageOnlyFilter(!shortageOnlyFilter)}
          id="toggle-shortages-filter-btn"
        >
          <Filter size={16} />
          <span>
            {shortageOnlyFilter ? t.showAllResources : t.showShortagesOnly}
          </span>
        </button>
      </div>

      {/* Resources Table */}
      {filteredResources.length === 0 ? (
        <div className="empty-state-box" id="resources-empty-state">
          <Package size={48} className="empty-state-icon" />
          <h4 className="empty-state-title">{t.noResourcesFound}</h4>
          <p className="empty-state-text">{t.noResourcesPrompt}</p>
          <button
            type="button"
            className="primary-btn"
            onClick={openAddModal}
          >
            <Plus size={16} />
            <span>{t.addResource}</span>
          </button>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="data-table" id="resources-data-table">
            <thead>
              <tr>
                <th>{t.resourceName}</th>
                <th>{t.event}</th>
                <th>{t.requiredQuantity}</th>
                <th>{t.availableQuantity}</th>
                <th>{t.shortageStatus}</th>
                <th className="text-right">{t.actions}</th>
              </tr>
            </thead>
            <tbody>
              {filteredResources.map((res) => {
                const status = calculateResourceStatus(res.requiredQuantity, res.availableQuantity);
                const isShortage = status === 'Shortage';
                const deficit = isShortage ? res.requiredQuantity - res.availableQuantity : 0;

                return (
                  <tr key={res.id} id={`resource-row-${res.id}`}>
                    <td className="font-semibold text-primary">
                      {res.resourceName}
                    </td>
                    <td>
                      <span className="badge-event-pill">
                        {res.eventName}
                      </span>
                    </td>
                    <td className="font-mono font-medium">
                      {res.requiredQuantity}
                    </td>
                    <td className="font-mono font-medium">
                      <span className={isShortage ? 'text-danger font-bold' : 'text-success'}>
                        {res.availableQuantity}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`status-badge ${
                          isShortage ? 'badge-shortage' : 'badge-sufficient'
                        }`}
                        id={`resource-status-badge-${res.id}`}
                      >
                        {isShortage ? (
                          <>
                            <AlertTriangle size={13} />
                            <span>{t.statusShortage} (-{deficit})</span>
                          </>
                        ) : (
                          <>
                            <CheckCircle2 size={13} />
                            <span>{t.statusSufficient}</span>
                          </>
                        )}
                      </span>
                    </td>
                    <td className="text-right">
                      <button
                        type="button"
                        className="action-icon-btn"
                        onClick={() => openEditModal(res)}
                        title={t.edit}
                        id={`edit-resource-btn-${res.id}`}
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

      {/* Add / Edit Resource Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={editingResource ? t.editResource : t.addResource}
      >
        <form onSubmit={handleFormSubmit} className="modal-form" id="resource-form">
          {errorMessage && (
            <div className="form-error-alert" id="resource-form-error">
              {errorMessage}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="resource-name-input" className="form-label">
              {t.resourceName} <span className="text-required">*</span>
            </label>
            <input
              type="text"
              id="resource-name-input"
              className="form-input"
              value={formName}
              onChange={(e) => {
                setFormName(e.target.value);
                if (errorMessage) setErrorMessage('');
              }}
              placeholder="e.g. Projectors, Folding Chairs"
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="resource-event-select" className="form-label">
              {t.event} <span className="text-required">*</span>
            </label>
            <select
              id="resource-event-select"
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
              <label htmlFor="resource-required-input" className="form-label">
                {t.requiredQuantity} <span className="text-required">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="1"
                id="resource-required-input"
                className="form-input font-mono"
                value={formRequired}
                onChange={(e) => {
                  setFormRequired(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="0"
              />
            </div>

            <div className="form-group">
              <label htmlFor="resource-available-input" className="form-label">
                {t.availableQuantity} <span className="text-required">*</span>
              </label>
              <input
                type="number"
                min="0"
                step="1"
                id="resource-available-input"
                className="form-input font-mono"
                value={formAvailable}
                onChange={(e) => {
                  setFormAvailable(e.target.value);
                  if (errorMessage) setErrorMessage('');
                }}
                placeholder="0"
              />
            </div>
          </div>

          {/* Real-time Calculation Preview */}
          {formRequired !== '' && formAvailable !== '' && !isNaN(Number(formRequired)) && !isNaN(Number(formAvailable)) && (
            <div className="form-calc-preview">
              <span className="preview-label">{t.shortageStatus}:</span>
              {Number(formAvailable) < Number(formRequired) ? (
                <span className="status-badge badge-shortage inline-flex-center gap-1">
                  <AlertTriangle size={13} />
                  <span>{t.statusShortage} (-{Number(formRequired) - Number(formAvailable)})</span>
                </span>
              ) : (
                <span className="status-badge badge-sufficient inline-flex-center gap-1">
                  <CheckCircle2 size={13} />
                  <span>{t.statusSufficient}</span>
                </span>
              )}
            </div>
          )}

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
              id="save-resource-submit-btn"
            >
              {editingResource ? t.update : t.save}
            </button>
          </div>
        </form>
      </Modal>
    </section>
  );
}
