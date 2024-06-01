package com.cloudcomputing.nodaechul.lecture.domain.model.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
public class JoinLectureRequestDto {

    public JoinLectureRequestDto(Long user_id, Long lecture_id) {
        this.user_id = user_id;
        this.lecture_id = lecture_id;
    }

    @Setter
    private Long user_id;

    @Setter
    @NotNull(message = "강의 id는 null일 수 없습니다.")
    private Long lecture_id;

    @NotBlank(message = "초대 코드를 입력해 주세요.")
    private String invitation_code;
}
