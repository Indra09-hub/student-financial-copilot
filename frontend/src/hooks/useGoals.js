import { useState, useEffect, useCallback, useDebugValue } from 'react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { useFinancial } from '../context/FinancialContext';

/**
 * Custom Hook: useGoals
 * Manages savings goals, target feasibility tracking, updates, and milestones.
 * Demonstrates: useState, useEffect, useCallback, useDebugValue, canvas-confetti animation.
 */
export function useGoals() {
  const { userId, refreshSummary, showToast } = useFinancial();

  const [goals, setGoals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchGoals = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getGoals(userId);
      setGoals(data || []);
    } catch (err) {
      console.error('Failed to fetch goals:', err);
      setError(err.message || 'Error loading goals');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchGoals();
  }, [fetchGoals]);

  const triggerCelebration = () => {
    try {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (e) {
      // Ignore if confetti canvas not available
    }
  };

  const addGoal = async (goalData) => {
    try {
      const created = await api.createGoal(userId, goalData);
      setGoals(prev => [...prev, created]);
      await refreshSummary();
      showToast(`Goal "${created.goalName}" created!`, 'success');

      if (Number(created.completionPercentage) >= 100) {
        triggerCelebration();
      }
      return created;
    } catch (err) {
      showToast(err.message || 'Failed to create goal', 'danger');
      throw err;
    }
  };

  const updateGoal = async (id, goalData) => {
    try {
      const updated = await api.updateGoal(id, goalData);
      setGoals(prev => prev.map(g => (g.id === id ? updated : g)));
      await refreshSummary();
      showToast(`Goal "${updated.goalName}" updated!`, 'success');

      if (Number(updated.completionPercentage) >= 100) {
        triggerCelebration();
        showToast(`🎉 Congratulations! You reached your goal "${updated.goalName}"!`, 'success');
      }
      return updated;
    } catch (err) {
      showToast(err.message || 'Failed to update goal', 'danger');
      throw err;
    }
  };

  const deleteGoal = async (id, name = 'Goal') => {
    try {
      await api.deleteGoal(id);
      setGoals(prev => prev.filter(g => g.id !== id));
      await refreshSummary();
      showToast(`Goal "${name}" deleted.`, 'info');
    } catch (err) {
      showToast(err.message || 'Failed to delete goal', 'danger');
      throw err;
    }
  };

  // Syllabus Topic: useDebugValue
  useDebugValue(
    goals.length > 0
      ? `Goals Count: ${goals.length} | Top: ${goals[0]?.goalName} (${goals[0]?.completionPercentage}%)`
      : 'No Goals Active'
  );

  return {
    goals,
    loading,
    error,
    refetch: fetchGoals,
    addGoal,
    updateGoal,
    deleteGoal,
  };
}
