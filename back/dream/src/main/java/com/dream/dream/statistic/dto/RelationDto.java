package com.dream.dream.statistic.dto;

import lombok.*;

public class RelationDto {
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class Statistic {
        private float avgNegativeWhenTrue;
        private float avgPositiveWhenTrue;
        private float avgNeutralWhenTrue;
        private float avgNegativeWhenFalse;
        private float avgPositiveWhenFalse;
        private float avgNeutralWhenFalse;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    @ToString
    public static class StatisticResponseDto {
        private float avgNegativeWhenTrue;
        private float avgPositiveWhenTrue;
        private float avgNeutralWhenTrue;
        private float avgNegativeWhenFalse;
        private float avgPositiveWhenFalse;
        private float avgNeutralWhenFalse;
    }

}
