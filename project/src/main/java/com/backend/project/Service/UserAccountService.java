package com.backend.project.Service;

import com.backend.project.model.UserAccount;
import com.backend.project.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class UserAccountService {
    @Autowired
    private UserAccountRepository userAccountRepository;

    public List<UserAccount> getAllUserAccounts() {
        return userAccountRepository.findAll();
    }

    public UserAccount createUser(UserAccount userAccount) {
        if(userAccountRepository.existsByUsername(userAccount.getUsername())) {
            throw new RuntimeException("Error: Username is already taken!");
        }

        if(userAccountRepository.existsByEmail(userAccount.getEmail())) {
            throw new RuntimeException("Error: Email is already in use!");
        }

        return userAccountRepository.save(userAccount);
    }

    public UserAccount updateUser(UserAccount userAccount) {
        if(!userAccountRepository.existsByEmail(userAccount.getEmail())) {
            throw new RuntimeException("Error: User not found!");
        }

        return userAccountRepository.save(userAccount);
    }
    public UserAccount findByEmail(String email) {
        return userAccountRepository.findByEmail(email);
    }
    public UserAccount.UserType getTypeByEmail(String email) {
        UserAccount user = userAccountRepository.findByEmail(email);
        if(user == null) {
            throw new RuntimeException("Error: User not found!");
        }
        return user.getType();
    }
}