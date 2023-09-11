package com.dream.dream.kafka.dto;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class PointHistoryDto {

    private int point;

    private Long buyer;

    private Long seller;

    private LocalDateTime localDateTime;

}
