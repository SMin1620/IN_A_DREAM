package com.dream.dream.kafka.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class TransactionLogDto {

    private Long transactionId;

    private Long buyId;

    private Long sellerId;

    private Long diaryId;

    private int point;

}
