package com.cloudcomputing.nodaechul.attendance.domain.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@AllArgsConstructor
@Getter
public class Attendance {
    AttendanceMetaData attendanceMetaData;
    List<AttendanceUserRecord> attendanceUserRecords;
    public static Attendance from(AttendanceMetaData attendanceMetaData, List<AttendanceUserRecord> attendanceUserRecords){
        return new Attendance(attendanceMetaData, attendanceUserRecords);
    }
}
