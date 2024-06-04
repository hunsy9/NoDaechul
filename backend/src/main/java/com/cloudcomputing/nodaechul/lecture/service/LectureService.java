package com.cloudcomputing.nodaechul.lecture.service;

import com.cloudcomputing.nodaechul.lecture.domain.model.dto.*;
import com.cloudcomputing.nodaechul.lecture.domain.repository.LectureRepository;
import com.cloudcomputing.nodaechul.lecture.exception.AlreadyJoinedException;
import com.cloudcomputing.nodaechul.lecture.exception.InvalidInvitationCodeException;
import com.cloudcomputing.nodaechul.lecture.exception.InvalidLectureIdException;
import com.cloudcomputing.nodaechul.lecture.exception.InvalidLectureNameException;
import java.util.List;
import java.util.UUID;

import com.cloudcomputing.nodaechul.rekognition.service.RekognitionService;
import com.cloudcomputing.nodaechul.user.service.UserService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Slf4j
public class LectureService {

    private final LectureRepository lectureRepository;
    private final RekognitionService rekognitionService;
    private final UserService userService;

    @Transactional
    public Long createLecture(CreateLectureRequestDto createLectureRequestDto) {
        String invitation_code = UUID.randomUUID().toString();
        createLectureRequestDto.setInvitation_code(invitation_code);
        // 중복된 강의명인지 유효성 검사
        if (lectureRepository.isLectureNameExists(createLectureRequestDto)) {
            throw new InvalidLectureNameException("중복된 강의명입니다.");
        }

        // 수업 생성시 수업에 참여
        Long professorId = createLectureRequestDto.getCreated_by();
        Long lectureId = lectureRepository.createLecture(createLectureRequestDto);

        lectureRepository.joinLectureProfessor(professorId, lectureId);

        //AWS Rekognition Collection 추가
        rekognitionService.createCollection(invitation_code);

        return lectureId;
    }

    public String inviteLecture(Long id) {
        // 강의 ID 존재 유효성 검사
        if (!isLectureIDExists(id)) {
            throw new InvalidLectureIdException("존재하지 않는 강의입니다.");
        }
        return lectureRepository.inviteLecture(id);
    }

    @Transactional
    public JoinLectureResponseDto joinLecture(JoinLectureRequestDto joinLectureRequestDto) {
        joinLectureRequestDto.setLecture_id(lectureRepository.getLectureIdByInvitationCode(joinLectureRequestDto));
        // 강의 중복 참여 유효성 검사
        if (lectureRepository.alreadyJoined(joinLectureRequestDto)) {
            throw new AlreadyJoinedException("이미 참여한 강의입니다.");
        }
        // 초대 코드 유효성 검사
        if (!joinLectureRequestDto.getInvitation_code()
            .equals(lectureRepository.checkInvitationCode(joinLectureRequestDto))) {
            throw new InvalidInvitationCodeException("초대 코드가 맞지 않습니다.");
        }
      
        Long lectureId = joinLectureRequestDto.getLecture_id();

        // 수업 컬렉션에 유저 아바타 추가
        if(lectureId != null) {
            String userAvatar = userService.getUserAvatarById(joinLectureRequestDto.getUser_id());
            int result = rekognitionService.addFaceToCollection(userAvatar, joinLectureRequestDto.getInvitation_code());
            if(result > 0) {
                log.info("User Avatar {} is added to collection: {}", userAvatar, joinLectureRequestDto.getInvitation_code());
            }
        }

        return lectureRepository.getLectureInfo(joinLectureRequestDto);
    }

    public List<StudentAttendanceDto> getStudentInLectureById(Long lectureId){
        return lectureRepository.getStudentInLectureById(lectureId);
    }

    private Boolean isLectureIDExists(Long lectureId) {
        return lectureRepository.isLectureIdExists(lectureId);
    }

    public List<GetLectureRequestDto> getLecturesByUserID(Long userId) {
        return lectureRepository.getLecturesByUserID(userId);
    }

    public List<StudentAttendanceDto> getMembersByLectureID(Long lectureId) {
        // 강의 ID 존재 유효성 검사
        if (!isLectureIDExists(lectureId)) {
            throw new InvalidLectureIdException("존재하지 않는 강의입니다.");
        }
        return lectureRepository.getMembersByLectureID(lectureId);
    }
  
    public String getLectureCollectionId(Long id){
        return lectureRepository.getLectureCollectionId(id);
    }

    public List<AttendanceDto> getAttendanceByLectureID(Long lectureId) {
        // 강의 ID 존재 유효성 검사
        if (!isLectureIDExists(lectureId)) {
            throw new InvalidLectureIdException("존재하지 않는 강의입니다.");
        }
        return lectureRepository.getAttendanceByLectureId(lectureId);
    }

    public String getProfessorNameByCreatedBy(JoinLectureResponseDto joinLectureResponseDto) {
        return lectureRepository.getProfessorNameByCreatedBy(joinLectureResponseDto);
    }
}
