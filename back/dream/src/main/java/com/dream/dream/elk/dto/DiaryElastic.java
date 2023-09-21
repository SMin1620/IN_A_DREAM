package com.dream.dream.elk.dto;

import jakarta.persistence.Column;
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

    @Field(type = FieldType.Auto, name = "diary_id")
    @Column(name = "diary_id")
    private Long diaryId;

    @Field(type = FieldType.Auto, name = "member_id")
    @Column(name = "member_id")
    private int memberId;

    @Field(type = FieldType.Auto)
    private String title;

    @Field(type = FieldType.Auto)
    private String content;
}
