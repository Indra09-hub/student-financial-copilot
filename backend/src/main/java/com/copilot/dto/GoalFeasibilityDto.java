package com.copilot.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class GoalFeasibilityDto {
    private Long goalId;
    private String goalName;
    private BigDecimal targetAmount;
    private BigDecimal currentSavings;
    private BigDecimal remainingAmount;
    private LocalDate targetDate;
    private long remainingMonths;
    private BigDecimal requiredMonthlySavings;
    private BigDecimal achievableMonthlySavings;
    private Integer estimatedMonths;
    private BigDecimal completionPercentage;
    private boolean isFeasible;
    private String feasibilityMessage;

    public GoalFeasibilityDto() {}

    public Long getGoalId() {
        return goalId;
    }

    public void setGoalId(Long goalId) {
        this.goalId = goalId;
    }

    public String getGoalName() {
        return goalName;
    }

    public void setGoalName(String goalName) {
        this.goalName = goalName;
    }

    public BigDecimal getTargetAmount() {
        return targetAmount;
    }

    public void setTargetAmount(BigDecimal targetAmount) {
        this.targetAmount = targetAmount;
    }

    public BigDecimal getCurrentSavings() {
        return currentSavings;
    }

    public void setCurrentSavings(BigDecimal currentSavings) {
        this.currentSavings = currentSavings;
    }

    public BigDecimal getRemainingAmount() {
        return remainingAmount;
    }

    public void setRemainingAmount(BigDecimal remainingAmount) {
        this.remainingAmount = remainingAmount;
    }

    public LocalDate getTargetDate() {
        return targetDate;
    }

    public void setTargetDate(LocalDate targetDate) {
        this.targetDate = targetDate;
    }

    public long getRemainingMonths() {
        return remainingMonths;
    }

    public void setRemainingMonths(long remainingMonths) {
        this.remainingMonths = remainingMonths;
    }

    public BigDecimal getRequiredMonthlySavings() {
        return requiredMonthlySavings;
    }

    public void setRequiredMonthlySavings(BigDecimal requiredMonthlySavings) {
        this.requiredMonthlySavings = requiredMonthlySavings;
    }

    public BigDecimal getAchievableMonthlySavings() {
        return achievableMonthlySavings;
    }

    public void setAchievableMonthlySavings(BigDecimal achievableMonthlySavings) {
        this.achievableMonthlySavings = achievableMonthlySavings;
    }

    public Integer getEstimatedMonths() {
        return estimatedMonths;
    }

    public void setEstimatedMonths(Integer estimatedMonths) {
        this.estimatedMonths = estimatedMonths;
    }

    public BigDecimal getCompletionPercentage() {
        return completionPercentage;
    }

    public void setCompletionPercentage(BigDecimal completionPercentage) {
        this.completionPercentage = completionPercentage;
    }

    public boolean isFeasible() {
        return isFeasible;
    }

    public void setFeasible(boolean feasible) {
        isFeasible = feasible;
    }

    public String getFeasibilityMessage() {
        return feasibilityMessage;
    }

    public void setFeasibilityMessage(String feasibilityMessage) {
        this.feasibilityMessage = feasibilityMessage;
    }
}
