import React, { useState } from 'react';
import { ArrowDown, FileText } from 'lucide-react';
import useFinanceStore from '../../store/useFinanceStore';
import { TransactionRow } from './TransactionRow';
import { EmptyState, Button } from '../ui';
import './TransactionsTable.css';

const SortableHeader = ({ label, field, currentSort, setSort }) => {
  const isActive = currentSort.field === field;
  const isAsc = currentSort.direction === 'asc';

  return (
    <div 
      className={`table-header-cell table-col-${field} ${isActive ? 'active' : ''}`}
      onClick={() => setSort(field)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') setSort(field); }}
    >
      {label}
      {isActive && (
        <span className={`sort-icon ${isAsc ? 'asc' : ''}`}>
          <ArrowDown size={14} />
        </span>
      )}
    </div>
  );
};

export const TransactionsTable = ({ onEdit }) => {
  const filteredTransactions = useFinanceStore((state) => state.filteredTransactions);
  const sort = useFinanceStore((state) => state.sort);
  const setSort = useFinanceStore((state) => state.setSort);
  const role = useFinanceStore((state) => state.role);
  const isAdmin = role === 'admin';

  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(filteredTransactions.length / itemsPerPage) || 1;
  const page = Math.min(currentPage, totalPages);

  if (page !== currentPage) {
    setCurrentPage(page);
  }

  const startIndex = (page - 1) * itemsPerPage;
  const visibleRows = filteredTransactions.slice(startIndex, startIndex + itemsPerPage);

  if (filteredTransactions.length === 0) {
    return (
      <div className="transactions-table-empty">
        <EmptyState
          icon={FileText}
          title="No transactions found"
          message="Adjust your search filters or add a new transaction."
        />
      </div>
    );
  }

  return (
    <div className="transactions-table-wrapper">
      <div className="transactions-table-scroll-container">
        <div className="transactions-table-header">
          <SortableHeader label="Date" field="date" currentSort={sort} setSort={setSort} />
          <SortableHeader label="Description" field="description" currentSort={sort} setSort={setSort} />
          <SortableHeader label="Category" field="category" currentSort={sort} setSort={setSort} />
          <SortableHeader label="Type" field="type" currentSort={sort} setSort={setSort} />
          <SortableHeader label="Amount" field="amount" currentSort={sort} setSort={setSort} />
          {isAdmin && <div className="table-header-cell table-col-actions"></div>}
        </div>

        <div className="transactions-table-body">
          {visibleRows.map((tx) => (
            <TransactionRow 
              key={tx.id} 
              transaction={tx} 
              isAdmin={isAdmin} 
              onEdit={onEdit} 
            />
          ))}
        </div>
      </div>

      <div className="transactions-pagination">
        <span className="pagination-info">
          Showing {startIndex + 1}–{Math.min(startIndex + itemsPerPage, filteredTransactions.length)} of {filteredTransactions.length}
        </span>
        <div className="pagination-controls">
          <Button 
            variant="outline" 
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Previous
          </Button>
          <Button 
            variant="outline" 
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
};
