package com.cloudcomputing.nodaechul.lecture.domain.model.dto;

import java.sql.Timestamp;
import java.util.Date;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class AttendanceDto {

    Long id;
    @JsonFormat(pattern = "yyyy-MM-dd")
    Date date;
}
