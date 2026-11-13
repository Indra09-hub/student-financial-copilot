package com.copilot.dto;

import java.math.BigDecimal;

public class SavingsOpportunityDto {
    private String category;
    private BigDecimal currentSpending;
    private int suggestedReductionPercent;
    private BigDecimal potentialMonthlySavings;
    private String projectedImpact;

    public SavingsOpportunityDto() {}

    public SavingsOpportunityDto(String category, BigDecimal currentSpending, int suggestedReductionPercent, BigDecimal potentialMonthlySavings, String projectedImpact) {
        this.category = category;
        this.currentSpending = currentSpending;
        this.suggestedReductionPercent = suggestedReductionPercent;
        this.potentialMonthlySavings = potentialMonthlySavings;
        this.projectedImpact = projectedImpact;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public BigDecimal getCurrentSpending() {
        return currentSpending;
    }

    public void setCurrentSpending(BigDecimal currentSpending) {
        this.currentSpending = currentSpending;
    }

    public int getSuggestedReductionPercent() {
        return suggestedReductionPercent;
    }

    public void setSuggestedReductionPercent(int suggestedReductionPercent) {
        this.suggestedReductionPercent = suggestedReductionPercent;
    }

    public BigDecimal getPotentialMonthlySavings() {
        return potentialMonthlySavings;
    }

    public void setPotentialMonthlySavings(BigDecimal potentialMonthlySavings) {
        this.potentialMonthlySavings = potentialMonthlySavings;
    }

    public String getProjectedImpact() {
        return projectedImpact;
    }

    public void setProjectedImpact(String projectedImpact) {
        this.projectedImpact = projectedImpact;
    }
}
