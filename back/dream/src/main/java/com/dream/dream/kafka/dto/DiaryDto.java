package com.dream.dream.kafka.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class DiaryDto {
    private Long memberId;
    private String content;
}
