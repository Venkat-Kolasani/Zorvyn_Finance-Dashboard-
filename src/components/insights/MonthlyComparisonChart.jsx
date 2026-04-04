import React, { useMemo } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import { Card } from '../ui';
import useFinanceStore from '../../store/useFinanceStore';
import { getMonthlyData } from '../../utils/calculations';
import { formatCurrency } from '../../utils/formatters';
import './MonthlyComparisonChart.css';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="monthly-chart-tooltip">
        <p className="monthly-chart-tooltip-label">{label}</p>
        {payload.map((entry, index) => {
          const isIncome = entry.name === 'income';
          return (
            <div key={index} className="monthly-chart-tooltip-item">
              <span
                className={`monthly-chart-tooltip-color ${isIncome ? 'tooltip-color-income' : 'tooltip-color-expense'}`}
              />
              <span className="monthly-chart-tooltip-name">
                {isIncome ? 'Income' : 'Expense'}
              </span>
              <span className="monthly-chart-tooltip-value">
                {formatCurrency(entry.value)}
              </span>
            </div>
          );
        })}
      </div>
    );
  }
  return null;
};

export const MonthlyComparisonChart = () => {
  const { transactions } = useFinanceStore();
  
  const data = useMemo(() => {
    return getMonthlyData(transactions);
  }, [transactions]);

  return (
    <Card className="monthly-comparison-card">
      <h3 className="monthly-chart-title">Monthly Comparison</h3>
      
      <div className="monthly-chart-container">
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={data} margin={{ top: 10, right: 0, left: 0, bottom: 0 }}>
            <XAxis 
              dataKey="month" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fill: 'var(--color-text-muted)', fontSize: 12, dy: 10 }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'var(--color-border)', opacity: 0.4 }} />
            <Bar dataKey="income" name="income" fill="var(--color-income)" radius={[4, 4, 0, 0]} />
            <Bar dataKey="expense" name="expense" fill="var(--color-expense)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      <div className="monthly-chart-legend">
        <div className="monthly-chart-legend-item">
          <span className="legend-dot income-dot"></span>
          <span>Income</span>
        </div>
        <div className="monthly-chart-legend-item">
          <span className="legend-dot expense-dot"></span>
          <span>Expense</span>
        </div>
      </div>
    </Card>
  );
};
