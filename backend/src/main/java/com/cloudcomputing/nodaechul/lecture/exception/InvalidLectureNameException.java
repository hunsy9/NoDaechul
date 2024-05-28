package com.cloudcomputing.nodaechul.lecture.exception;

public class InvalidLectureNameException extends RuntimeException{
    public InvalidLectureNameException(String message) {
        super(message);
    }
}
