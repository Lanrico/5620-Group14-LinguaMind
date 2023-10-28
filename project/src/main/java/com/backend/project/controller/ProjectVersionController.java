package com.backend.project.controller;

import com.backend.project.Service.ProjectVersionService;
import com.backend.project.model.ProjectVersion;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@CrossOrigin(origins = "http://localhost:8081")
@RestController
@RequestMapping("/versions")
public class ProjectVersionController {

    @Autowired
    private ProjectVersionService projectVersionService;

    @GetMapping("/showAll")
    public List<ProjectVersion> getAllVersions() {
        return projectVersionService.getAllVersions();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createVersion(@RequestBody ProjectVersion projectVersion) {
        try {
            projectVersionService.createVersion(projectVersion);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Version created successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateVersion(@PathVariable Integer id, @RequestBody ProjectVersion projectVersion) {
        try {
            if(!id.equals(projectVersion.getId())) {
                return ResponseEntity.badRequest().body("ID mismatch");
            }
            projectVersionService.updateVersion(projectVersion);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Version updated successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
