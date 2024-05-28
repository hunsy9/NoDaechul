package com.cloudcomputing.nodaechul.lecture.domain.model;

import java.io.Serializable;
import lombok.Builder;
import lombok.Getter;
import lombok.RequiredArgsConstructor;

@RequiredArgsConstructor
@Getter
@Builder
public class Lecture implements Serializable {
    private final Long id;
    private final String name;
    private final String invitation_code;
    private final Long created_by;
}
