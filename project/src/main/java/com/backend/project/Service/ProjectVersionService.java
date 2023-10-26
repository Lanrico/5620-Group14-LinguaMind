package com.backend.project.Service;

import com.backend.project.model.ProjectVersion;
import com.backend.project.repository.ProjectVersionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProjectVersionService {

    @Autowired
    private ProjectVersionRepository projectVersionRepository;

    public List<ProjectVersion> getAllVersions() {
        return projectVersionRepository.findAll();
    }

    public ProjectVersion createVersion(ProjectVersion projectVersion) {
        return projectVersionRepository.save(projectVersion);
    }

    public ProjectVersion updateVersion(ProjectVersion projectVersion) {
        if(projectVersion.getId() == 0 || !projectVersionRepository.existsById(projectVersion.getId())) {
            throw new RuntimeException("Error: Version not found!");
        }
        return projectVersionRepository.save(projectVersion);
    }
}
