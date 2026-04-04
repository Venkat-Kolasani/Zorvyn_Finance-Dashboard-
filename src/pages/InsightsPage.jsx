import React from 'react';
import { PieChart, TrendingUp, Wallet, CreditCard, BarChart2 } from 'lucide-react';
import { PageWrapper } from '../components/layout';
import { EmptyState } from '../components/ui';
import { InsightCard, MonthlyComparisonChart } from '../components/insights';
import useFinanceStore from '../store/useFinanceStore';
import { getInsights } from '../utils/calculations';
import { formatCurrency, formatPercent } from '../utils/formatters';
import { getCategoryById } from '../data/categories';
import './InsightsPage.css';

const InsightsPage = () => {
  const { transactions } = useFinanceStore();

  if (!transactions || transactions.length === 0) {
    return (
      <PageWrapper title="Insights">
        <div className="insights-empty-container">
          <EmptyState 
            icon={BarChart2}
            title="No insights available" 
            message="Add some transactions to see your financial analytics." 
          />
        </div>
      </PageWrapper>
    );
  }

  const { 
    topCategory, 
    momChange, 
    incomeExpenseRatio, 
    biggestTransaction 
  } = getInsights(transactions);

  // Safely get category label
  let topCategoryLabel = 'None';
  let topCategoryTotal = 0;
  if (topCategory) {
    const meta = getCategoryById(topCategory.category);
    topCategoryLabel = meta ? meta.label : topCategory.category;
    topCategoryTotal = topCategory.total;
  }

  // Determine trend for Month-Over-Month Change
  let momTrend = null;
  if (momChange > 0) momTrend = 'up';
  else if (momChange < 0) momTrend = 'down';

  return (
    <PageWrapper title="Insights">
      <div className="insights-content">
        
        <div className="insights-grid">
          <InsightCard 
            label="Top Category" 
            value={topCategoryLabel} 
            subtext={formatCurrency(topCategoryTotal)} 
            icon={PieChart} 
          />
          <InsightCard 
            label="vs Last Month" 
            value={formatPercent(momChange)} 
            trend={momTrend} 
            icon={TrendingUp} 
          />
          <InsightCard 
            label="Income Ratio" 
            value={formatPercent(incomeExpenseRatio * 100)} 
            subtext="of expenses covered" 
            icon={Wallet} 
          />
          <InsightCard 
            label="Largest Transaction" 
            value={biggestTransaction ? formatCurrency(biggestTransaction.amount) : '$0.00'} 
            subtext={biggestTransaction ? biggestTransaction.description : 'No transactions'} 
            icon={CreditCard} 
          />
        </div>

        <div className="insights-chart-section">
          <MonthlyComparisonChart />
        </div>

      </div>
    </PageWrapper>
  );
};

export default InsightsPage;
