package com.backend.project.repository;


import com.backend.project.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {
    UserAccount findByUsername(String username);
    boolean existsByUsername(String username);
    boolean existsByEmail(String email);
}

