import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';
import { getTotals } from '../../utils/calculations';
import { formatCurrency, formatPercent } from '../../utils/formatters';
import './SummaryCards.css';

/**
 * Custom hook to animate a number counting up from 0 to the target value.
 * @param {number} target - The final number to reach
 * @param {number} duration - Animation duration in ms
 * @returns {number} The current animated value
 */
const useCountUp = (target, duration = 800) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (target === 0) {
      setCount(0);
      return;
    }

    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      // Ease out quartic function for a smooth slow-down effect
      const easeOut = 1 - Math.pow(1 - progress, 4);
      setCount(easeOut * target);

      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        setCount(target);
      }
    };

    window.requestAnimationFrame(step);
  }, [target, duration]);

  return count;
};

const SummaryCard = ({ title, value, formatter, colorClass, fakeDelta }) => {
  const animatedValue = useCountUp(value);
  const isPositive = fakeDelta >= 0;

  return (
    <div className="summary-card">
      <div className="summary-card-header">
        <h3 className="summary-card-title">{title}</h3>
      </div>
      <div className={`summary-card-value ${colorClass || ''}`}>
        {formatter(animatedValue)}
      </div>
      <div className={`summary-card-trend ${isPositive ? 'trend-up' : 'trend-down'}`}>
        {isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
        <span>{Math.abs(fakeDelta)}%</span>
        <span className="trend-label">vs last month</span>
      </div>
    </div>
  );
};

export const SummaryCards = () => {
  const { transactions } = useFinanceStore();
  const { netBalance, totalIncome, totalExpense, savingsRate } = getTotals(transactions);

  return (
    <div className="summary-cards-grid">
      <SummaryCard
        title="Net Balance"
        value={netBalance}
        formatter={formatCurrency}
        fakeDelta={12.5}
      />
      <SummaryCard
        title="Total Income"
        value={totalIncome}
        formatter={formatCurrency}
        colorClass="color-income"
        fakeDelta={8.2}
      />
      <SummaryCard
        title="Total Expenses"
        value={totalExpense}
        formatter={formatCurrency}
        colorClass="color-expense"
        fakeDelta={-4.1}
      />
      <SummaryCard
        title="Savings Rate"
        value={savingsRate}
        formatter={formatPercent}
        fakeDelta={2.3}
      />
    </div>
  );
};

export default SummaryCards;
