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
                "오늘 밤 꿈에서 나는 놀라운 발명가였다. 그것도 아주 특별한 '시간여행용 신발'을 만든 발명가! 이 신발은 착용하는 순간 원하는 시대로 여행할 수 있는 기적 같은 아이템이었다.\n" +
                        "\n" +
                        "그런 내게 든 생각 하나, \"공룡 시대를 탐험해보자.\" 심장이 두근두근 거리며 신발을 착용하고 공룡 시대를 설정했다. 한숨 돌릴 새도 없이 나는 멋진 공룡들이 살아있는 세상에 도착해 있었다.\n" +
                        "\n" +
                        "거기서 나는 다양한 종류의 공룡들과 친구가 됐다. 그들의 생활 패턴과 습성을 직접 관찰하는 것은 정말로 놀라운 경험이었다. 깨어나면서도 그 흥분된 기분이 가슴속에 오래도록 남아 있었다. 오늘 밤의 꿈, 진짜 재미있었다!"
        );
        logDto.setPositive(99.1F);
        logDto.setNeutral(0.02F);
        logDto.setNegative(0.88F);
        logDto.setLike(10);
        kafkaProducerService.sendLogDto(logDto);
        return logDto;
    }
}
