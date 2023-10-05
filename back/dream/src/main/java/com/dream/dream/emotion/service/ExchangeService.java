package com.dream.dream.emotion.service;

import com.dream.dream.emotion.dto.ExchangeDto;
import com.dream.dream.emotion.entity.Exchange;
import com.dream.dream.emotion.repository.ExchangeRepository;
import com.dream.dream.exception.BusinessLogicException;
import com.dream.dream.exception.ExceptionCode;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class ExchangeService {

    private final MemberRepository memberRepository;
    private final ExchangeRepository exchangeRepository;

    public ExchangeDto.ExchangeResponseDto exchangeEmotion(String memberEmail, ExchangeDto.ExchangeRequestDto requestBody){
        Member member = memberRepository.findByEmail(memberEmail).orElseThrow(()->new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        int coin = requestBody.getCoin();
        if(requestBody.getKind().equals("positive")){
            if(member.getNeutralCoin() - coin < 0 || member.getNegativeCoin() - coin < 0) throw new BusinessLogicException(ExceptionCode.COIN_LACK);
            member.setPositiveCoin(member.getPositiveCoin() + coin);
            member.setNeutralCoin(member.getNeutralCoin() - coin);
            member.setNegativeCoin(member.getNegativeCoin() - coin);
        } else if (requestBody.getKind().equals("negative")) {
            if(member.getPositiveCoin() - coin < 0 || member.getNeutralCoin() - coin < 0) throw new BusinessLogicException(ExceptionCode.COIN_LACK);
            member.setPositiveCoin(member.getPositiveCoin() - coin);
            member.setNeutralCoin(member.getNeutralCoin() - coin);
            member.setNegativeCoin(member.getNegativeCoin() + coin);
        }else if (requestBody.getKind().equals("neutral")){
            if(member.getPositiveCoin() - coin < 0 || member.getNegativeCoin() - coin < 0) throw new BusinessLogicException(ExceptionCode.COIN_LACK);
            member.setPositiveCoin(member.getPositiveCoin() - coin);
            member.setNeutralCoin(member.getNeutralCoin() + coin);
            member.setNegativeCoin(member.getNegativeCoin() - coin);
        }else{
            throw new BusinessLogicException(ExceptionCode.EMOTION_NOT_FOUND);
        }

        Exchange exchange = Exchange.builder().
                member(member).
                positiveCoin(member.getPositiveCoin()).
                negativeCoin(member.getNeutralCoin()).
                neutralCoin(member.getNeutralCoin()).
                build();

        exchangeRepository.save(exchange);

        return ExchangeDto.ExchangeResponseDto.builder().
                positiveCoin(member.getPositiveCoin()).
                negativeCoin(member.getNegativeCoin()).
                neutralCoin(member.getNeutralCoin()).
                build();
    }

}
