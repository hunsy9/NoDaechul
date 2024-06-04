package com.cloudcomputing.nodaechul.lecture.controller;

import com.cloudcomputing.nodaechul.annotation.AdminRoleRequired;
import com.cloudcomputing.nodaechul.annotation.LoginRequired;
import com.cloudcomputing.nodaechul.lecture.domain.model.dto.CreateLectureRequestDto;
import com.cloudcomputing.nodaechul.lecture.domain.model.dto.GetAttendanceRequestDto;
import com.cloudcomputing.nodaechul.lecture.domain.model.dto.GetAttendanceResponseDto;
import com.cloudcomputing.nodaechul.lecture.domain.model.dto.JoinLectureRequestDto;
import com.cloudcomputing.nodaechul.lecture.domain.model.dto.GetLectureRequestDto;
import com.cloudcomputing.nodaechul.lecture.service.LectureService;
import com.cloudcomputing.nodaechul.user.domain.model.User;
import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/lecture")
@Slf4j
public class LectureController {

    private final LectureService lectureService;

    @PostMapping("/createlecture")
    @AdminRoleRequired
    public ResponseEntity<Long> createLecture(HttpSession session,
        @RequestBody @Valid CreateLectureRequestDto createLectureRequestDto) throws Exception {
        User user = (User) session.getAttribute("USER");
        log.info(String.valueOf(user.getId()));
        createLectureRequestDto.setCreated_by(user.getId());
        Long id = lectureService.createLecture(createLectureRequestDto);
        return ResponseEntity.status(HttpStatus.CREATED).body(id);
    }

    @GetMapping("/invitelecture")
    @AdminRoleRequired
    public ResponseEntity<String> inviteLecture(
        @RequestParam @Valid Long id) throws Exception {
        String invitation_code = lectureService.inviteLecture(id);
        return ResponseEntity.status(HttpStatus.OK).body(invitation_code);
    }

    @PostMapping("/joinlecture")
    @LoginRequired
    public ResponseEntity<Long> joinLecture(HttpSession session,
        @RequestBody @Valid JoinLectureRequestDto joinLectureRequestDto) throws Exception {
        User user = (User) session.getAttribute("USER");
        joinLectureRequestDto.setUser_id(user.getId());
        Long lecture_id = lectureService.joinLecture(joinLectureRequestDto);
        return ResponseEntity.status(HttpStatus.OK).body(lecture_id);
    }

    @GetMapping("/getlecture")
    @LoginRequired
    public ResponseEntity<List<GetLectureRequestDto>> getLecture(HttpSession session)
        throws Exception {
        User user = (User) session.getAttribute("USER");
        List<GetLectureRequestDto> getLectureRequestDtoList = lectureService.getLecturesByUserID(
            user.getId());
        return ResponseEntity.status(HttpStatus.OK).body(getLectureRequestDtoList);
    }

    @GetMapping("/getattendance")
    @LoginRequired
    public ResponseEntity<List<GetAttendanceResponseDto>> getAttendance(
        @RequestParam @Valid Long lectureId) throws Exception {
        List<GetAttendanceResponseDto> getAttendanceResponseDto = lectureService.getAttendanceByLectureID(
            lectureId);
        return ResponseEntity.status(HttpStatus.OK).body(getAttendanceResponseDto);
    }
}
