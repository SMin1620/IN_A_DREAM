package com.dream.dream.transaction.dto;

import com.dream.dream.transaction.entity.Transaction;
import lombok.*;

import java.util.List;

public class TransactionDto {

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TradeDiaryResponseDto{
        private int positivePoint;
        private int neutralPoint;
        private int negativePoint;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class TradeDiaryRequestDto{
        private Long diary_id;
        private String sellerEmail;
        private int positivePoint;
        private int neutralPoint;
        private int negativePoint;
    }


    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MySellHistoryResponseDto{
        private String sellerEmail;
        private List<Transaction> transactionList;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MyBuyHistoryResponseDto{
        private String sellerEmail;
        private List<Transaction> transactionList;
    }

}