package com.cloudcomputing.nodaechul.attendance.domain.model;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import software.amazon.awssdk.services.rekognition.model.BoundingBox;

@AllArgsConstructor
@Getter
@Builder
public class DetectedInfo {
    private BoundingBox boundingBox;
    private String externalImageId;
    private Float similarity;
}
