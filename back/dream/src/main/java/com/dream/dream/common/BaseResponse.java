package com.dream.dream.common;

import org.springframework.http.HttpStatus;

public record BaseResponse(
        HttpStatus status,
        String message,
        Object data
) {
    public static BaseResponse response(HttpStatus status, Object data){
        return new BaseResponse(status, null, data);
    }

}
