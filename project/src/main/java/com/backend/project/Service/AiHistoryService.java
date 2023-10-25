package com.backend.project.Service;

import com.backend.project.model.AiHistory;
import com.backend.project.repository.AiHistoryRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AiHistoryService {

    @Autowired
    private AiHistoryRepository aiHistoryRepository;

    public List<AiHistory> getAllHistories() {
        return aiHistoryRepository.findAll();
    }

    public AiHistory createHistory(AiHistory aiHistory) {
        return aiHistoryRepository.save(aiHistory);
    }

    // ... other service methods as needed...
}
