package com.dream.dream.member.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.boot.context.properties.bind.DefaultValue;


import java.time.LocalDateTime;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "members")
public class Member {

    @Id
    @GeneratedValue
    @Column(name = "member_id")
    private Long id;

    @Column(nullable = false, unique = true)
    private String email;

    private String password;

    @Column(nullable = false, unique = true)
    private String nickname;

    private String birth;

    private String gender;

    @Column(nullable = false)
    private LocalDateTime createAt;

    private Long positivePoint = 0l;
    private Long negativePoint = 0l;
    private Long neutralPoint = 0l;

    // 리프레시 토큰
    private String refreshToken;

    private int isWrite;

}
