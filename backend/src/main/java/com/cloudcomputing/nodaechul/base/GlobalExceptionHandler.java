package com.cloudcomputing.nodaechul.base;

import com.cloudcomputing.nodaechul.attendance.exception.NoDetectionResultExistException;
import com.cloudcomputing.nodaechul.lecture.exception.AlreadyJoinedException;
import com.cloudcomputing.nodaechul.lecture.exception.InvalidInvitationCodeException;
import com.cloudcomputing.nodaechul.lecture.exception.InvalidLectureIdException;
import com.cloudcomputing.nodaechul.lecture.exception.InvalidLectureNameException;
import com.cloudcomputing.nodaechul.user.exception.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;
import org.springframework.web.client.HttpStatusCodeException;

import java.sql.SQLIntegrityConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({MethodArgumentNotValidException.class})
    public ResponseEntity<ExceptionResponse> validException(MethodArgumentNotValidException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(
            "Validation Failed : " + ex.getBindingResult().getAllErrors().get(0)
                .getDefaultMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({HttpStatusCodeException.class})
    public ResponseEntity<ExceptionResponse> validException(HttpStatusCodeException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, ex.getStatusCode());
    }

    @ExceptionHandler({SQLIntegrityConstraintViolationException.class})
    public ResponseEntity<ExceptionResponse> validException(SQLIntegrityConstraintViolationException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.CONFLICT);
    }

    @ExceptionHandler({InvalidLectureIdException.class})
    public ResponseEntity<ExceptionResponse> validException(InvalidLectureIdException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({AlreadyJoinedException.class})
    public ResponseEntity<ExceptionResponse> validException(AlreadyJoinedException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({InvalidInvitationCodeException.class})
    public ResponseEntity<ExceptionResponse> validException(InvalidInvitationCodeException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler({InvalidLectureNameException.class})
    public ResponseEntity<ExceptionResponse> validException(InvalidLectureNameException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidRegisterException.class)
    public ResponseEntity<ExceptionResponse> handleInvalidReservationException(
        InvalidRegisterException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidFaceException.class)
    public ResponseEntity<ExceptionResponse> handleInvalidFaceException(InvalidFaceException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(ActivationFailedException.class)
    public ResponseEntity<ExceptionResponse> handleActivationFailedException(
        ActivationFailedException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(LoginException.class)
    public ResponseEntity<ExceptionResponse> handleLoginException(LoginException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(NoDetectionResultExistException.class)
    public ResponseEntity<ExceptionResponse> handleNoDetectionResultExistException(NoDetectionResultExistException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(InvalidFormException.class)
    public ResponseEntity<ExceptionResponse> handleInvalidFormException(InvalidFormException ex) {
        ExceptionResponse exceptionResponse = new ExceptionResponse(ex.getMessage());
        return new ResponseEntity<>(exceptionResponse, HttpStatus.BAD_REQUEST);
    }
}
