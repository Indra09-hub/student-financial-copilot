import React, { useState } from 'react';
import { Target, Plus, PiggyBank, CheckCircle2, TrendingUp } from 'lucide-react';
import { useGoals } from '../hooks/useGoals';
import GoalCard from '../components/goals/GoalCard';
import GoalFormModal from '../components/goals/GoalFormModal';
import GoalDepositModal from '../components/goals/GoalDepositModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';

export default function GoalsPage() {
  const { goals, loading, error, refetch, addGoal, updateGoal, deleteGoal } = useGoals();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [depositGoal, setDepositGoal] = useState(null);

  const totalSaved = goals.reduce((acc, g) => acc + Number(g.currentSavings || 0), 0);
  const totalTarget = goals.reduce((acc, g) => acc + Number(g.targetAmount || 0), 0);
  const completedGoals = goals.filter(g => Number(g.completionPercentage) >= 100).length;

  const handleOpenEdit = (goal) => {
    setEditingGoal(goal);
    setIsFormOpen(true);
  };

  const handleOpenDeposit = (goal) => {
    setDepositGoal(goal);
  };

  const handleFormSubmit = async (data) => {
    if (editingGoal) {
      await updateGoal(editingGoal.id, data);
    } else {
      await addGoal(data);
    }
    setEditingGoal(null);
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
          <h1 style={{ margin: 0 }}>Savings Goal Planner</h1>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)' }}>
            Track progress toward major purchases (Laptop, Certifications, Emergency Buffer) with deterministic feasibility checks.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingGoal(null);
            setIsFormOpen(true);
          }}
          className="btn btn-primary"
        >
          <Plus size={16} /> New Goal
        </button>
      </div>

      {/* Goals Summary Bar */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div className="card" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Active Goals</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, marginTop: '0.2rem' }}>
            {goals.length} targets
          </div>
        </div>

        <div className="card" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Saved in Goals</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--success)', marginTop: '0.2rem' }}>
            ₹{totalSaved.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="card" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Total Target Value</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--primary)', marginTop: '0.2rem' }}>
            ₹{totalTarget.toLocaleString('en-IN')}
          </div>
        </div>

        <div className="card" style={{ padding: '1rem 1.25rem' }}>
          <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Goals Achieved</span>
          <div style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)', marginTop: '0.2rem' }}>
            {completedGoals} / {goals.length}
          </div>
        </div>
      </div>

      {/* Loading & Error */}
      {loading && goals.length === 0 && (
        <LoadingSpinner message="Calculating goal feasibility from live savings capacity..." />
      )}

      {error && (
        <ErrorAlert message={error} onRetry={refetch} />
      )}

      {/* Goals Grid */}
      {!loading && goals.length === 0 && (
        <div
          className="card"
          style={{
            padding: '4rem 1.5rem',
            textAlign: 'center',
            color: 'var(--text-muted)',
          }}
        >
          <Target size={44} color="var(--primary)" style={{ margin: '0 auto 1rem' }} />
          <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
            No savings goals yet
          </h3>
          <p style={{ maxWidth: '450px', margin: '0 auto 1.5rem' }}>
            Create a goal like <strong>"Laptop (₹40,000)"</strong> or <strong>"Emergency Buffer (₹10,000)"</strong>. The Copilot will automatically calculate required monthly savings and feasibility.
          </p>
          <button
            onClick={() => setIsFormOpen(true)}
            className="btn btn-primary"
          >
            <Plus size={16} /> Create Your First Goal
          </button>
        </div>
      )}

      {!loading && goals.length > 0 && (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '1.5rem',
          }}
        >
          {goals.map((goal) => (
            <GoalCard
              key={goal.id}
              goal={goal}
              onEdit={handleOpenEdit}
              onDelete={deleteGoal}
              onDeposit={handleOpenDeposit}
            />
          ))}
        </div>
      )}

      {/* Modals */}
      <GoalFormModal
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingGoal(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingGoal}
      />

      <GoalDepositModal
        isOpen={Boolean(depositGoal)}
        onClose={() => setDepositGoal(null)}
        goal={depositGoal}
        onDepositSubmit={updateGoal}
      />
    </div>
  );
}
