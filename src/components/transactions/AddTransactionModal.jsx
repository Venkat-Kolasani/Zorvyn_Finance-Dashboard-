import React, { useState, useEffect } from 'react';
import { Modal, Button } from '../ui';
import useFinanceStore from '../../store/useFinanceStore';
import { CATEGORIES } from '../../data/categories';
import './AddTransactionModal.css';

const INCOME_CATEGORIES = ['revenue', 'freelance'];

const getInitialForm = () => ({
  date: new Date().toISOString().split('T')[0],
  type: 'expense',
  category: 'software',
  amount: '',
  description: '',
  merchant: ''
});

export const AddTransactionModal = ({ isOpen, onClose, editTransaction }) => {
  const addTransaction = useFinanceStore((state) => state.addTransaction);
  const updateTransaction = useFinanceStore((state) => state.updateTransaction);
  
  const [formData, setFormData] = useState(getInitialForm);
  const [errors, setErrors] = useState({});
  const [hasSubmitted, setHasSubmitted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (editTransaction) {
        setFormData({
          date: editTransaction.date.split('T')[0],
          type: editTransaction.type,
          category: editTransaction.category,
          amount: editTransaction.amount.toString(),
          description: editTransaction.description,
          merchant: editTransaction.merchant
        });
      } else {
        setFormData(getInitialForm());
      }
      setErrors({});
      setHasSubmitted(false);
    } else {
      setFormData(getInitialForm());
      setErrors({});
      setHasSubmitted(false);
    }
  }, [isOpen, editTransaction]);
  const availableCategories = CATEGORIES.filter(cat => 
    formData.type === 'income' 
      ? INCOME_CATEGORIES.includes(cat.id)
      : !INCOME_CATEGORIES.includes(cat.id)
  );

  // When type changes, ensure the selected category is valid for that type
  useEffect(() => {
    if (formData.type === 'income' && !INCOME_CATEGORIES.includes(formData.category)) {
      setFormData(prev => ({ ...prev, category: 'revenue' }));
    } else if (formData.type === 'expense' && INCOME_CATEGORIES.includes(formData.category)) {
      setFormData(prev => ({ ...prev, category: 'software' }));
    }
  }, [formData.type, formData.category]);

  const validate = () => {
    const newErrors = {};
    if (!formData.date) newErrors.date = 'Date is required';
    if (!formData.amount || Number(formData.amount) < 0.01) newErrors.amount = 'Amount must be greater than 0';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.merchant.trim()) newErrors.merchant = 'Merchant is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setHasSubmitted(true);
    
    if (validate()) {
      if (editTransaction) {
        updateTransaction(editTransaction.id, {
          ...formData,
          amount: Number(formData.amount)
        });
      } else {
        addTransaction({
          ...formData,
          amount: Number(formData.amount)
        });
      }
      onClose();
    }
  };

  // Re-validate instantly if they have already failed once
  useEffect(() => {
    if (hasSubmitted) {
      validate();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formData]);

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Modal 
      isOpen={isOpen} 
      onClose={onClose} 
      title={editTransaction ? 'Edit Transaction' : 'Add Transaction'}
      width="sm"
    >
      <form onSubmit={handleSubmit} className="transaction-form">
        
        {/* Type Toggle Pills */}
        <div className="form-group type-pills-group">
          <button
            type="button"
            className={`type-pill ${formData.type === 'income' ? 'active income' : ''}`}
            onClick={() => handleChange('type', 'income')}
          >
            Income
          </button>
          <button
            type="button"
            className={`type-pill ${formData.type === 'expense' ? 'active expense' : ''}`}
            onClick={() => handleChange('type', 'expense')}
          >
            Expense
          </button>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Date</label>
            <input 
              type="date" 
              className={`form-input ${errors.date ? 'error' : ''}`}
              value={formData.date}
              onChange={(e) => handleChange('date', e.target.value)}
            />
            {errors.date && <span className="form-error">{errors.date}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Amount</label>
            <input 
              type="number" 
              step="0.01"
              min="0.01"
              className={`form-input ${errors.amount ? 'error' : ''}`}
              placeholder="0.00"
              value={formData.amount}
              onChange={(e) => handleChange('amount', e.target.value)}
            />
            {errors.amount && <span className="form-error">{errors.amount}</span>}
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Description</label>
          <input 
            type="text" 
            className={`form-input ${errors.description ? 'error' : ''}`}
            placeholder="What was this for?"
            value={formData.description}
            onChange={(e) => handleChange('description', e.target.value)}
          />
          {errors.description && <span className="form-error">{errors.description}</span>}
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Merchant</label>
            <input 
              type="text" 
              className={`form-input ${errors.merchant ? 'error' : ''}`}
              placeholder="Who did you pay?"
              value={formData.merchant}
              onChange={(e) => handleChange('merchant', e.target.value)}
            />
            {errors.merchant && <span className="form-error">{errors.merchant}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select 
              className="form-input form-select"
              value={formData.category}
              onChange={(e) => handleChange('category', e.target.value)}
            >
              {availableCategories.map(cat => (
                <option key={cat.id} value={cat.id}>{cat.label}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="form-actions">
          <Button type="button" variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button type="submit" variant="default" className="flex-1">
            {editTransaction ? 'Save Changes' : 'Add Transaction'}
          </Button>
        </div>

      </form>
    </Modal>
  );
};
