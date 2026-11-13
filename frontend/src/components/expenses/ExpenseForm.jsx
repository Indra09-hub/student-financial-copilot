import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

const CATEGORIES = [
  'Housing',
  'Food',
  'Food & Dining',
  'Transport',
  'Education',
  'Utilities',
  'Entertainment',
  'Shopping',
  'Gadgets',
  'Health',
  'Personal Care',
  'Other',
];

export default function ExpenseForm({ isOpen, onClose, onSubmit, initialData = null }) {
  const [name, setName] = useState('');
  const [amount, setAmount] = useState('');
  const [category, setCategory] = useState('Food & Dining');
  const [expenseType, setExpenseType] = useState('discretionary');
  const [expenseDate, setExpenseDate] = useState('');
  const [notes, setNotes] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setName(initialData.name || '');
        setAmount(initialData.amount ? String(initialData.amount) : '');
        setCategory(initialData.category || 'Food & Dining');
        setExpenseType(initialData.expenseType?.toLowerCase() || 'discretionary');
        setExpenseDate(initialData.expenseDate || '');
        setNotes(initialData.notes || '');
      } else {
        setName('');
        setAmount('');
        setCategory('Food & Dining');
        setExpenseType('discretionary');
        setExpenseDate(new Date().toISOString().split('T')[0]);
        setNotes('');
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Expense name is required.';
    const num = parseFloat(amount);
    if (isNaN(num) || num <= 0) errs.amount = 'Amount must be greater than zero.';
    if (!category.trim()) errs.category = 'Category is required.';
    if (!expenseDate) errs.expenseDate = 'Valid date is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      await onSubmit({
        name: name.trim(),
        amount: parseFloat(amount),
        category: category.trim(),
        expenseType: expenseType.toLowerCase(),
        expenseDate,
        notes: notes.trim() || null,
      });
      onClose();
    } catch (err) {
      setErrors({ form: err.message || 'Failed to save expense.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Expense Transaction' : 'Record New Expense'}
      footer={
        <>
          <button type="button" onClick={onClose} className="btn btn-secondary" disabled={submitting}>
            Cancel
          </button>
          <button type="submit" form="expense-form" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Saving...' : initialData ? 'Update Expense' : 'Add Expense'}
          </button>
        </>
      }
    >
      <form id="expense-form" onSubmit={handleSubmit}>
        {errors.form && (
          <div className="card" style={{ backgroundColor: 'var(--danger-light)', color: 'var(--danger)', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
            {errors.form}
          </div>
        )}

        {/* Expense Name */}
        <div className="form-group">
          <label htmlFor="expense-name" className="form-label">Expense Name / Title *</label>
          <input
            id="expense-name"
            type="text"
            required
            className="form-input"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Mess Food, Metro Card, Cafe Coffee"
          />
          {errors.name && <span className="form-error">{errors.name}</span>}
        </div>

        {/* Amount & Date Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="expense-amount" className="form-label">Amount (₹) *</label>
            <input
              id="expense-amount"
              type="number"
              step="0.01"
              min="0.01"
              required
              className="form-input"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="e.g. 450.00"
            />
            {errors.amount && <span className="form-error">{errors.amount}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="expense-date" className="form-label">Expense Date *</label>
            <input
              id="expense-date"
              type="date"
              required
              className="form-input"
              value={expenseDate}
              onChange={(e) => setExpenseDate(e.target.value)}
            />
            {errors.expenseDate && <span className="form-error">{errors.expenseDate}</span>}
          </div>
        </div>

        {/* Category & Classification */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="expense-category" className="form-label">Category *</label>
            <select
              id="expense-category"
              className="form-select"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
            {errors.category && <span className="form-error">{errors.category}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="expense-type" className="form-label">Classification *</label>
            <select
              id="expense-type"
              className="form-select"
              value={expenseType}
              onChange={(e) => setExpenseType(e.target.value)}
            >
              <option value="essential">Essential (Protected)</option>
              <option value="discretionary">Discretionary (Flexible)</option>
            </select>
          </div>
        </div>

        {/* Notes */}
        <div className="form-group" style={{ marginBottom: 0 }}>
          <label htmlFor="expense-notes" className="form-label">Notes (Optional)</label>
          <textarea
            id="expense-notes"
            rows="2"
            className="form-textarea"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Add context or notes (e.g. split bill with roommate)"
          />
        </div>
      </form>
    </Modal>
  );
}
