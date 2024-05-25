package com.cloudcomputing.nodaechul.lecture.domain.model.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public class GetLectureRequestDto {
    private final Long id;

    private final String name;

    private final String created_by;
}
