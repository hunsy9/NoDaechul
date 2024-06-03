package com.cloudcomputing.nodaechul.attendance.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CreateAttendanceRequestDto {
    private Long id;
    private Long lectureId;
    private Timestamp attendanceDate;
}
