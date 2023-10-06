package com.dream.dream.kafka.dto;

import lombok.*;

import java.time.LocalDateTime;


/**
 * 일기 로그 생성 Dto
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class LogDto {

    private LocalDateTime localDateTime;

    private Long diaryId;

    private String content;

    private Float positive;

    private Float neutral;

    private Float negative;

    private Integer like;

}
