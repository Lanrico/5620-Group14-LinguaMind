package com.backend.project.controller;

import com.backend.project.Service.OpenAIService;
import com.backend.project.model.GPTModel;
import com.backend.project.model.GPTRequestBody;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@Slf4j
@CrossOrigin(origins = "http://localhost:8081")
@RestController
public class GPTController {
    @Autowired
    private OpenAIService openAIService;

    @PostMapping("/askGPT")
//    public GPTModel.Response askGPT(@RequestBody GPTModel.Request request) {
//        return openAIService.askGPT(request);
//    }
    public Object askGPT(@RequestParam String email, @RequestBody GPTRequestBody gptRequestBody) {

        System.out.println(gptRequestBody.getChoice());
        System.out.println(gptRequestBody.getMessage());
        return openAIService.askGPT(email,gptRequestBody);
    }

}
