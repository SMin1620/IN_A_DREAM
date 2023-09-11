package com.dream.dream.kafka.controller;

import com.dream.dream.kafka.dto.LogDto;
import com.dream.dream.kafka.service.KafkaProducerService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;

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
    public LogDto sendMessage(@RequestBody LogDto logDto){
        
        // 로그 생성 날짜
        logDto.setLocalDateTime(LocalDateTime.now());
        logDto.setDiaryId(1L);
        logDto.setContent(
               "멍청이 바보");
        logDto.setPositive(99.1F);
        logDto.setNeutral(0.02F);
        logDto.setNegative(0.88F);
        logDto.setLike(10);
        kafkaProducerService.sendLogDto(logDto);
        return logDto;
    }
}
