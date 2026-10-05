import React from 'react';
import { Modal } from './Modal';
import { ShieldCheck, CheckCircle2, Clock, AlertTriangle, Users } from 'lucide-react';

export function RulesModal({ isOpen, onClose, t }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={t.businessRulesTitle}>
      <div className="rules-modal-content">
        <div className="rule-card">
          <div className="rule-icon-title">
            <AlertTriangle className="text-danger" size={20} />
            <h4>1. {t.metricResourceShortages}</h4>
          </div>
          <p className="rule-formula font-mono">
            Available Quantity &lt; Required Quantity &rarr; <strong>Shortage</strong><br />
            Available Quantity &ge; Required Quantity &rarr; <strong>Sufficient</strong>
          </p>
          <p className="rule-explanation">
            <em>Example:</em> Chairs with Required = 120 and Available = 100 triggers Shortage. Increasing Available to 120 immediately switches status to Sufficient.
          </p>
        </div>

        <div className="rule-card">
          <div className="rule-icon-title">
            <Clock className="text-warning" size={20} />
            <h4>2. {t.metricPendingTasks}</h4>
          </div>
          <p className="rule-formula font-mono">
            Pending Tasks = Count of volunteer assignments where status === 'Pending'
          </p>
          <p className="rule-explanation">
            <em>Example:</em> Changing Tanvir Hasan from Pending to Confirmed or Completed immediately decreases Pending Tasks.
          </p>
        </div>

        <div className="rule-card">
          <div className="rule-icon-title">
            <Users className="text-success" size={20} />
            <h4>3. {t.metricActiveVolunteers}</h4>
          </div>
          <p className="rule-formula font-mono">
            Active Volunteers = Volunteers assigned to events whose status is 'Active' AND whose assignment status is NOT 'Completed'
          </p>
          <p className="rule-explanation">
            <em>Example:</em> Only assignments in Active events count, and completed assignments are excluded from the active count.
          </p>
        </div>

        <div className="rule-card">
          <div className="rule-icon-title">
            <ShieldCheck className="text-info" size={20} />
            <h4>4. {t.rulePersistence}</h4>
          </div>
          <p className="rule-explanation">
            All created and edited events, assignments, and resources persist in browser localStorage. Refreshing the browser or switching between English and Bangla preserves all organizer records.
          </p>
        </div>

        <div className="modal-footer">
          <button type="button" className="primary-btn" onClick={onClose}>
            {t.close}
          </button>
        </div>
      </div>
    </Modal>
  );
}
