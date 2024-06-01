package com.cloudcomputing.nodaechul.lecture.domain.model.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@AllArgsConstructor
@Getter
public class CreateLectureRequestDto {

    private final Long id;

    @NotBlank(message = "강의 이름 입력은 필수입니다.")
    private final String name;

    @Setter
    private String invitation_code;

    @Setter
    private Long created_by;
}
