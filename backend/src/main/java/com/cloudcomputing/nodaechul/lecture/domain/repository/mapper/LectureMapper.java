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

    List<StudentAttendanceDto> getStudentInLectureById(Long lectureId);

    void joinLecture(JoinLectureRequestDto joinLectureRequestDto);

    boolean alreadyJoined(JoinLectureRequestDto joinLectureRequestDto);

    String checkInvitationCode(JoinLectureRequestDto joinLectureRequestDto);

    List<GetLectureRequestDto> getLecturesByUserID(Long userId);

    List<StudentAttendanceDto> getMembersByLectureID(Long lectureId);

    List<AttendanceDto> getAttendanceByLectureId(Long lectureId);

    JoinLectureResponseDto getLectureInfo(JoinLectureRequestDto joinLectureRequestDto);

    Long getLectureIdByInvitationCode(JoinLectureRequestDto joinLectureRequestDto);

    String getProfessorNameByCreatedBy(JoinLectureResponseDto joinLectureResponseDto);

    void joinLectureProfessor(Long professorId, Long lectureId);

    String getLectureCollectionId(Long id);
}
