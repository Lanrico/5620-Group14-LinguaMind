package com.backend.project.controller;

import com.backend.project.model.Teacher;
import com.backend.project.repository.TeacherRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/teachers")
public class TeacherController {

    @Autowired
    private TeacherRepository teacherRepository;

    @GetMapping("/show")
    public List<Teacher> getAllTeachers() {
        return teacherRepository.findAll();
    }
}
