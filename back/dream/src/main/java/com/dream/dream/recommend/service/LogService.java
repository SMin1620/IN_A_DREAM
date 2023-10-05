package com.dream.dream.recommend.service;

import com.dream.dream.diary.entity.Diary;
import com.dream.dream.kafka.service.KafkaProducerService;
import com.dream.dream.member.entity.Member;
import com.dream.dream.recommend.dto.RecommendDto;
import com.dream.dream.recommend.mapper.RecommendMapper;
import com.dream.dream.statistic.dto.StatisticDto;
import com.dream.dream.transaction.entity.Transaction;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class LogService {

    private final RecommendMapper recommendMapper;
    private final KafkaProducerService kafkaProducerService;

    /**
     * 꿈 일기 상세 조회시, 로그 생성
     */
    public void diaryLog(Diary diary, Long memberId) {
        RecommendDto.DiaryDetailLog diaryDetailLog = recommendMapper.recommendLogDto(diary);
        diaryDetailLog.setDiaryId(diary.getId());
        diaryDetailLog.setMemberId(memberId);
        kafkaProducerService.sendRecommend(diaryDetailLog);
    }


    /**
     * 꿈 이릭 거래시, 거래 내역 로그 생성
     */
    public void transactionLog(Transaction transaction) {
        RecommendDto.TransactionLog transactionLog = recommendMapper.recommendTransactionLogDto(transaction);
        transactionLog.setTransactionId(transaction.getId());
        transactionLog.setDiaryId(transaction.getDiary().getId());
        transactionLog.setBuyerId(transaction.getBuyer().getId());
        transactionLog.setSellerId(transaction.getSeller().getId());
        transactionLog.setPoint(
                transaction.getNegativePoint() + transaction.getNegativePoint() + transaction.getNeutralPoint()
        );
        kafkaProducerService.sendTransaction(transactionLog);
    }

    /**
     * 잔디 로그
     */
    public void strictLog(Member member) {

        StatisticDto.strictRequestDto strictDto = StatisticDto.strictRequestDto.builder()
                .memberId(member.getId())
                .registDate(LocalDateTime.now().toString().substring(0, 10))
                .build();
        kafkaProducerService.sendStrict(strictDto);
    }
}
