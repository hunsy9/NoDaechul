package com.cloudcomputing.nodaechul.lecture.domain.model.dto;


import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
public class JoinLectureRequestDto {
    @Setter
    private Long user_id;

    @Setter
    @NotNull(message = "강의 id는 null일 수 없습니다.")
    private Long lecture_id;

    @Setter
    private String avatar;

    @NotBlank(message = "초대 코드를 입력해 주세요.")
    private String invitation_code;
}
