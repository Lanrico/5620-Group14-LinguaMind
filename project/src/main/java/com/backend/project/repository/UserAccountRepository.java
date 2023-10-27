package com.backend.project.repository;

import com.backend.project.model.UserAccount;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserAccountRepository extends JpaRepository<UserAccount, Integer> {
    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
    UserAccount findByEmail(String email);
}
