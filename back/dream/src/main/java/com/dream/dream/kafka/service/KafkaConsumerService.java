package com.dream.dream.kafka.service;

import com.dream.dream.kafka.dto.LogDto;
import lombok.RequiredArgsConstructor;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.springframework.kafka.annotation.KafkaListener;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import java.io.IOException;

@Service
@RequiredArgsConstructor
public class KafkaConsumerService {

    @KafkaListener(topics = "${message.topic.sparkDiaryName}", groupId = ConsumerConfig.GROUP_ID_CONFIG, containerFactory = "logDtoListener")

    @Async
    public void consume(LogDto logDto) throws IOException {
        //System.out.println("Consumed msg : "+message.toString());

//        LogDto dto = new LogDto();
//        dto.setLocalDateTime(LocalDateTime.now());
//        dto.setMessage("테스트 로그 데이터");

        System.out.println(logDto.getLocalDateTime().toString());

    }
}
