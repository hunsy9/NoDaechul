package com.cloudcomputing.nodaechul.attendance.domain.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AttendanceMetaData {
    private int total_students;
    private int attend_students;
    private int absent_students;
}
