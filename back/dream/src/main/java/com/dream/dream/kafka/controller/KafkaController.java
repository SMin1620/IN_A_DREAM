package com.dream.dream.kafka.controller;

import com.dream.dream.kafka.dto.LogDto;
import com.dream.dream.kafka.dto.PointHistoryDto;
import com.dream.dream.kafka.service.KafkaProducerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.elasticsearch.core.ElasticsearchRestTemplate;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.time.temporal.ChronoUnit;

@Slf4j
@CrossOrigin("*")
@RestController
@RequiredArgsConstructor
@RequestMapping("/kafka")
public class KafkaController {

    private final KafkaProducerService kafkaProducerService;

    /**
     * 테스트 로그 생성 컨트롤러
     */
    @PostMapping(value = "/message")
    public PointHistoryDto sendMessage(@RequestBody PointHistoryDto pointHistoryDto){

        // 로그 생성 날짜
        pointHistoryDto.setBuyer(1L);
        pointHistoryDto.setSeller(22L);
        pointHistoryDto.setPoint(1150);

        LocalDateTime currentTime = LocalDateTime.now();
        pointHistoryDto.setTimestamp(currentTime);



        kafkaProducerService.sendPointLogDto(pointHistoryDto);

        return pointHistoryDto;
    }
}
