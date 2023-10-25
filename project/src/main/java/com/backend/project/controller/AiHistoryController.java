package com.backend.project.controller;

import com.backend.project.Service.AiHistoryService;
import com.backend.project.model.AiHistory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/aihistories")
public class AiHistoryController {

    @Autowired
    private AiHistoryService aiHistoryService;

    @GetMapping("/showAll")
    public List<AiHistory> getAllAiHistories() {
        return aiHistoryService.getAllHistories();
    }

    // ... other controller methods as needed...
}
