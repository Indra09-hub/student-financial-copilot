import React from 'react';
import { PieChart, Shield, Coffee } from 'lucide-react';

export default function SpendingDistributionChart({ summary }) {
  if (!summary) return null;

  const total = Number(summary.totalExpenses || 0);
  const essential = Number(summary.essentialExpenses || 0);
  const discretionary = Number(summary.discretionaryExpenses || 0);
  const essentialPct = Number(summary.essentialPercentage || 0);
  const discretionaryPct = Number(summary.discretionaryPercentage || 0);

  const categories = Object.entries(summary.categoryBreakdown || {}).sort((a, b) => b[1] - a[1]);

  return (
    <div className="card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <PieChart size={18} color="var(--primary)" />
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Spending Distribution</h3>
        </div>
        <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          Total: ₹{total.toLocaleString('en-IN')}
        </span>
      </div>

      {total === 0 ? (
        <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
          <p>No expenses recorded yet. Add your first expense to view spending distribution.</p>
        </div>
      ) : (
        <>
          {/* Essential vs Discretionary Ratio Bar */}
          <div style={{ marginBottom: '1.5rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem', fontSize: '0.85rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--essential-color)', fontWeight: 600 }}>
                <Shield size={14} /> Essential ({essentialPct}%)
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', color: 'var(--discretionary-color)', fontWeight: 600 }}>
                <Coffee size={14} /> Discretionary ({discretionaryPct}%)
              </span>
            </div>

            {/* Split Progress Bar */}
            <div
              style={{
                height: '10px',
                borderRadius: 'var(--radius-full)',
                display: 'flex',
                overflow: 'hidden',
                backgroundColor: 'var(--border)',
              }}
            >
              <div
                style={{
                  width: `${essentialPct}%`,
                  backgroundColor: 'var(--essential-color)',
                  transition: 'width var(--transition-normal)',
                }}
                title={`Essential: ₹${essential.toLocaleString('en-IN')}`}
              />
              <div
                style={{
                  width: `${discretionaryPct}%`,
                  backgroundColor: 'var(--discretionary-color)',
                  transition: 'width var(--transition-normal)',
                }}
                title={`Discretionary: ₹${discretionary.toLocaleString('en-IN')}`}
              />
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '0.35rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span>₹{essential.toLocaleString('en-IN')}</span>
              <span>₹{discretionary.toLocaleString('en-IN')}</span>
            </div>
          </div>

          {/* Category Breakdown Bars */}
          <div style={{ flex: 1 }}>
            <h4 style={{ fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', color: 'var(--text-muted)', marginBottom: '0.75rem', letterSpacing: '0.05em' }}>
              Top Categories
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {categories.slice(0, 5).map(([category, amount]) => {
                const pct = total > 0 ? (amount / total) * 100 : 0;
                return (
                  <div key={category}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.25rem' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{category}</span>
                      <span style={{ color: 'var(--text-secondary)' }}>
                        ₹{Number(amount).toLocaleString('en-IN')}{' '}
                        <small style={{ color: 'var(--text-muted)' }}>({pct.toFixed(0)}%)</small>
                      </span>
                    </div>

                    <div className="progress-bar-bg" style={{ height: '6px' }}>
                      <div
                        className="progress-bar-fill"
                        style={{
                          width: `${pct}%`,
                          background: category === 'Housing' || category === 'Food' || category === 'Transport' || category === 'Education'
                            ? 'var(--essential-color)'
                            : 'var(--discretionary-color)',
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
