package com.backend.project.controller;

import com.backend.project.Service.UserAccountService;
import com.backend.project.model.UserAccount;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/user")
public class UserAccountController {

    @Autowired
    private UserAccountService userAccountService;

    @GetMapping("/show")
    public List<UserAccount> getAllUserAccounts() {
        return userAccountService.getAllUserAccounts();
    }

    @PostMapping("/create")
    public ResponseEntity<?> createUser(@RequestBody UserAccount userAccount) {
        try {
            userAccountService.createUser(userAccount);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User created successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Integer id, @RequestBody UserAccount userAccount) {
        try {
            if(!id.equals(userAccount.getUserId())) {
                return ResponseEntity.badRequest().body("ID mismatch");
            }
            userAccountService.updateUser(userAccount);
            Map<String, String> response = new HashMap<>();
            response.put("message", "User updated successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
    @PostMapping("/forgot-password")
    public ResponseEntity<?> processForgotPassword(@RequestParam("email") String email) {
        try {
            userAccountService.processForgotPassword(email);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Password reset link sent successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestParam("token") String token,
                                           @RequestParam("newPassword") String newPassword) {
        try {
            userAccountService.resetPassword(token, newPassword);
            Map<String, String> response = new HashMap<>();
            response.put("message", "Password reset successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
