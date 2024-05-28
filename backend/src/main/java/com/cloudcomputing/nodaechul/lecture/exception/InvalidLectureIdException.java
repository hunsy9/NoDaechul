package com.cloudcomputing.nodaechul.lecture.exception;

public class InvalidLectureIdException extends RuntimeException {
    public InvalidLectureIdException(String message) {
        super(message);
    }
}
