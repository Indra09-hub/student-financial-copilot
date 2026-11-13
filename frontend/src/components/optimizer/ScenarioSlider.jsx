import React from 'react';
import { Sliders, Sparkles, TrendingUp, ShieldCheck } from 'lucide-react';

export default function ScenarioSlider({
  discretionaryReduction,
  setDiscretionaryReduction,
  allowanceAdjustment,
  setAllowanceAdjustment,
  baselineAllowance,
  baselineDiscretionary,
  goals = [],
  selectedGoalId,
  setSelectedGoalId,
  onReset,
}) {
  const simulatedDiscretionary = Math.max(
    0,
    baselineDiscretionary - (baselineDiscretionary * discretionaryReduction) / 100
  );
  const potentialCut = (baselineDiscretionary * discretionaryReduction) / 100;

  return (
    <div className="card" style={{ marginBottom: '1.5rem' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Sliders size={20} color="var(--primary)" />
          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, margin: 0 }}>
            What-If Scenario Simulator
          </h3>
        </div>
        <button onClick={onReset} className="btn btn-secondary" style={{ padding: '0.35rem 0.75rem', fontSize: '0.8rem' }}>
          Reset Sliders
        </button>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', padding: '0.75rem', backgroundColor: 'var(--essential-light)', borderRadius: 'var(--radius-sm)', color: 'var(--essential-color)' }}>
        <ShieldCheck size={18} style={{ flexShrink: 0 }} />
        <span style={{ fontSize: '0.825rem', fontWeight: 600 }}>
          Essential expenses (Rent, Mess Food, Transport, Books) are strictly protected and cannot be reduced.
        </span>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.75rem' }}>
        {/* 1. Discretionary Spending Reduction Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label className="form-label" style={{ margin: 0 }}>
              Trim Discretionary Spending: <strong style={{ color: 'var(--primary)' }}>{discretionaryReduction}%</strong>
            </label>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--success)' }}>
              +₹{Math.round(potentialCut).toLocaleString('en-IN')}/mo saved
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="70"
            step="5"
            value={discretionaryReduction}
            onChange={(e) => setDiscretionaryReduction(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            <span>0% (No change)</span>
            <span>25% (Recommended)</span>
            <span>50% (Frugal)</span>
            <span>70% (Extreme)</span>
          </div>
        </div>

        {/* 2. Extra Allowance / Income Slider */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
            <label className="form-label" style={{ margin: 0 }}>
              Extra Allowance / Part-time Income:
            </label>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--primary)' }}>
              +₹{allowanceAdjustment.toLocaleString('en-IN')}/mo
            </span>
          </div>

          <input
            type="range"
            min="0"
            max="10000"
            step="500"
            value={allowanceAdjustment}
            onChange={(e) => setAllowanceAdjustment(Number(e.target.value))}
            style={{ width: '100%', accentColor: 'var(--primary)', cursor: 'pointer' }}
          />

          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
            <span>+₹0</span>
            <span>+₹2,500</span>
            <span>+₹5,000</span>
            <span>+₹10,000</span>
          </div>
        </div>

        {/* 3. Goal to Focus on */}
        <div>
          <label className="form-label" style={{ marginBottom: '0.5rem', display: 'block' }}>
            Target Goal to Accelerate:
          </label>
          <select
            className="form-select"
            value={selectedGoalId || ''}
            onChange={(e) => setSelectedGoalId(e.target.value ? Number(e.target.value) : null)}
          >
            <option value="">All Active Goals</option>
            {goals.map((g) => (
              <option key={g.id || g.goalId} value={g.id || g.goalId}>
                {g.goalName} (Target: ₹{Number(g.targetAmount).toLocaleString('en-IN')})
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
