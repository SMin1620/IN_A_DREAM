package com.dream.dream.diary.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;

public class DiaryDto {

    /**
     * 꿈 일기 생성 Dto
     */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DiaryCreateRequestDto {
        @Schema(example = "./test.jpg")
        private String image;
        @Schema(example = "test title")
        private String title;
        @Schema(example = "test content")
        private String content;
        @Schema(example = "99.1")
        private float positive;
        @Schema(example = "0.02")
        private float neutral;
        @Schema(example = "0.88")
        private float negative;
        @Schema(example = "1")
        private int emotion;    // 수정 가능성
        @Schema(example = "1")
        private int member;    // 수정 가능성
    }


    /**
     * 꿈 일기 리스트 Dto
     */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DiaryListResponseDto {
        private Long id;
        private String image;
        private String title;
        private float positive;
        private float neutral;
        private float negative;
        private int like;
        private LocalDateTime localDateTime;
        private int emotion;
    }


    /**
     * 꿈 일기 디테일 Dto
     */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DiaryDetailResponseDto {
        private Long id;
        private String image;
        private String title;
        private String content;
        private float positive;
        private float neutral;
        private float negative;
        private int like;
        private LocalDateTime localDateTime;
        private int emotion;
    }

    /**
     * 꿈 일기 response Dto
     */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class DiaryResponseDto {
        private Long id;
        private String image;
        private String title;
        private String content;
        private float positive;
        private float neutral;
        private float negative;
        private int positivePoint;
        private int neutralPoint;
        private int negativePoint;
        private int like;
        @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
        private LocalDateTime createdAt;
        private int emotion;
    }

}
