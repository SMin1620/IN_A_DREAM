package com.dream.dream.transaction.entity;


import com.dream.dream.diary.entity.Diary;
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
@Table(name = "transactions")
public class Transaction {

    @Id
    @GeneratedValue
    @Column(name = "transaction_id")
    private Long id;

    @ManyToOne
    @JoinColumn(name = "diary_id")
    private Diary diary;

    @ManyToOne
    @JoinColumn(name = "buyer_id")
    private Member buyer;

    @ManyToOne
    @JoinColumn(name = "seller_id")
    private Member seller;

    @NotNull
    private int positivePoint;
    @NotNull
    private int neutralPoint;
    @NotNull
    private int negativePoint;

}
