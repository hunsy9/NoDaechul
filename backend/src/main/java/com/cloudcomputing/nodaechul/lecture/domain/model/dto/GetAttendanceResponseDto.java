package com.cloudcomputing.nodaechul.lecture.domain.model.dto;

import java.util.List;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@AllArgsConstructor
public class GetAttendanceResponseDto {

    private List<AttendanceDto> attendance;
    @Setter
    private List<StudentAttenanceDto> members;

    public static GetAttendanceResponseDto from(List<AttendanceDto> attendance,
        List<StudentAttenanceDto> members) {
        return new GetAttendanceResponseDto(attendance, members);
    }
}
