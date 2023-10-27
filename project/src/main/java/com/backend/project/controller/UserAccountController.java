package com.backend.project.controller;

import com.backend.project.Service.UserAccountService;
import com.backend.project.model.UserAccount;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/users")
public class UserAccountController {
    @Autowired
    private UserAccountService userAccountService;

    @GetMapping("/showAll")
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

    @PutMapping("/update/{email}")
    public ResponseEntity<?> updateUser(@PathVariable String email, @RequestBody UserAccount userAccount) {
        try {
            if(!email.equals(userAccount.getEmail())) {
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
    @GetMapping("/findByEmail/{email}")
    public ResponseEntity<?> findByEmail(@PathVariable String email) {
        try {
            UserAccount user = userAccountService.findByEmail(email);
            if (user == null) {
                return ResponseEntity.notFound().build();
            }
            return ResponseEntity.ok(user);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

}