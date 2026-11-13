import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { FinancialProvider } from './context/FinancialContext';
import ErrorBoundary from './components/common/ErrorBoundary';
import AppLayout from './components/layout/AppLayout';
import DashboardPage from './pages/DashboardPage';
import ExpensesPage from './pages/ExpensesPage';
import GoalsPage from './pages/GoalsPage';
import OptimizerPage from './pages/OptimizerPage';
import AiCopilotPage from './pages/AiCopilotPage';
import ReportsPage from './pages/ReportsPage';

export default function App() {
  return (
    <ErrorBoundary>
      <FinancialProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<DashboardPage />} />
              <Route path="expenses" element={<ExpensesPage />} />
              <Route path="goals" element={<GoalsPage />} />
              <Route path="optimizer" element={<OptimizerPage />} />
              <Route path="ai-copilot" element={<AiCopilotPage />} />
              <Route path="reports" element={<ReportsPage />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </FinancialProvider>
    </ErrorBoundary>
  );
}
