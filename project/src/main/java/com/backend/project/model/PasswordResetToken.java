package com.backend.project.model;

import lombok.Data;
import javax.persistence.*;
import java.util.Date;

@Entity
@Data
@Table(name = "password_reset_token")
public class PasswordResetToken {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String token;

    @OneToOne(targetEntity = UserAccount.class, fetch = FetchType.EAGER)
    @JoinColumn(nullable = false, name = "user_id")
    private UserAccount user;

    @Column(nullable = false)
    private Date expiryDate;
}
