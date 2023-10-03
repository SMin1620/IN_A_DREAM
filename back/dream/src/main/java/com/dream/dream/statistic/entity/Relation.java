package com.dream.dream.statistic.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.elasticsearch.annotations.Document;


@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
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

}
