package com.dream.dream.member.dto;

import lombok.*;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
@Data
public class TokenDto {

    private String accessToken;
    private String refreshToken;
    private Long memberId;
}
