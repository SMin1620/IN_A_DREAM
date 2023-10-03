package com.dream.dream.search.controller;

import com.dream.dream.common.BaseResponse;
import com.dream.dream.exception.BusinessLogicException;
import com.dream.dream.exception.ExceptionCode;
import com.dream.dream.jwt.JwtTokenProvider;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.repository.MemberRepository;
import com.dream.dream.recommend.dto.RecommendDto;
import com.dream.dream.recommend.entity.DiaryElastic;
import com.dream.dream.recommend.mapper.RecommendMapper;
import com.dream.dream.search.service.SearchService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/search")
@RequiredArgsConstructor
@Tag(name = "검색 API")
public class SearchController {

    private final JwtTokenProvider jwtTokenProvider;
    private final MemberRepository memberRepository;
    private final SearchService searchService;
    private final RecommendMapper recommendMapper;


    /**
     * 꿈 일기 검색
     */
    @Operation(summary = "검색 API")
    @GetMapping()
    public BaseResponse searchDiary(
            HttpServletRequest request,
            @RequestParam(value = "keyword") String keyword
    ) throws IOException {
        //////////////////////// 토큰으로 인가된 사용자 정보 처리하는 로직
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

        System.out.println("검색 단어 >>> " + keyword);

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        Member member = memberRepository.findByEmail(userDetails.getUsername()).get();

        // 유저 예외처리 :: 예외처리 커스텀 필요
        if (member == null) {
            throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
        }

        List<RecommendDto.DiaryRecommendResponseDto> diaryElastics = searchService.searchDiary(member.getId(), keyword);
        return new BaseResponse(HttpStatus.OK, "검색 목록", diaryElastics);


    }
}
