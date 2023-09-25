package com.dream.dream.recommend.service;

import com.dream.dream.diary.entity.Diary;
import com.dream.dream.kafka.service.KafkaProducerService;
import com.dream.dream.recommend.dto.RecommendDto;
import com.dream.dream.recommend.mapper.RecommendMapper;
import com.dream.dream.transaction.entity.Transaction;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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
    public void diaryLog(Diary diary) {
        RecommendDto.DiaryDetailLog diaryDetailLog = recommendMapper.recommendLogDto(diary);
        diaryDetailLog.setDiaryId(diary.getId());
        diaryDetailLog.setMemberId(diary.getMember().getId());
        kafkaProducerService.sendRecommend(diaryDetailLog);
    }



}
