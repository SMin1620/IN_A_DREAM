package com.dream.dream.transaction.controller;

import com.dream.dream.common.BaseResponse;
import com.dream.dream.emotion.dto.ExchangeDto;
import com.dream.dream.emotion.service.ExchangeService;
import com.dream.dream.jwt.JwtTokenProvider;
import com.dream.dream.transaction.dto.TransactionDto;
import com.dream.dream.transaction.service.TransactionService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Transaction")
@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("/api/transaction")
public class TransactionController {

    private final TransactionService transactionService;
    private final JwtTokenProvider jwtTokenProvider;

    /**
     * 일기 거래 api
     * response로 구매자의 남은 코인을 보냄
     */
    @PostMapping
    public BaseResponse tradeDiary(HttpServletRequest request, @RequestBody TransactionDto.TradeDiaryRequestDto requestBody){
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String buyerEmail = userDetails.getUsername();

        TransactionDto.TradeDiaryResponseDto tradeDiaryResponseDto = transactionService.tradeDiary(buyerEmail, requestBody);
        
        return new BaseResponse(HttpStatus.OK, "거래 성공", tradeDiaryResponseDto);
    }

    @GetMapping("/sell")
    public BaseResponse mySellHistory(HttpServletRequest request){
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String memberEmail = userDetails.getUsername();

        TransactionDto.MySellHistoryResponseDto mySellHistoryResponseDto = transactionService.mySellHistory(memberEmail);

        return new BaseResponse(HttpStatus.OK, "나의 판매 기록 조회 성공", mySellHistoryResponseDto);

    }

    @GetMapping("/buy")
    public BaseResponse myBuyHistory(HttpServletRequest request){
        String token = jwtTokenProvider.resolveToken(request);
        jwtTokenProvider.validateToken(token);

        Authentication authentication = jwtTokenProvider.getAuthentication(token);
        UserDetails userDetails = (UserDetails) authentication.getPrincipal();

        String memberEmail = userDetails.getUsername();

        TransactionDto.MyBuyHistoryResponseDto myBuyHistoryResponseDto = transactionService.myBuyHistory(memberEmail);

        return new BaseResponse(HttpStatus.OK, "나의 구매 기록 조회 성공", myBuyHistoryResponseDto);

    }

}
