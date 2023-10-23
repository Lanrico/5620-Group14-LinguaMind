package com.backend.project.repository;
import com.backend.project.model.Teacher;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeacherRepository extends JpaRepository<Teacher, Integer> {
    //... any other custom queries.
}
