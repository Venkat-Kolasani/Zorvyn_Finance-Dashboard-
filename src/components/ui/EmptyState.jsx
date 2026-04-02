import React from 'react';
import './EmptyState.css';

/**
 * EmptyState component for displaying a placeholder when there's no data.
 * Understated design with an icon, title, message, and optional action.
 * 
 * @param {Object} props
 * @param {React.ElementType} props.icon - Lucide icon component
 * @param {string} props.title - Main title text
 * @param {string} props.message - Descriptive message text
 * @param {React.ReactNode} [props.action] - Optional action button/element
 */
export const EmptyState = ({ icon: Icon, title, message, action }) => {
  return (
    <div className="empty-state">
      {Icon && <Icon className="empty-state-icon" size={40} />}
      <h3 className="empty-state-title">{title}</h3>
      <p className="empty-state-message">{message}</p>
      {action && <div className="empty-state-action">{action}</div>}
    </div>
  );
};
