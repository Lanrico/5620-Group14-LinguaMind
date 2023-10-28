package com.backend.project.controller;

import com.backend.project.Service.AiHistoryService;
import com.backend.project.model.AiHistory;
import com.backend.project.model.AiHistoryProjection;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/aihistories")
public class AiHistoryController {

    @Autowired
    private AiHistoryService aiHistoryService;

    @GetMapping("/showAll")
    public List<AiHistory> getAllAiHistories() {
        return aiHistoryService.getAllHistories();
    }
    @PostMapping("/create")
    public ResponseEntity<?> createAiHistory(@RequestParam String email, @RequestBody AiHistory aiHistory) {
        try {

            aiHistoryService.createHistory(email, aiHistory.getRoleType(), aiHistory.getRequestContent(), aiHistory.getResponseResult(), new Date(), aiHistory.getAdditionalInfo());
            Map<String, String> response = new HashMap<>();
            response.put("message", "AI History created successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/getquerylist")
    public List<AiHistoryProjection>querylist(){
        return aiHistoryService.getHistorySummary();
    }

    // ... other controller methods as needed...
}
