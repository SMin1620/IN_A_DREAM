package com.dream.dream.kafka.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class KafkaProducerService {

    @Value(value = "${message.topic.name}")
    private String topicName;

    private final KafkaTemplate<String, Object> kafkaTemplate;


    @Async
    public void sendLogDto(Object message){
        /*try {
            Thread.sleep(5000);*/
        //System.out.println("Produce content : "+message.getContent());
        kafkaTemplate.send(topicName,message);
        /*}catch (InterruptedException e){
            e.printStackTrace();
        }*/
    }
}
