package com.copilot.controller;

import com.copilot.dto.ApiResponse;
import com.copilot.dto.FinancialSummaryResponse;
import com.copilot.entity.Expense;
import com.copilot.entity.SavingsGoal;
import com.copilot.entity.User;
import com.copilot.repository.ExpenseRepository;
import com.copilot.repository.SavingsGoalRepository;
import com.copilot.service.FinancialCalculationService;
import com.copilot.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/summary")
public class FinancialSummaryController {

    private final UserService userService;
    private final ExpenseRepository expenseRepository;
    private final SavingsGoalRepository goalRepository;
    private final FinancialCalculationService calculationService;

    public FinancialSummaryController(UserService userService,
                                      ExpenseRepository expenseRepository,
                                      SavingsGoalRepository goalRepository,
                                      FinancialCalculationService calculationService) {
        this.userService = userService;
        this.expenseRepository = expenseRepository;
        this.goalRepository = goalRepository;
        this.calculationService = calculationService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<FinancialSummaryResponse>> getFinancialSummary(
            @RequestParam(value = "userId", defaultValue = "1") Long userId) {
        User user = userService.getUserById(userId);
        List<Expense> expenses = expenseRepository.findByUserIdOrderByExpenseDateDesc(userId);
        List<SavingsGoal> goals = goalRepository.findByUserIdOrderByTargetDateAsc(userId);

        FinancialSummaryResponse summary = calculationService.calculateSummary(user, expenses, goals);
        return ResponseEntity.ok(ApiResponse.ok("Financial summary calculated successfully", summary));
    }
}
