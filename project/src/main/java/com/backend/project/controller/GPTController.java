package com.backend.project.controller;

import com.backend.project.Service.OpenAIService;
import com.backend.project.model.GPTModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class GPTController {

    @Autowired
    private OpenAIService openAIService;

    @PostMapping("/askGPT")
//    public GPTModel.Response askGPT(@RequestBody GPTModel.Request request) {
//        return openAIService.askGPT(request);
//    }
    public String askGPT(@RequestBody String question) {
        return openAIService.askGPT(question);
    }

}
