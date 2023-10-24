package com.backend.project.controller;

import com.backend.project.model.AiHistory;
import com.backend.project.repository.AiHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/aihistories")
public class AiHistoryController {

    @Autowired
    private AiHistoryRepository aiHistoryRepository;

    @GetMapping("/show")
    public List<AiHistory> getAllAiHistories() {
        return aiHistoryRepository.findAll();
    }
}
