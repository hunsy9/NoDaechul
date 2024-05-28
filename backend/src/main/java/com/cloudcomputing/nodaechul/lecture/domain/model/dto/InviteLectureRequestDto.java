package com.cloudcomputing.nodaechul.lecture.domain.model.dto;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class InviteLectureRequestDto {
    @NotNull(message = "강의 id는 null일 수 없습니다.")
    private final Long id;

    private String invitation_code;
}
