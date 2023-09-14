package com.dream.dream.kafka.service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
@Slf4j
public class KafkaProducerService {

    @Value(value = "${message.topic.name}")
    private String topicName;

    @Value(value = "${message.topic.pointName}")
    private String topicName2;

    @Value(value = "${message.topic.diaryName}")
    private String topicName3;

    private final KafkaTemplate<String, Object> kafkaTemplate;


    @Async
    public void sendLogDto(Object message){
        kafkaTemplate.send(topicName, message);
    }

    @Async
    public void sendPointLogDto(Object message){
        kafkaTemplate.send(topicName2, message);
    }

    @Async
    public void sendMyTopic(Object message) {
        System.out.println("###############");
        System.out.println("메세지 send");

        kafkaTemplate.send(topicName3, message);
    }
}
