import React from 'react';
import { ArrowRight, CheckCircle2, TrendingUp, Sparkles, Clock, AlertTriangle } from 'lucide-react';

export default function ComparisonCard({ simulation }) {
  if (!simulation) return null;

  const baseSavings = Number(simulation.baselineSavings || 0);
  const simSavings = Number(simulation.simulatedSavings || 0);
  const baseRate = Number(simulation.baselineSavingsRate || 0);
  const simRate = Number(simulation.simulatedSavingsRate || 0);
  const savingsDelta = Number(simulation.monthlySavingsDelta || 0);
  const rateDelta = Number(simulation.savingsRateDelta || 0);

  return (
    <div className="card" style={{ marginBottom: '1.5rem', backgroundColor: 'var(--bg-surface)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem', borderBottom: '1px solid var(--border)', paddingBottom: '0.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <TrendingUp size={20} color="var(--success)" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
            Plan Comparison & Impact
          </h3>
        </div>

        {savingsDelta > 0 && (
          <span className="badge badge-success" style={{ fontSize: '0.8rem', padding: '0.35rem 0.75rem' }}>
            <Sparkles size={13} /> +₹{savingsDelta.toLocaleString('en-IN')}/mo extra savings
          </span>
        )}
      </div>

      {/* Side-by-Side Comparison Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: '1rem',
          alignItems: 'center',
          marginBottom: '1.5rem',
        }}
      >
        {/* Current Baseline Card */}
        <div
          style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'var(--bg-surface-hover)',
            border: '1px solid var(--border)',
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)' }}>
            Current Baseline Plan
          </span>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.35rem' }}>
            ₹{baseSavings.toLocaleString('en-IN')}/mo
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Savings Rate: <strong>{baseRate.toFixed(1)}%</strong>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Expenses: ₹{Number(simulation.baselineExpenses).toLocaleString('en-IN')} (Disc: ₹{Number(simulation.baselineDiscretionary).toLocaleString('en-IN')})
          </div>
        </div>

        {/* Arrow Divider */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              borderRadius: '50%',
              backgroundColor: 'var(--primary-light)',
              color: 'var(--primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowRight size={18} />
          </div>
        </div>

        {/* Simulated Plan Card */}
        <div
          style={{
            padding: '1.25rem',
            borderRadius: 'var(--radius-md)',
            backgroundColor: 'rgba(99, 102, 241, 0.08)',
            border: '2px solid var(--primary)',
          }}
        >
          <span style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--primary)' }}>
            Simulated Budget Plan
          </span>
          <div style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.35rem' }}>
            ₹{simSavings.toLocaleString('en-IN')}/mo
          </div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            Simulated Rate: <strong>{simRate.toFixed(1)}%</strong> ({rateDelta >= 0 ? `+${rateDelta.toFixed(1)}%` : `${rateDelta.toFixed(1)}%`})
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.5rem' }}>
            Simulated Expenses: ₹{Number(simulation.simulatedExpenses).toLocaleString('en-IN')} (Disc: ₹{Number(simulation.simulatedDiscretionary).toLocaleString('en-IN')})
          </div>
        </div>
      </div>

      {/* Goal Timeline Acceleration List */}
      <div>
        <h4 style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '0.75rem', color: 'var(--text-primary)' }}>
          Goal Pacing Acceleration:
        </h4>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {simulation.goalComparisons?.map((goal) => {
            const hasSavedMonths = goal.monthsSaved && goal.monthsSaved > 0;
            return (
              <div
                key={goal.goalId}
                style={{
                  padding: '1rem',
                  borderRadius: 'var(--radius-sm)',
                  backgroundColor: 'var(--bg-surface-hover)',
                  border: '1px solid var(--border)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  flexWrap: 'wrap',
                  gap: '0.75rem',
                }}
              >
                <div>
                  <h5 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: 'var(--text-primary)' }}>
                    {goal.goalName}
                  </h5>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', margin: '0.25rem 0 0' }}>
                    {goal.impactExplanation}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ textAlign: 'right', fontSize: '0.85rem' }}>
                    <div style={{ color: 'var(--text-muted)' }}>
                      Baseline: {goal.baselineEstimatedMonths != null ? `${goal.baselineEstimatedMonths} mos` : 'N/A'}
                    </div>
                    <div style={{ fontWeight: 700, color: hasSavedMonths ? 'var(--success)' : 'var(--text-primary)' }}>
                      Simulated: {goal.simulatedEstimatedMonths != null ? `${goal.simulatedEstimatedMonths} mos` : 'N/A'}
                    </div>
                  </div>

                  <span
                    className={`badge ${hasSavedMonths ? 'badge-success' : goal.simulatedFeasible ? 'badge-info' : 'badge-danger'}`}
                  >
                    {hasSavedMonths ? (
                      <>
                        <Clock size={12} /> -{goal.monthsSaved} mo{goal.monthsSaved > 1 ? 's' : ''}
                      </>
                    ) : goal.simulatedFeasible ? (
                      <>
                        <CheckCircle2 size={12} /> On Track
                      </>
                    ) : (
                      <>
                        <AlertTriangle size={12} /> Off Track
                      </>
                    )}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
