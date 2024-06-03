package com.cloudcomputing.nodaechul.s3.domain.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum BucketNameEnum {

    AVATAR("nodaechul-avatar"),
    LECTURE("nodaechul-lecture");

    private final String bucketName;
}
