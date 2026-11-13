import React, { useState, useEffect } from 'react';
import { Sliders, Sparkles, Check } from 'lucide-react';
import { api } from '../services/api';
import { useFinancial } from '../context/FinancialContext';
import { useGoals } from '../hooks/useGoals';
import ScenarioSlider from '../components/optimizer/ScenarioSlider';
import ComparisonCard from '../components/optimizer/ComparisonCard';
import OpportunitiesList from '../components/optimizer/OpportunitiesList';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';

export default function OptimizerPage() {
  const { userId, summary, refreshSummary, showToast } = useFinancial();
  const { goals } = useGoals();

  const [discretionaryReduction, setDiscretionaryReduction] = useState(25); // 25% default
  const [allowanceAdjustment, setAllowanceAdjustment] = useState(0);
  const [selectedGoalId, setSelectedGoalId] = useState(null);

  const [simulation, setSimulation] = useState(null);
  const [opportunities, setOpportunities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [applying, setApplying] = useState(false);

  // Run simulation whenever slider controls change
  useEffect(() => {
    let isCancelled = false;

    const runSimulation = async () => {
      try {
        setLoading(true);
        setError(null);
        const baselineAllowance = Number(summary?.monthlyAllowance || 15000);
        const simAllowance = baselineAllowance + allowanceAdjustment;

        const res = await api.simulateScenario(userId, {
          simulatedAllowance: simAllowance,
          discretionaryReductionPercent: discretionaryReduction,
          goalId: selectedGoalId || undefined,
        });

        if (!isCancelled) {
          setSimulation(res);
        }
      } catch (err) {
        if (!isCancelled) {
          console.error('Simulation failed:', err);
          setError(err.message || 'Error running scenario simulation');
        }
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    };

    if (summary) {
      runSimulation();
    }

    return () => {
      isCancelled = true;
    };
  }, [userId, summary, discretionaryReduction, allowanceAdjustment, selectedGoalId]);

  // Load deterministic opportunities
  useEffect(() => {
    const fetchOpportunities = async () => {
      try {
        const data = await api.getSavingsOpportunities(userId);
        setOpportunities(data || []);
      } catch (err) {
        console.warn('Failed to load opportunities:', err);
      }
    };
    fetchOpportunities();
  }, [userId]);

  const handleReset = () => {
    setDiscretionaryReduction(0);
    setAllowanceAdjustment(0);
    setSelectedGoalId(null);
  };

  const handleApplyAllowance = async () => {
    if (!simulation || allowanceAdjustment === 0) return;
    try {
      setApplying(true);
      await api.updateAllowance(userId, simulation.simulatedAllowance);
      await refreshSummary();
      showToast(`Updated monthly allowance to ₹${Number(simulation.simulatedAllowance).toLocaleString('en-IN')}`, 'success');
      setAllowanceAdjustment(0);
    } catch (err) {
      showToast(err.message || 'Failed to apply changes', 'danger');
    } finally {
      setApplying(false);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '1.75rem',
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Goal Optimizer & What-If Scenarios</h1>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)' }}>
            Simulate how reducing flexible expenses or boosting allowance accelerates your savings timeline.
          </p>
        </div>

        {allowanceAdjustment > 0 && (
          <button
            onClick={handleApplyAllowance}
            disabled={applying}
            className="btn btn-primary"
          >
            <Check size={16} /> {applying ? 'Applying...' : 'Save Simulated Allowance to Profile'}
          </button>
        )}
      </div>

      {error && <ErrorAlert message={error} />}

      {/* Interactive Simulation Sliders */}
      <ScenarioSlider
        discretionaryReduction={discretionaryReduction}
        setDiscretionaryReduction={setDiscretionaryReduction}
        allowanceAdjustment={allowanceAdjustment}
        setAllowanceAdjustment={setAllowanceAdjustment}
        baselineAllowance={Number(summary?.monthlyAllowance || 15000)}
        baselineDiscretionary={Number(summary?.discretionaryExpenses || 0)}
        goals={goals}
        selectedGoalId={selectedGoalId}
        setSelectedGoalId={setSelectedGoalId}
        onReset={handleReset}
      />

      {/* Plan Comparison Side-by-Side Results */}
      {loading && !simulation ? (
        <LoadingSpinner message="Calculating what-if scenario impact..." />
      ) : (
        <ComparisonCard simulation={simulation} />
      )}

      {/* Deterministic Savings Opportunities */}
      <OpportunitiesList opportunities={opportunities} />
    </div>
  );
}
