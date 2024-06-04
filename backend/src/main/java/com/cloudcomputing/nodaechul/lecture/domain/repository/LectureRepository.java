package com.cloudcomputing.nodaechul.lecture.domain.repository;

import com.cloudcomputing.nodaechul.lecture.domain.model.dto.CreateLectureRequestDto;
import com.cloudcomputing.nodaechul.lecture.domain.model.dto.GetAttendanceResponseDto;
import com.cloudcomputing.nodaechul.lecture.domain.model.dto.GetLectureRequestDto;
import com.cloudcomputing.nodaechul.lecture.domain.model.dto.JoinLectureRequestDto;
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

    public Boolean isLectureIdExists(Long lecture_id) {
        return lectureMapper.isLectureIdExists(lecture_id);
    }

    public Long joinLecture(JoinLectureRequestDto joinLectureRequestDto) {
        lectureMapper.joinLecture(joinLectureRequestDto);
        return joinLectureRequestDto.getLecture_id();
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

    public List<GetAttendanceResponseDto> getAttendanceByLectureID(Long lectureId) {
        return lectureMapper.getAttendanceByLectureID(lectureId);
    }
}
