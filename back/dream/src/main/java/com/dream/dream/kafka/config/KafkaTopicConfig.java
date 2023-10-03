package com.dream.dream.kafka.config;

import org.apache.kafka.clients.admin.AdminClientConfig;
import org.apache.kafka.clients.admin.NewTopic;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.KafkaAdmin;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaTopicConfig {

    @Value(value = "${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

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
     * 일기 정보 보내는 topic
     */
    @Value(value = "${message.topic.sparkDiaryName}")
    private String sparkDiary;
    /**
     * 일기 스트릭 잔지 채우기
     */
    @Value(value = "${message.topic.strictName}")
    private String strictTopic;

    /**
     * 일기 정보 받는 topic
     */
    @Value(value = "${message.topic.sparkListenerName}")
    private String sparkDiaryResult;

    /**
     * 일기 판매 on의 통계 topic
     */
    @Value(value = "${message.topic.sparkDiaryStatisticName}")
    private String sparkDiaryStatisticTopic;

    @Bean
    public KafkaAdmin kafkaAdmin() {
        Map<String, Object> configs = new HashMap<>();
        configs.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        return new KafkaAdmin(configs);
    }

    @Bean
    public NewTopic newTopic() {
        return new NewTopic(sparkDiary, 1, (short) 1);
    }

    @Bean
    public NewTopic newTopic2() {
        return new NewTopic(topicName2, 1, (short) 1);
    }

    @Bean
    public NewTopic recommendTopic() {
        return new NewTopic(recommendTopic, 1, (short) 1);
    }

    @Bean
    public NewTopic statisticDailyTopic() {
        return new NewTopic(statisticDailyTopic, 1, (short) 1);
    }

    @Bean
    public NewTopic statisticMonthTopic() {
        return new NewTopic(statisticMonthTopic, 1, (short) 1);
    }

    @Bean
    public NewTopic transactionTopic() {
        return new NewTopic(transactionTopic, 1, (short) 1);
    }

    @Bean
    public NewTopic strictTopic() {
        return new NewTopic(strictTopic, 1, (short) 1);
    }

    @Bean
    public NewTopic newTopic3(){
        return new NewTopic(topicName3, 1, (short) 1);
    }

    @Bean
    public NewTopic diaryResult(){
        return new NewTopic(sparkDiaryResult, 1, (short) 1);
    }

    @Bean
    public NewTopic sparkDiaryStatisticTopic(){
        return new NewTopic(sparkDiaryStatisticTopic, 1, (short) 1);
    }
}
