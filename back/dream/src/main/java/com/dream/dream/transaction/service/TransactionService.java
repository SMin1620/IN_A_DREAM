package com.dream.dream.transaction.service;


import com.dream.dream.diary.entity.Diary;
import com.dream.dream.diary.repository.DiaryRepository;
import com.dream.dream.exception.BusinessLogicException;
import com.dream.dream.exception.ExceptionCode;
import com.dream.dream.member.entity.Member;
import com.dream.dream.member.repository.MemberRepository;
import com.dream.dream.transaction.dto.TransactionDto;
import com.dream.dream.transaction.entity.Transaction;
import com.dream.dream.transaction.repository.TransactionRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
@Slf4j
public class TransactionService {

    private final TransactionRepository transactionRepository;
    private final MemberRepository memberRepository;
    private final DiaryRepository diaryRepository;

    public TransactionDto.TradeDiaryResponseDto tradeDiary(String buyerEmail, TransactionDto.TradeDiaryRequestDto tradeDiaryRequestDto){

        Member buyer = memberRepository.findByEmail(buyerEmail).orElseThrow(() -> new BusinessLogicException(ExceptionCode.BUYER_NOT_FOUND));
        Member seller = memberRepository.findByEmail(tradeDiaryRequestDto.getSellerEmail()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.SELLER_NOT_FOUND));

        buyer.setNegativeCoin(buyer.getNegativeCoin() - tradeDiaryRequestDto.getNegativePoint());
        buyer.setPositiveCoin(buyer.getPositiveCoin() - tradeDiaryRequestDto.getPositivePoint());
        buyer.setNeutralCoin(buyer.getNeutralCoin() - tradeDiaryRequestDto.getNeutralPoint());

        seller.setNegativeCoin(seller.getNegativeCoin() + tradeDiaryRequestDto.getNegativePoint());
        seller.setPositiveCoin(seller.getPositiveCoin() + tradeDiaryRequestDto.getPositivePoint());
        seller.setNeutralCoin(seller.getNeutralCoin() + tradeDiaryRequestDto.getNeutralPoint());

        log.info("다이어릴ㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹㄹDiaryId: " + tradeDiaryRequestDto.getDiaryId());

        Diary diary = diaryRepository.findById(tradeDiaryRequestDto.getDiaryId()).orElseThrow(() -> new BusinessLogicException(ExceptionCode.DIARY_NOT_FOUND));

        diary.setOwner(buyer);

        Transaction transaction = Transaction.builder().diary(diary).positivePoint(tradeDiaryRequestDto.getPositivePoint()).neutralPoint(tradeDiaryRequestDto.getNeutralPoint()).negativePoint(tradeDiaryRequestDto.getNegativePoint()).buyer(buyer).seller(seller).build();

        transactionRepository.save(transaction);

        return new TransactionDto.TradeDiaryResponseDto(buyer.getPositiveCoin(), buyer.getNeutralCoin(), buyer.getNegativeCoin());
    }

    public TransactionDto.MySellHistoryResponseDto mySellHistory(String memberEmail) {
        Member member = memberRepository.findByEmail(memberEmail).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        List<Transaction> transactions = transactionRepository.findAllBySeller(member.getId());

        TransactionDto.MySellHistoryResponseDto mySellHistoryResponseDto = new TransactionDto.MySellHistoryResponseDto(member.getEmail(), transactions);

        return mySellHistoryResponseDto;
    }

    public TransactionDto.MyBuyHistoryResponseDto myBuyHistory(String memberEmail) {
        Member member = memberRepository.findByEmail(memberEmail).orElseThrow(() -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

        List<Transaction> transactions = transactionRepository.findAllByBuyer(member.getId());

        TransactionDto.MyBuyHistoryResponseDto myBuyHistoryResponseDto = new TransactionDto.MyBuyHistoryResponseDto(member.getEmail(), transactions);

        return myBuyHistoryResponseDto;
    }
}
