package com.copilot.controller;

import com.copilot.dto.AllowanceUpdateRequest;
import com.copilot.dto.ApiResponse;
import com.copilot.entity.User;
import com.copilot.service.UserService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/allowance")
public class AllowanceController {

    private final UserService userService;

    public AllowanceController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    public ResponseEntity<ApiResponse<User>> getAllowance(@RequestParam(value = "userId", defaultValue = "1") Long userId) {
        User user = userService.getUserById(userId);
        return ResponseEntity.ok(ApiResponse.ok("Allowance retrieved successfully", user));
    }

    @PutMapping
    public ResponseEntity<ApiResponse<User>> updateAllowance(
            @RequestParam(value = "userId", defaultValue = "1") Long userId,
            @Valid @RequestBody AllowanceUpdateRequest request) {
        User updated = userService.updateMonthlyAllowance(userId, request);
        return ResponseEntity.ok(ApiResponse.ok("Monthly allowance updated successfully", updated));
    }
}
