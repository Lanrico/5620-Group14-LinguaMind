package com.backend.project.model;
import javax.persistence.EnumType;
import javax.persistence.Enumerated;
import lombok.Data;
import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "user_account")
public class UserAccount {
    @Id
    private String email;   // 设置email为主键
    @Column(unique = true)
    private String username;
    private String password;
    private String firstname;
    private String lastname;
    private int phone;
    private Date dob;
    @Enumerated(EnumType.STRING)
    @Column(columnDefinition = "ENUM('student', 'teacher')")
    private UserType type;

    public enum UserType {
        student, teacher
    }
}
