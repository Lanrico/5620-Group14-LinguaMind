package com.backend.project.Service;

import com.backend.project.model.Schedule;
import com.backend.project.model.UserAccount;
import com.backend.project.repository.ScheduleRepository;
import com.backend.project.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ScheduleService {
    @Autowired
    private ScheduleRepository scheduleRepository;

    @Autowired
    private UserAccountRepository userAccountRepository;

    public List<Schedule> getAllSchedules() {
        return scheduleRepository.findAll();
    }

    public Schedule createSchedule(Schedule schedule) {
        // ...validation and save logic here...
        return scheduleRepository.save(schedule);
    }

    public List<Schedule> getSchedulesForUser(String email) {
        UserAccount user = userAccountRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Error: User not found!");
        }
        return scheduleRepository.findByUser_Email(email);
    }

    // ... other service methods...
}
