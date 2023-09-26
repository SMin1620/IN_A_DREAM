package com.dream.dream.recommend.controller;

import com.dream.dream.common.BaseResponse;
import com.dream.dream.diary.entity.Diary;
import com.dream.dream.exception.BusinessLogicException;
import com.dream.dream.exception.ExceptionCode;
import com.dream.dream.recommend.dto.RecommendDto;
import com.dream.dream.recommend.entity.DiaryElastic;
import com.dream.dream.recommend.mapper.RecommendMapper;
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
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.List;

@RestController
@RequestMapping("/api/recommend")
@RequiredArgsConstructor
@Tag(name = "꿈 일기 추천")
public class ElasticController {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final ElasticService elasticService;
    private final RecommendMapper recommendMapper;


    /**
     * 사용자 로그 데이터 분석을 토대로 사용자 맞춤형 데이터 추천
     */
    @Operation(summary = "사용자 맞춤 꿈 일기 추천")
    @GetMapping
    public BaseResponse listMemberDiary(
            HttpServletRequest request
    ) throws IOException {
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        Member member = memberRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        List<RecommendDto.DiaryRecommendResponseDto> diaryElastics = elasticService.listRecommend(member.getId());
        return new BaseResponse(HttpStatus.OK, "사용자 맞춤 꿈 목록 추천", diaryElastics);
    }

    /**
     * 꿈 일기와 유사한 꿈 일기 추천
     */
    @Operation(summary = "해당 꿈과 비슷한 꿈 일기 추천")
    @GetMapping("/{diaryId}")
    public BaseResponse listDiary(
            HttpServletRequest request,
            @PathVariable("diaryId") Long diaryId
    ) throws IOException {
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        memberRepository.findByEmail(userDetails.getUsername())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        List<RecommendDto.DiaryRecommendResponseDto> diaryElastics = elasticService.listDiary(diaryId);

        return new BaseResponse(HttpStatus.OK, "이 꿈과 비슷한 꿈 목록 추천", diaryElastics);
    }
}
