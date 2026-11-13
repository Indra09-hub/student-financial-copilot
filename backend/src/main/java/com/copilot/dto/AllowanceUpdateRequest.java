package com.copilot.dto;

import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotNull;
import java.math.BigDecimal;

public class AllowanceUpdateRequest {

    @NotNull(message = "Monthly allowance cannot be null")
    @DecimalMin(value = "0.00", message = "Monthly allowance cannot be negative")
    private BigDecimal monthlyAllowance;

    public AllowanceUpdateRequest() {}

    public AllowanceUpdateRequest(BigDecimal monthlyAllowance) {
        this.monthlyAllowance = monthlyAllowance;
    }

    public BigDecimal getMonthlyAllowance() {
        return monthlyAllowance;
    }

    public void setMonthlyAllowance(BigDecimal monthlyAllowance) {
        this.monthlyAllowance = monthlyAllowance;
    }
}
