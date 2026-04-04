import React from 'react';
import { PieChart, TrendingUp, Wallet, CreditCard, BarChart2 } from 'lucide-react';
import { Navbar } from '../components/layout';
import { EmptyState } from '../components/ui';
import { InsightCard, MonthlyComparisonChart } from '../components/insights';
import useFinanceStore from '../store/useFinanceStore';
import { getInsights } from '../utils/calculations';
import { formatCurrency, formatPercent } from '../utils/formatters';
import { getCategoryById } from '../data/categories';
import '../components/layout/PageWrapper.css';
import './InsightsPage.css';

const InsightsPage = () => {
  const transactions = useFinanceStore((state) => state.transactions);

  if (!transactions || transactions.length === 0) {
    return (
      <div className="page-wrapper">
        <Navbar title="Insights" />
        <main className="page-content">
          <div className="insights-empty-container">
            <EmptyState
              icon={BarChart2}
              title="No insights available"
              message="Add some transactions to see your financial analytics."
            />
          </div>
        </main>
      </div>
    );
  }

  const { 
    topCategory, 
    momChange, 
    incomeExpenseRatio, 
    biggestTransaction 
  } = getInsights(transactions);

  let topCategoryLabel = 'None';
  let topCategoryTotal = 0;
  if (topCategory) {
    const categoryMeta = getCategoryById(topCategory.category);
    topCategoryLabel = categoryMeta ? categoryMeta.label : topCategory.category;
    topCategoryTotal = topCategory.total;
  }

  const momTrend = momChange > 0 ? 'up' : momChange < 0 ? 'down' : null;

  return (
    <div className="page-wrapper">
      <Navbar title="Insights" />
      <main className="page-content">
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
      </main>
    </div>
  );
};

export default InsightsPage;
