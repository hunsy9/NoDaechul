package com.cloudcomputing.nodaechul.attendance.domain.repository;

import com.cloudcomputing.nodaechul.attendance.domain.model.CreateAttendanceRequestDto;
import com.cloudcomputing.nodaechul.attendance.domain.model.DetectedStudent;
import com.cloudcomputing.nodaechul.attendance.domain.model.entity.AttendanceUserRecord;
import com.cloudcomputing.nodaechul.attendance.domain.model.entity.LectureImageBoundingBox;
import com.cloudcomputing.nodaechul.attendance.domain.repository.mapper.AttendanceMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.rekognition.model.BoundingBox;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AttendanceRepository {
    private final AttendanceMapper attendanceMapper;

    public Long createAttendance(CreateAttendanceRequestDto createAttendanceRequestDto){
        attendanceMapper.createAttendance(createAttendanceRequestDto);
        return createAttendanceRequestDto.getId();
    }

    public void createStudentAttendanceRecord(List<DetectedStudent> students){
        attendanceMapper.createStudentAttendanceRecord(students);
    }

    public void createAttendanceBoundingBoxes(Long id, List<BoundingBox> boundingBoxes) {
        attendanceMapper.insertBoundingBoxes(id, boundingBoxes);
    }

    public List<AttendanceUserRecord> getAttendanceRecords(Long id){
        return attendanceMapper.getAttendanceUserRecords(id);
    }

    public List<LectureImageBoundingBox> getLectureImageBoundingBoxes(Long id){
        return attendanceMapper.getLectureImageBoundingBoxes(id);
    }

    public void deleteAttendanceRecord(Long id){
        attendanceMapper.deleteAttendanceRecord(id);
    }

    public int setPublicUrlToAttendance(String publicUrl, Long attendanceId){
        return attendanceMapper.setPublicUrlToAttendance(publicUrl, attendanceId);
    }

    public String getPublicUrlFromAttendance(Long attendanceId){
        return attendanceMapper.getPublicUrlFromAttendance(attendanceId);
    }
}
