package com.cloudcomputing.nodaechul.lecture.domain.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
public class JoinLectureResponseDto {

    public JoinLectureResponseDto(Long id, String name, Long created_by) {
        this.id = id;
        this.name = name;
        this.created_by = created_by;
    }

    private final Long id;
    private final String name;
    private final Long created_by;
    @Setter
    private String professorName;
}
