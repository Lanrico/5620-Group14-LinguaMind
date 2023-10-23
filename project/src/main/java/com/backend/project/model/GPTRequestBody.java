package com.backend.project.model;


public class GPTRequestBody {
    private String message;

    private String choice;

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public String getChoice() {
        return choice;
    }

    public void setChoice(String choice) {
        this.choice = choice;
    }

    @Override
    public String toString() {
        return "GPTRequestBody{" +
                "message='" + message + '\'' +
                ", choice='" + choice + '\'' +
                '}';
    }
}
