package com.cloudcomputing.nodaechul.lecture.domain.repository.mapper;

import com.cloudcomputing.nodaechul.lecture.domain.model.dto.*;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LectureMapper {

    void createLecture(CreateLectureRequestDto createLectureRequestDto);

    String inviteLecture(Long id);

    boolean isLectureNameExists(String name);

    boolean isLectureIdExists(Long id);

    void joinLecture(JoinLectureRequestDto joinLectureRequestDto);

    boolean alreadyJoined(JoinLectureRequestDto joinLectureRequestDto);

    String checkInvitationCode(JoinLectureRequestDto joinLectureRequestDto);

    List<GetLectureRequestDto> getLecturesByUserID(Long userId);

    List<StudentAttenanceDto> getMembersByLectureID(Long lectureId);

    List<AttendanceDto> getAttendanceByLectureId(Long lectureId);
}
