package com.dream.dream.kafka.config;


import com.dream.dream.diary.dto.DiaryDto;
import com.dream.dream.kafka.dto.LogDto;
import com.dream.dream.statistic.dto.RelationDto;
import org.apache.kafka.clients.consumer.ConsumerConfig;
import org.apache.kafka.common.serialization.StringDeserializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.config.ConcurrentKafkaListenerContainerFactory;
import org.springframework.kafka.core.ConsumerFactory;
import org.springframework.kafka.core.DefaultKafkaConsumerFactory;
import org.springframework.kafka.support.serializer.JsonDeserializer;

import java.util.HashMap;
import java.util.Map;

@Configuration
public class KafkaLogDtoConsumerConfig {

    @Value(value = "${spring.kafka.bootstrap-servers}")
    private String bootstrapServers;

    @Bean
    public ConsumerFactory<String, LogDto> logDtoConsumer() {

        Map<String, Object> configs = new HashMap<>();
        configs.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        configs.put(ConsumerConfig.GROUP_ID_CONFIG, "loggroup");

        return new DefaultKafkaConsumerFactory<>(
                configs,
                new StringDeserializer(),
                new JsonDeserializer<>(LogDto.class,false));
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, LogDto> logDtoListener() {
        ConcurrentKafkaListenerContainerFactory<String, LogDto> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(logDtoConsumer());
        return factory;
    }

    @Bean
    public ConsumerFactory<String, DiaryDto.SparkConsume> diaryConsumer() {

        Map<String, Object> configs = new HashMap<>();
        configs.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        configs.put(ConsumerConfig.GROUP_ID_CONFIG, "loggroup");

        return new DefaultKafkaConsumerFactory<>(
                configs,
                new StringDeserializer(),
                new JsonDeserializer<>(DiaryDto.SparkConsume.class,false));
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, DiaryDto.SparkConsume> diaryListener(){
        ConcurrentKafkaListenerContainerFactory<String, DiaryDto.SparkConsume> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(diaryConsumer());
        return factory;
    }


    @Bean
    public ConsumerFactory<String, RelationDto.Statistic> diaryRelationConsumer(){
        Map<String, Object> configs = new HashMap<>();
        configs.put(ConsumerConfig.BOOTSTRAP_SERVERS_CONFIG, bootstrapServers);
        configs.put(ConsumerConfig.GROUP_ID_CONFIG, "loggroup");

        return new DefaultKafkaConsumerFactory<>(
                configs,
                new StringDeserializer(),
                new JsonDeserializer<>(RelationDto.Statistic.class, false));
    }

    @Bean
    public ConcurrentKafkaListenerContainerFactory<String, RelationDto.Statistic> diaryRelationListener(){
        ConcurrentKafkaListenerContainerFactory<String, RelationDto.Statistic> factory = new ConcurrentKafkaListenerContainerFactory<>();
        factory.setConsumerFactory(diaryRelationConsumer());
        return factory;
    }

}
