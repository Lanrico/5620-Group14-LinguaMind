package com.backend.project.model;
import javax.persistence.criteria.CriteriaBuilder;
import java.sql.Date;
import java.time.LocalDateTime;

public interface AiHistoryProjection {

    Date getDay();
    Integer getTotalRecords();
    AiHistory.RoleType getRoleType();
}

