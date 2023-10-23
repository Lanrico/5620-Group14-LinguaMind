package com.backend.project.controller;

import com.backend.project.model.UserAccount;
import com.backend.project.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/useraccounts")
public class UserAccountController {

    @Autowired
    private UserAccountRepository userAccountRepository;

    @GetMapping("/show")
    public List<UserAccount> getAllUserAccounts() {
        return userAccountRepository.findAll();
    }
}
