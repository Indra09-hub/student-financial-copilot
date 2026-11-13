package com.copilot.service;

import com.copilot.dto.FinancialSummaryResponse;
import com.copilot.dto.GoalFeasibilityDto;
import com.copilot.entity.Expense;
import com.copilot.entity.ExpenseType;
import com.copilot.entity.SavingsGoal;
import com.copilot.entity.User;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@DisplayName("Financial Calculation Service Deterministic Tests")
class FinancialCalculationServiceTest {

    private FinancialCalculationService service;
    private User testUser;

    @BeforeEach
    void setUp() {
        service = new FinancialCalculationService();
        testUser = new User("Aarav Sharma", "aarav@college.edu", new BigDecimal("15000.00"));
        testUser.setId(1L);
    }

    @Test
    @DisplayName("Should correctly calculate normal student budget with positive savings")
    void testNormalBudgetCalculation() {
        List<Expense> expenses = new ArrayList<>();
        expenses.add(new Expense(testUser, "Hostel Rent", new BigDecimal("4500.00"), "Housing", ExpenseType.ESSENTIAL, LocalDate.now(), null));
        expenses.add(new Expense(testUser, "Mess Meals", new BigDecimal("3200.00"), "Food", ExpenseType.ESSENTIAL, LocalDate.now(), null));
        expenses.add(new Expense(testUser, "Cafe Snacks", new BigDecimal("850.00"), "Food & Dining", ExpenseType.DISCRETIONARY, LocalDate.now(), null));

        FinancialSummaryResponse summary = service.calculateSummary(testUser, expenses, List.of());

        assertEquals(new BigDecimal("15000.00"), summary.getMonthlyAllowance());
        assertEquals(new BigDecimal("8550.00"), summary.getTotalExpenses());
        assertEquals(new BigDecimal("6450.00"), summary.getMonthlySavings());
        assertEquals(new BigDecimal("43.00"), summary.getSavingsRate());
        assertFalse(summary.isDeficit());
        assertEquals(BigDecimal.ZERO.setScale(2), summary.getDeficitAmount());
        assertEquals(new BigDecimal("7700.00"), summary.getEssentialExpenses());
        assertEquals(new BigDecimal("850.00"), summary.getDiscretionaryExpenses());
    }

    @Test
    @DisplayName("Should flag overspending deficit when expenses exceed allowance")
    void testOverspendingDeficit() {
        testUser.setMonthlyAllowance(new BigDecimal("5000.00"));

        List<Expense> expenses = new ArrayList<>();
        expenses.add(new Expense(testUser, "Rent", new BigDecimal("4000.00"), "Housing", ExpenseType.ESSENTIAL, LocalDate.now(), null));
        expenses.add(new Expense(testUser, "Shopping", new BigDecimal("2500.00"), "Shopping", ExpenseType.DISCRETIONARY, LocalDate.now(), null));

        FinancialSummaryResponse summary = service.calculateSummary(testUser, expenses, List.of());

        assertEquals(new BigDecimal("6500.00"), summary.getTotalExpenses());
        assertEquals(new BigDecimal("-1500.00"), summary.getMonthlySavings());
        assertTrue(summary.isDeficit());
        assertEquals(new BigDecimal("1500.00"), summary.getDeficitAmount());
        assertEquals(BigDecimal.ZERO.setScale(2), summary.getSavingsRate());
    }

    @Test
    @DisplayName("Should handle zero allowance without dividing by zero")
    void testZeroAllowance() {
        testUser.setMonthlyAllowance(BigDecimal.ZERO);

        List<Expense> expenses = new ArrayList<>();
        expenses.add(new Expense(testUser, "Stationery", new BigDecimal("200.00"), "Education", ExpenseType.ESSENTIAL, LocalDate.now(), null));

        FinancialSummaryResponse summary = service.calculateSummary(testUser, expenses, List.of());

        assertEquals(BigDecimal.ZERO.setScale(2), summary.getMonthlyAllowance());
        assertEquals(new BigDecimal("-200.00"), summary.getMonthlySavings());
        assertTrue(summary.isDeficit());
        assertEquals(BigDecimal.ZERO.setScale(2), summary.getSavingsRate());
    }

