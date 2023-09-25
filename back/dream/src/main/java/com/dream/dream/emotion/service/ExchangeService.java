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

        if(member.getPositiveCoin() - requestBody.getSend().getPositivePoint() < 0 || member.getNegativeCoin() - requestBody.getSend().getNegativePoint() < 0 || member.getNeutralCoin() - requestBody.getSend().getNeutralPoint() < 0){
            throw (new BusinessLogicException(ExceptionCode.COIN_LACK));
        }

        member.setPositiveCoin(member.getPositiveCoin() - requestBody.getSend().getPositivePoint());
        member.setNegativeCoin(member.getNegativeCoin() - requestBody.getSend().getNegativePoint());
        member.setNeutralCoin(member.getNeutralCoin() - requestBody.getSend().getNeutralPoint());

        member.setPositiveCoin(member.getPositiveCoin() + requestBody.getReceive().getPositivePoint());
        member.setNegativeCoin(member.getNegativeCoin() + requestBody.getReceive().getNegativePoint());
        member.setNeutralCoin(member.getNeutralCoin() + requestBody.getReceive().getNeutralPoint());

        Exchange exchange = Exchange.builder().
                member(member).
                positivePoint(member.getPositiveCoin()).
                negativePoint(member.getNeutralCoin()).
                neutralPoint(member.getNeutralCoin()).
                build();

        exchangeRepository.save(exchange);

        return ExchangeDto.ExchangeResponseDto.builder().
                positivePoint(member.getPositiveCoin()).
                negativePoint(member.getNegativeCoin()).
                neutralPoint(member.getNeutralCoin()).
                build();
    }

}
