package com.cloudcomputing.nodaechul.user.domain.model;

import com.cloudcomputing.nodaechul.user.domain.model.enums.UserRole;
import com.cloudcomputing.nodaechul.user.domain.model.enums.UserState;
import jakarta.annotation.Nullable;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class UserVO {
    private final Long id;
    private final String email;
    @Nullable
    private final String student_id;
    private final String name;
    private final String password;
    private final UserState user_status;
    private final UserRole user_role;
}
