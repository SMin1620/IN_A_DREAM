package com.dream.dream.kafka;

import com.dream.dream.kafka.controller.KafkaController;
import com.dream.dream.kafka.dto.PointHistoryDto;
import com.dream.dream.kafka.service.KafkaProducerService;
import com.dream.dream.recommend.dto.RecommendDto;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

@Component
@RequiredArgsConstructor
public class Scheduler {

    private final KafkaProducerService kafkaProducerService;

    @Scheduled(fixedRate = 70000)
    public void execAPI() {

        int idx = 99;
        for (int i = 0; i < 3; i++) {

            kafkaProducerService.sendTransaction(RecommendDto.TransactionLog.builder()
                    .transactionId(1L)
                    .sellerId(1L)
                    .buyerId(2L)
                    .diaryId(1L)
                    .point(idx)
                    .build());
            idx++;
        }

    }
}
