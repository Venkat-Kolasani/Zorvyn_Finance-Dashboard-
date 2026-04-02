import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { PageWrapper } from '../components/layout';
import { 
  FilterBar, 
  TransactionsTable, 
  AddTransactionModal 
} from '../components/transactions';
import { Button } from '../components/ui';
import useFinanceStore from '../store/useFinanceStore';
import './TransactionsPage.css';

const TransactionsPage = () => {
  const { role } = useFinanceStore();
  const isAdmin = role === 'admin';

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTransaction, setEditingTransaction] = useState(null);

  const handleOpenAdd = () => {
    setEditingTransaction(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (transaction) => {
    setEditingTransaction(transaction);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingTransaction(null);
  };

  return (
    <PageWrapper title="Transactions">
      <div className="transactions-page-content">
        
        <div className="transactions-page-header">
          <h2 className="transactions-page-title">Transactions</h2>
          {isAdmin && (
            <Button onClick={handleOpenAdd} className="add-transaction-btn">
              <Plus size={16} className="mr-2" />
              Add Transaction
            </Button>
          )}
        </div>

        <FilterBar />
        
        <TransactionsTable onEdit={handleOpenEdit} />

      </div>

      <AddTransactionModal 
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        editTransaction={editingTransaction}
      />
    </PageWrapper>
  );
};

export default TransactionsPage;
