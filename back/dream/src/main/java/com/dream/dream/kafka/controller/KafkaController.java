package com.dream.dream.kafka.controller;

import com.dream.dream.kafka.LogDto;
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

    @PostMapping(value = "/message")
    public String sendMessage(@RequestBody LogDto logDto){
        logDto.setLocalDateTime(LocalDateTime.now());
        kafkaProducerService.sendLogDto(logDto);
        return "success";
    }
}
