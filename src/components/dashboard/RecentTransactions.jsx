import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { getCategoryById } from '../../data/categories';
import { Badge } from '../ui';
import './RecentTransactions.css';

export const RecentTransactions = () => {
  const { transactions } = useFinanceStore();

  const recentTransactions = useMemo(() => {
    return [...transactions]
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, 5);
  }, [transactions]);

  if (recentTransactions.length === 0) {
    return (
      <div className="recent-tx-empty">
        <p>No recent transactions.</p>
      </div>
    );
  }

  return (
    <div className="recent-tx-container">
      <ul className="recent-tx-list">
        {recentTransactions.map((tx) => {
          const categoryMeta = getCategoryById(tx.category);
          const isIncome = tx.type === 'income';

          return (
            <li key={tx.id} className="recent-tx-item">
              <div className="recent-tx-date">
                {formatDate(tx.date, 'MMM d')}
              </div>
              
              <div className="recent-tx-info">
                <div className="recent-tx-desc">{tx.description}</div>
                <div className="recent-tx-merchant">{tx.merchant}</div>
              </div>
              
              <div className="recent-tx-category">
                <Badge variant={categoryMeta ? 'outline' : 'secondary'}>
                  {categoryMeta ? categoryMeta.label : tx.category}
                </Badge>
              </div>
              
              <div className={`recent-tx-amount ${isIncome ? 'income' : 'expense'}`}>
                {isIncome ? '+' : '-'}
                {formatCurrency(Math.abs(tx.amount))}
              </div>
            </li>
          );
        })}
      </ul>
      
      <div className="recent-tx-footer">
        <Link to="/transactions" className="view-all-link">
          View all <ArrowRight size={16} />
        </Link>
      </div>
    </div>
  );
};

export default RecentTransactions;
