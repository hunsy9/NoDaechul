package com.cloudcomputing.nodaechul.utils;

import com.cloudcomputing.nodaechul.user.domain.model.User;
import com.cloudcomputing.nodaechul.user.domain.model.enums.UserRole;
import jakarta.servlet.http.HttpSession;
import org.springframework.stereotype.Component;

@Component
public class SessionUtils {

    private static final String LOGIN_USER = "USER";

    public static Long getLoginUserId(HttpSession session) {
        User LoginedUser = (User) session.getAttribute(LOGIN_USER);
        return LoginedUser.getId();
    }

    public static Boolean checkAdmin(HttpSession session) {
        User LoginedUser = (User) session.getAttribute(LOGIN_USER);
        return LoginedUser.getUser_role() == UserRole.Admin;
    }

}
