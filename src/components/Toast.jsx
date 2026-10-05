import React from 'react';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';

export function Toast({ toast, onClose }) {
  if (!toast) return null;

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle2 size={18} className="toast-icon text-success" />;
      case 'error':
        return <AlertCircle size={18} className="toast-icon text-danger" />;
      default:
        return <Info size={18} className="toast-icon text-info" />;
    }
  };

  return (
    <div className={`toast-container toast-${toast.type || 'info'}`} id="app-toast-alert" role="status">
      {getIcon()}
      <span className="toast-message">{toast.message}</span>
      <button
        type="button"
        className="toast-close-btn"
        onClick={onClose}
        aria-label="Dismiss notification"
      >
        <X size={14} />
      </button>
    </div>
  );
}
