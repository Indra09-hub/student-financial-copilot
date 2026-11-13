import React from 'react';
import { Link } from 'react-router-dom';
import { Target, CheckCircle2, AlertCircle, ArrowRight } from 'lucide-react';

export default function GoalsProgressList({ goals = [] }) {
  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Target size={18} color="var(--primary)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Savings Goals</h3>
        </div>
        <Link
          to="/goals"
          style={{ fontSize: '0.8rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
        >
          View All <ArrowRight size={14} />
        </Link>
      </div>

      {goals.length === 0 ? (
        <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)', flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <p style={{ marginBottom: '1rem' }}>No savings goals created yet.</p>
          <Link to="/goals" className="btn btn-primary" style={{ fontSize: '0.8rem' }}>
            Set a Goal
          </Link>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', flex: 1 }}>
          {goals.slice(0, 3).map((goal) => {
            const pct = Number(goal.completionPercentage || 0);
            const target = Number(goal.targetAmount || 0);
            const saved = Number(goal.currentSavings || 0);
            const isComplete = pct >= 100;

            return (
              <div
                key={goal.id || goal.goalId}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-surface-hover)',
                  border: '1px solid var(--border)',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                  <div>
                    <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0 }}>
                      {goal.goalName}
                    </h4>
                    <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                      Deadline: {goal.targetDate || 'Flexible'} ({goal.remainingMonths} mos left)
                    </span>
                  </div>

                  <span
                    className={`badge ${isComplete ? 'badge-success' : goal.isFeasible ? 'badge-info' : 'badge-danger'}`}
                    style={{ fontSize: '0.7rem' }}
                  >
                    {isComplete ? (
                      <>
                        <CheckCircle2 size={12} /> Achieved
                      </>
                    ) : goal.isFeasible ? (
                      <>
                        <CheckCircle2 size={12} /> On Track
                      </>
                    ) : (
                      <>
                        <AlertCircle size={12} /> Off Track
                      </>
                    )}
                  </span>
                </div>

                {/* Progress bar */}
                <div className="progress-bar-bg" style={{ marginBottom: '0.4rem' }}>
                  <div
                    className="progress-bar-fill"
                    style={{
                      width: `${Math.min(pct, 100)}%`,
                      backgroundColor: isComplete ? 'var(--success)' : 'var(--primary)',
                    }}
                  />
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                  <span>₹{saved.toLocaleString('en-IN')} of ₹{target.toLocaleString('en-IN')}</span>
                  <span style={{ fontWeight: 700 }}>{pct.toFixed(1)}%</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
