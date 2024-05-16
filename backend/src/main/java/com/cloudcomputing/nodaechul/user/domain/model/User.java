package com.cloudcomputing.nodaechul.user.domain.model;

import com.cloudcomputing.nodaechul.user.domain.model.enums.UserRole;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

import java.io.Serializable;

@RequiredArgsConstructor
@Getter
@Builder
public class User implements Serializable {
    private final Long id;
    private final String email;
    private final String student_id;
    private final String name;
    private final UserRole user_role;
}
