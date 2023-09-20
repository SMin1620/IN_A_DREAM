package com.dream.dream.emotion.controller;

import com.dream.dream.common.BaseResponse;
import com.dream.dream.emotion.dto.ExchangeDto;
import com.dream.dream.emotion.entity.Exchange;
import com.dream.dream.emotion.service.ExchangeService;
import com.dream.dream.jwt.JwtTokenProvider;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
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
    @PostMapping
    public BaseResponse exchangeEmotion(@RequestHeader(name = "Authorization") String token, @RequestBody ExchangeDto.ExchangeRequestDto requestBody){
        token = token.substring(7);
        jwtTokenProvider.validateToken(token);
        String memberEmail = jwtTokenProvider.getUserEmail(token);

        ExchangeDto.ExchangeResponseDto exchange = exchangeService.exchangeEmotion(memberEmail, requestBody);

        return new BaseResponse(HttpStatus.OK, "환전 성공", exchange);
    }

}
