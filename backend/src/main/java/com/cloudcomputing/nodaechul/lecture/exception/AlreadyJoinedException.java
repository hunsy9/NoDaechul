package com.cloudcomputing.nodaechul.lecture.exception;

public class AlreadyJoinedException extends RuntimeException {
    public AlreadyJoinedException(String message) {
        super(message);
    }
}
