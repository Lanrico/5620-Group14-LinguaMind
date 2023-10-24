package com.backend.project.model;
import lombok.Data;
import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "user_account")
public class UserAccount {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "user_id")
    private int userId;
    @Column(unique = true)
    private String username;
    private String password;
    private String firstname;
    private String lastname;
    @Column(unique = true)
    private String email;
    private int phone;
    private Date dob;
}
