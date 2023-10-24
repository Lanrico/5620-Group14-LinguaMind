package com.backend.project.Service;

import com.backend.project.model.UserAccount;
import com.backend.project.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAccountService {

    @Autowired
    private UserAccountRepository userAccountRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;  // 1. Inject the PasswordEncoder

    public List<UserAccount> getAllUserAccounts() {
        return userAccountRepository.findAll();
    }

    public UserAccount createUser(UserAccount userAccount) {
        // Add your validation and save logic here
        if(userAccountRepository.existsByUsername(userAccount.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }

        if(userAccountRepository.existsByEmail(userAccount.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        // 2. Encrypt the password before saving
        userAccount.setPassword(passwordEncoder.encode(userAccount.getPassword()));

        return userAccountRepository.save(userAccount);
    }
}
