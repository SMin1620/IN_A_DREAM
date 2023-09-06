package com.dream.dream.kafka;

import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString
public class LogDto {
    private LocalDateTime localDateTime;
    private String message;
}
