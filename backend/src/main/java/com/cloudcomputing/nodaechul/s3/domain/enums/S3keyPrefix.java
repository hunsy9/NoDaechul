package com.cloudcomputing.nodaechul.s3.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum S3keyPrefix {
    AVATAR("avatar-"),
    LECTURE("lecture-");

    private final String prefix;
}
