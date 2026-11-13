package com.copilot.dto;

import java.time.LocalDateTime;

public class AiAdviceResponse {
    private String adviceMarkdown;
    private LocalDateTime generatedAt;
    private String modelUsed;
    private boolean isOfflineFallback;
    private FinancialSummaryResponse verifiedFinancialSnapshot;

    public AiAdviceResponse() {}

    public AiAdviceResponse(String adviceMarkdown, String modelUsed, boolean isOfflineFallback, FinancialSummaryResponse snapshot) {
        this.adviceMarkdown = adviceMarkdown;
        this.generatedAt = LocalDateTime.now();
        this.modelUsed = modelUsed;
        this.isOfflineFallback = isOfflineFallback;
        this.verifiedFinancialSnapshot = snapshot;
    }

    public String getAdviceMarkdown() {
        return adviceMarkdown;
    }

    public void setAdviceMarkdown(String adviceMarkdown) {
        this.adviceMarkdown = adviceMarkdown;
    }

    public LocalDateTime getGeneratedAt() {
        return generatedAt;
    }

    public void setGeneratedAt(LocalDateTime generatedAt) {
        this.generatedAt = generatedAt;
    }

    public String getModelUsed() {
        return modelUsed;
    }

    public void setModelUsed(String modelUsed) {
        this.modelUsed = modelUsed;
    }

    public boolean isOfflineFallback() {
        return isOfflineFallback;
    }

    public void setOfflineFallback(boolean offlineFallback) {
        isOfflineFallback = offlineFallback;
    }

    public FinancialSummaryResponse getVerifiedFinancialSnapshot() {
        return verifiedFinancialSnapshot;
    }

    public void setVerifiedFinancialSnapshot(FinancialSummaryResponse verifiedFinancialSnapshot) {
        this.verifiedFinancialSnapshot = verifiedFinancialSnapshot;
    }
}
