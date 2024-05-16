package com.cloudcomputing.nodaechul.user.domain.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserRole {
    Admin("관리자"),
    User("일반 사용자");

    private final String description;
}
