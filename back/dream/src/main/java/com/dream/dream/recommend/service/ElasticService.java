package com.dream.dream.recommend.service;

import com.dream.dream.recommend.dto.DiaryElastic;
import com.dream.dream.recommend.repository.ElasticRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
@Transactional(readOnly = true)
public class ElasticService {

    private final ElasticRepository elasticRepository;


    /**
     * 사용자 별 일기 추천 -> 로그 데이터 기반
     */
    public List<DiaryElastic> listRecommend(Long memberId) {
        List<DiaryElastic> diaryElastics = elasticRepository.findAllByMemberId(memberId);
        return diaryElastics;
    }
}
