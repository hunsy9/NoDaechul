package com.cloudcomputing.nodaechul.lecture.domain.model.dto;

import java.sql.Timestamp;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AttendanceDto {

    Long id;
    Timestamp date;
}
