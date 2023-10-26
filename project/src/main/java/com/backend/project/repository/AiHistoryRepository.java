package com.backend.project.repository;
import com.backend.project.model.AiHistory;
import com.backend.project.model.Schedule;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AiHistoryRepository extends JpaRepository<AiHistory, Integer> {
    //... any other custom queries.
    AiHistory save(AiHistory aiHistory);
}