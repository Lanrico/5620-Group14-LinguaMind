package com.backend.project.Service;

import com.backend.project.model.Schedule;
import com.backend.project.model.UserAccount;
import com.backend.project.repository.ScheduleRepository;
import com.backend.project.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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

    public Schedule createSchedule(String email, LocalDateTime time, String description, Schedule.Importance importance) {
        // Find the user associated with the given email
        UserAccount user = userAccountRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Error: User not found!");
        }

        // Create the new schedule
        Schedule schedule = new Schedule();
        schedule.setUser(user);
        schedule.setTime(time);
        schedule.setDescription(description);
        schedule.setImportance(importance);

        // Save the schedule to the database
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
