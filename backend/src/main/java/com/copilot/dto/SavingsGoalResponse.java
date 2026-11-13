package com.copilot.dto;

import com.copilot.entity.SavingsGoal;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class SavingsGoalResponse {
    private Long id;
    private Long userId;
    private String goalName;
    private BigDecimal targetAmount;
    private BigDecimal currentSavings;
    private BigDecimal remainingAmount;
    private LocalDate targetDate;
    private String status;
    private LocalDateTime createdAt;

    // Computed feasibility metrics
    private long remainingMonths;
    private BigDecimal requiredMonthlySavings;
    private BigDecimal achievableMonthlySavings;
    private Integer estimatedMonths;
    private BigDecimal completionPercentage;
    private boolean isFeasible;
    private String feasibilityMessage;

    public SavingsGoalResponse() {}

    public static SavingsGoalResponse fromEntity(SavingsGoal goal, GoalFeasibilityDto feasibility) {
        SavingsGoalResponse res = new SavingsGoalResponse();
        res.id = goal.getId();
        res.userId = goal.getUser() != null ? goal.getUser().getId() : null;
        res.goalName = goal.getGoalName();
        res.targetAmount = goal.getTargetAmount();
        res.currentSavings = goal.getCurrentSavings();
        res.targetDate = goal.getTargetDate();
        res.status = goal.getStatus();
        res.createdAt = goal.getCreatedAt();

        if (feasibility != null) {
            res.remainingAmount = feasibility.getRemainingAmount();
            res.remainingMonths = feasibility.getRemainingMonths();
            res.requiredMonthlySavings = feasibility.getRequiredMonthlySavings();
            res.achievableMonthlySavings = feasibility.getAchievableMonthlySavings();
            res.estimatedMonths = feasibility.getEstimatedMonths();
            res.completionPercentage = feasibility.getCompletionPercentage();
            res.isFeasible = feasibility.isFeasible();
            res.feasibilityMessage = feasibility.getFeasibilityMessage();
        }
        return res;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getGoalName() {
        return goalName;
    }

    public BigDecimal getTargetAmount() {
        return targetAmount;
    }

    public BigDecimal getCurrentSavings() {
        return currentSavings;
    }

    public BigDecimal getRemainingAmount() {
        return remainingAmount;
    }

    public LocalDate getTargetDate() {
        return targetDate;
    }

    public String getStatus() {
        return status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public long getRemainingMonths() {
        return remainingMonths;
    }

    public BigDecimal getRequiredMonthlySavings() {
        return requiredMonthlySavings;
    }

    public BigDecimal getAchievableMonthlySavings() {
        return achievableMonthlySavings;
    }

    public Integer getEstimatedMonths() {
        return estimatedMonths;
    }

    public BigDecimal getCompletionPercentage() {
        return completionPercentage;
    }

    public boolean isFeasible() {
        return isFeasible;
    }

    public String getFeasibilityMessage() {
        return feasibilityMessage;
    }
}
