import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { api } from '../services/api';

const FinancialContext = createContext(null);

export function FinancialProvider({ children }) {
  const [userId] = useState(1);
  const [summary, setSummary] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [toast, setToast] = useState(null);

  // Theme state: dark/light
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('copilot_theme') || 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('copilot_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  const showToast = useCallback((message, type = 'info') => {
    setToast({ message, type, id: Date.now() });
    setTimeout(() => {
      setToast(null);
    }, 4000);
  }, []);

  const refreshSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await api.getSummary(userId);
      setSummary(data);
    } catch (err) {
      console.error('Failed to load financial summary:', err);
      setError(err.message || 'Failed to connect to backend server');
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    refreshSummary();
  }, [refreshSummary]);

  const value = {
    userId,
    summary,
    loading,
    error,
    toast,
    theme,
    toggleTheme,
    showToast,
    refreshSummary,
  };

  return (
    <FinancialContext.Provider value={value}>
      {children}
    </FinancialContext.Provider>
  );
}

export function useFinancial() {
  const context = useContext(FinancialContext);
  if (!context) {
    throw new Error('useFinancial must be used within a FinancialProvider');
  }
  return context;
}
