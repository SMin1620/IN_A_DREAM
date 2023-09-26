package com.dream.dream.statistic.controller;

import com.dream.dream.common.BaseResponse;
import com.dream.dream.exception.BusinessLogicException;
import com.dream.dream.exception.ExceptionCode;
import com.dream.dream.jwt.JwtTokenProvider;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.repository.MemberRepository;
import com.dream.dream.statistic.service.StatisticService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/statistic")
@RequiredArgsConstructor
@Tag(name = "통계 API")
public class StatisticController {

    private final MemberRepository memberRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final StatisticService statisticService;


    @Operation(summary = "키워드 일별 통계")
    @GetMapping("/daily")
    public BaseResponse dilayStatistic(
            HttpServletRequest request,
            @RequestParam("from") String from,
            @RequestParam("to") String to
    ) throws IOException {
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        Member member = memberRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return new BaseResponse(HttpStatus.OK, "일별 키워드 통계", statisticService.dailyStatistic(from, to));
    }
}
