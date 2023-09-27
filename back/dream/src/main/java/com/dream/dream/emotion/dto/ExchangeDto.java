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
        String kind;
        private int coin;
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
        private int positiveCoin;
        private int neutralCoin;
        private int negativeCoin;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Point {
        private int positiveCoin;
        private int neutralCoin;
        private int negativeCoin;
    }
}