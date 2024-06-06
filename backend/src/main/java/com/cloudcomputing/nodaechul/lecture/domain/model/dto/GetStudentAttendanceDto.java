package com.cloudcomputing.nodaechul.lecture.domain.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GetStudentAttendanceDto {
    private String student_id;
    private String name;
    private String avatar;
}
