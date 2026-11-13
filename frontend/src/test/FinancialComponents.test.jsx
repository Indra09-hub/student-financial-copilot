import { describe, it, expect, vi } from 'vitest';
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import ExpenseForm from '../components/expenses/ExpenseForm';
import SummaryCard from '../components/common/SummaryCard';
import GoalCard from '../components/goals/GoalCard';
import LoadingSpinner from '../components/common/LoadingSpinner';
import ErrorAlert from '../components/common/ErrorAlert';
import { Wallet, IndianRupee } from 'lucide-react';

describe('Frontend Component & Validation Tests', () => {
  // 1. Expense Form Validation
  describe('ExpenseForm Validation', () => {
    it('shows validation errors when submitting an empty form', () => {
      const handleSubmit = vi.fn();
      render(
        <ExpenseForm
          isOpen={true}
          onClose={vi.fn()}
          onSubmit={handleSubmit}
        />
      );

      const form = document.querySelector('#expense-form');
      fireEvent.submit(form);

      expect(screen.getByText(/expense name is required/i)).toBeInTheDocument();
      expect(screen.getByText(/amount must be greater than zero/i)).toBeInTheDocument();
      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('rejects negative or zero amounts', () => {
      const handleSubmit = vi.fn();
      render(
        <ExpenseForm
          isOpen={true}
          onClose={vi.fn()}
          onSubmit={handleSubmit}
        />
      );

      const nameInput = screen.getByPlaceholderText(/e\.g\. Mess Food/i);
      const amountInput = screen.getByPlaceholderText(/0\.00/i);

      fireEvent.change(nameInput, { target: { value: 'Notebook' } });
      fireEvent.change(amountInput, { target: { value: '-50' } });

      const form = document.querySelector('#expense-form');
      fireEvent.submit(form);

      expect(screen.getByText(/amount must be greater than zero/i)).toBeInTheDocument();
      expect(handleSubmit).not.toHaveBeenCalled();
    });

    it('calls onSubmit with sanitized data when inputs are valid', () => {
      const handleSubmit = vi.fn();
      render(
        <ExpenseForm
          isOpen={true}
          onClose={vi.fn()}
          onSubmit={handleSubmit}
        />
      );

      const nameInput = screen.getByPlaceholderText(/e\.g\. Mess Food/i);
      const amountInput = screen.getByPlaceholderText(/0\.00/i);

      fireEvent.change(nameInput, { target: { value: 'College Cafeteria Lunch' } });
      fireEvent.change(amountInput, { target: { value: '180' } });

      const form = document.querySelector('#expense-form');
      fireEvent.submit(form);

      expect(handleSubmit).toHaveBeenCalledTimes(1);
      const submitted = handleSubmit.mock.calls[0][0];
      expect(submitted.name).toBe('College Cafeteria Lunch');
      expect(submitted.amount).toBe(180);
      expect(submitted.expenseType).toBe('discretionary');
    });
  });

  // 2. Financial Summary Rendering
  describe('SummaryCard Rendering', () => {
    it('renders label, formatted amount, and subtitle correctly', () => {
      render(
        <SummaryCard
          title="Monthly Allowance"
          value="₹15,000"
          subtitle="Fixed monthly income"
          icon={Wallet}
          badge="Active"
        />
      );

      expect(screen.getByText('Monthly Allowance')).toBeInTheDocument();
      expect(screen.getByText('₹15,000')).toBeInTheDocument();
      expect(screen.getByText('Fixed monthly income')).toBeInTheDocument();
      expect(screen.getByText('Active')).toBeInTheDocument();
    });

    it('handles negative or deficit amounts with proper badge/text', () => {
      render(
        <SummaryCard
          title="Monthly Net Savings"
          value="-₹2,500"
          subtitle="Deficit: Spending exceeded allowance"
          color="danger"
          badge="Deficit"
          icon={IndianRupee}
        />
      );

      expect(screen.getByText('Monthly Net Savings')).toBeInTheDocument();
      expect(screen.getByText('-₹2,500')).toBeInTheDocument();
      expect(screen.getByText(/Deficit: Spending exceeded allowance/i)).toBeInTheDocument();
      expect(screen.getByText('Deficit')).toBeInTheDocument();
    });
  });

  // 3. Goal Progress & Feasibility Display
  describe('GoalCard Progress Display', () => {
    const mockGoal = {
      id: 1,
      goalName: 'Laptop',
      targetAmount: 40000,
      currentSavings: 10000,
      targetDate: '2026-12-31',
      status: 'IN_PROGRESS',
      completionPercentage: 25.0,
      remainingAmount: 30000,
      remainingMonths: 3,
      isFeasible: false,
      requiredMonthlySavings: 10000,
      achievableMonthlySavings: 5000,
      estimatedMonths: 6,
      feasibilityMessage: 'Shortfall: Need an extra ₹5,000/mo',
    };

    it('renders goal details, target amount, and progress bar percentage', () => {
      render(
        <GoalCard
          goal={mockGoal}
          onDeposit={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
        />
      );

      expect(screen.getByText('Laptop')).toBeInTheDocument();
      expect(screen.getAllByText(/40,000/).length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText(/10,000/).length).toBeGreaterThanOrEqual(1);
      expect(screen.getByText('25.0% funded')).toBeInTheDocument();
    });

    it('renders feasibility warning when goal requires more than achievable savings', () => {
      render(
        <GoalCard
          goal={mockGoal}
          onDeposit={vi.fn()}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
        />
      );

      expect(screen.getByText(/Off Track/i)).toBeInTheDocument();
      expect(screen.getByText(/Shortfall/i)).toBeInTheDocument();
    });

    it('triggers onDeposit when the Add Funds button is clicked', () => {
      const handleDeposit = vi.fn();
      render(
        <GoalCard
          goal={mockGoal}
          onDeposit={handleDeposit}
          onEdit={vi.fn()}
          onDelete={vi.fn()}
        />
      );

      const depositBtn = screen.getByRole('button', { name: /add funds/i });
      fireEvent.click(depositBtn);
      expect(handleDeposit).toHaveBeenCalledWith(mockGoal);
    });
  });

  // 4. Loading and Error States
  describe('Loading and Error States', () => {
    it('renders LoadingSpinner with custom message', () => {
      render(<LoadingSpinner message="Calculating financial metrics..." />);
      expect(screen.getByText('Calculating financial metrics...')).toBeInTheDocument();
    });

    it('renders ErrorAlert with title, message, and retry button', () => {
      const handleRetry = vi.fn();
      render(
        <ErrorAlert
          message="Failed to connect to Spring Boot backend."
          onRetry={handleRetry}
        />
      );

      expect(screen.getByText('Unable to load data')).toBeInTheDocument();
      expect(screen.getByText('Failed to connect to Spring Boot backend.')).toBeInTheDocument();

      const retryBtn = screen.getByRole('button', { name: /retry/i });
      fireEvent.click(retryBtn);
      expect(handleRetry).toHaveBeenCalledTimes(1);
    });
  });
});
