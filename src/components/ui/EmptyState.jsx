import React from 'react';
import './EmptyState.css';

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
