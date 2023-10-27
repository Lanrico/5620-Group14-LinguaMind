package com.backend.project.model;

import lombok.Data;
import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "project_version")
public class ProjectVersion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    @Column(name = "update_field", length = 500)
    private String updateField;

    @Column(length = 500)
    private String repair;

    @Column(length = 50)
    private String version;

    @Column(name = "update_timestamp")
    private Date updateTimestamp;
}
