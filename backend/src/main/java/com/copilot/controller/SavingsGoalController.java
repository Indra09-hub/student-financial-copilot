package com.copilot.controller;

import com.copilot.dto.ApiResponse;
import com.copilot.dto.SavingsGoalRequest;
import com.copilot.dto.SavingsGoalResponse;
import com.copilot.service.SavingsGoalService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/goals")
public class SavingsGoalController {

    private final SavingsGoalService goalService;

    public SavingsGoalController(SavingsGoalService goalService) {
        this.goalService = goalService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<List<SavingsGoalResponse>>> getGoals(
            @RequestParam(value = "userId", defaultValue = "1") Long userId) {
        List<SavingsGoalResponse> goals = goalService.getGoals(userId);
        return ResponseEntity.ok(ApiResponse.ok("Savings goals retrieved successfully", goals));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ApiResponse<SavingsGoalResponse>> getGoalById(@PathVariable("id") Long id) {
        SavingsGoalResponse goal = goalService.getGoalById(id);
        return ResponseEntity.ok(ApiResponse.ok("Savings goal retrieved successfully", goal));
    }

    @PostMapping
    public ResponseEntity<ApiResponse<SavingsGoalResponse>> createGoal(
            @RequestParam(value = "userId", defaultValue = "1") Long userId,
            @Valid @RequestBody SavingsGoalRequest request) {
        SavingsGoalResponse created = goalService.createGoal(userId, request);
        return ResponseEntity.status(HttpStatus.CREATED).body(ApiResponse.ok("Savings goal created successfully", created));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ApiResponse<SavingsGoalResponse>> updateGoal(
            @PathVariable("id") Long id,
            @Valid @RequestBody SavingsGoalRequest request) {
        SavingsGoalResponse updated = goalService.updateGoal(id, request);
        return ResponseEntity.ok(ApiResponse.ok("Savings goal updated successfully", updated));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ApiResponse<Void>> deleteGoal(@PathVariable("id") Long id) {
        goalService.deleteGoal(id);
        return ResponseEntity.ok(ApiResponse.ok("Savings goal deleted successfully", null));
    }
}
