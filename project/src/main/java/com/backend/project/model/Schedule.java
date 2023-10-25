package com.backend.project.model;

import lombok.Data;
import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "schedule")
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email")
    private UserAccount user;

    @Column(name = "time")
    private Date time;

    private String description;

    @Enumerated(EnumType.STRING)
    private Importance importance;

    public enum Importance {
        LOW, MEDIUM_LOW, MEDIUM, MEDIUM_HIGH, HIGH
    }
}


