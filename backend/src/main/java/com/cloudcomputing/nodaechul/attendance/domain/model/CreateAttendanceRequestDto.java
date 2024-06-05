package com.cloudcomputing.nodaechul.attendance.domain.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.Date;

@AllArgsConstructor
@NoArgsConstructor
@Getter
public class CreateAttendanceRequestDto {
    private Long id;
    private Long lectureId;
    @JsonFormat(pattern = "yyyy-MM-dd")
    private Date attendanceDate;
}
