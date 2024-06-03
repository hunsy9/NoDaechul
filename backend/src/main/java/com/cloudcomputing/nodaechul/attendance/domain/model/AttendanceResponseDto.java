package com.cloudcomputing.nodaechul.attendance.domain.model;

import com.cloudcomputing.nodaechul.attendance.domain.model.entity.Attendance;
import com.cloudcomputing.nodaechul.attendance.domain.model.entity.LectureImageBoundingBox;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class AttendanceResponseDto {
    List<LectureImageBoundingBox> lectureImageBoundingBoxes;
    Attendance attendance;

    public static AttendanceResponseDto from(List<LectureImageBoundingBox> lectureImageBoundingBoxes, Attendance attendance){
        return new AttendanceResponseDto(lectureImageBoundingBoxes, attendance);
    }
}
