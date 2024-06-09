package com.cloudcomputing.nodaechul.mail.service;

import jakarta.mail.internet.InternetAddress;
import jakarta.mail.internet.MimeMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.thymeleaf.TemplateEngine;
import org.thymeleaf.context.Context;

@Service
@RequiredArgsConstructor
@Slf4j
public class MailService {
    private final JavaMailSender javaMailSender;
    private final TemplateEngine htmlTemplateEngine;

    @Value("https://nodaechul.site")
    private String hostAddr;

    private String generateActivationLink(String verificationCode, Long userId) {
        return hostAddr + "/api/user/activate?auth_code=" + verificationCode + "&user_id=" + userId;
    }

    public String sendAuthMail(String clientEmail, String verificationCode, Long userId) throws Exception {
        Context context = new Context();
        MimeMessage mimeMessage = javaMailSender.createMimeMessage();
        MimeMessageHelper messageHelper = new MimeMessageHelper(mimeMessage, "UTF-8");

        InternetAddress from = new InternetAddress("juniper0917@gmail.com", "NoDaeChul");
        InternetAddress to = new InternetAddress(clientEmail);

        log.info("verificationCode: " + verificationCode);
        log.info("userId: " + userId);

        String activationLink = generateActivationLink(verificationCode, userId);

        context.setVariable("text", activationLink);

        String htmlTemplate = htmlTemplateEngine.process("mail/authMail", context);
        messageHelper.setFrom(from);
        messageHelper.setTo(to);
        messageHelper.setSubject("[NoDaeChul] 사용자 인증 요청 메일");
        messageHelper.setText(htmlTemplate, true);
        javaMailSender.send(mimeMessage);

        return null;
    }
}
