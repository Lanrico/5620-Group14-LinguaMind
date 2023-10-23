package com.backend.project.repository;
import com.backend.project.model.AiHistory;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AiHistoryRepository extends JpaRepository<AiHistory, Integer> {
    //... any other custom queries.
}