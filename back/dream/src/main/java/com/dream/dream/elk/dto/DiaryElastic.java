package com.dream.dream.elk.dto;

import jakarta.persistence.Id;
import lombok.Getter;
import lombok.ToString;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.stereotype.Service;

@Document(indexName = "diary-recommend-log")
@ToString
@Getter
public class DiaryElastic {

    @Id
    private String id;

    @Field(type = FieldType.Auto)
    private Long diaryId;

    @Field(type = FieldType.Auto)
    private int member;

    @Field(type = FieldType.Auto)
    private String title;

    @Field(type = FieldType.Auto)
    private String content;
}
