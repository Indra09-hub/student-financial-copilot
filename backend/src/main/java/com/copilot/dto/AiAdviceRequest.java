package com.copilot.dto;

import java.math.BigDecimal;

public class AiAdviceRequest {
    private String customQuestion;
    private Long targetGoalId;
    private BigDecimal simulatedDiscretionaryReduction;

    public AiAdviceRequest() {}

    public String getCustomQuestion() {
        return customQuestion;
    }

    public void setCustomQuestion(String customQuestion) {
        this.customQuestion = customQuestion;
    }

    public Long getTargetGoalId() {
        return targetGoalId;
    }

    public void setTargetGoalId(Long targetGoalId) {
        this.targetGoalId = targetGoalId;
    }

    public BigDecimal getSimulatedDiscretionaryReduction() {
        return simulatedDiscretionaryReduction;
    }

    public void setSimulatedDiscretionaryReduction(BigDecimal simulatedDiscretionaryReduction) {
        this.simulatedDiscretionaryReduction = simulatedDiscretionaryReduction;
    }
}
