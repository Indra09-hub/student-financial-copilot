import React, { useState } from 'react';
import { Target, Calendar, CheckCircle2, AlertTriangle, PlusCircle, Edit2, Trash2 } from 'lucide-react';

export default function GoalCard({ goal, onEdit, onDelete, onDeposit }) {
  const [deleteConfirm, setDeleteConfirm] = useState(false);

  const target = Number(goal.targetAmount || 0);
  const saved = Number(goal.currentSavings || 0);
  const remaining = Number(goal.remainingAmount || 0);
  const pct = Number(goal.completionPercentage || 0);
  const isComplete = pct >= 100 || goal.status === 'COMPLETED';
  const isFeasible = goal.isFeasible;

  return (
    <article
      className="card card-interactive"
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        borderLeft: isComplete
          ? '4px solid var(--success)'
          : isFeasible
          ? '4px solid var(--primary)'
          : '4px solid var(--warning)',
      }}
    >
      <div>
        {/* Header: Title and Status Badge */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.75rem' }}>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, margin: 0, color: 'var(--text-primary)' }}>
              {goal.goalName}
            </h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--text-muted)', fontSize: '0.8rem', marginTop: '0.2rem' }}>
              <Calendar size={13} />
              <span>Target: {goal.targetDate || 'No date set'} ({goal.remainingMonths} months left)</span>
            </div>
          </div>

          <span className={`badge ${isComplete ? 'badge-success' : isFeasible ? 'badge-info' : 'badge-danger'}`}>
            {isComplete ? <CheckCircle2 size={12} /> : isFeasible ? <CheckCircle2 size={12} /> : <AlertTriangle size={12} />}
            {isComplete ? 'Completed' : isFeasible ? 'On Track' : 'Off Track'}
          </span>
        </div>

        {/* Progress Bar & Amounts */}
        <div style={{ margin: '1rem 0' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem', marginBottom: '0.35rem' }}>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              ₹{saved.toLocaleString('en-IN')}
            </span>
            <span style={{ color: 'var(--text-muted)' }}>
              Target: ₹{target.toLocaleString('en-IN')}
            </span>
          </div>

          <div className="progress-bar-bg" style={{ height: '10px' }}>
            <div
              className="progress-bar-fill"
              style={{
                width: `${Math.min(pct, 100)}%`,
                backgroundColor: isComplete ? 'var(--success)' : 'var(--primary)',
              }}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginTop: '0.35rem', color: 'var(--text-secondary)' }}>
            <span>{pct.toFixed(1)}% funded</span>
            <span>Remaining: ₹{remaining.toLocaleString('en-IN')}</span>
          </div>
        </div>

        {/* Metrics Box (Deterministic Calculations) */}
        <div
          style={{
            padding: '0.85rem',
            borderRadius: 'var(--radius-sm)',
            backgroundColor: 'var(--bg-surface-hover)',
            border: '1px solid var(--border)',
            fontSize: '0.825rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.4rem',
            marginBottom: '1rem',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Required Monthly Savings:</span>
            <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>
              ₹{Number(goal.requiredMonthlySavings || 0).toLocaleString('en-IN')}/mo
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Current Achievable Savings:</span>
            <span style={{ fontWeight: 700, color: 'var(--primary)' }}>
              ₹{Number(goal.achievableMonthlySavings || 0).toLocaleString('en-IN')}/mo
            </span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span style={{ color: 'var(--text-secondary)' }}>Estimated Time at Current Rate:</span>
            <span style={{ fontWeight: 700, color: isFeasible ? 'var(--success)' : 'var(--danger)' }}>
              {goal.estimatedMonths != null ? `${goal.estimatedMonths} months` : 'Deficit / Impossible'}
            </span>
          </div>
        </div>

        {/* Feasibility Explanation */}
        {goal.feasibilityMessage && (
          <p
            style={{
              fontSize: '0.8rem',
              color: isComplete ? 'var(--success)' : isFeasible ? 'var(--text-secondary)' : 'var(--danger)',
              margin: '0 0 1rem',
              lineHeight: 1.4,
            }}
          >
            {goal.feasibilityMessage}
          </p>
        )}
      </div>

      {/* Action Footer */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: '0.85rem',
          borderTop: '1px solid var(--border)',
        }}
      >
        <button
          onClick={() => onDeposit(goal)}
          className="btn btn-secondary"
          style={{ padding: '0.4rem 0.75rem', fontSize: '0.8rem' }}
          title="Add money to this goal"
        >
          <PlusCircle size={14} color="var(--success)" /> Add Funds
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
          <button
            onClick={() => onEdit(goal)}
            className="btn-icon"
            title="Edit Goal"
            style={{ padding: '0.4rem' }}
          >
            <Edit2 size={15} />
          </button>

          {deleteConfirm ? (
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem' }}>
              <button
                onClick={() => {
                  onDelete(goal.id, goal.goalName);
                  setDeleteConfirm(false);
                }}
                className="btn btn-danger"
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
              >
                Confirm
              </button>
              <button
                onClick={() => setDeleteConfirm(false)}
                className="btn btn-secondary"
                style={{ padding: '0.25rem 0.5rem', fontSize: '0.75rem' }}
              >
                Cancel
              </button>
            </div>
          ) : (
            <button
              onClick={() => setDeleteConfirm(true)}
              className="btn-icon"
              title="Delete Goal"
              style={{ padding: '0.4rem', color: 'var(--danger)' }}
            >
              <Trash2 size={15} />
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
