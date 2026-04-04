import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import { Navbar } from '../components/layout';
import { 
  FilterBar, 
  TransactionsTable, 
  AddTransactionModal 
} from '../components/transactions';
import { Button } from '../components/ui';
import useFinanceStore from '../store/useFinanceStore';
import '../components/layout/PageWrapper.css';
import './TransactionsPage.css';

const TransactionsPage = () => {
  const role = useFinanceStore((state) => state.role);
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
    <div className="page-wrapper">
      <Navbar title="Transactions" />
      <main className="page-content">
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
          key={`${isModalOpen}-${editingTransaction?.id ?? 'new'}`}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
          editTransaction={editingTransaction}
        />
      </main>
    </div>
  );
};

export default TransactionsPage;
