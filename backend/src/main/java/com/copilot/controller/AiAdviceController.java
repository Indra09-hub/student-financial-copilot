package com.copilot.controller;

import com.copilot.ai.AiCopilotService;
import com.copilot.dto.AiAdviceRequest;
import com.copilot.dto.AiAdviceResponse;
import com.copilot.dto.ApiResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/ai")
public class AiAdviceController {

    private final AiCopilotService aiCopilotService;

    public AiAdviceController(AiCopilotService aiCopilotService) {
        this.aiCopilotService = aiCopilotService;
    }

    @PostMapping("/advice")
    public ResponseEntity<ApiResponse<AiAdviceResponse>> getFinancialAdvice(
            @RequestParam(value = "userId", defaultValue = "1") Long userId,
            @RequestBody(required = false) AiAdviceRequest request) {

        AiAdviceRequest effectiveRequest = request != null ? request : new AiAdviceRequest();
        AiAdviceResponse response = aiCopilotService.getFinancialAdvice(userId, effectiveRequest);
        return ResponseEntity.ok(ApiResponse.ok("AI financial advice generated successfully", response));
    }
}
