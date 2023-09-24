package com.dream.dream.diary.entity;

import com.dream.dream.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.BatchSize;
import org.hibernate.annotations.ColumnDefault;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Entity
@Table(name = "diaries", indexes = {@Index(columnList = "createdAt", name = "created_at")})
public class Diary {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "diary_id")
    private Long id;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false, length = 100000)
    private String content;

    @Column(nullable = false)
    @Builder.Default
    private float positive = 0F;

    @Column(nullable = false)
    @Builder.Default
    private float neutral = 0F;

    @Column(nullable = false)
    @Builder.Default
    private float negative = 0F;

    @Column(nullable = false)
    private int positivePoint;

    @Column(nullable = false)
    private int neutralPoint;

    @Column(nullable = false)
    private int negativePoint;

    private int likeCount = 0;

    @Column(nullable = false, updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false, name = "member_id")
    @BatchSize(size = 100)
    private Member member;

    @ManyToOne(optional = false)
    @JoinColumn(nullable = false, name = "owner_id")
    @BatchSize(size = 100)
    private Member owner;

    @Enumerated(EnumType.STRING)
    private Emotion emotion;

    @Column(nullable = false)
    private boolean open;

    @Column(nullable = false)
    private boolean sale;
}
