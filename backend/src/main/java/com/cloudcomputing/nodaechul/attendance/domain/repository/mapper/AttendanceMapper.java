package com.cloudcomputing.nodaechul.attendance.domain.repository.mapper;

import com.cloudcomputing.nodaechul.attendance.domain.model.CreateAttendanceRequestDto;
import com.cloudcomputing.nodaechul.attendance.domain.model.DetectedStudent;
import com.cloudcomputing.nodaechul.attendance.domain.model.entity.AttendanceUserRecord;
import com.cloudcomputing.nodaechul.attendance.domain.model.entity.LectureImageBoundingBox;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import software.amazon.awssdk.services.rekognition.model.BoundingBox;

import java.util.List;

@Mapper
public interface AttendanceMapper {
    Long createAttendance(CreateAttendanceRequestDto createAttendanceRequestDto);

    void createStudentAttendanceRecord(List<DetectedStudent> students);

    void insertBoundingBoxes(@Param("id") Long id, @Param("boundingBoxes") List<BoundingBox> boundingBoxes);

    List<LectureImageBoundingBox> getLectureImageBoundingBoxes(Long id);

    List<AttendanceUserRecord> getAttendanceUserRecords(Long id);

    void deleteAttendanceRecord(Long id);
}
