package com.copilot.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class ScenarioSimulationResponse {

    // Baseline metrics
    private BigDecimal baselineAllowance;
    private BigDecimal baselineExpenses;
    private BigDecimal baselineDiscretionary;
    private BigDecimal baselineSavings;
    private BigDecimal baselineSavingsRate;

    // Simulated metrics
    private BigDecimal simulatedAllowance;
    private BigDecimal simulatedExpenses;
    private BigDecimal simulatedDiscretionary;
    private BigDecimal simulatedSavings;
    private BigDecimal simulatedSavingsRate;

    // Deltas
    private BigDecimal monthlySavingsDelta;
    private BigDecimal savingsRateDelta;

    private List<GoalComparisonDto> goalComparisons = new ArrayList<>();

    public static class GoalComparisonDto {
        private Long goalId;
        private String goalName;
        private BigDecimal targetAmount;
        private BigDecimal baselineRequiredSavings;
        private BigDecimal simulatedRequiredSavings;
        private Integer baselineEstimatedMonths;
        private Integer simulatedEstimatedMonths;
        private Integer monthsSaved;
        private boolean baselineFeasible;
        private boolean simulatedFeasible;
        private String impactExplanation;

        public GoalComparisonDto() {}

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

        public BigDecimal getBaselineRequiredSavings() {
            return baselineRequiredSavings;
        }

        public void setBaselineRequiredSavings(BigDecimal baselineRequiredSavings) {
            this.baselineRequiredSavings = baselineRequiredSavings;
        }

        public BigDecimal getSimulatedRequiredSavings() {
            return simulatedRequiredSavings;
        }

        public void setSimulatedRequiredSavings(BigDecimal simulatedRequiredSavings) {
            this.simulatedRequiredSavings = simulatedRequiredSavings;
        }

        public Integer getBaselineEstimatedMonths() {
            return baselineEstimatedMonths;
        }

        public void setBaselineEstimatedMonths(Integer baselineEstimatedMonths) {
            this.baselineEstimatedMonths = baselineEstimatedMonths;
        }

        public Integer getSimulatedEstimatedMonths() {
            return simulatedEstimatedMonths;
        }

        public void setSimulatedEstimatedMonths(Integer simulatedEstimatedMonths) {
            this.simulatedEstimatedMonths = simulatedEstimatedMonths;
        }

        public Integer getMonthsSaved() {
            return monthsSaved;
        }

        public void setMonthsSaved(Integer monthsSaved) {
            this.monthsSaved = monthsSaved;
        }

        public boolean isBaselineFeasible() {
            return baselineFeasible;
        }

        public void setBaselineFeasible(boolean baselineFeasible) {
            this.baselineFeasible = baselineFeasible;
        }

        public boolean isSimulatedFeasible() {
            return simulatedFeasible;
        }

        public void setSimulatedFeasible(boolean simulatedFeasible) {
            this.simulatedFeasible = simulatedFeasible;
        }

        public String getImpactExplanation() {
            return impactExplanation;
        }

        public void setImpactExplanation(String impactExplanation) {
            this.impactExplanation = impactExplanation;
        }
    }

    public ScenarioSimulationResponse() {}

    public BigDecimal getBaselineAllowance() {
        return baselineAllowance;
    }

    public void setBaselineAllowance(BigDecimal baselineAllowance) {
        this.baselineAllowance = baselineAllowance;
    }

    public BigDecimal getBaselineExpenses() {
        return baselineExpenses;
    }

    public void setBaselineExpenses(BigDecimal baselineExpenses) {
        this.baselineExpenses = baselineExpenses;
    }

    public BigDecimal getBaselineDiscretionary() {
        return baselineDiscretionary;
    }

    public void setBaselineDiscretionary(BigDecimal baselineDiscretionary) {
        this.baselineDiscretionary = baselineDiscretionary;
    }

    public BigDecimal getBaselineSavings() {
        return baselineSavings;
    }

    public void setBaselineSavings(BigDecimal baselineSavings) {
        this.baselineSavings = baselineSavings;
    }

    public BigDecimal getBaselineSavingsRate() {
        return baselineSavingsRate;
    }

    public void setBaselineSavingsRate(BigDecimal baselineSavingsRate) {
        this.baselineSavingsRate = baselineSavingsRate;
    }

    public BigDecimal getSimulatedAllowance() {
        return simulatedAllowance;
    }

    public void setSimulatedAllowance(BigDecimal simulatedAllowance) {
        this.simulatedAllowance = simulatedAllowance;
    }

    public BigDecimal getSimulatedExpenses() {
        return simulatedExpenses;
    }

    public void setSimulatedExpenses(BigDecimal simulatedExpenses) {
        this.simulatedExpenses = simulatedExpenses;
    }

    public BigDecimal getSimulatedDiscretionary() {
        return simulatedDiscretionary;
    }

    public void setSimulatedDiscretionary(BigDecimal simulatedDiscretionary) {
        this.simulatedDiscretionary = simulatedDiscretionary;
    }

    public BigDecimal getSimulatedSavings() {
        return simulatedSavings;
    }

    public void setSimulatedSavings(BigDecimal simulatedSavings) {
        this.simulatedSavings = simulatedSavings;
    }

    public BigDecimal getSimulatedSavingsRate() {
        return simulatedSavingsRate;
    }

    public void setSimulatedSavingsRate(BigDecimal simulatedSavingsRate) {
        this.simulatedSavingsRate = simulatedSavingsRate;
    }

    public BigDecimal getMonthlySavingsDelta() {
        return monthlySavingsDelta;
    }

    public void setMonthlySavingsDelta(BigDecimal monthlySavingsDelta) {
        this.monthlySavingsDelta = monthlySavingsDelta;
    }

    public BigDecimal getSavingsRateDelta() {
        return savingsRateDelta;
    }

    public void setSavingsRateDelta(BigDecimal savingsRateDelta) {
        this.savingsRateDelta = savingsRateDelta;
    }

    public List<GoalComparisonDto> getGoalComparisons() {
        return goalComparisons;
    }

    public void setGoalComparisons(List<GoalComparisonDto> goalComparisons) {
        this.goalComparisons = goalComparisons;
    }
}
