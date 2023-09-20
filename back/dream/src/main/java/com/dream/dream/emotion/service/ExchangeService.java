package com.dream.dream.emotion.service;


import com.dream.dream.emotion.dto.ExchangeDto;
import com.dream.dream.emotion.entity.Exchange;
import com.dream.dream.emotion.repository.ExchangeRepository;
import com.dream.dream.exception.BusinessLogicException;
import com.dream.dream.exception.ExceptionCode;
import com.dream.dream.jwt.JwtTokenProvider;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class ExchangeService {

    private final MemberRepository memberRepository;
    private final ExchangeRepository exchangeRepository;

    public ExchangeDto.ExchangeResponseDto exchangeEmotion(String memberEmail, ExchangeDto.ExchangeRequestDto requestBody){
        Member member = memberRepository.findByEmail(memberEmail).orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        member.setPositivePoint(member.getPositivePoint() - requestBody.getSend().getPositivePoint());
        member.setNegativePoint(member.getNegativePoint() - requestBody.getSend().getNegativePoint());
        member.setNeutralPoint(member.getNeutralPoint() - requestBody.getSend().getNeutralPoint());

        member.setPositivePoint(member.getPositivePoint() + requestBody.getReceive().getPositivePoint());
        member.setNegativePoint(member.getNegativePoint() + requestBody.getReceive().getNegativePoint());
        member.setNeutralPoint(member.getNeutralPoint() + requestBody.getReceive().getNeutralPoint());

        Exchange exchange = Exchange.builder().
                member(member).
                positivePoint(member.getPositivePoint()).
                negativePoint(member.getNeutralPoint()).
                neutralPoint(member.getNeutralPoint()).
                build();

        exchangeRepository.save(exchange);

        return ExchangeDto.ExchangeResponseDto.builder().
                positivePoint(member.getPositivePoint()).
                negativePoint(member.getNegativePoint()).
                neutralPoint(member.getNeutralPoint()).
                build();
    }

}
