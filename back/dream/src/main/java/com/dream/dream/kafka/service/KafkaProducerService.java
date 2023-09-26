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

    private final KafkaTemplate<String, Object> kafkaTemplate;

    @Value(value = "${message.topic.name}")
    private String topicName;

    @Value(value = "${message.topic.pointName}")
    private String topicName2;

    @Value(value = "${message.topic.diaryName}")
    private String topicName3;

    /**
     * 사용자 로그 데이터 기반 추천
     */
    @Value(value = "${message.topic.recommendName}")
    private String recommendTopic;

    /**
     * 일별 사용자 통계
     */
    @Value(value = "${message.topic.statisticDailyName}")
    private String statisticDailyTopic;

    /**
     * 월별 사용자 통계
     */
    @Value(value = "${message.topic.statisticMonthName}")
    private String statisticMonthTopic;

    /**
     * 거래 내역 로그 이상탐지
     */
    @Value(value = "${message.topic.transactionName}")
    private String transactionTopic;

    /**
     * 일기 스트릭 잔디
     */
    @Value(value = "${message.topic.strictName}")
    private String strictTopic;


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

    @Async
    public void sendRecommend(Object message){
        System.out.println("############# 추천 - 사용자 이벤트 로그 생성 ##############");
        
        kafkaTemplate.send(recommendTopic, message);
    }

    @Async
    public void sendStatisticDaily(Object message){
        System.out.println("############# 일별 통계  ##############");
        
        kafkaTemplate.send(statisticDailyTopic, message);
    }

    @Async
    public void sendStatisticMonth(Object message){
        System.out.println("############# 일별 통계 ##############");
        
        kafkaTemplate.send(statisticMonthTopic, message);
    }

    @Async
    public void sendTransaction(Object message){
        System.out.println("############# 거래 내역 ##############");
        
        kafkaTemplate.send(transactionTopic, message);
    }

    @Async
    public void sendStrict(Object message){
        System.out.println("############# 잔디 깎기 ##############");

        kafkaTemplate.send(strictTopic, message);
    }
}
