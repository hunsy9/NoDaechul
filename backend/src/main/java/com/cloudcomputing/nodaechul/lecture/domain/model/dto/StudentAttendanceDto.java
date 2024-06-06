package com.cloudcomputing.nodaechul.lecture.domain.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
public class StudentAttendanceDto {
    public StudentAttendanceDto(String student_id, String name, String avatar) {
        this.student_id = student_id;
        this.name = name;
        this.avatar = avatar;
    }

    private Long id;
    private final String student_id;
    private final String name;
    private final String avatar;
}
