package com.dream.dream.emotion.controller;

import com.dream.dream.common.BaseResponse;
import com.dream.dream.emotion.dto.ExchangeDto;
import com.dream.dream.emotion.entity.Exchange;
import com.dream.dream.emotion.service.ExchangeService;
import com.dream.dream.jwt.JwtTokenProvider;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Exchange")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/exchange")
public class EmotionController {

    private final ExchangeService exchangeService;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 거래 추가
     */
    @Operation(summary = "재화 교환")
    @PostMapping
    public BaseResponse exchangeEmotion(HttpServletRequest request, @RequestBody ExchangeDto.ExchangeRequestDto requestBody){
        //////////////////////// 토큰으로 인가된 사용자 정보 처리하는 로직
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String memberEmail = userDetails.getUsername();

        ExchangeDto.ExchangeResponseDto exchange = exchangeService.exchangeEmotion(memberEmail, requestBody);

        return new BaseResponse(HttpStatus.OK, "환전 성공", exchange);

    }

}
