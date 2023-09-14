package com.dream.dream.kafka;

import com.dream.dream.kafka.controller.KafkaController;
import com.dream.dream.kafka.dto.PointHistoryDto;
import com.dream.dream.kafka.service.KafkaProducerService;
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
        LocalDateTime currentTime = LocalDateTime.now();

        PointHistoryDto data = new PointHistoryDto();

        int idx = 100;
        for (int i = 0; i < 40; i++) {
            data.setPoint(idx);
            data.setSeller((long) idx);
            data.setTimestamp(currentTime);

            // 2분씩 시간 차이 추가
            currentTime = currentTime.minus(2, ChronoUnit.MINUTES);

            // 원하는 포맷 지정
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy @ HH:mm:ss.SSS");

            data.setTimestamp(currentTime);

            kafkaProducerService.sendPointLogDto(data);
            idx++;
            idx++;
        }

    }
}
