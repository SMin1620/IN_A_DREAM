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
    

    @Bean
    public KafkaAdmin kafkaAdmin() {
        Map<String, Object> configs = new HashMap<>();
        configs.put(AdminClientConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        return new KafkaAdmin(configs);
    }

    @Bean
    public NewTopic newTopic() {
        return new NewTopic(topicName, 3, (short) 3);
    }

    @Bean
    public NewTopic newTopic2() {
        return new NewTopic(topicName2, 3, (short) 3);
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
    public NewTopic newTopic3(){
        return new NewTopic(topicName3, 1, (short) 1);
    }
}
