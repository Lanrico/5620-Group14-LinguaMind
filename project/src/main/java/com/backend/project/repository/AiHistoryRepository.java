package com.backend.project.repository;
import com.backend.project.model.AiHistory;
import com.backend.project.model.AiHistoryProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AiHistoryRepository extends JpaRepository<AiHistory, Integer> {
    //... any other custom queries.
    AiHistory save(AiHistory aiHistory);

    @Query(value = "SELECT DATE(generate_date) AS day, COUNT(*) AS totalRecords, role_type AS roleType " +
            "FROM ai_history " +
            "GROUP BY DATE(generate_date), role_type " +
            "ORDER BY day DESC", nativeQuery = true)
    List<AiHistoryProjection> querylist();
}