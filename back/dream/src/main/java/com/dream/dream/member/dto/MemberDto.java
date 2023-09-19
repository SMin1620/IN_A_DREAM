package com.dream.dream.member.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.*;

public class MemberDto {

    /**
     * 로그인 반환 Dto
     */
    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MemberLoginResponseDto{
        @Schema(example = "차두리")
        private String nickname;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MemberLoginRequestDto{
        @Schema(example = "asdasdas@naver.com")
        private String email;
        @Schema(example = "akchasc51445")
        private String password;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MemberRegisterRequestDto{
        @Schema(example = "asdasdas@naver.com")
        private String email;
        @Schema(example = "akchasc51445")
        private String password;
        @Schema(example = "차두리")
        private String nickname;
        @Schema(example = "male")
        private String gender;
        @Schema(example = "모름")
        private String birth;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class MemberRegisterResponseDto{
        @Schema(example = "차두리")
        private String email;
        private String password;
    }
}
