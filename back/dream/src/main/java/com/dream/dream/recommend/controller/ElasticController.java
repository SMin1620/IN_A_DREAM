package com.dream.dream.recommend.controller;

import com.dream.dream.common.BaseResponse;
import com.dream.dream.recommend.service.ElasticService;
import com.dream.dream.jwt.JwtTokenProvider;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.repository.MemberRepository;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.attribute.UserPrincipalNotFoundException;

@RestController
@RequestMapping("/api/elastic")
@RequiredArgsConstructor
@Tag(name = "엘라스틱서치 테스트")
public class ElasticController {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final ElasticService elasticService;

    @Operation(summary = "엘라스틱 테스트")
    @GetMapping
    public BaseResponse listElasticDiary(
            HttpServletRequest request
    ) throws IOException {
        //////////////////////// 토큰으로 인가된 사용자 정보 처리하는 로직
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

        System.out.println("token >>> " + token);

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        Member member = memberRepository.findByEmail(userDetails.getUsername()).get();

        // 유저 예외처리 :: 예외처리 커스텀 필요
        if (member == null) {
            throw new UserPrincipalNotFoundException("유효한 사용자가 아닙니다.");
        }

        return new BaseResponse(HttpStatus.OK, "", elasticService.listRecommend(member.getId()));
    }
}
