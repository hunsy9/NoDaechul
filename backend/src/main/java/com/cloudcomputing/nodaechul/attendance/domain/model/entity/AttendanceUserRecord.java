package com.cloudcomputing.nodaechul.attendance.domain.model.entity;

import com.cloudcomputing.nodaechul.attendance.domain.model.enums.AttendanceStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AttendanceUserRecord {
    private Long user_id;
    private String student_id;
    private String name;
    private String similarity;
    private AttendanceStatus status;
}
