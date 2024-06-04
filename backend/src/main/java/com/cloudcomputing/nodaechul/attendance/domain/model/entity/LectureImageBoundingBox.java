package com.cloudcomputing.nodaechul.attendance.domain.model.entity;

import lombok.AllArgsConstructor;
import lombok.Getter;
import software.amazon.awssdk.services.rekognition.model.BoundingBox;

@AllArgsConstructor
@Getter
public class LectureImageBoundingBox {
    private Float width;
    private Float height;
    private Float left_pos;
    private Float top_pos;

    public static LectureImageBoundingBox from(BoundingBox boundingBox){
        return new LectureImageBoundingBox(boundingBox.width(), boundingBox.height(), boundingBox.left(), boundingBox.top());
    }
}
