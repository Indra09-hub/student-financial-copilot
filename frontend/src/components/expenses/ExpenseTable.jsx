import React, { useState } from 'react';
import { ArrowUpDown, Edit2, Trash2, Shield, Coffee, Calendar } from 'lucide-react';

export default function ExpenseTable({
  expenses = [],
  sortField,
  sortOrder,
  onSort,
  onEdit,
  onDelete,
}) {
  const [deleteConfirmId, setDeleteConfirmId] = useState(null);

  const getSortIcon = (field) => {
    return (
      <ArrowUpDown
        size={14}
        color={sortField === field ? 'var(--primary)' : 'var(--text-muted)'}
        style={{ marginLeft: '0.35rem', verticalAlign: 'middle' }}
      />
    );
  };

  if (expenses.length === 0) {
    return (
      <div
        className="card"
        style={{
          padding: '3rem 1.5rem',
          textAlign: 'center',
          color: 'var(--text-muted)',
        }}
      >
        <Calendar size={36} color="var(--text-muted)" style={{ margin: '0 auto 1rem' }} />
        <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.35rem' }}>
          No expenses found
        </h4>
        <p style={{ fontSize: '0.9rem', maxWidth: '400px', margin: '0 auto' }}>
          No transactions match your current filters. Clear the search or click "Add Expense" to record a new transaction.
        </p>
      </div>
    );
  }

  return (
    <div className="table-responsive">
      <table className="data-table">
        <thead>
          <tr>
            <th
              onClick={() => onSort('expenseDate')}
              style={{ cursor: 'pointer', userSelect: 'none' }}
              title="Sort by date"
            >
              Date {getSortIcon('expenseDate')}
            </th>
            <th
              onClick={() => onSort('name')}
              style={{ cursor: 'pointer', userSelect: 'none' }}
              title="Sort by name"
            >
              Expense Name {getSortIcon('name')}
            </th>
            <th>Category</th>
            <th>Classification</th>
            <th
              onClick={() => onSort('amount')}
              style={{ cursor: 'pointer', userSelect: 'none', textAlign: 'right' }}
              title="Sort by amount"
            >
              Amount (₹) {getSortIcon('amount')}
            </th>
            <th style={{ textAlign: 'right' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {expenses.map((expense) => {
            const isEssential = expense.expenseType?.toLowerCase() === 'essential';
            const isConfirmingDelete = deleteConfirmId === expense.id;

            return (
              <tr key={expense.id}>
                {/* Date */}
                <td style={{ whiteSpace: 'nowrap', color: 'var(--text-secondary)' }}>
                  {expense.expenseDate}
                </td>

                {/* Name & Note */}
                <td>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                    {expense.name}
                  </div>
                  {expense.notes && (
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.15rem' }}>
                      {expense.notes}
                    </div>
                  )}
                </td>

                {/* Category */}
                <td>
                  <span
                    style={{
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      padding: '0.2rem 0.5rem',
                      borderRadius: 'var(--radius-sm)',
                      backgroundColor: 'var(--bg-surface-hover)',
                      color: 'var(--text-secondary)',
                      border: '1px solid var(--border)',
                    }}
                  >
                    {expense.category}
                  </span>
                </td>

                {/* Essential vs Discretionary */}
                <td>
                  <span className={`badge ${isEssential ? 'badge-essential' : 'badge-discretionary'}`}>
                    {isEssential ? <Shield size={11} /> : <Coffee size={11} />}
                    {isEssential ? 'Essential' : 'Discretionary'}
                  </span>
                </td>

                {/* Amount */}
                <td
                  style={{
                    textAlign: 'right',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    color: 'var(--text-primary)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  ₹{Number(expense.amount).toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </td>

                {/* Actions */}
                <td style={{ textAlign: 'right', whiteSpace: 'nowrap' }}>
                  {isConfirmingDelete ? (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.35rem' }}>
                      <span style={{ fontSize: '0.75rem', color: 'var(--danger)', fontWeight: 600 }}>Delete?</span>
                      <button
                        onClick={() => {
                          onDelete(expense.id, expense.name);
                          setDeleteConfirmId(null);
                        }}
                        className="btn btn-danger"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                      >
                        Yes
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="btn btn-secondary"
                        style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
                      >
                        No
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
                      <button
                        onClick={() => onEdit(expense)}
                        className="btn-icon"
                        title="Edit Expense"
                        style={{ padding: '0.4rem' }}
                      >
                        <Edit2 size={16} />
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(expense.id)}
                        className="btn-icon"
                        title="Delete Expense"
                        style={{ padding: '0.4rem', color: 'var(--danger)' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
