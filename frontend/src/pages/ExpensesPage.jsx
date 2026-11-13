import React, { useState } from 'react';
import { Plus, ReceiptText, Shield, Coffee } from 'lucide-react';
import { useExpenses } from '../hooks/useExpenses';
import ExpenseFilters from '../components/expenses/ExpenseFilters';
import ExpenseTable from '../components/expenses/ExpenseTable';
import ExpenseForm from '../components/expenses/ExpenseForm';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';

export default function ExpensesPage() {
  const {
    expenses,
    rawCount,
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
    refetch,
    addExpense,
    updateExpense,
    deleteExpense,
  } = useExpenses();

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState(null);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortOrder(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortField(field);
      setSortOrder('desc');
    }
  };

  const handleOpenEdit = (expense) => {
    setEditingExpense(expense);
    setIsFormOpen(true);
  };

  const handleFormSubmit = async (data) => {
    if (editingExpense) {
      await updateExpense(editingExpense.id, data);
    } else {
      await addExpense(data);
    }
    setEditingExpense(null);
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setCategoryFilter('');
    setTypeFilter('');
    setStartDate('');
    setEndDate('');
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
          <h1 style={{ margin: 0 }}>Expense Management</h1>
          <p style={{ margin: '0.25rem 0 0', color: 'var(--text-secondary)' }}>
            Record, categorize, and filter your daily college expenditures.
          </p>
        </div>

        <button
          onClick={() => {
            setEditingExpense(null);
            setIsFormOpen(true);
          }}
          className="btn btn-primary"
        >
          <Plus size={16} /> Add Expense
        </button>
      </div>

      {/* Metrics Mini-Banner */}
      <div
        className="card"
        style={{
          padding: '1rem 1.5rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
          backgroundColor: 'var(--bg-surface-hover)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <ReceiptText size={20} color="var(--primary)" />
          <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
            Showing <strong>{expenses.length}</strong> of {rawCount} transactions
          </span>
        </div>

        <div style={{ fontSize: '0.95rem', fontWeight: 700 }}>
          Filtered Total:{' '}
          <span style={{ color: 'var(--primary)', fontFamily: 'var(--font-mono)' }}>
            ₹{totalFilteredAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </span>
        </div>
      </div>

      {/* Filters Bar */}
      <ExpenseFilters
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        categoryFilter={categoryFilter}
        setCategoryFilter={setCategoryFilter}
        typeFilter={typeFilter}
        setTypeFilter={setTypeFilter}
        startDate={startDate}
        setStartDate={setStartDate}
        endDate={endDate}
        setEndDate={setEndDate}
        onReset={handleResetFilters}
      />

      {/* Loading & Error States */}
      {loading && expenses.length === 0 && (
        <LoadingSpinner message="Loading expense records from MySQL..." />
      )}

      {error && (
        <ErrorAlert message={error} onRetry={refetch} />
      )}

      {/* Expenses Table */}
      {!loading && (
        <ExpenseTable
          expenses={expenses}
          sortField={sortField}
          sortOrder={sortOrder}
          onSort={handleSort}
          onEdit={handleOpenEdit}
          onDelete={deleteExpense}
        />
      )}

      {/* Expense Modal Form */}
      <ExpenseForm
        isOpen={isFormOpen}
        onClose={() => {
          setIsFormOpen(false);
          setEditingExpense(null);
        }}
        onSubmit={handleFormSubmit}
        initialData={editingExpense}
      />
    </div>
  );
}
