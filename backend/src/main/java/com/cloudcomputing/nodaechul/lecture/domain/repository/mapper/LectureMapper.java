package com.cloudcomputing.nodaechul.lecture.domain.repository.mapper;

import com.cloudcomputing.nodaechul.lecture.domain.model.dto.CreateLectureRequestDto;
import com.cloudcomputing.nodaechul.lecture.domain.model.dto.GetAttendanceResponseDto;
import com.cloudcomputing.nodaechul.lecture.domain.model.dto.GetLectureRequestDto;
import com.cloudcomputing.nodaechul.lecture.domain.model.dto.InviteLectureRequestDto;
import com.cloudcomputing.nodaechul.lecture.domain.model.dto.JoinLectureRequestDto;
import java.util.List;
import org.apache.ibatis.annotations.Mapper;

@Mapper
public interface LectureMapper {
    void createLecture(CreateLectureRequestDto createLectureRequestDto);

    String inviteLecture(InviteLectureRequestDto inviteLectureRequestDto);

    boolean isLectureNameExists(String name);

    boolean isLectureIdExists(Long id);

    void joinLecture(JoinLectureRequestDto joinLectureRequestDto);

    boolean alreadyJoined(JoinLectureRequestDto joinLectureRequestDto);

    String checkInvitationCode(JoinLectureRequestDto joinLectureRequestDto);

    List<GetLectureRequestDto> getLecturesByUserID(Long userId);

    List<GetAttendanceResponseDto> getAttendanceByLectureID(Long lectureId);
}
