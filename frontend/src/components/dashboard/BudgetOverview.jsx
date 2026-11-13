import React from 'react';
import { Wallet, TrendingDown, PiggyBank, AlertTriangle, ShieldCheck } from 'lucide-react';
import SummaryCard from '../common/SummaryCard';
import CanvasGauge from '../common/CanvasGauge';

export default function BudgetOverview({ summary, onEditAllowance }) {
  if (!summary) return null;

  const allowance = Number(summary.monthlyAllowance || 0);
  const totalExpenses = Number(summary.totalExpenses || 0);
  const monthlySavings = Number(summary.monthlySavings || 0);
  const savingsRate = Number(summary.savingsRate || 0);
  const isDeficit = summary.isDeficit || monthlySavings < 0;

  return (
    <section aria-label="Budget Overview Metrics" style={{ marginBottom: '2rem' }}>
      {/* Overspending Deficit Alert Banner */}
      {isDeficit && (
        <div
          className="card"
          style={{
            backgroundColor: 'var(--danger-light)',
            borderLeft: '5px solid var(--danger)',
            marginBottom: '1.5rem',
            padding: '1.25rem 1.5rem',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
          }}
          role="alert"
        >
          <AlertTriangle size={28} color="var(--danger)" style={{ flexShrink: 0 }} />
          <div>
            <h4 style={{ color: 'var(--danger)', fontWeight: 800, margin: 0, fontSize: '1.05rem' }}>
              Monthly Deficit Warning: Overspending by ₹{Math.abs(monthlySavings).toLocaleString('en-IN')}!
            </h4>
            <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
              Your expenses (₹{totalExpenses.toLocaleString('en-IN')}) exceed your monthly allowance (₹{allowance.toLocaleString('en-IN')}).
              Use the <strong>Goal Optimizer</strong> to trim discretionary spending.
            </p>
          </div>
        </div>
      )}

      {/* Grid of 4 Key Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '1.25rem',
        }}
      >
        {/* 1. Monthly Allowance */}
        <SummaryCard
          title="Monthly Allowance"
          value={`₹${allowance.toLocaleString('en-IN')}`}
          subtitle="Fixed monthly budget"
          icon={Wallet}
          color="primary"
          badge="Configurable"
          onClick={onEditAllowance}
        />

        {/* 2. Total Expenses */}
        <SummaryCard
          title="Total Expenses"
          value={`₹${totalExpenses.toLocaleString('en-IN')}`}
          subtitle={`Essential: ₹${Number(summary.essentialExpenses || 0).toLocaleString('en-IN')} | Disc: ₹${Number(summary.discretionaryExpenses || 0).toLocaleString('en-IN')}`}
          icon={TrendingDown}
          color={isDeficit ? 'danger' : 'warning'}
          badge={totalExpenses > 0 ? `${summary.essentialPercentage}% Essential` : 'No expenses'}
        />

        {/* 3. Monthly Net Savings */}
        <SummaryCard
          title={isDeficit ? 'Monthly Deficit' : 'Monthly Savings'}
          value={`₹${Math.abs(monthlySavings).toLocaleString('en-IN')}`}
          subtitle={
            isDeficit
              ? `Spending exceeds allowance by ₹${Math.abs(monthlySavings).toLocaleString('en-IN')}`
              : `Net surplus to fund savings goals`
          }
          icon={isDeficit ? AlertTriangle : PiggyBank}
          color={isDeficit ? 'danger' : 'success'}
          badge={isDeficit ? 'Deficit' : 'Surplus'}
        />

        {/* 4. Canvas Savings Rate Gauge Card */}
        <article
          className="card"
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '1.25rem 1.5rem',
          }}
        >
          <div>
            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-secondary)' }}>
              Savings Rate
            </span>
            <h3 style={{ fontSize: '1.65rem', fontWeight: 800, marginTop: '0.25rem', letterSpacing: '-0.02em' }}>
              {isDeficit ? '0%' : `${savingsRate.toFixed(1)}%`}
            </h3>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.25rem 0 0' }}>
              {savingsRate >= 20 ? '🌟 Excellent student saving!' : savingsRate > 0 ? '👍 Positive progress' : '⚠️ No current savings'}
            </p>
          </div>

          <CanvasGauge
            value={savingsRate}
            max={100}
            size={120}
            isDeficit={isDeficit}
            label="Rate"
            color="#4f46e5"
          />
        </article>
      </div>
    </section>
  );
}
