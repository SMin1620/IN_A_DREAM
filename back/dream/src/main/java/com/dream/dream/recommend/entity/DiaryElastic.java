package com.dream.dream.recommend.entity;

import com.dream.dream.member.dto.MemberDto;
import com.dream.dream.member.entity.Member;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Document(indexName = "diary-recommend-log")
@ToString
@Getter
@Setter
public class DiaryElastic {

    @Id
    private String id;

    @Field(type = FieldType.Auto, name = "diary_id")
    @Column(name = "diary_id")
    private Long diaryId;

    @Field(type = FieldType.Auto, name = "member_id")
    @Column(name = "member_id")
    private Long memberId;

    @Field(type = FieldType.Auto)
    private String title;

    @Field(type = FieldType.Auto)
    private String content;

    @Field(type = FieldType.Auto)
    private String image;

    @Field(type = FieldType.Auto)
    private String emotion;

    @Field(type = FieldType.Auto)
    private float positive;

    @Field(type = FieldType.Auto)
    private float neutral;

    @Field(type = FieldType.Auto)
    private float negative;

    @Field(type = FieldType.Auto)
    private int positivePoint;

    @Field(type = FieldType.Auto)
    private int neutralPoint;

    @Field(type = FieldType.Auto)
    private int negativePoint;

    @Field(type = FieldType.Auto)
    private int likeCount;

    private Member member;
}
