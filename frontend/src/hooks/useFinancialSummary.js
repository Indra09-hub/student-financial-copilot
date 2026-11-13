import { useDebugValue } from 'react';
import { useFinancial } from '../context/FinancialContext';

/**
 * Custom Hook: useFinancialSummary
 * Demonstrates React Custom Hook creation and useDebugValue for React DevTools inspection.
 */
export function useFinancialSummary() {
  const { summary, loading, error, refreshSummary } = useFinancial();

  // Syllabus Topic: useDebugValue displays custom label in React DevTools
  useDebugValue(
    summary
      ? `Allowance: ₹${summary.monthlyAllowance} | Savings: ₹${summary.monthlySavings} | Deficit: ${summary.deficit}`
      : 'Summary Loading...'
  );

  return {
    summary,
    loading,
    error,
    refreshSummary,
  };
}
