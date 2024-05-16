package com.cloudcomputing.nodaechul.annotation;

import com.cloudcomputing.nodaechul.utils.SessionUtils;
import jakarta.servlet.http.HttpSession;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Component;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

@Aspect
@Component
public class AdminRoleAspect {
    @Before("@annotation(com.cloudcomputing.nodaechul.annotation.AdminRoleRequired)")
    public void checkAdminRole(JoinPoint jp) throws Throwable {

        HttpSession session = ((ServletRequestAttributes)(RequestContextHolder.currentRequestAttributes())).getRequest().getSession();
        Boolean adminRole = SessionUtils.checkAdmin(session);

        if (!adminRole) {
            throw new HttpStatusCodeException(HttpStatus.UNAUTHORIZED, "NOT_ADMIN") {};
        }
    }
}
