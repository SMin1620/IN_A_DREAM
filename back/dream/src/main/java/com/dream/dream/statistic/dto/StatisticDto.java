package com.dream.dream.statistic.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class StatisticDto {
    private Long memberId;
    private String keyword;
    private Long count;
}
