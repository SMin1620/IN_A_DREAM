package com.dream.dream.diary.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;

@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "dreams")
public class Diary {

    @Id
    @GeneratedValue
    @Column(name = "diary_id")
    private Long id;

    @Column(nullable = false)
    private String image;

    @Column(nullable = false)
    private String title;

    @Column(nullable = false)
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

    @Builder.Default
    private int likeTime = 0;

    private LocalDateTime localDateTime;

//    private Member member;
    private int member;

//    private Emotion emotion;
    private int emotion;

}
