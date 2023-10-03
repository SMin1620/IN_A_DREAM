package com.dream.dream.diary.dto;

import com.dream.dream.diary.entity.Emotion;
import com.dream.dream.member.dto.MemberDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

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
        @Schema(example = "test.jpg")
        private String image;
        @Schema(example = "일기 제목")
        private String title;
        @Schema(example = "일기 내용입니다. 나는 고래상어")
        private String content;
        @Schema
        private boolean open;
        @Schema
        private boolean sale;
    }

    /**
     * 일기 좋아요 요청 Dto
     */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DiaryLikeDto{
        private Long diaryId;
    }

    /**
     * 일기 공개 설정 Dto
     */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class openDto{
        private Long diaryId;
        private boolean open;
    }

    /**
     * 일기 판매 설정 Dto
     */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class saleDto{
        private Long diaryId;
        private boolean sale;
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
        private int positivePoint;
        private int neutralPoint;
        private int negativePoint;
        private int likeCount;
        private boolean open;
        private boolean sale;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDateTime createdAt;
        private Emotion emotion;
        private MemberDto.Response member;
        private MemberDto.Response owner;

        // 내가 좋아요 했는지 여부
        private boolean liked;
    }

    /**
     * 꿈 일기 리스트 Dto
     */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class DiaryListResponseDto {
        private long totalPage;
        private long currPage;
        private List<DiaryResponseDto> diaryList;
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
//        private float positive;
//        private float neutral;
//        private float negative;
        private int positivePoint;
        private int neutralPoint;
        private int negativePoint;
        private int likeCount;
        private boolean open;
        private boolean sale;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDateTime createdAt;
        private Emotion emotion;
        private MemberDto.Response member;
    }

    /**
     * kafka produce 용
     */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class SparkProduce {
        private String image;
        private String title;
        private String content;
        private boolean open;
        private boolean sale;
        private Long memberId;
    }

    /**
     * kafka consume 용
     */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class SparkConsume{
        private String image;
        private String title;
        private String content;
        private boolean open;
        private boolean sale;
        private Long memberId;
        private float positive;
        private float neutral;
        private float negative;
    }

    /**
     * 내 일기 개수 조회 responseDto
     */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class MyDiaryCountResponseDto{
        private Long count;
    }

}
