import React, { useMemo, useState } from 'react';
import { Modal } from '../ui';
import useFinanceStore from '../../store/useFinanceStore';
import { CATEGORIES } from '../../data/categories';
import { AddTransactionFormFields } from './AddTransactionFormFields';
import './AddTransactionModal.css';

const incomeCategoryIds = ['revenue', 'freelance'];

const createInitialForm = () => ({
  date: new Date().toISOString().split('T')[0],
  type: 'expense',
  category: 'software',
  amount: '',
  description: '',
  merchant: '',
});

const mapTransactionToForm = (transaction) => ({
  date: transaction.date.split('T')[0],
  type: transaction.type,
  category: transaction.category,
  amount: String(transaction.amount),
  description: transaction.description,
  merchant: transaction.merchant,
});

const getValidCategory = (type, category) => {
  if (type === 'income' && !incomeCategoryIds.includes(category)) return 'revenue';
  if (type === 'expense' && incomeCategoryIds.includes(category)) return 'software';
  return category;
};

const validateForm = (formData) => {
  const errors = {};

  if (!formData.date) errors.date = 'Date is required';
  if (!formData.amount || Number(formData.amount) < 0.01) {
    errors.amount = 'Amount must be greater than 0';
  }
  if (!formData.description.trim()) errors.description = 'Description is required';
  if (!formData.merchant.trim()) errors.merchant = 'Merchant is required';

  return errors;
};

export const AddTransactionModal = ({ isOpen, onClose, editTransaction }) => {
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  const updateTransaction = useFinanceStore((state) => state.updateTransaction);

  const [formData, setFormData] = useState(() =>
    editTransaction ? mapTransactionToForm(editTransaction) : createInitialForm()
  );
  const [submitted, setSubmitted] = useState(false);

  const errors = useMemo(() => {
    return submitted ? validateForm(formData) : {};
  }, [formData, submitted]);

  const availableCategories = useMemo(() => {
    return CATEGORIES.filter((cat) =>
      formData.type === 'income'
        ? incomeCategoryIds.includes(cat.id)
        : !incomeCategoryIds.includes(cat.id)
    );
  }, [formData.type]);

  const handleChange = (field, value) => {
    setFormData((prev) => {
      if (field === 'type') {
        return {
          ...prev,
          type: value,
          category: getValidCategory(value, prev.category),
        };
      }

      return { ...prev, [field]: value };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);

    const nextErrors = validateForm(formData);
    if (Object.keys(nextErrors).length > 0) return;

    const payload = {
      ...formData,
      category: getValidCategory(formData.type, formData.category),
      amount: Number(formData.amount),
    };

    if (editTransaction) {
      updateTransaction(editTransaction.id, payload);
    } else {
      addTransaction(payload);
    }

    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={editTransaction ? 'Edit Transaction' : 'Add Transaction'}
      width="sm"
    >
      <form onSubmit={handleSubmit} className="transaction-form">
        <AddTransactionFormFields
          formData={formData}
          errors={errors}
          availableCategories={availableCategories}
          editTransaction={editTransaction}
          onChange={handleChange}
          onClose={onClose}
        />
      </form>
    </Modal>
  );
};
