package com.dream.dream.exception;



import com.dream.dream.response.ErrorResponse;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.web.HttpRequestMethodNotSupportedException;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import javax.validation.ConstraintViolationException;

@RestControllerAdvice
public class GlobalExceptionAdvice {
    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleMethodArgumentNotValidException(
            MethodArgumentNotValidException e) {
        final ErrorResponse response = ErrorResponse.of(e.getBindingResult());

        return response;
    }

    @ExceptionHandler
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public ErrorResponse handleConstraintViolationException(
            ConstraintViolationException e) {
        final ErrorResponse response = ErrorResponse.of(e.getConstraintViolations());

        return response;
    }

    @ExceptionHandler
    //@ResponseStatus(HttpStatus.NOT_FOUND)
    @ResponseBody
    public ErrorResponse handleBusinessLogicException(BusinessLogicException e, HttpServletResponse res) {
        System.out.println(e.getExceptionCode().getStatus());
        System.out.println(e.getMessage());

        res.setStatus(e.getExceptionCode().getStatus());

        final ErrorResponse response = ErrorResponse.of(e.getExceptionCode());

        return response;
    }


    @ExceptionHandler
    @ResponseStatus(HttpStatus.METHOD_NOT_ALLOWED)
    public ErrorResponse handleHttpRequestMethodNotSupportedException(
            HttpRequestMethodNotSupportedException e) {
        final ErrorResponse response = ErrorResponse.of(HttpStatus.METHOD_NOT_ALLOWED);
        return response;
    }


    @ExceptionHandler
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public ErrorResponse handleException(Exception e){
        ErrorResponse response = ErrorResponse.of(HttpStatus.INTERNAL_SERVER_ERROR);
        e.printStackTrace();
        return response;
    }
}
