package com.dream.dream.exception;

import lombok.Getter;

public enum ExceptionCode {

    INVALID_REFRESH_TOKEN(400,"Invalid Refresh Token"),
    INVALID_ACCESS_TOKEN(401,"Invalid Access Token"),
    MEMBER_UNAUTHORIZED(403,"Member Unauthorized"),
    BOOK_NOT_FOUND(404, "Book Not Found"),
    EMAIL_NOT_FOUND(404, "Email Not Found"),
    BOARD_NOT_FOUND(404, "Board Not Found"),
    COMMENT_NOT_FOUND(404, "Comment Not Found"),
    FISH_NOT_FOUND(404, "Fish Not Found in DB"),
    FOLLOW_NOT_FOUND(404, "Follow Not Found in DB"),
    INVENTORY_NOT_FOUND(404, "Inventory Not Found in DB"),
    FISHBOWLS_NOT_FOUND(404, "Fishbowls Not Found in DB"),
    FISHINGHOLES_NOT_FOUND(404, "Fishing holes Not Found in DB"),
    FAVORITEPOINTS_NOT_FOUND(404, "Favorite points Not Found in DB"),
    ATTRACTION_NOT_FOUND(404, "Attraction Not Found"),
    MEMBER_NOT_FOUND(404, "Member Not Found"),
    FAILED_TO_UPDATE_MEMBER(500, "Failed Update Member"),
    FAILED_TO_DELETE_MEMBER(500, "Failed Delete Member"),
    FAILED_TO_UPDATE_FILE(500, "Failed Update File"),
    WRONG_PASSWORD(400,"Wrong Password"),
    NOT_ALLOWED_FILES(405,"Cannot upload Multi Image File"),
    NOT_AUTHORIZED_USER(403,"Not Authorized User"),
    UNACCEPTABLE_EXTENSION(403,"Unacceptable Extension"),
    EMAIL_ALREADY_EXISTS(409, "Email Already Exists"),
    FOLLOW_ALREADY_EXISTS(409, "Follow Already Exists"),
    FAVORITEPOINT_ALREADY_EXISTS(409, "Favorite Point Already Exists"),
    FAILED_TO_WRITE_BOARD(500, "Failed Write Board"),
    FAILED_TO_DELETE_BOARD(500, "Failed Delete Board"),

    PLAN_NOT_FOUND(404, "Plan Not Found"),
    TOTAL_PLAN_NOT_FOUND(404, "TotalPlan Not Found"),
    FAILED_TO_DELETE_TOTAL_PLAN(500, "Failed Delete TotalPlan"),

    POST_NOT_FOUND(404, "Post Not Found"),
    FILE_NOT_FOUND(404, "File Not Found"),
    LIKE_NOT_FOUND(404, "Like Not Found"),
    NOT_OWNER_OF(409,"Not owner of item"),
    TAG_NOT_FOUND(404, "Tag Not Found"),
    PARENT_NOT_MATCH(404, "Parent Not Match"),
    COMMENT_NOT_MATCH(400, "Comment Not Match"),
    RECOMMEND_ERROR(400, "Recommend error");



    @Getter
    private final int status;

    @Getter
    private final String message;

    ExceptionCode(int code, String message){
        this.status = code;
        this.message = message;
    }

}
