package com.cloudcomputing.nodaechul.attendance.domain.model;

import com.cloudcomputing.nodaechul.attendance.domain.model.enums.AttendanceStatus;
import com.cloudcomputing.nodaechul.lecture.domain.model.dto.StudentAttendanceDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import software.amazon.awssdk.services.rekognition.model.BoundingBox;

@AllArgsConstructor
@Getter
public class DetectedStudent {

    private Long attendance_id;
    private Long user_id;
    private String student_id;
    private String name;
    private String avatar;
    private AttendanceStatus status;
    private Float similarity;
    private BoundingBox boundingBox;

    public static DetectedStudent from(StudentAttendanceDto studentAttendanceDto, Long attendanceId ,DetectedInfo info, AttendanceStatus status){
        return new DetectedStudent(
                attendanceId,
                studentAttendanceDto.getId(),
                studentAttendanceDto.getStudent_id(),
                studentAttendanceDto.getName(),
                studentAttendanceDto.getAvatar(),
                status,
                info.getSimilarity(),
                info.getBoundingBox());
    }
}
