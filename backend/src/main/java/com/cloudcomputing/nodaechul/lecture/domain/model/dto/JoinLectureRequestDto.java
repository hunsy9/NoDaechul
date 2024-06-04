package com.cloudcomputing.nodaechul.lecture.domain.model.dto;


import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import lombok.Setter;

@Getter
public class JoinLectureRequestDto {

    public JoinLectureRequestDto() {
    }

    @Setter
    private Long user_id;

    @Setter
    private Long lecture_id;

    private String invitation_code;
}
