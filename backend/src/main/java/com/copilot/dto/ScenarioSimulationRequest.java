package com.copilot.dto;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ScenarioSimulationRequest {
    private BigDecimal simulatedAllowance;
    private BigDecimal discretionaryReductionAmount;
    private BigDecimal discretionaryReductionPercent;
    private Long goalId;
    private LocalDate simulatedTargetDate;
    private BigDecimal simulatedCurrentSavings;

    public ScenarioSimulationRequest() {}

    public BigDecimal getSimulatedAllowance() {
        return simulatedAllowance;
    }

    public void setSimulatedAllowance(BigDecimal simulatedAllowance) {
        this.simulatedAllowance = simulatedAllowance;
    }

    public BigDecimal getDiscretionaryReductionAmount() {
        return discretionaryReductionAmount;
    }

    public void setDiscretionaryReductionAmount(BigDecimal discretionaryReductionAmount) {
        this.discretionaryReductionAmount = discretionaryReductionAmount;
    }

    public BigDecimal getDiscretionaryReductionPercent() {
        return discretionaryReductionPercent;
    }

    public void setDiscretionaryReductionPercent(BigDecimal discretionaryReductionPercent) {
        this.discretionaryReductionPercent = discretionaryReductionPercent;
    }

    public Long getGoalId() {
        return goalId;
    }

    public void setGoalId(Long goalId) {
        this.goalId = goalId;
    }

    public LocalDate getSimulatedTargetDate() {
        return simulatedTargetDate;
    }

    public void setSimulatedTargetDate(LocalDate simulatedTargetDate) {
        this.simulatedTargetDate = simulatedTargetDate;
    }

    public BigDecimal getSimulatedCurrentSavings() {
        return simulatedCurrentSavings;
    }

    public void setSimulatedCurrentSavings(BigDecimal simulatedCurrentSavings) {
        this.simulatedCurrentSavings = simulatedCurrentSavings;
    }
}
