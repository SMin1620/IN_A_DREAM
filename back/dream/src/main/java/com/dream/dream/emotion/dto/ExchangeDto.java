package com.dream.dream.emotion.dto;

import lombok.*;

public class ExchangeDto {

    /**
     * 환전 요청 Dto
     */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ExchangeRequestDto{
        private int memberId;

        private Point send;
        private Point receive;
    }

    /**
     * 환전 반환 Dto
     */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ExchangeResponseDto{
        private Long positivePoint;
        private Long neutralPoint;
        private Long negativePoint;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Point {
        private Long positivePoint;

        private Long neutralPoint;

        private Long negativePoint;
    }
}