package com.backend.project.controller;

import com.backend.project.Service.UserAccountService;
import com.backend.project.model.UserAccount;
import com.backend.project.repository.UserAccountRepository;
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

}
