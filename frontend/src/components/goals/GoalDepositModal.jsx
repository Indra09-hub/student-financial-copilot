import React, { useState } from 'react';
import Modal from '../common/Modal';

export default function GoalDepositModal({ isOpen, onClose, goal, onDepositSubmit }) {
  const [depositAmount, setDepositAmount] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  if (!goal) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const addVal = parseFloat(depositAmount);
    if (isNaN(addVal) || addVal <= 0) {
      setError('Please enter a positive deposit amount.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      const updatedTotal = Number(goal.currentSavings || 0) + addVal;
      await onDepositSubmit(goal.id, {
        goalName: goal.goalName,
        targetAmount: goal.targetAmount,
        currentSavings: updatedTotal,
        targetDate: goal.targetDate,
        status: updatedTotal >= Number(goal.targetAmount) ? 'COMPLETED' : goal.status,
      });
      setDepositAmount('');
      onClose();
    } catch (err) {
      setError(err.message || 'Deposit failed');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Deposit Savings to "${goal.goalName}"`}
      footer={
        <>
          <button type="button" onClick={onClose} className="btn btn-secondary" disabled={submitting}>
            Cancel
          </button>
          <button type="submit" form="deposit-form" className="btn btn-primary" disabled={submitting}>
            {submitting ? 'Adding...' : 'Confirm Deposit'}
          </button>
        </>
      }
    >
      <form id="deposit-form" onSubmit={handleSubmit}>
        <div style={{ marginBottom: '1.25rem', padding: '0.85rem', backgroundColor: 'var(--bg-surface-hover)', borderRadius: 'var(--radius-sm)' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Current Progress:</div>
          <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            ₹{Number(goal.currentSavings || 0).toLocaleString('en-IN')} of ₹{Number(goal.targetAmount || 0).toLocaleString('en-IN')}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="deposit-amount" className="form-label">Deposit Amount (₹) *</label>
          <input
            id="deposit-amount"
            type="number"
            step="50"
            min="1"
            required
            className="form-input"
            value={depositAmount}
            onChange={(e) => setDepositAmount(e.target.value)}
            placeholder="e.g. 1000"
            autoFocus
          />
          {error && <span className="form-error">{error}</span>}
        </div>
      </form>
    </Modal>
  );
}
