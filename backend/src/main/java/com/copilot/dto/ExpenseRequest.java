package com.copilot.dto;

import com.copilot.entity.ExpenseType;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.time.LocalDate;

public class ExpenseRequest {

    @NotBlank(message = "Expense name is required")
    @Size(max = 150, message = "Expense name cannot exceed 150 characters")
    private String name;

    @NotNull(message = "Amount is required")
    @DecimalMin(value = "0.01", message = "Expense amount must be greater than zero")
    private BigDecimal amount;

    @NotBlank(message = "Category is required")
    @Size(max = 50, message = "Category cannot exceed 50 characters")
    private String category;

    @NotNull(message = "Expense type is required (essential or discretionary)")
    private ExpenseType expenseType = ExpenseType.DISCRETIONARY;

    @NotNull(message = "Expense date is required")
    private LocalDate expenseDate;

    private String notes;

    public ExpenseRequest() {}

    public ExpenseRequest(String name, BigDecimal amount, String category, ExpenseType expenseType, LocalDate expenseDate, String notes) {
        this.name = name;
        this.amount = amount;
        this.category = category;
        this.expenseType = expenseType;
        this.expenseDate = expenseDate;
        this.notes = notes;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public void setAmount(BigDecimal amount) {
        this.amount = amount;
    }

    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }

    public ExpenseType getExpenseType() {
        return expenseType;
    }

    public void setExpenseType(ExpenseType expenseType) {
        this.expenseType = expenseType;
    }

    public LocalDate getExpenseDate() {
        return expenseDate;
    }

    public void setExpenseDate(LocalDate expenseDate) {
        this.expenseDate = expenseDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
}
