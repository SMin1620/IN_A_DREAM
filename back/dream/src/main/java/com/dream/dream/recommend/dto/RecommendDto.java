package com.dream.dream.recommend.dto;

import com.dream.dream.member.dto.MemberDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;

public class RecommendDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DiaryRecommendResponseDto {

        private Long id;
        private String title;
        private String content;
        private String image;
        private String emotion;
        private float positive;
        private float neutral;
        private float negative;
        private int likeCount;
        private boolean open;
        @JsonFormat(pattern = "yyyy-MM-dd")
        private LocalDateTime createdAt;
        private DiaryRecommendMemberResponseDto member;
        private String correctKeyword;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DiaryRecommendMemberResponseDto {
        private long id;
        private String email;
        private String nickname;
        private String gender;
    }


    /**
     * 일시 상세 조회 로그
     */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class DiaryDetailLog {
        private Long diaryId;
        private String title;
        private String content;
        private String emotion;
        private Long memberId;
    }


    /**
     * 거래 내역 로그
     */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TransactionLog {
        private Long transactionId;
        private Long diaryId;
        private Long buyerId;
        private Long sellerId;
        private int point;
    }

}
