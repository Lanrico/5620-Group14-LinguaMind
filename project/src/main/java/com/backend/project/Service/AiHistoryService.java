package com.backend.project.Service;

import com.backend.project.model.AiHistory;
import com.backend.project.model.AiHistoryProjection;
import com.backend.project.model.UserAccount;
import com.backend.project.repository.AiHistoryRepository;
import com.backend.project.repository.UserAccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.List;

@Service
public class AiHistoryService {
    @Autowired
    private UserAccountRepository userAccountRepository; // 需要此repository来检索用户
    @Autowired
    private AiHistoryRepository aiHistoryRepository;

    public List<AiHistory> getAllHistories() {
        return aiHistoryRepository.findAll();
    }



    public AiHistory createHistory(String email, AiHistory.RoleType roleType, String requestContent, String responseResult, Date generateDate, String additionalInfo) {
        // Find the user associated with the given email
        UserAccount user = userAccountRepository.findByEmail(email);
        if (user == null) {
            throw new RuntimeException("Error: User not found!");
        }

        // Create the new AI history
        AiHistory aiHistory = new AiHistory();
        aiHistory.setUserAccount(user);
        aiHistory.setRoleType(roleType);
        aiHistory.setRequestContent(requestContent);
        aiHistory.setResponseResult(responseResult);
        aiHistory.setGenerateDate(generateDate);
        aiHistory.setAdditionalInfo(additionalInfo);

        // Save the AI history to the database
        return aiHistoryRepository.save(aiHistory);
    }

    public List<AiHistoryProjection> getHistorySummary() {
        return aiHistoryRepository.querylist();
    }
}
