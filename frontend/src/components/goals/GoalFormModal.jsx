import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';

export default function GoalFormModal({ isOpen, onClose, onSubmit, initialData = null }) {
  const [goalName, setGoalName] = useState('');
  const [targetAmount, setTargetAmount] = useState('');
  const [currentSavings, setCurrentSavings] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setGoalName(initialData.goalName || '');
        setTargetAmount(initialData.targetAmount ? String(initialData.targetAmount) : '');
        setCurrentSavings(initialData.currentSavings != null ? String(initialData.currentSavings) : '0');
        setTargetDate(initialData.targetDate || '');
      } else {
        setGoalName('');
        setTargetAmount('');
        setCurrentSavings('0');
        // Default target date: 6 months from now
        const sixMonths = new Date();
        sixMonths.setMonth(sixMonths.getMonth() + 6);
        setTargetDate(sixMonths.toISOString().split('T')[0]);
      }
      setErrors({});
    }
  }, [isOpen, initialData]);

  const validate = () => {
    const errs = {};
    if (!goalName.trim()) errs.goalName = 'Goal name is required.';
    const target = parseFloat(targetAmount);
    if (isNaN(target) || target <= 0) errs.targetAmount = 'Target amount must be greater than zero.';
    const saved = parseFloat(currentSavings);
    if (isNaN(saved) || saved < 0) errs.currentSavings = 'Current savings cannot be negative.';
    if (!targetDate) errs.targetDate = 'Target deadline date is required.';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      setSubmitting(true);
      await onSubmit({
        goalName: goalName.trim(),
        targetAmount: parseFloat(targetAmount),
        currentSavings: parseFloat(currentSavings) || 0,
        targetDate,
        status: parseFloat(currentSavings) >= parseFloat(targetAmount) ? 'COMPLETED' : 'IN_PROGRESS',
      });
      onClose();
    } catch (err) {
      setErrors({ form: err.message || 'Failed to save goal.' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Savings Goal' : 'Create New Savings Goal'}
      footer={
        <>
          <button type="button" onClick={onClose} className="btn btn-secondary" disabled={submitting}>
            Cancel
          </button>
          <button type="submit" form="goal-form" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Saving...' : initialData ? 'Update Goal' : 'Create Goal'}
          </button>
        </>
      }
    >
      <form id="goal-form" onSubmit={handleSubmit}>
        {errors.form && (
          <div className="card" style={{ backgroundColor: 'var(--danger-light)', color: 'var(--danger)', padding: '0.75rem', marginBottom: '1rem', fontSize: '0.85rem' }}>
            {errors.form}
          </div>
        )}

        <div className="form-group">
          <label htmlFor="goal-name" className="form-label">Goal Name *</label>
          <input
            id="goal-name"
            type="text"
            required
            className="form-input"
            value={goalName}
            onChange={(e) => setGoalName(e.target.value)}
            placeholder="e.g. Laptop, Certifications, Trip with friends"
          />
          {errors.goalName && <span className="form-error">{errors.goalName}</span>}
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div className="form-group">
            <label htmlFor="target-amount" className="form-label">Target Amount (₹) *</label>
            <input
              id="target-amount"
              type="number"
              step="100"
              min="1"
              required
              className="form-input"
              value={targetAmount}
              onChange={(e) => setTargetAmount(e.target.value)}
              placeholder="e.g. 40000"
            />
            {errors.targetAmount && <span className="form-error">{errors.targetAmount}</span>}
          </div>

          <div className="form-group">
            <label htmlFor="current-savings" className="form-label">Amount Already Saved (₹)</label>
            <input
              id="current-savings"
              type="number"
              step="100"
              min="0"
              className="form-input"
              value={currentSavings}
              onChange={(e) => setCurrentSavings(e.target.value)}
              placeholder="e.g. 3000"
            />
            {errors.currentSavings && <span className="form-error">{errors.currentSavings}</span>}
          </div>
        </div>

        <div className="form-group" style={{ marginBottom: 0 }}>
          <label htmlFor="target-date" className="form-label">Target Deadline Date *</label>
          <input
            id="target-date"
            type="date"
            required
            className="form-input"
            value={targetDate}
            onChange={(e) => setTargetDate(e.target.value)}
          />
          {errors.targetDate && <span className="form-error">{errors.targetDate}</span>}
        </div>
      </form>
    </Modal>
  );
}
