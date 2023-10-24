package com.backend.project.repository;

import com.backend.project.model.GPTModel;
import com.backend.project.model.GPTRequestBody;
import com.backend.project.model.LanguageEnum;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.client.RestTemplate;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Slf4j
@Repository
public class GPTRepository {

    @Value("${openai.apikey}")
    private String apiKey;

    private static final String ENDPOINT_URL = "https://api.openai.com/v1/chat/completions";  // Updated endpoint URL

    public GPTModel.Response callGPT(GPTRequestBody gptRequestBody) {
        RestTemplate restTemplate = new RestTemplate();

        // Predefined prompt as the system role
        GPTModel.Message systemMessage = new GPTModel.Message();

        systemMessage.setRole("system");
        String language_choice=gptRequestBody.getChoice();

        for(LanguageEnum languageEnum:LanguageEnum.values()){
            if(languageEnum.getLanguage().equals(language_choice)){
                systemMessage.setContent("You now act as an online assistant for students article transcription, please translate the message to "+language_choice+".");
            }
        }

        if(gptRequestBody.getChoice().equals("schedule")){
            systemMessage.setContent("You now act as an online assistant for schedule management, please transfer the message below to a schedule management timetable");
        }

        if(gptRequestBody.getChoice().equals("resume")){
            systemMessage.setContent("You now act as an online assistant for personal resume generation, please generate a resume based on the message below, no less than 500 words");
        }

        if(gptRequestBody.getChoice().equals("emotion master")){
            systemMessage.setContent("You now act as an online emotion master for helping people with emotional problems. My girlfriend send me the message to me and she seems very angry, our love story may come to an end. Please help me to response to her message with the tone of lickspittle and minimize the possibility of emotional breakdown ");
        }
        /*
        if(gptRequestBody.getChoice().equals("1")){
            systemMessage.setContent("You now act as an online assistant for students article transcription, please translate the message to Simplified Chinese.");
        } else if (gptRequestBody.getChoice().equals("2")) {
            systemMessage.setContent("You now act as an online assistant for students article transcription, please translate the message to English");
        }
        else if (gptRequestBody.getChoice().equals("3")) {
            systemMessage.setContent("You now act as an online assistant for students article transcription, please translate the message to Japanese");
        }
        else {
            systemMessage.setContent("You now act as an online assistant for students and teachers, " +
                    "responsible for helping them translate articles, polish articles, format class schedules, " +
                    "generate articles based on keywords, and evaluate students.");
        }

    */
        // User's question
        GPTModel.Message userMessage = new GPTModel.Message();
        userMessage.setRole("user");
        userMessage.setContent(gptRequestBody.getMessage());

        // Create messages list
        List<GPTModel.Message> messages = new ArrayList<>();
        messages.add(systemMessage);
        messages.add(userMessage);

        GPTModel.Request request = new GPTModel.Request();
        request.setMessages(messages);

        HttpHeaders headers = new HttpHeaders();
        headers.setBearerAuth(apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<GPTModel.Request> entity = new HttpEntity<>(request, headers);
        System.out.println(entity);

        ResponseEntity<String> rawResponse = restTemplate.postForEntity(ENDPOINT_URL, entity, String.class);

        // 记录完整的 JSON 响应
        log.info("Full JSON response from OpenAI API: {}", rawResponse.getBody());

        // 解析响应
        GPTModel.Response response = null;
        if (rawResponse.getBody() != null) {
            try {
                response = new ObjectMapper().readValue(rawResponse.getBody(), GPTModel.Response.class);
            } catch (Exception e) {
                log.error("Error parsing response from OpenAI API", e);
            }
        }

        return response;
    }
}
