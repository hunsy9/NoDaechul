package com.cloudcomputing.nodaechul.attendance.controller;

import com.cloudcomputing.nodaechul.annotation.AdminRoleRequired;
import com.cloudcomputing.nodaechul.annotation.LoginRequired;
import com.cloudcomputing.nodaechul.attendance.domain.model.AttendanceResponseDto;
import com.cloudcomputing.nodaechul.attendance.domain.model.CreateAttendanceRequestDto;
import com.cloudcomputing.nodaechul.attendance.domain.model.GetAttendanceRequestDto;
import com.cloudcomputing.nodaechul.attendance.service.AttendanceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping("/api/attendance")
@RequiredArgsConstructor
public class AttendanceController {

    private final AttendanceService attendanceService;

    @PostMapping
    @AdminRoleRequired
    public void createAttendance(@RequestPart("createAttendanceDto") CreateAttendanceRequestDto attendanceRequestDto, @RequestPart("lectureImage") MultipartFile mFile) throws IOException {
        Long id = attendanceService.createAttendance(attendanceRequestDto);
        attendanceService.createStudentAttendanceRecord(attendanceRequestDto, mFile, id);
    }

}
