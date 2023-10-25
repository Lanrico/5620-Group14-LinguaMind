package com.backend.project.Service;

import com.backend.project.model.PasswordResetToken;
import com.backend.project.model.UserAccount;
import com.backend.project.repository.PasswordResetTokenRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Calendar;
import java.util.Date;
import java.util.UUID;

@Service
public class PasswordResetTokenService {

    @Autowired
    private PasswordResetTokenRepository tokenRepository;

    public String createPasswordResetToken(UserAccount user) {
        PasswordResetToken resetToken = new PasswordResetToken();
        resetToken.setToken(UUID.randomUUID().toString());
        resetToken.setUser(user);
        resetToken.setExpiryDate(calculateExpiryDate());
        tokenRepository.save(resetToken);
        return resetToken.getToken();
    }

    public UserAccount validatePasswordResetToken(String token) {
        PasswordResetToken passToken = tokenRepository.findByToken(token);
        if (passToken == null || isTokenExpired(passToken)) {
            return null;
        }
        return passToken.getUser();
    }

    private Date calculateExpiryDate() {
        Calendar cal = Calendar.getInstance();
        cal.setTimeInMillis(new Date().getTime());
        cal.add(Calendar.MINUTE, 60); // token valid for 60 minutes
        return new Date(cal.getTime().getTime());
    }

    private boolean isTokenExpired(PasswordResetToken token) {
        return token.getExpiryDate().before(new Date());
    }
}
