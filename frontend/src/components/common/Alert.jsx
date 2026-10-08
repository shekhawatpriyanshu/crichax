import React from 'react';
import { CheckCircle2, AlertCircle, AlertTriangle, Info, X } from 'lucide-react';

export const Alert = ({ type = 'info', message, onClose, className = '', id }) => {
  if (!message) return null;

  const icons = {
    success: CheckCircle2,
    error: AlertCircle,
    warning: AlertTriangle,
    info: Info,
  };

  const IconComponent = icons[type] || Info;

  return (
    <div id={id} className={`alert alert-${type} ${className}`} role="alert">
      <div className="alert-content">
        <IconComponent className="alert-icon" size={20} />
        <span className="alert-text">{message}</span>
      </div>
      {onClose && (
        <button
          type="button"
          className="alert-close"
          onClick={onClose}
          aria-label="Dismiss alert"
        >
          <X size={16} />
        </button>
      )}
    </div>
  );
};

export default Alert;
