package com.copilot.controller;

import com.copilot.dto.FinancialSummaryResponse;
import com.copilot.service.FinancialCalculationService;
import com.copilot.service.UserService;
import com.copilot.repository.ExpenseRepository;
import com.copilot.repository.SavingsGoalRepository;
import com.copilot.entity.User;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.math.BigDecimal;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
@DisplayName("Financial API Endpoints Web Layer Tests")
class FinancialApiControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    @DisplayName("GET /api/summary should return HTTP 200 with structured JSON response")
    void testGetSummaryEndpoint() throws Exception {
        mockMvc.perform(get("/api/summary?userId=1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.monthlyAllowance").isNumber())
                .andExpect(jsonPath("$.data.totalExpenses").isNumber());
    }

    @Test
    @DisplayName("GET /api/expenses should return list of recorded transactions")
    void testGetExpensesEndpoint() throws Exception {
        mockMvc.perform(get("/api/expenses?userId=1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data").isArray());
    }

    @Test
    @DisplayName("POST /api/expenses should reject invalid empty names and negative amounts with 400 Bad Request")
    void testExpenseValidationRejections() throws Exception {
        String invalidPayload = """
            {
                "name": "",
                "amount": -50.00,
                "category": "",
                "expenseType": "essential",
                "expenseDate": "2026-10-14"
            }
            """;

        mockMvc.perform(post("/api/expenses?userId=1")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(invalidPayload))
                .andExpect(status().isBadRequest())
                .andExpect(jsonPath("$.success").value(false))
                .andExpect(jsonPath("$.error").value("Validation Error"));
    }

    @Test
    @DisplayName("GET /api/reports/jdbc/monthly should return Direct JDBC report")
    void testJdbcReportEndpoint() throws Exception {
        mockMvc.perform(get("/api/reports/jdbc/monthly?userId=1"))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.success").value(true))
                .andExpect(jsonPath("$.data.executionMethod").value(
                        "Direct JDBC via java.sql.DriverManager, PreparedStatement, and ResultSet"));
    }
}
