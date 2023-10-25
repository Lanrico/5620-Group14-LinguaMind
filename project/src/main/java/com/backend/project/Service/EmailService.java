package com.backend.project.Service;

import com.sendgrid.*;
import com.sendgrid.helpers.mail.Mail;
import com.sendgrid.helpers.mail.objects.Content;
import com.sendgrid.helpers.mail.objects.Email;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
public class EmailService {

    @Value("${sendgrid.api.key}")
    private String sendGridAPIKey;

    public void sendPasswordResetEmail(String toEmail, String token) throws Exception {
        Email from = new Email("zhengbill7@gmail.com"); // Replace with your sender email
        String subject = "Password Reset Request";
        Email to = new Email(toEmail);
        Content content = new Content("text/plain",
                "To reset your password, click the link below:\n" +
                        "http://yourfrontendapp.com/reset-password?token=" + token);
        Mail mail = new Mail(from, subject, to, content);

        SendGrid sendGrid = new SendGrid(sendGridAPIKey);
        Request request = new Request();

        try {
            request.setMethod(Method.POST);
            request.setEndpoint("mail/send");
            request.setBody(mail.build());
            Response response = sendGrid.api(request);
            // You can also log the response, status codes, and any other info you need
        } catch (IOException e) {
            throw new Exception("Error sending email", e);
        }
    }
}

