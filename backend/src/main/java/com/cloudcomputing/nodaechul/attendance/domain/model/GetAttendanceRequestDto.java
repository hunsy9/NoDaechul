package com.cloudcomputing.nodaechul.attendance.domain.model;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GetAttendanceRequestDto {
    private Long lectureId;
    private Long attendanceId;
}
