package com.dream.dream.statistic.dto;

import lombok.*;


public class StatisticDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class keywordDto {
        private Long memberId;
        private String keyword;
        private Long count;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class emotionDto {
        private Long memberId;
        private String emotion;
        private Long count;
    }

}
