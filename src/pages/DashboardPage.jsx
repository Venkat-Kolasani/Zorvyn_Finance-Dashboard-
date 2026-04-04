import React, { useState, useEffect } from 'react';
import { Navbar } from '../components/layout';
import { SummaryCards } from '../components/dashboard/SummaryCards';
import { SummaryCardsSkeleton } from '../components/dashboard/SummaryCardsSkeleton';
import { BalanceTrendChart } from '../components/dashboard/BalanceTrendChart';
import { SpendingChart } from '../components/dashboard/SpendingChart';
import { RecentTransactions } from '../components/dashboard/RecentTransactions';
import { Card } from '../components/ui';
import '../components/layout/PageWrapper.css';
import './DashboardPage.css';

const DashboardPage = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 600);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="page-wrapper">
      <Navbar title="Overview" />
      <main className="page-content">
        <div className="dashboard-content">
        {isLoading ? <SummaryCardsSkeleton /> : <SummaryCards />}
        
        <div className="dashboard-charts-grid">
          <Card className="dashboard-card chart-card-left">
            <h3 className="dashboard-card-title">Balance Trend</h3>
            <BalanceTrendChart />
          </Card>
          
          <Card className="dashboard-card chart-card-right">
            <h3 className="dashboard-card-title">Spending Breakdown</h3>
            <SpendingChart />
          </Card>
        </div>

        <div className="dashboard-bottom-section">
          <Card className="dashboard-card">
            <h3 className="dashboard-card-title">Recent Transactions</h3>
            <RecentTransactions />
          </Card>
        </div>
        </div>
      </main>
    </div>
  );
};

export default DashboardPage;
