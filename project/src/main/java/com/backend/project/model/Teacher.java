package com.backend.project.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "teacher")
public class Teacher {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "teacher_id")
    private int teacherId;

    @Column(name = "description")
    private String description;

    @OneToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private UserAccount userAccount;

    // Standard getters and setters...
}
