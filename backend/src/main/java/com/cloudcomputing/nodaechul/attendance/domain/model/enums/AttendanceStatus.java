package com.cloudcomputing.nodaechul.attendance.domain.model.enums;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public enum AttendanceStatus {
    ATTEND("출석"),
    ABSENT("결석");

    private final String description;
}
