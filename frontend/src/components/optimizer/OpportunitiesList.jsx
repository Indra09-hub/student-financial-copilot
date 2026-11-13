import React from 'react';
import { Lightbulb, ArrowUpRight } from 'lucide-react';

export default function OpportunitiesList({ opportunities = [] }) {
  if (opportunities.length === 0) {
    return (
      <div className="card" style={{ textAlign: 'center', padding: '2rem 1rem', color: 'var(--text-muted)' }}>
        <p>No high-discretionary savings opportunities detected. Keep recording your expenses!</p>
      </div>
    );
  }

  return (
    <div className="card">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.25rem' }}>
        <Lightbulb size={20} color="#f59e0b" />
        <h3 style={{ fontSize: '1.15rem', fontWeight: 800, margin: 0 }}>
          Deterministic Savings Opportunities
        </h3>
      </div>

      <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
        Our rules engine analyzed your discretionary spending to highlight high-impact areas where minor lifestyle tweaks generate substantial monthly savings.
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1rem' }}>
        {opportunities.map((opp) => (
          <div
            key={opp.category}
            style={{
              padding: '1.15rem',
              borderRadius: 'var(--radius-sm)',
              backgroundColor: 'var(--bg-surface-hover)',
              border: '1px solid var(--border)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}
          >
            <div>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span style={{ fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
                  {opp.category}
                </span>
                <span className="badge badge-warning">
                  Trim {opp.suggestedReductionPercent}%
                </span>
              </div>

              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '0.75rem' }}>
                Current Spending: <strong>₹{Number(opp.currentSpending).toLocaleString('en-IN')}</strong>
              </div>

              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', margin: 0, lineHeight: 1.4 }}>
                {opp.projectedImpact}
              </p>
            </div>

            <div
              style={{
                marginTop: '1rem',
                paddingTop: '0.75rem',
                borderTop: '1px solid var(--border)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Potential Monthly Surplus:</span>
              <span style={{ fontWeight: 800, color: 'var(--success)', fontSize: '0.95rem' }}>
                +₹{Number(opp.potentialMonthlySavings).toLocaleString('en-IN')}/mo
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
