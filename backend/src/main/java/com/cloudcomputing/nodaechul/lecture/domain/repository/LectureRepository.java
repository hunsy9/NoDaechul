package com.cloudcomputing.nodaechul.lecture.domain.repository;

import com.cloudcomputing.nodaechul.lecture.domain.model.dto.*;
import com.cloudcomputing.nodaechul.lecture.domain.repository.mapper.LectureMapper;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

@Repository
@RequiredArgsConstructor
public class LectureRepository {

    private final LectureMapper lectureMapper;

    public Long createLecture(CreateLectureRequestDto createLectureRequestDto) {
        lectureMapper.createLecture(createLectureRequestDto);
        return createLectureRequestDto.getId();
    }

    public Boolean isLectureNameExists(CreateLectureRequestDto createLectureRequestDto) {
        return lectureMapper.isLectureNameExists(createLectureRequestDto.getName());
    }

    public String inviteLecture(Long id) {
        return lectureMapper.inviteLecture(id);
    }

    public List<StudentAttendanceDto> getStudentInLectureById(Long lectureId){
        return lectureMapper.getStudentInLectureById(lectureId);
    }

    public Boolean isLectureIdExists(Long lecture_id) {
        return lectureMapper.isLectureIdExists(lecture_id);
    }

    public void joinLecture(JoinLectureRequestDto joinLectureRequestDto) {
        lectureMapper.joinLecture(joinLectureRequestDto);
    }

    public Boolean alreadyJoined(JoinLectureRequestDto joinLectureRequestDto) {
        return lectureMapper.alreadyJoined(joinLectureRequestDto);
    }

    public String checkInvitationCode(JoinLectureRequestDto joinLectureRequestDto) {
        return lectureMapper.checkInvitationCode(joinLectureRequestDto);
    }

    public List<GetLectureRequestDto> getLecturesByUserID(Long userId) {
        return lectureMapper.getLecturesByUserID(userId);
    }

    public List<StudentAttendanceDto> getMembersByLectureID(Long lectureId) {
        return lectureMapper.getMembersByLectureID(lectureId);
    }

    public List<AttendanceDto> getAttendanceByLectureId(Long lectureId) {
        return lectureMapper.getAttendanceByLectureId(lectureId);
    }

    public JoinLectureResponseDto getLectureInfo(JoinLectureRequestDto joinLectureRequestDto) {
        return lectureMapper.getLectureInfo(joinLectureRequestDto);
    }

    public Long getLectureIdByInvitationCode(JoinLectureRequestDto joinLectureRequestDto) {
        return lectureMapper.getLectureIdByInvitationCode(joinLectureRequestDto);
    }

    public String getProfessorNameByCreatedBy(JoinLectureResponseDto joinLectureResponseDto) {
        return lectureMapper.getProfessorNameByCreatedBy(joinLectureResponseDto);
    }

    public void joinLectureProfessor(Long professorId, Long lectureId) {
        lectureMapper.joinLectureProfessor(professorId, lectureId);
    }
      
    public String getLectureCollectionId(Long id){
        return lectureMapper.getLectureCollectionId(id);
    }
}
