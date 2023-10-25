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
    /**
     * PasswordEncoder: Used for Create user
     * PasswordResetTokenService: Used for Reset Password token
     * EmailService: Used for SendGrid to sent Reset Password link
     * */
    @Autowired
    private PasswordEncoder passwordEncoder;  // 1. Inject the PasswordEncoder
    @Autowired
    private PasswordResetTokenService passwordResetTokenService;  // Changed reference name
    @Autowired
    private EmailService emailService;

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

    public UserAccount updateUser(UserAccount userAccount) {
        if(!userAccountRepository.existsById(userAccount.getUserId())) {
            throw new RuntimeException("Error: User not found!");
        }
        // Encrypt password only if it has been changed
        if(userAccount.getPassword() != null && !userAccount.getPassword().isEmpty()) {
            userAccount.setPassword(passwordEncoder.encode(userAccount.getPassword()));
        }
        return userAccountRepository.save(userAccount);
    }

    public void processForgotPassword(String email) {
        UserAccount user = userAccountRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Error: Email not found!");
        }

        String token = passwordResetTokenService.createPasswordResetToken(user);  // Updated method call
        try {
            emailService.sendPasswordResetEmail(email, token);
        } catch (Exception e) {
            throw new RuntimeException("Error sending email", e);
        }
    }

    public void resetPassword(String token, String newPassword) {
        UserAccount user = passwordResetTokenService.validatePasswordResetToken(token);  // Updated method call
        if (user == null) {
            throw new RuntimeException("Error: Invalid token!");
        }

        user.setPassword(passwordEncoder.encode(newPassword));
        userAccountRepository.save(user);
    }
}
