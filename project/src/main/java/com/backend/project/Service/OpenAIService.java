package com.backend.project.Service;

import com.backend.project.model.GPTModel;
import com.backend.project.repository.GPTRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
@Service
@Slf4j
public class OpenAIService {
    @Autowired
    private GPTRepository gptRepository;

    public String askGPT(String question) {
        // 假设每次请求中只有一个用户消息
        //String userQuestion = frontendRequest.getMessages().get(frontendRequest.getMessages().size() - 1).getContent();
        return gptRepository.callGPT(question).getChoices().get(0).getMessage().getContent();
    }
}


