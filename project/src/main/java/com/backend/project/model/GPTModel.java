package com.backend.project.model;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

public class GPTModel {

    @Data
    public static class Message {
        private String role;   // "system" or "user"
        private String content;
    }

    @Data
    public static class Request {
        private String model = "gpt-3.5-turbo-16k";
        private List<Message> messages;
        private Double temperature = 1.0;
        private Integer max_tokens = 256;
        private Double top_p = 1.0;
        private Double frequency_penalty = 0.0;
        private Double presence_penalty = 0.0;
    }

    @Data
    @JsonIgnoreProperties(ignoreUnknown = true) // 为了安全起见，可以添加此注解以忽略未知的属性
    public static class Response {
        private String id;
        private String object;
        private Long created;
        private String model;
        private List<Choice> choices;
    }

    @Data
    public static class Choice {
        private Integer index;
        private Message message;
        private String finish_reason;
    }

    @Data
    @AllArgsConstructor
    public static class Schedule{
        private LocalDateTime time;
        private String Description;
        private String importance;
    }


}
