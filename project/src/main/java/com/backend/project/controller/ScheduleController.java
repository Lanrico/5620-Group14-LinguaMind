package com.backend.project.controller;

import com.backend.project.Service.ScheduleService;
import com.backend.project.model.Schedule;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/schedule")
public class ScheduleController {

    @Autowired
    private ScheduleService scheduleService;

    @GetMapping("/showAll")
    public List<Schedule> getAllSchedules() {
        return scheduleService.getAllSchedules();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createSchedule(@RequestBody Schedule schedule) {
        try {
            scheduleService.createSchedule(schedule);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Schedule created successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @GetMapping("/user/{email}")
    public ResponseEntity<?> getSchedulesForUser(@PathVariable String email) {
        try {
            List<Schedule> schedules = scheduleService.getSchedulesForUser(email);
            return ResponseEntity.ok(schedules);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // ... other controller methods...
}
