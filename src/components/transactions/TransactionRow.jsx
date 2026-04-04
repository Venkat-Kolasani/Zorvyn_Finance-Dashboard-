import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { getCategoryById } from '../../data/categories';
import { Badge } from '../ui';
import useFinanceStore from '../../store/useFinanceStore';
import './TransactionRow.css';

export const TransactionRow = ({ transaction, isAdmin, onEdit }) => {
  const { deleteTransaction } = useFinanceStore();

  const isIncome = transaction.type === 'income';
  const categoryMeta = getCategoryById(transaction.category);

  const handleDelete = () => {
    if (window.confirm(`Are you sure you want to delete "${transaction.description}"?`)) {
      deleteTransaction(transaction.id);
    }
  };

  return (
    <div className="tx-row">
      <div className="tx-col tx-col-date">
        {formatDate(transaction.date, 'MMM d, yyyy')}
      </div>

      <div className="tx-col tx-col-info">
        <div className="tx-desc">{transaction.description}</div>
        <div className="tx-merchant">{transaction.merchant}</div>
      </div>

      <div className="tx-col tx-col-category">
        <Badge variant={categoryMeta ? 'outline' : 'secondary'}>
          {categoryMeta ? categoryMeta.label : transaction.category}
        </Badge>
      </div>

      <div className="tx-col tx-col-type">
        <Badge variant={isIncome ? 'default' : 'secondary'} className={isIncome ? 'bg-income' : ''}>
          {isIncome ? 'Income' : 'Expense'}
        </Badge>
      </div>

      <div className={`tx-col tx-col-amount ${isIncome ? 'income' : 'expense'} ${!isAdmin ? 'stretch' : ''}`}>
        {isIncome ? '+' : '-'}
        {formatCurrency(Math.abs(transaction.amount))}
      </div>

      {isAdmin && (
        <div className="tx-col tx-col-actions">
          <button 
            className="tx-action-btn edit-btn" 
            onClick={() => onEdit(transaction)}
            aria-label="Edit transaction"
            title="Edit"
          >
            <Pencil size={16} />
          </button>
          <button 
            className="tx-action-btn delete-btn" 
            onClick={handleDelete}
            aria-label="Delete transaction"
            title="Delete"
          >
            <Trash2 size={16} />
          </button>
        </div>
      )}
    </div>
  );
};
