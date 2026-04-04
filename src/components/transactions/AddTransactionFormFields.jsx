import React from 'react';
import { Button } from '../ui';

export const AddTransactionFormFields = ({
  formData,
  errors,
  availableCategories,
  editTransaction,
  onChange,
  onClose,
}) => {
  return (
    <>
      <div className="form-group type-pills-group">
        <button
          type="button"
          className={`type-pill ${formData.type === 'income' ? 'active income' : ''}`}
          onClick={() => onChange('type', 'income')}
        >
          Income
        </button>
        <button
          type="button"
          className={`type-pill ${formData.type === 'expense' ? 'active expense' : ''}`}
          onClick={() => onChange('type', 'expense')}
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
            onChange={(e) => onChange('date', e.target.value)}
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
            onChange={(e) => onChange('amount', e.target.value)}
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
          onChange={(e) => onChange('description', e.target.value)}
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
            onChange={(e) => onChange('merchant', e.target.value)}
          />
          {errors.merchant && <span className="form-error">{errors.merchant}</span>}
        </div>

        <div className="form-group">
          <label className="form-label">Category</label>
          <select
            className="form-input form-select"
            value={formData.category}
            onChange={(e) => onChange('category', e.target.value)}
          >
            {availableCategories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.label}
              </option>
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
    </>
  );
};
