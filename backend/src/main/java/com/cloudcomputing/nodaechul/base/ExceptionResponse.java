package com.cloudcomputing.nodaechul.base;

public class ExceptionResponse {
    private String message;

    public String getMessage() {
        return message;
    }

    public ExceptionResponse(String message) {
        this.message = message;
    }
}
