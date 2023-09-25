package com.dream.dream.recommend.entity;

import com.dream.dream.member.dto.MemberDto;
import com.dream.dream.member.entity.Member;
import com.dream.dream.recommend.dto.RecommendDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

import java.time.LocalDateTime;

@Document(indexName = "mysql_diary")
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

    @Field(type = FieldType.Auto, name = "owner_id")
    @Column(name = "owner_id")
    private Long ownerId;

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
    private int likeCount;

    @Field(type = FieldType.Auto, name = "created_at")
    @JsonFormat(pattern = "yyyy-MM-dd")
    private LocalDateTime createdAt;

    private Member member;
}
