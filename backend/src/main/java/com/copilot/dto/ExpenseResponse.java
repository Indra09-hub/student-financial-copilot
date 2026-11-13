package com.copilot.dto;

import com.copilot.entity.Expense;
import com.copilot.entity.ExpenseType;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalDateTime;

public class ExpenseResponse {
    private Long id;
    private Long userId;
    private String name;
    private BigDecimal amount;
    private String category;
    private ExpenseType expenseType;
    private LocalDate expenseDate;
    private String notes;
    private LocalDateTime createdAt;

    public ExpenseResponse() {}

    public static ExpenseResponse fromEntity(Expense expense) {
        ExpenseResponse res = new ExpenseResponse();
        res.id = expense.getId();
        res.userId = expense.getUser() != null ? expense.getUser().getId() : null;
        res.name = expense.getName();
        res.amount = expense.getAmount();
        res.category = expense.getCategory();
        res.expenseType = expense.getExpenseType();
        res.expenseDate = expense.getExpenseDate();
        res.notes = expense.getNotes();
        res.createdAt = expense.getCreatedAt();
        return res;
    }

    public Long getId() {
        return id;
    }

    public Long getUserId() {
        return userId;
    }

    public String getName() {
        return name;
    }

    public BigDecimal getAmount() {
        return amount;
    }

    public String getCategory() {
        return category;
    }

    public ExpenseType getExpenseType() {
        return expenseType;
    }

    public LocalDate getExpenseDate() {
        return expenseDate;
    }

    public String getNotes() {
        return notes;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}
