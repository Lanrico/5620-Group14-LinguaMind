package com.backend.project.model;

import lombok.Data;

import javax.persistence.*;

@Entity
@Data
@Table(name = "student")
public class Student {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "student_id")
    private int studentId;

    @Column(name = "description")
    private String description;

    @OneToOne
    @JoinColumn(name = "email", referencedColumnName = "email")
    private UserAccount userAccount;

    // Standard getters and setters...
}