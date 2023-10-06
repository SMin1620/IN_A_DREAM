package com.dream.dream.statistic.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;


@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class)
@Entity
public class Relation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private float avgNegativeWhenTrue;
    private float avgPositiveWhenTrue;
    private float avgNeutralWhenTrue;
    private float avgNegativeWhenFalse;
    private float avgPositiveWhenFalse;
    private float avgNeutralWhenFalse;

    @Column(nullable = false, updatable = false)
    @CreatedDate
    private LocalDateTime createdAt;

}
