import React, { useState, useEffect } from 'react';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import useFinanceStore from '../../store/useFinanceStore';
import { getMonthlyData } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import './BalanceTrendChart.css';

/**
 * Custom tooltip component for the Recharts AreaChart.
 */
const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="balance-chart-tooltip">
        <p className="balance-chart-tooltip-label">{label}</p>
        <div className="balance-chart-tooltip-items">
          {payload.map((entry, index) => (
            <div key={index} className="balance-chart-tooltip-item">
              <div 
                className="balance-chart-tooltip-indicator" 
                style={{ backgroundColor: entry.stroke }}
              />
              <span className="balance-chart-tooltip-name">
                {entry.name === 'income' ? 'Income' : 'Expense'}
              </span>
              <span className="balance-chart-tooltip-value">
                {formatCurrency(entry.value)}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }
  return null;
};

export const BalanceTrendChart = () => {
  const transactions = useFinanceStore((state) => state.transactions);
  const darkMode = useFinanceStore((state) => state.darkMode);
  const data = getMonthlyData(transactions);
  
  // State to hold CSS variable values for Recharts rendering
  const [themeColors, setThemeColors] = useState({
    income: 'var(--color-income)',
    expense: 'var(--color-expense)',
    textMuted: 'var(--color-text-muted)'
  });

  // Read actual CSS vars whenever the theme changes
  useEffect(() => {
    // A tiny delay ensures the CSS classes (like .dark) have been applied 
    // before we read the property values.
    const updateColors = () => {
      const rootStyle = getComputedStyle(document.documentElement);
      setThemeColors({
        income: rootStyle.getPropertyValue('--color-income').trim() || 'var(--color-income)',
        expense: rootStyle.getPropertyValue('--color-expense').trim() || 'var(--color-expense)',
        textMuted: rootStyle.getPropertyValue('--color-text-muted').trim() || 'var(--color-text-muted)'
      });
    };

    updateColors();
    // In some edge cases, waiting a frame ensures exact color accuracy if transitions are used
    const timer = setTimeout(updateColors, 50);
    return () => clearTimeout(timer);
  }, [darkMode]);

  return (
    <div className="balance-trend-chart-container">
      <ResponsiveContainer width="100%" height={220}>
        <AreaChart 
          data={data} 
          margin={{ top: 10, right: 0, left: 0, bottom: 0 }}
        >
          <XAxis 
            dataKey="month" 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: themeColors.textMuted, fontSize: 13, fontFamily: 'inherit' }}
            dy={10}
          />
          <YAxis hide={true} />
          <Tooltip 
            content={<CustomTooltip />} 
            cursor={{ stroke: themeColors.textMuted, strokeDasharray: '3 3', opacity: 0.5 }} 
          />
          <Area 
            type="monotone" 
            dataKey="income" 
            stroke={themeColors.income} 
            fill={themeColors.income} 
            fillOpacity={0.2}
            strokeWidth={2}
            activeDot={{ r: 4, strokeWidth: 0, fill: themeColors.income }}
          />
          <Area 
            type="monotone" 
            dataKey="expense" 
            stroke={themeColors.expense} 
            fill={themeColors.expense} 
            fillOpacity={0.2}
            strokeWidth={2}
            activeDot={{ r: 4, strokeWidth: 0, fill: themeColors.expense }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BalanceTrendChart;
