package com.backend.project.controller;

import com.backend.project.model.Student;
import com.backend.project.repository.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/student")
public class StudentController {
    @Autowired
    private StudentRepository studentRepository;
    @GetMapping("/showAll")
    public List<Student> getAllStudents() {
        return studentRepository.findAll();
    }
}
