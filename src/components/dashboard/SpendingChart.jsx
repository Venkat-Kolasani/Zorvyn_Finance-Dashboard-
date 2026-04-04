import React, { useMemo } from 'react';
import { PieChart as RechartsPie, Pie, Cell, Tooltip as RechartsTooltip, ResponsiveContainer, Label } from 'recharts';
import { PieChart as PieChartIcon } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';
import { getCategoryBreakdown } from '../../utils/calculations';
import { getCategoryById } from '../../data/categories';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import { EmptyState } from '../ui';
import './SpendingChart.css';

// Map the custom color strings to pleasant hex values
const COLOR_MAP = {
  green: 'var(--color-chart-green)',
  slate: 'var(--color-chart-slate)',
  blue: 'var(--color-chart-blue)',
  orange: 'var(--color-chart-orange)',
  yellow: 'var(--color-chart-yellow)',
  purple: 'var(--color-chart-purple)',
  gray: 'var(--color-chart-gray)',
  teal: 'var(--color-chart-teal)',
  other: 'var(--color-chart-other)'
};

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div className="spending-tooltip">
        <span className="spending-tooltip-label">{data.label}</span>
        <span className="spending-tooltip-value">{formatCurrency(data.total)}</span>
      </div>
    );
  }
  return null;
};

export const SpendingChart = () => {
  const transactions = useFinanceStore((state) => state.transactions);
  
  const { chartData, totalExpenses } = useMemo(() => {
    const breakdown = getCategoryBreakdown(transactions);
    
    const totalExp = breakdown.reduce((sum, item) => sum + item.total, 0);

    let processedData = [];
    if (breakdown.length > 5) {
      processedData = breakdown.slice(0, 5);
      const otherTotal = breakdown.slice(5).reduce((sum, item) => sum + item.total, 0);
      processedData.push({
        category: 'other',
        total: otherTotal,
        percent: totalExp > 0 ? (otherTotal / totalExp) * 100 : 0
      });
    } else {
      processedData = breakdown;
    }

    // Map to final objects with label and color
    const finalData = processedData.map(item => {
      if (item.category === 'other') {
        return {
          ...item,
          label: 'Other',
          color: COLOR_MAP.other
        };
      }
      
      const categoryMeta = getCategoryById(item.category);
      return {
        ...item,
        label: categoryMeta ? categoryMeta.label : item.category,
        color: categoryMeta && COLOR_MAP[categoryMeta.color] ? COLOR_MAP[categoryMeta.color] : COLOR_MAP.gray
      };
    });

    return { chartData: finalData, totalExpenses: totalExp };
  }, [transactions]);

  if (chartData.length === 0 || totalExpenses === 0) {
    return (
      <div className="spending-chart-empty">
        <EmptyState
          icon={PieChartIcon}
          title="No expenses found"
          message="There are no expenses in this period to display."
        />
      </div>
    );
  }

  return (
    <div className="spending-chart-container">
      <div className="spending-chart-donut">
        <ResponsiveContainer width="100%" height={240}>
          <RechartsPie>
            <RechartsPie
              data={chartData}
              dataKey="total"
              nameKey="label"
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              stroke="var(--color-surface)"
              strokeWidth={3}
              paddingAngle={2}
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
              <Label 
                value={formatCurrency(totalExpenses)} 
                position="center" 
                className="donut-center-label"
              />
            </RechartsPie>
            <RechartsTooltip content={<CustomTooltip />} />
          </RechartsPie>
        </ResponsiveContainer>
      </div>
      
      <div className="spending-chart-legend">
        {chartData.map((entry, index) => (
          <div key={index} className="legend-item">
            <div className="legend-item-left">
              <span 
                className="legend-color-dot" 
                style={{ backgroundColor: entry.color }}
              />
              <span className="legend-label">{entry.label}</span>
            </div>
            <div className="legend-item-right">
              <span className="legend-amount">{formatCurrency(entry.total)}</span>
              <span className="legend-percent">{formatPercent(entry.percent, 0)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SpendingChart;
