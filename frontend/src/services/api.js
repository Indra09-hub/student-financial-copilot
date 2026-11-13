/**
 * Centralized API Client Service.
 * Communicates with Spring Boot REST Backend on /api.
 */

const API_BASE = '/api';

async function handleResponse(response) {
  const json = await response.json();
  if (!response.ok || !json.success) {
    const errorMsg = json.message || json.error || 'Server request failed';
    throw new Error(errorMsg);
  }
  return json.data;
}

export const api = {
  // Summary & Allowance
  async getSummary(userId = 1) {
    const res = await fetch(`${API_BASE}/summary?userId=${userId}`);
    return handleResponse(res);
  },

  async getAllowance(userId = 1) {
    const res = await fetch(`${API_BASE}/allowance?userId=${userId}`);
    return handleResponse(res);
  },

  async updateAllowance(userId = 1, monthlyAllowance) {
    const res = await fetch(`${API_BASE}/allowance?userId=${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ monthlyAllowance }),
    });
    return handleResponse(res);
  },

  // Expenses CRUD & Filter
  async getExpenses(userId = 1, filters = {}) {
    const params = new URLSearchParams({ userId });
    if (filters.category) params.append('category', filters.category);
    if (filters.startDate) params.append('startDate', filters.startDate);
    if (filters.endDate) params.append('endDate', filters.endDate);
    if (filters.search) params.append('search', filters.search);

    const res = await fetch(`${API_BASE}/expenses?${params.toString()}`);
    return handleResponse(res);
  },

  async createExpense(userId = 1, expenseData) {
    const res = await fetch(`${API_BASE}/expenses?userId=${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData),
    });
    return handleResponse(res);
  },

  async updateExpense(id, expenseData) {
    const res = await fetch(`${API_BASE}/expenses/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(expenseData),
    });
    return handleResponse(res);
  },

  async deleteExpense(id) {
    const res = await fetch(`${API_BASE}/expenses/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(res);
  },

  // Savings Goals CRUD
  async getGoals(userId = 1) {
    const res = await fetch(`${API_BASE}/goals?userId=${userId}`);
    return handleResponse(res);
  },

  async createGoal(userId = 1, goalData) {
    const res = await fetch(`${API_BASE}/goals?userId=${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goalData),
    });
    return handleResponse(res);
  },

  async updateGoal(id, goalData) {
    const res = await fetch(`${API_BASE}/goals/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(goalData),
    });
    return handleResponse(res);
  },

  async deleteGoal(id) {
    const res = await fetch(`${API_BASE}/goals/${id}`, {
      method: 'DELETE',
    });
    return handleResponse(res);
  },

  // Optimizer & Scenarios
  async simulateScenario(userId = 1, scenarioData) {
    const res = await fetch(`${API_BASE}/scenario/simulate?userId=${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(scenarioData),
    });
    return handleResponse(res);
  },

  async getSavingsOpportunities(userId = 1) {
    const res = await fetch(`${API_BASE}/opportunities?userId=${userId}`);
    return handleResponse(res);
  },

  // Direct JDBC Report Demonstration Module
  async getMonthlyJdbcReport(userId = 1, year, month) {
    const params = new URLSearchParams({ userId });
    if (year) params.append('year', year);
    if (month) params.append('month', month);

    const res = await fetch(`${API_BASE}/reports/jdbc/monthly?${params.toString()}`);
    return handleResponse(res);
  },

  async runJdbcTransactionDemo(userId = 1) {
    const res = await fetch(`${API_BASE}/reports/jdbc/transaction-demo?userId=${userId}`, {
      method: 'POST',
    });
    return handleResponse(res);
  },

  // AI Copilot
  async getAiAdvice(userId = 1, requestData = {}) {
    const res = await fetch(`${API_BASE}/ai/advice?userId=${userId}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestData),
    });
    return handleResponse(res);
  },
};
