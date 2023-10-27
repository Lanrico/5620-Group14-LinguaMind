package com.backend.project.Service;

import com.backend.project.model.Schedule;
import com.backend.project.model.UserAccount;
import com.backend.project.repository.ScheduleRepository;
import com.backend.project.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
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

    public Schedule createSchedule(String email, LocalDateTime time, String description, String importance) {
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
    @Transactional
    public void deleteSchedulesForUserByEmail(String email) {
        scheduleRepository.deleteByUser_Email(email);
    }
//    public Schedule createScheduleDirectly(String email, LocalDateTime time, String description, Schedule.Importance importance) {
//        // 确认电子邮件存在于user_account表中
//        if (!userAccountRepository.existsByEmail(email)) {
//            throw new RuntimeException("Error: User not found!");
//        }
//
//        Schedule schedule = new Schedule();
//        UserAccount user = new UserAccount();
//        user.setEmail(email); // 设置email
//        schedule.setUser(user); // 这里只设置了email，其他字段为null或默认值
//        schedule.setTime(time);
//        schedule.setDescription(description);
//        schedule.setImportance(importance);
//
//        return scheduleRepository.save(schedule);
//    }


}
