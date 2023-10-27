package com.backend.project.repository;

import com.backend.project.model.ProjectVersion;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectVersionRepository extends JpaRepository<ProjectVersion, Integer> {
}
