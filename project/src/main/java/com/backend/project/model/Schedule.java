package com.backend.project.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Data
@Table(name = "schedule")
@AllArgsConstructor
public class Schedule {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "email")
    private UserAccount user;

    @Column(name = "time")
    private LocalDateTime time;

    private String description;

    @Enumerated(EnumType.STRING)
    private Importance importance;

    public enum Importance {
        LOW, MEDIUM_LOW, MEDIUM, MEDIUM_HIGH, HIGH
    }
}


