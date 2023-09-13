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
//    @PostMapping(value = "/message")
//    public LogDto sendMessage(@RequestBody LogDto logDto){
//
//        // 로그 생성 날짜
//        logDto.setLocalDateTime(LocalDateTime.now());
//        logDto.setDiaryId(1L);
//        logDto.setContent("멍청이 바보");
//        logDto.setPositive(99.1F);
//        logDto.setNeutral(0.02F);
//        logDto.setNegative(0.88F);
//        logDto.setLike(10);
//        kafkaProducerService.sendLogDto(logDto);
//        return logDto;
//    }

    /**
     * 테스트 로그 생성 컨트롤러
     */
    @PostMapping(value = "/message")
    public PointHistoryDto sendMessage(@RequestBody PointHistoryDto pointHistoryDto){

        // 로그 생성 날짜
//        pointHistoryDto.setBuyer(1L);
//        pointHistoryDto.setSeller(22L);
//        pointHistoryDto.setPoint(50);

        LocalDateTime currentTime = LocalDateTime.now();

        PointHistoryDto data = new PointHistoryDto();

        int idx = 1;
        for (int i = 0; i < 40; i++) {
            data.setPoint(idx);
            data.setSeller((long) idx);
            data.setTimestamp(currentTime);

            // 2분씩 시간 차이 추가
            currentTime = currentTime.minus(2, ChronoUnit.MINUTES);

            // 원하는 포맷 지정
            DateTimeFormatter formatter = DateTimeFormatter.ofPattern("MMM dd, yyyy @ HH:mm:ss.SSS");
//            data.setTimestamp(currentTime.format(formatter));

            data.setTimestamp(currentTime);

            kafkaProducerService.sendPointLogDto(data);
            idx++;
        }

//        kafkaProducerService.sendPointLogDto(pointHistoryDto);

        return data;
    }
}
