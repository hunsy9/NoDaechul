package com.cloudcomputing.nodaechul.lecture.domain.model.dto;

import java.util.List;
import lombok.Getter;
import lombok.Setter;

@Getter
public class GetAttendanceResponseDto {

    //todo    private List<AttendanceDto> attendance;
    @Setter
    private List<StudentAttenanceDto> members;
}
