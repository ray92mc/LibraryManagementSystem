package com.x00179223.librarybackend.service;

import com.x00179223.librarybackend.model.User;
import org.springframework.stereotype.Service;

import java.util.Properties;
import javax.mail.Authenticator;
import javax.mail.Message;
import javax.mail.MessagingException;
import javax.mail.PasswordAuthentication;
import javax.mail.Session;
import javax.mail.Transport;
import javax.mail.internet.AddressException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements EmailService {

    private final String fromEmail = "your_email_address";
    private final String password = "your_email_password";
    private final String host = "smtp.gmail.com";
    private final int port = 587;

    @Override
    public void sendOverdueEmail(User user) {
        String toEmail = "X00179223@mytudublin.ie"; //in production: user.getEmail()
        String subject = "Overdue Library Books";
        String body = "Dear " + user.getFirstname() + ",\n\nYou have overdue library books. Please return them as soon as possible to avoid additional fines.\n\nSincerely,\nThe Library";

        Properties props = new Properties();
        props.put("mail.smtp.auth", "true");
        props.put("mail.smtp.starttls.enable", "true");
        props.put("mail.smtp.host", host);
        props.put("mail.smtp.port", port);

        Session session = Session.getInstance(props, new Authenticator() {
            @Override
            protected PasswordAuthentication getPasswordAuthentication() {
                return new PasswordAuthentication(fromEmail, password);
            }
        });

        try {
            Message message = new MimeMessage(session);
            message.setFrom(new InternetAddress("X00179223@mytudublin.ie"));
            message.setRecipients(Message.RecipientType.TO, InternetAddress.parse(toEmail));
            message.setSubject(subject);
            message.setText(body);
            Transport.send(message);
            System.out.println("Email sent successfully to " + toEmail);
        } catch (AddressException e) {
            System.out.println("Invalid email address: " + toEmail);
            e.printStackTrace();
        } catch (MessagingException e) {
            System.out.println("Error sending email to " + toEmail);
            e.printStackTrace();
        }
    }
}