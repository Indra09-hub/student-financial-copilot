package com.copilot.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class FinancialSummaryResponse {
    private Long userId;
    private String userName;
    private BigDecimal monthlyAllowance = BigDecimal.ZERO;
    private BigDecimal totalExpenses = BigDecimal.ZERO;
    private BigDecimal monthlySavings = BigDecimal.ZERO;
    private BigDecimal savingsRate = BigDecimal.ZERO;
    private boolean isDeficit;
    private BigDecimal deficitAmount = BigDecimal.ZERO;

    private BigDecimal essentialExpenses = BigDecimal.ZERO;
    private BigDecimal discretionaryExpenses = BigDecimal.ZERO;
    private BigDecimal essentialPercentage = BigDecimal.ZERO;
    private BigDecimal discretionaryPercentage = BigDecimal.ZERO;

    private int activeGoalsCount;
    private List<GoalFeasibilityDto> goalsFeasibility = new ArrayList<>();
    private Map<String, BigDecimal> categoryBreakdown = new HashMap<>();

    public FinancialSummaryResponse() {}

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public BigDecimal getMonthlyAllowance() {
        return monthlyAllowance;
    }

    public void setMonthlyAllowance(BigDecimal monthlyAllowance) {
        this.monthlyAllowance = monthlyAllowance;
    }

    public BigDecimal getTotalExpenses() {
        return totalExpenses;
    }

    public void setTotalExpenses(BigDecimal totalExpenses) {
        this.totalExpenses = totalExpenses;
    }

    public BigDecimal getMonthlySavings() {
        return monthlySavings;
    }

    public void setMonthlySavings(BigDecimal monthlySavings) {
        this.monthlySavings = monthlySavings;
    }

    public BigDecimal getSavingsRate() {
        return savingsRate;
    }

    public void setSavingsRate(BigDecimal savingsRate) {
        this.savingsRate = savingsRate;
    }

    public boolean isDeficit() {
        return isDeficit;
    }

    public void setDeficit(boolean deficit) {
        isDeficit = deficit;
    }

    public BigDecimal getDeficitAmount() {
        return deficitAmount;
    }

    public void setDeficitAmount(BigDecimal deficitAmount) {
        this.deficitAmount = deficitAmount;
    }

    public BigDecimal getEssentialExpenses() {
        return essentialExpenses;
    }

    public void setEssentialExpenses(BigDecimal essentialExpenses) {
        this.essentialExpenses = essentialExpenses;
    }

    public BigDecimal getDiscretionaryExpenses() {
        return discretionaryExpenses;
    }

    public void setDiscretionaryExpenses(BigDecimal discretionaryExpenses) {
        this.discretionaryExpenses = discretionaryExpenses;
    }

    public BigDecimal getEssentialPercentage() {
        return essentialPercentage;
    }

    public void setEssentialPercentage(BigDecimal essentialPercentage) {
        this.essentialPercentage = essentialPercentage;
    }

    public BigDecimal getDiscretionaryPercentage() {
        return discretionaryPercentage;
    }

    public void setDiscretionaryPercentage(BigDecimal discretionaryPercentage) {
        this.discretionaryPercentage = discretionaryPercentage;
    }

    public int getActiveGoalsCount() {
        return activeGoalsCount;
    }

    public void setActiveGoalsCount(int activeGoalsCount) {
        this.activeGoalsCount = activeGoalsCount;
    }

    public List<GoalFeasibilityDto> getGoalsFeasibility() {
        return goalsFeasibility;
    }

    public void setGoalsFeasibility(List<GoalFeasibilityDto> goalsFeasibility) {
        this.goalsFeasibility = goalsFeasibility;
    }

    public Map<String, BigDecimal> getCategoryBreakdown() {
        return categoryBreakdown;
    }

    public void setCategoryBreakdown(Map<String, BigDecimal> categoryBreakdown) {
        this.categoryBreakdown = categoryBreakdown;
    }
}
