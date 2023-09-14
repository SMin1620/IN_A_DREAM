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

    @Value(value = "{message.topic.diaryName}")
    private String topicName3;

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
    public NewTopic newTopic3(){
        return new NewTopic(topicName3, 1, (short) 1);
    }
}