    @Test
    @DisplayName("Should handle zero expenses with 100% savings rate")
    void testZeroExpenses() {
        FinancialSummaryResponse summary = service.calculateSummary(testUser, List.of(), List.of());

        assertEquals(new BigDecimal("15000.00"), summary.getMonthlyAllowance());
        assertEquals(BigDecimal.ZERO.setScale(2), summary.getTotalExpenses());
        assertEquals(new BigDecimal("15000.00"), summary.getMonthlySavings());
        assertEquals(new BigDecimal("100.00"), summary.getSavingsRate());
        assertFalse(summary.isDeficit());
    }

    @Test
    @DisplayName("Should assess Laptop Goal example accurately: ₹40,000 target, ₹3,000 saved, 6 months")
    void testLaptopGoalAssessment() {
        SavingsGoal laptopGoal = new SavingsGoal(
                testUser,
                "Laptop",
                new BigDecimal("40000.00"),
                new BigDecimal("3000.00"),
                LocalDate.now().plusMonths(6),
                "IN_PROGRESS"
        );
        laptopGoal.setId(1L);

        // Student saves ₹3,053/month
        BigDecimal monthlySavings = new BigDecimal("3053.00");
        GoalFeasibilityDto feasibility = service.assessGoalFeasibility(laptopGoal, monthlySavings);

        assertEquals(new BigDecimal("37000.00"), feasibility.getRemainingAmount());
        assertEquals(6, feasibility.getRemainingMonths());
        // Required = 37,000 / 6 = ₹6,166.67/mo
        assertEquals(new BigDecimal("6166.67"), feasibility.getRequiredMonthlySavings());
        assertEquals(new BigDecimal("3053.00"), feasibility.getAchievableMonthlySavings());
        // Estimated = ceil(37,000 / 3053) = 13 months
        assertEquals(13, feasibility.getEstimatedMonths());
        // Feasibility is false because 3053 < 6166.67
        assertFalse(feasibility.isFeasible());
        assertEquals(new BigDecimal("7.50"), feasibility.getCompletionPercentage());
    }

    @Test
    @DisplayName("Should report goal as complete when target amount is reached")
    void testGoalAlreadyCompleted() {
        SavingsGoal completedGoal = new SavingsGoal(
                testUser,
                "Course Certificate",
                new BigDecimal("2000.00"),
                new BigDecimal("2500.00"), // Already over-saved
                LocalDate.now().plusMonths(2),
                "COMPLETED"
        );
        completedGoal.setId(2L);

        GoalFeasibilityDto feasibility = service.assessGoalFeasibility(completedGoal, new BigDecimal("1000.00"));

        assertEquals(BigDecimal.ZERO.setScale(2), feasibility.getRemainingAmount());
        assertEquals(BigDecimal.ZERO.setScale(2), feasibility.getRequiredMonthlySavings());
        assertEquals(0, feasibility.getEstimatedMonths());
        assertTrue(feasibility.isFeasible());
        assertEquals(new BigDecimal("100.00"), feasibility.getCompletionPercentage());
    }

    @Test
    @DisplayName("Should handle expired deadline gracefully")
    void testExpiredGoalDeadline() {
        SavingsGoal expiredGoal = new SavingsGoal(
                testUser,
                "Concert Ticket",
                new BigDecimal("3000.00"),
                new BigDecimal("1000.00"),
                LocalDate.now().minusMonths(1), // Past deadline
                "IN_PROGRESS"
        );
        expiredGoal.setId(3L);

        GoalFeasibilityDto feasibility = service.assessGoalFeasibility(expiredGoal, new BigDecimal("1500.00"));

        assertEquals(0, feasibility.getRemainingMonths());
        assertFalse(feasibility.isFeasible());
        assertNull(feasibility.getEstimatedMonths());
        assertTrue(feasibility.getFeasibilityMessage().contains("deadline has passed"));
    }
}
