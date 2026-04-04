import React from 'react';
import { TrendingUp, TrendingDown } from 'lucide-react';
import { Card } from '../ui';
import './InsightCard.css';

export const InsightCard = ({ label, value, subtext, trend, icon: Icon }) => {
  return (
    <Card className="insight-card">
      {Icon && (
        <div className="insight-card-icon">
          <Icon size={24} />
        </div>
      )}
      
      <div className="insight-card-content">
        <span className="insight-card-label">{label}</span>
        <span className="insight-card-value">{value}</span>
      </div>

      {(subtext || trend) && (
        <div className="insight-card-footer">
          {trend && (
            <span className={`trend-container ${trend === 'up' ? 'trend-up' : 'trend-down'}`}>
              {trend === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
              {trend === 'up' ? '+' : ''}
            </span>
          )}
          {subtext && (
            <span className={`insight-card-subtext ${trend ? (trend === 'up' ? 'trend-up' : 'trend-down') : ''}`}>
              {subtext}
            </span>
          )}
        </div>
      )}
    </Card>
  );
};
