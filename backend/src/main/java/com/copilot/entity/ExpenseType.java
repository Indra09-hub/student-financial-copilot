package com.copilot.entity;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

/**
 * Classification of expenses into Essential (non-negotiable survival/study costs)
 * and Discretionary (lifestyle/leisure costs that can be reduced or optimized).
 */
public enum ExpenseType {
    ESSENTIAL("essential"),
    DISCRETIONARY("discretionary");

    private final String value;

    ExpenseType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static ExpenseType fromValue(String value) {
        if (value == null) {
            return DISCRETIONARY;
        }
        for (ExpenseType type : values()) {
            if (type.value.equalsIgnoreCase(value.trim()) || type.name().equalsIgnoreCase(value.trim())) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown expense type: " + value + ". Must be 'essential' or 'discretionary'.");
    }
}
