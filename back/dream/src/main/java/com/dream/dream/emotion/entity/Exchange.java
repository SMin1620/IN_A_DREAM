package com.dream.dream.emotion.entity;


import com.dream.dream.member.entity.Member;
import jakarta.persistence.*;
import lombok.*;

import javax.validation.constraints.NotNull;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "exchange")
public class Exchange {

    @Id
    @GeneratedValue
    @Column(name = "exchange_id")
    private Long id;

    @NotNull
    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private Member member;

    @NotNull
    private int positivePoint;
    @NotNull
    private int neutralPoint;
    @NotNull
    private int negativePoint;
}
