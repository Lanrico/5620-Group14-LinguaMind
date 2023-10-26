package com.backend.project.repository;

import com.backend.project.model.Schedule;
import com.backend.project.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ScheduleRepository extends JpaRepository<Schedule, Integer> {
    List<Schedule> findByUser_Email(String email);


}

