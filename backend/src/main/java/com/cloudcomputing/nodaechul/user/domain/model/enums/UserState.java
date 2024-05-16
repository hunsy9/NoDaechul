package com.cloudcomputing.nodaechul.user.domain.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum UserState {
    Active("활성화"),
    Disabled("비활성화")
    ;

    private String description;
}
