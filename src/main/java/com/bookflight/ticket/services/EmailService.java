package com.bookflight.ticket.services;

import com.bookflight.ticket.dto.MailBody;
import jakarta.mail.MessagingException;

public interface EmailService {
    void sendHtmlMail(MailBody mailBody, String templateName) throws MessagingException;
}
