package com.backend.project.repository;

import com.backend.project.Service.AiHistoryService;
import com.backend.project.Service.ScheduleService;
import com.backend.project.model.*;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.extern.slf4j.Slf4j;
import org.apache.catalina.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Repository;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Slf4j
@Repository
public class GPTRepository {
    @Autowired
    private AiHistoryService aiHistoryService;
    @Autowired
    private ScheduleService scheduleService;
    @Autowired
    private UserAccountRepository userAccountRepository;
    private String apiKey = "";

    private static final String ENDPOINT_URL = "https://api.openai.com/v1/chat/completions";  // Updated endpoint URL


    public Object callGPT(String email, GPTRequestBody gptRequestBody) {
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

        if(gptRequestBody.getChoice().equals("SCHEDULE_GENERATOR")){
            systemMessage.setContent("You now act as an online assistant for schedule management, " +
                    "please transfer the message below to a schedule management timetable with a format like this:" +
                    "|time|description|importance, the time should have formatt : yyyy-mm-ddThh:mm " +
                    "you should evaluate the importance of each task and give it high or low or medium importance\n" +
                    "and sort it by time ascend\n" +
                    "do not output any other text");
        }

        if(gptRequestBody.getChoice().equals("RESUME_GENERATOR")){
            systemMessage.setContent("You now act as an online assistant for personal resume generation, " +
                    "please generate a resume based on the message below, no less than 500 words");
        }

        if(gptRequestBody.getChoice().equals("EMOTION_MASTER")){
            systemMessage.setContent("You now act as an online emotion master for helping people with emotional problems. " +
                    "My girlfriend send me the message to me and she seems very angry, our love story may come to an end. " +
                    "Please help me to response to her message with the tone of lickspittle and minimize the possibility of emotional breakdown ");
        }

        if(gptRequestBody.getChoice().equals("EMAIL_GENERATOR")){
            systemMessage.setContent("You now act as an online email generator for helping people with writing email, " +
                    "I am a teacher, please generate the email with formal style based on the message below.");
        }

        if(gptRequestBody.getChoice().equals("ARTICLE_POLISH")){
            systemMessage.setContent("You now act as an online assistant for students and teachers to polish their sentences and articles, " +
                    "please send the polished sentences or articles to user, and do not send any other messages that are not related with sentences or articles." );
        }

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


        AiHistory aiHistory = new AiHistory();
        aiHistory.setRequestContent(gptRequestBody.getMessage());
        aiHistory.setAdditionalInfo(gptRequestBody.getChoice());
        aiHistory.setUserAccount(userAccountRepository.findByEmail(email));
        aiHistory.setResponseResult(response.getChoices().get(0).getMessage().getContent());
        aiHistory.setGenerateDate(new Date());
        aiHistory.setRoleType(AiHistory.RoleType.valueOf(gptRequestBody.getChoice()));
        aiHistoryService.createHistory(email,aiHistory.getRoleType(),
                aiHistory.getRequestContent(), aiHistory.getResponseResult(),
                aiHistory.getGenerateDate(),aiHistory.getAdditionalInfo());

        if(gptRequestBody.getChoice().equals("SCHEDULE_GENERATOR")){
            scheduleService.deleteSchedulesForUserByEmail(email);
            String data = response.getChoices().get(0).getMessage().getContent();
            List<GPTModel.Schedule> schedules = new ArrayList<>();

            String[] rows = data.split("\n");
            for (int i = 1; i < rows.length; i++) { // start from 1 to skip header row
                String[] columns = rows[i].split("\\|");
                LocalDateTime time = LocalDateTime.parse(columns[1]);
                String description = columns[2];
                System.out.println(description);
                String importance = columns[3];
                schedules.add(new GPTModel.Schedule(time, description, importance));
                scheduleService.createSchedule(email,time,description, importance);
            }
            System.out.println(schedules);
            return schedules;

        }

        return response.getChoices().get(0).getMessage().getContent();
    }
}
