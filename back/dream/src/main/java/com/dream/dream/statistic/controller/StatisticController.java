package com.dream.dream.statistic.controller;

import com.dream.dream.common.BaseResponse;
import com.dream.dream.exception.BusinessLogicException;
import com.dream.dream.exception.ExceptionCode;
import com.dream.dream.jwt.JwtTokenProvider;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.repository.MemberRepository;
import com.dream.dream.statistic.dto.RelationDto;
import com.dream.dream.statistic.service.StatisticService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

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
    public BaseResponse keywordStatistic(
            HttpServletRequest request,
            @RequestParam(value = "from", required = false) String from,
            @RequestParam(value = "to", required = false) String to
    ) throws IOException {
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        Member member = memberRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return new BaseResponse(HttpStatus.OK, "일별 키워드 통계", statisticService.dailyStatistic(from, to));
    }

    @Operation(summary = "사용자별 키워드 통계")
    @GetMapping("/daily/me")
    public BaseResponse keywordMyStatistic(
            HttpServletRequest request,
            @RequestParam(value = "from", required = false) String from,
            @RequestParam(value = "to", required = false) String to
    ) throws IOException {
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        Member member = memberRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return new BaseResponse(HttpStatus.OK, "사용자별 키워드 통계", statisticService.keywordMyStatistic(member.getId(), from, to));
    }

    @Operation(summary = "감정 통계")
    @GetMapping("/emotion")
    public BaseResponse emotionStatistic(
            HttpServletRequest request,
            @RequestParam(value = "from", required = false) String from,
            @RequestParam(value = "to", required = false) String to
    ) throws IOException {
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        Member member = memberRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return new BaseResponse(HttpStatus.OK, "감정 통계", statisticService.emotionStatistic(from, to));
    }

    @Operation(summary = "사용자별 감정 통계")
    @GetMapping("/emotion/me")
    public BaseResponse emotionMyStatistic(
            HttpServletRequest request,
            @RequestParam(value = "from", required = false) String from,
            @RequestParam(value = "to", required = false) String to
    ) throws IOException {
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        Member member = memberRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        System.out.println("fron , to " + from + " " + to);

        return new BaseResponse(HttpStatus.OK, "사용자별 감정 통계", statisticService.emotionMyStatistic(member.getId(), from, to));
    }

    @Operation(summary = "잔디 깎기")
    @GetMapping("/strict")
    public BaseResponse strictStatistic(
            HttpServletRequest request
    ) {
        System.out.println("잔디 컨트롤러");
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        Member member = memberRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        return new BaseResponse(HttpStatus.OK, "잔디 조회", statisticService.strictStatistic(member.getId()));
    }

    /**
     * 감정 코인과 sale의 상관관계
     * @param request
     * @return
     */
    @Operation(summary = "감정 코인과 sale의 상관관계")
    @GetMapping("/relation")
    public BaseResponse relation(
            HttpServletRequest request
    ) {
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        RelationDto.StatisticResponseDto statisticResponseDto = statisticService.relation();

        return new BaseResponse(HttpStatus.OK, "감정 코인과 sale의 상관관계 조회", statisticResponseDto);
    }
}
