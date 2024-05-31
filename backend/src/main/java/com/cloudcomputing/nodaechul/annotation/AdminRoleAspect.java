package com.cloudcomputing.nodaechul.annotation;

import com.cloudcomputing.nodaechul.user.domain.model.User;
import com.cloudcomputing.nodaechul.user.domain.model.enums.UserRole;
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
        User user = (User) session.getAttribute("USER");

        if (user == null) {
            throw new HttpStatusCodeException(HttpStatus.UNAUTHORIZED, "NOT_LOGIN") {};
        }

        if (user.getUser_role() != UserRole.Admin) {
            throw new HttpStatusCodeException(HttpStatus.UNAUTHORIZED, "NOT_ADMIN") {};
        }
    }
}
