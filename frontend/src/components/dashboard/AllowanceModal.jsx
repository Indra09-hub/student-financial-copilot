import React, { useState, useEffect } from 'react';
import Modal from '../common/Modal';
import { api } from '../../services/api';
import { useFinancial } from '../../context/FinancialContext';

export default function AllowanceModal({ isOpen, onClose, currentAllowance }) {
  const { userId, refreshSummary, showToast } = useFinancial();
  const [allowanceInput, setAllowanceInput] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (isOpen) {
      setAllowanceInput(currentAllowance ? String(currentAllowance) : '');
      setError('');
    }
  }, [isOpen, currentAllowance]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const parsed = parseFloat(allowanceInput);

    if (isNaN(parsed) || parsed < 0) {
      setError('Please enter a valid, non-negative allowance amount.');
      return;
    }

    try {
      setSubmitting(true);
      setError('');
      await api.updateAllowance(userId, parsed);
      await refreshSummary();
      showToast(`Monthly allowance updated to ₹${parsed.toLocaleString('en-IN')}`, 'success');
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update allowance');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Update Monthly Allowance"
      footer={
        <>
          <button type="button" onClick={onClose} className="btn btn-secondary" disabled={submitting}>
            Cancel
          </button>
          <button
            type="submit"
            form="allowance-form"
            className="btn btn-primary"
            disabled={submitting}
          >
            {submitting ? 'Saving...' : 'Save Allowance'}
          </button>
        </>
      }
    >
      <form id="allowance-form" onSubmit={handleSubmit}>
        <p style={{ fontSize: '0.875rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
          Enter the monthly financial support or pocket money you receive from your family, stipend, or scholarship.
        </p>

        <div className="form-group">
          <label htmlFor="allowance-input" className="form-label">
            Monthly Allowance Amount (₹)
          </label>
          <div style={{ position: 'relative' }}>
            <span
              style={{
                position: 'absolute',
                left: '1rem',
                top: '50%',
                transform: 'translateY(-50%)',
                fontWeight: 700,
                color: 'var(--text-secondary)',
              }}
            >
              ₹
            </span>
            <input
              id="allowance-input"
              type="number"
              step="100"
              min="0"
              required
              className="form-input"
              style={{ paddingLeft: '2.25rem' }}
              value={allowanceInput}
              onChange={(e) => setAllowanceInput(e.target.value)}
              placeholder="e.g. 15000"
            />
          </div>
          {error && <span className="form-error">{error}</span>}
        </div>
      </form>
    </Modal>
  );
}
