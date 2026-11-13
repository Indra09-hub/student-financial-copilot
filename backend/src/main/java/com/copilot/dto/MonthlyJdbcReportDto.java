package com.copilot.dto;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

public class MonthlyJdbcReportDto {
    private int year;
    private int month;
    private int totalTransactions;
    private BigDecimal totalSpent;
    private BigDecimal avgExpense;
    private BigDecimal maxExpense;
    private BigDecimal essentialTotal;
    private BigDecimal discretionaryTotal;
    private List<CategoryReportItem> categoryBreakdown = new ArrayList<>();
    private String executedSql;
    private String executionMethod;
    private String driverClass;

    public static class CategoryReportItem {
        private String category;
        private String expenseType;
        private int count;
        private BigDecimal totalAmount;
        private BigDecimal avgAmount;

        public CategoryReportItem() {}

        public CategoryReportItem(String category, String expenseType, int count, BigDecimal totalAmount, BigDecimal avgAmount) {
            this.category = category;
            this.expenseType = expenseType;
            this.count = count;
            this.totalAmount = totalAmount;
            this.avgAmount = avgAmount;
        }

        public String getCategory() {
            return category;
        }

        public void setCategory(String category) {
            this.category = category;
        }

        public String getExpenseType() {
            return expenseType;
        }

        public void setExpenseType(String expenseType) {
            this.expenseType = expenseType;
        }

        public int getCount() {
            return count;
        }

        public void setCount(int count) {
            this.count = count;
        }

        public BigDecimal getTotalAmount() {
            return totalAmount;
        }

        public void setTotalAmount(BigDecimal totalAmount) {
            this.totalAmount = totalAmount;
        }

        public BigDecimal getAvgAmount() {
            return avgAmount;
        }

        public void setAvgAmount(BigDecimal avgAmount) {
            this.avgAmount = avgAmount;
        }
    }

    public MonthlyJdbcReportDto() {}

    public int getYear() {
        return year;
    }

    public void setYear(int year) {
        this.year = year;
    }

    public int getMonth() {
        return month;
    }

    public void setMonth(int month) {
        this.month = month;
    }

    public int getTotalTransactions() {
        return totalTransactions;
    }

    public void setTotalTransactions(int totalTransactions) {
        this.totalTransactions = totalTransactions;
    }

    public BigDecimal getTotalSpent() {
        return totalSpent;
    }

    public void setTotalSpent(BigDecimal totalSpent) {
        this.totalSpent = totalSpent;
    }

    public BigDecimal getAvgExpense() {
        return avgExpense;
    }

    public void setAvgExpense(BigDecimal avgExpense) {
        this.avgExpense = avgExpense;
    }

    public BigDecimal getMaxExpense() {
        return maxExpense;
    }

    public void setMaxExpense(BigDecimal maxExpense) {
        this.maxExpense = maxExpense;
    }

    public BigDecimal getEssentialTotal() {
        return essentialTotal;
    }

    public void setEssentialTotal(BigDecimal essentialTotal) {
        this.essentialTotal = essentialTotal;
    }

    public BigDecimal getDiscretionaryTotal() {
        return discretionaryTotal;
    }

    public void setDiscretionaryTotal(BigDecimal discretionaryTotal) {
        this.discretionaryTotal = discretionaryTotal;
    }

    public List<CategoryReportItem> getCategoryBreakdown() {
        return categoryBreakdown;
    }

    public void setCategoryBreakdown(List<CategoryReportItem> categoryBreakdown) {
        this.categoryBreakdown = categoryBreakdown;
    }

    public String getExecutedSql() {
        return executedSql;
    }

    public void setExecutedSql(String executedSql) {
        this.executedSql = executedSql;
    }

    public String getExecutionMethod() {
        return executionMethod;
    }

    public void setExecutionMethod(String executionMethod) {
        this.executionMethod = executionMethod;
    }

    public String getDriverClass() {
        return driverClass;
    }

    public void setDriverClass(String driverClass) {
        this.driverClass = driverClass;
    }
}
