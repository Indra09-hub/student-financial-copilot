import React, { useState } from 'react';
import { Plus, Target, RefreshCw, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useFinancialSummary } from '../hooks/useFinancialSummary';
import { useExpenses } from '../hooks/useExpenses';
import { useGoals } from '../hooks/useGoals';
import BudgetOverview from '../components/dashboard/BudgetOverview';
import SpendingDistributionChart from '../components/dashboard/SpendingDistributionChart';
import GoalsProgressList from '../components/dashboard/GoalsProgressList';
import AllowanceModal from '../components/dashboard/AllowanceModal';
import ExpenseForm from '../components/expenses/ExpenseForm';
import GoalFormModal from '../components/goals/GoalFormModal';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';

export default function DashboardPage() {
  const { summary, loading, error, refreshSummary } = useFinancialSummary();
  const { expenses, addExpense } = useExpenses();
  const { goals, addGoal } = useGoals();

  const [isAllowanceOpen, setIsAllowanceOpen] = useState(false);
  const [isExpenseOpen, setIsExpenseOpen] = useState(false);
  const [isGoalOpen, setIsGoalOpen] = useState(false);

  if (loading && !summary) {
    return <LoadingSpinner message="Fetching live student financial records..." />;
  }

  if (error && !summary) {
    return (
      <div className="page-wrapper">
        <ErrorAlert message={error} onRetry={refreshSummary} />
      </div>
    );
  }

  return (
    <div className="page-wrapper">
      {/* Page Title & Quick Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          marginBottom: '2rem',
        }}
      >
        <div>
          <h1 style={{ margin: 0 }}>Financial Dashboard</h1>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)' }}>
            Real-time tracking of monthly allowance, student expenses, and savings targets.
          </p>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button
            onClick={() => setIsExpenseOpen(true)}
            className="btn btn-primary"
          >
            <Plus size={16} /> Add Expense
          </button>
          <button
            onClick={() => setIsGoalOpen(true)}
            className="btn btn-secondary"
          >
            <Target size={16} /> New Goal
          </button>
        </div>
      </div>

      {/* Hero Overview Metric Cards */}
      <BudgetOverview
        summary={summary}
        onEditAllowance={() => setIsAllowanceOpen(true)}
      />

      {/* 2-Column Split: Spending Distribution & Goals Progress */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem',
        }}
      >
        <SpendingDistributionChart summary={summary} />
        <GoalsProgressList goals={summary?.goalsFeasibility || goals} />
      </div>

      {/* Recent Transactions Preview */}
      <div className="card">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.25rem' }}>
          <div>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, margin: 0 }}>Recent Expenses</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-muted)', margin: 0 }}>
              Last recorded transactions in MySQL database
            </p>
          </div>
          <Link to="/expenses" style={{ fontSize: '0.85rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            All Expenses ({expenses.length}) <ArrowRight size={14} />
          </Link>
        </div>

        {expenses.length === 0 ? (
          <div style={{ padding: '2rem 1rem', textAlign: 'center', color: 'var(--text-muted)' }}>
            No expenses recorded. Click "Add Expense" above to add your first transaction.
          </div>
        ) : (
          <div className="table-responsive">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Category</th>
                  <th>Classification</th>
                  <th style={{ textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {expenses.slice(0, 5).map((exp) => (
                  <tr key={exp.id}>
                    <td style={{ color: 'var(--text-secondary)' }}>{exp.expenseDate}</td>
                    <td style={{ fontWeight: 600 }}>{exp.name}</td>
                    <td>{exp.category}</td>
                    <td>
                      <span className={`badge ${exp.expenseType?.toLowerCase() === 'essential' ? 'badge-essential' : 'badge-discretionary'}`}>
                        {exp.expenseType}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right', fontWeight: 700, fontFamily: 'var(--font-mono)' }}>
                      ₹{Number(exp.amount).toLocaleString('en-IN', { minimumFractionDigits: 2 })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modals */}
      <AllowanceModal
        isOpen={isAllowanceOpen}
        onClose={() => setIsAllowanceOpen(false)}
        currentAllowance={summary?.monthlyAllowance || 0}
      />
      <ExpenseForm
        isOpen={isExpenseOpen}
        onClose={() => setIsExpenseOpen(false)}
        onSubmit={addExpense}
      />
      <GoalFormModal
        isOpen={isGoalOpen}
        onClose={() => setIsGoalOpen(false)}
        onSubmit={addGoal}
      />
    </div>
  );
}
