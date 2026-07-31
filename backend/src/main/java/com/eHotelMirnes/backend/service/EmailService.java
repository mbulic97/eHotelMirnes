package com.eHotelMirnes.backend.service;

import com.eHotelMirnes.backend.entity.User;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;


@Slf4j
@Service
public class EmailService {
    @Autowired
    private JavaMailSender mailSender;

    public void sendWelcomeEmail(User user){
        try{
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(user.getUsername());
            message.setSubject("Welcome to eHotelMirnes");
            message.setText("Hello " + user.getName() + ",\n\n" +
                    "Thank you for registering on eHotelMirnes!\n" +
                    "You can now book hotel rooms and enjoy our services.\n\n" +
                    "Sincerely,\neHotelMIrnes team");
            mailSender.send(message);
        } catch (Exception e) {
            log.error("Error sending email to {}", user.getUsername(), e);

        }

    }
}
