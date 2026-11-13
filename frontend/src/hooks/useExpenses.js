import { useState, useEffect, useCallback, useMemo, useDebugValue } from 'react';
import { api } from '../services/api';
import { useFinancial } from '../context/FinancialContext';

/**
 * Custom Hook: useExpenses
 * Manages expense transactions, filtering, searching, sorting, and CRUD actions.
 * Demonstrates: useState, useEffect, useMemo, useCallback, useDebugValue.
 */
export function useExpenses() {
  const { userId, refreshSummary, showToast } = useFinancial();

  const [expenses, setExpenses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filters state
  const [categoryFilter, setCategoryFilter] = useState('');
  const [typeFilter, setTypeFilter] = useState(''); // 'all', 'essential', 'discretionary'
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [searchQuery, setSearchQuery] = useState('');

  // Sorting state
  const [sortField, setSortField] = useState('expenseDate'); // 'expenseDate', 'amount', 'name'
  const [sortOrder, setSortOrder] = useState('desc'); // 'asc', 'desc'

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getExpenses(userId, {
        category: categoryFilter,
        startDate: startDate || undefined,
        endDate: endDate || undefined,
        search: searchQuery || undefined,
      });
      setExpenses(data || []);
    } catch (err) {
      console.error('Failed to fetch expenses:', err);
      setError(err.message || 'Error loading expenses');
    } finally {
      setLoading(false);
    }
  }, [userId, categoryFilter, startDate, endDate, searchQuery]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  // Syllabus Topic: useMemo for optimized client-side filtering and sorting
  const processedExpenses = useMemo(() => {
    let result = [...expenses];

    // Filter by type if selected
    if (typeFilter && typeFilter !== 'all') {
      result = result.filter(e => e.expenseType?.toLowerCase() === typeFilter.toLowerCase());
    }

    // Sort
    result.sort((a, b) => {
      let valA = a[sortField];
      let valB = b[sortField];

      if (sortField === 'amount') {
        valA = Number(valA);
        valB = Number(valB);
        return sortOrder === 'asc' ? valA - valB : valB - valA;
      }

      if (sortField === 'expenseDate') {
        return sortOrder === 'asc'
          ? new Date(valA) - new Date(valB)
          : new Date(valB) - new Date(valA);
      }

      // String sort (name)
      valA = (valA || '').toString().toLowerCase();
      valB = (valB || '').toString().toLowerCase();
      return sortOrder === 'asc' ? valA.localeCompare(valB) : valB.localeCompare(valA);
    });

    return result;
  }, [expenses, typeFilter, sortField, sortOrder]);

  // Computed totals via useMemo
  const totalFilteredAmount = useMemo(() => {
    return processedExpenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  }, [processedExpenses]);

  // CRUD actions
  const addExpense = async (expenseData) => {
    try {
      const created = await api.createExpense(userId, expenseData);
      setExpenses(prev => [created, ...prev]);
      await refreshSummary();
      showToast(`Expense "${created.name}" added successfully!`, 'success');
      return created;
    } catch (err) {
      showToast(err.message || 'Failed to add expense', 'danger');
      throw err;
    }
  };

  const updateExpense = async (id, expenseData) => {
    try {
      const updated = await api.updateExpense(id, expenseData);
      setExpenses(prev => prev.map(e => (e.id === id ? updated : e)));
      await refreshSummary();
      showToast(`Expense "${updated.name}" updated!`, 'success');
      return updated;
    } catch (err) {
      showToast(err.message || 'Failed to update expense', 'danger');
      throw err;
    }
  };

  const deleteExpense = async (id, name = 'Expense') => {
    try {
      await api.deleteExpense(id);
      setExpenses(prev => prev.filter(e => e.id !== id));
      await refreshSummary();
      showToast(`"${name}" removed from budget.`, 'info');
    } catch (err) {
      showToast(err.message || 'Failed to delete expense', 'danger');
      throw err;
    }
  };

  // Syllabus Topic: useDebugValue
  useDebugValue(
    `Total Transactions: ${processedExpenses.length} | Sum: ₹${totalFilteredAmount.toFixed(2)}`
  );

  return {
    expenses: processedExpenses,
    rawCount: expenses.length,
    loading,
    error,
    totalFilteredAmount,
    categoryFilter,
    setCategoryFilter,
    typeFilter,
    setTypeFilter,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    searchQuery,
    setSearchQuery,
    sortField,
    setSortField,
    sortOrder,
    setSortOrder,
    refetch: fetchExpenses,
    addExpense,
    updateExpense,
    deleteExpense,
  };
}
